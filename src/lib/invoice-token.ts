import "server-only";

import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { deflateRawSync, inflateRawSync } from "node:zlib";
import type { InvoiceRecord } from "@/lib/invoice-types";
import { sanitizeInvoiceDraft, validateInvoiceDraft } from "@/lib/invoice-validation";

const TOKEN_VERSION = "v1";

function getEncryptionKey() {
  const secret = process.env.INVOICE_SIGNING_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("INVOICE_SIGNING_SECRET must contain at least 32 characters.");
  }

  return createHash("sha256").update(secret).digest();
}

export function createInvoiceToken(invoice: InvoiceRecord) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const compressed = deflateRawSync(Buffer.from(JSON.stringify(invoice), "utf8"));
  const encrypted = Buffer.concat([cipher.update(compressed), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [
    TOKEN_VERSION,
    iv.toString("base64url"),
    encrypted.toString("base64url"),
    tag.toString("base64url"),
  ].join(".");
}

export function readInvoiceToken(token: string): InvoiceRecord | null {
  try {
    const [version, ivValue, encryptedValue, tagValue, extra] = token.split(".");
    if (version !== TOKEN_VERSION || !ivValue || !encryptedValue || !tagValue || extra) return null;

    const decipher = createDecipheriv(
      "aes-256-gcm",
      getEncryptionKey(),
      Buffer.from(ivValue, "base64url"),
    );
    decipher.setAuthTag(Buffer.from(tagValue, "base64url"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedValue, "base64url")),
      decipher.final(),
    ]);
    const parsed = JSON.parse(inflateRawSync(decrypted).toString("utf8")) as Record<string, unknown>;
    const invoice = sanitizeInvoiceDraft(parsed);
    if (validateInvoiceDraft(invoice)) return null;

    const rawPayment =
      parsed.payment && typeof parsed.payment === "object"
        ? (parsed.payment as Record<string, unknown>)
        : {};

    return {
      ...invoice,
      createdAt: typeof parsed.createdAt === "string" ? parsed.createdAt : "",
      payment: {
        upiId: typeof rawPayment.upiId === "string" ? rawPayment.upiId.slice(0, 120) : "",
        payeeName:
          typeof rawPayment.payeeName === "string" ? rawPayment.payeeName.slice(0, 120) : "HTTPier",
        mobile: typeof rawPayment.mobile === "string" ? rawPayment.mobile.slice(0, 40) : "",
      },
    };
  } catch {
    return null;
  }
}
