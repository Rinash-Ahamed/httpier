import nodemailer from "nodemailer";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseContactEnquiry } from "@/lib/contact";
import { createContactEmail } from "@/lib/contact-email";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_BODY_BYTES = 48 * 1024;
// Best-effort per-instance throttling; shared across requests on a warm function.
const attempts = new Map<string, { count: number; until: number }>();

function json(body: object, status: number, headers?: Record<string, string>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json({ success: false, error: "Please submit through the HTTPier website." }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ success: false, error: "Expected a JSON request." }, 415);
  }

  let input: unknown;
  const reader = request.body?.getReader();
  if (!reader) return json({ success: false, error: "Please complete the contact form." }, 400);
  try {
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return json({ success: false, error: "Your message is too long." }, 413);
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return json({ success: false, error: "Please complete the contact form." }, 400);
  } finally {
    reader.releaseLock();
  }

  if (input && typeof input === "object" && "website" in input && input.website) {
    return json({ success: false, error: "Unable to submit this enquiry." }, 400);
  }
  const enquiry = parseContactEnquiry(input);
  if (!enquiry) return json({ success: false, error: "Please check your details and accept the Privacy Policy." }, 400);

  const now = Date.now();
  for (const [key, attempt] of attempts) if (attempt.until <= now) attempts.delete(key);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = createHash("sha256").update(ip).digest("hex");
  const previous = attempts.get(key);
  if (previous && previous.count >= 5) {
    return json({ success: false, error: "Please wait a few minutes before trying again." }, 429, { "Retry-After": String(Math.ceil((previous.until - now) / 1000)) });
  }
  if (attempts.size >= 2000 && !previous) {
    return json({ success: false, error: "Please try again shortly." }, 429, { "Retry-After": "60" });
  }
  attempts.set(key, { count: (previous?.count ?? 0) + 1, until: previous?.until ?? now + 5 * 60 * 1000 });

  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s/g, "");
  const recipient = process.env.CONTACT_TO_EMAIL?.trim() || "ahamedrinash@gmail.com";
  const isEmail = (value: string) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
  if (!user || !pass || !isEmail(user) || !isEmail(recipient)) {
    console.error("[contact] Email configuration missing or invalid. Check SMTP_USER, SMTP_PASS and CONTACT_TO_EMAIL.");
    return json({ success: false, error: "Email is temporarily unavailable. Please email us directly." }, 503);
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    dnsTimeout: 4000,
    connectionTimeout: 6000,
    greetingTimeout: 6000,
    socketTimeout: 10000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  try {
    const message = createContactEmail(enquiry);
    const logo = await readFile(path.join(process.cwd(), "public", "icon.png"));
    const result = await transporter.sendMail({
      from: { name: "HTTPier Enquiries", address: user },
      to: recipient,
      replyTo: { name: enquiry.name, address: enquiry.email },
      ...message,
      attachments: [{ filename: "httpier.png", content: logo, cid: "httpier-logo", contentDisposition: "inline" }],
    });
    if (!result.accepted?.length) throw new Error("Recipient not accepted");
    return json({ success: true }, 200);
  } catch (error) {
    // Do not log credentials, submitted content, or raw SMTP responses.
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "SEND_FAILED";
    console.error("[contact] Email delivery failed:", /^[A-Z_]+$/.test(code) ? code : "SEND_FAILED");
    return json({ success: false, error: "We couldn't send your enquiry. Please try again or email us directly." }, 502);
  } finally {
    transporter.close();
  }
}
