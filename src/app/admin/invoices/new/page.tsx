import type { Metadata } from "next";
import { InvoiceBuilder } from "@/components/admin/InvoiceBuilder";
import type { InvoiceDraft } from "@/lib/invoice-types";
import { requireAdmin } from "@/lib/admin-auth";
import { getPaymentDetails } from "@/lib/payment-config";

export const metadata: Metadata = {
  title: "New invoice",
  robots: { index: false, follow: false },
};

function dateInputValue(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export default async function NewInvoicePage() {
  await requireAdmin();

  const now = new Date();
  const dueDate = new Date(now);
  dueDate.setDate(dueDate.getDate() + 14);
  const dateStamp = dateInputValue(now).replaceAll("-", "");
  const initialInvoice: InvoiceDraft = {
    clientName: "",
    companyName: "",
    phone: "",
    email: "",
    billingAddress: "",
    invoiceNumber: `HTP-${dateStamp}-011`,
    invoiceDate: dateInputValue(now),
    dueDate: dateInputValue(dueDate),
    projectName: "",
    shortDescription: "",
    items: [
      {
        id: "item-1",
        serviceName: "",
        description: "",
        quantity: 1,
        rate: 0,
      },
    ],
    discount: 0,
    taxRate: 0,
    amountPaid: 0,
  };

  return <InvoiceBuilder initialInvoice={initialInvoice} payment={getPaymentDetails()} />;
}
