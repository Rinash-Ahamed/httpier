"use server";

import type { InvoiceDraft } from "@/lib/invoice-types";
import { requireAdmin } from "@/lib/admin-auth";
import { createInvoiceToken } from "@/lib/invoice-token";
import { sanitizeInvoiceDraft, validateInvoiceDraft } from "@/lib/invoice-validation";
import { getPaymentDetails } from "@/lib/payment-config";

export type CreateInvoiceResult =
  | { ok: true; path: string }
  | { ok: false; error: string };

export async function createInvoiceLinkAction(draft: InvoiceDraft): Promise<CreateInvoiceResult> {
  await requireAdmin();

  const invoice = sanitizeInvoiceDraft(draft);
  const validationError = validateInvoiceDraft(invoice);

  if (validationError) {
    return { ok: false, error: validationError };
  }

  try {
    const token = createInvoiceToken({
      ...invoice,
      createdAt: new Date().toISOString(),
      payment: getPaymentDetails(),
    });

    return { ok: true, path: `/invoice/${token}` };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create invoice link.";
    return { ok: false, error: message };
  }
}
