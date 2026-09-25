import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvoiceActions } from "@/components/invoice/InvoiceActions";
import { InvoiceDocument } from "@/components/invoice/InvoiceDocument";
import { readInvoiceToken } from "@/lib/invoice-token";

export const metadata: Metadata = {
  title: "Client invoice",
  description: "A secure client invoice from HTTPier.",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default async function PublicInvoicePage({ params }: PageProps<"/invoice/[token]">) {
  const { token } = await params;
  const invoice = readInvoiceToken(token);

  if (!invoice) notFound();

  return (
    <div className="invoice-print-shell min-h-screen bg-[var(--color-mist)] p-0">
      <div className="mx-auto max-w-4xl">
        <div className="invoice-actions mb-6 text-center">
          <p className="font-mono-tight text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-blue)]">
            Secure client invoice
          </p>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
            Review the invoice and use the QR or payment information below.
          </p>
        </div>
        <InvoiceDocument invoice={invoice} />
        <div className="mt-6">
          <InvoiceActions invoice={invoice} />
        </div>
        <p className="invoice-actions mt-5 text-center text-[11px] leading-5 text-[var(--color-ink-soft)]">
          This invoice link contains an encrypted, read-only snapshot. It does not provide access to HTTPier admin pages.
        </p>
      </div>
    </div>
  );
}
