"use client";

import { useState } from "react";
import type { InvoiceRecord } from "@/lib/invoice-types";
import { buildUpiPaymentUrl } from "@/lib/invoice-types";

type InvoiceActionsProps = {
  invoice: InvoiceRecord;
};

export function InvoiceActions({ invoice }: InvoiceActionsProps) {
  const [copied, setCopied] = useState(false);
  const upiUrl = buildUpiPaymentUrl(invoice);

  function printInvoice() {
    window.print();
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function shareInvoice() {
    const shareData = {
      title: `HTTPier invoice ${invoice.invoiceNumber}`,
      text: `Invoice ${invoice.invoiceNumber} for ${invoice.projectName}`,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }

    await copyLink();
  }

  const secondaryButton =
    "rounded-full border border-[var(--color-line)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition hover:border-blue-300 hover:bg-blue-50";

  return (
    <div className="invoice-actions flex flex-wrap items-center justify-center gap-2">
      <button type="button" onClick={printInvoice} className={secondaryButton}>
        Print invoice
      </button>
      <button type="button" onClick={printInvoice} className={secondaryButton} title="Choose Save as PDF in the print dialog">
        Download PDF
      </button>
      <button type="button" onClick={copyLink} className={secondaryButton}>
        {copied ? "Link copied" : "Copy payment link"}
      </button>
      <button
        type="button"
        onClick={shareInvoice}
        className="rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-blue)]"
      >
        Share invoice
      </button>
      {upiUrl && (
        <a
          href={upiUrl}
          className="rounded-full bg-[var(--color-blue)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 sm:hidden"
        >
          Pay with UPI
        </a>
      )}
    </div>
  );
}
