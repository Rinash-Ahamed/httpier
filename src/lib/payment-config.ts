import "server-only";

import type { InvoicePaymentDetails } from "@/lib/invoice-types";
import { siteConfig } from "@/lib/data";

export function getPaymentDetails(): InvoicePaymentDetails {
  return {
    upiId: process.env.HTTPIER_UPI_ID?.trim() || "rinashahamed@okicici",
    payeeName: process.env.HTTPIER_PAYMENT_NAME?.trim() || "HTTPier",
    mobile: process.env.HTTPIER_PAYMENT_MOBILE?.trim() || siteConfig.phone,
  };
}
