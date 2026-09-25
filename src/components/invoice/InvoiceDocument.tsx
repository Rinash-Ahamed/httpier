"use client";

import Image from "next/image";
import type { InvoiceRecord } from "@/lib/invoice-types";
import {
  buildUpiPaymentUrl,
  calculateInvoiceTotals,
  formatInr,
  formatInvoiceDate,
} from "@/lib/invoice-types";

type InvoiceDocumentProps = {
  invoice: InvoiceRecord;
  preview?: boolean;
};

export function InvoiceDocument({ invoice, preview = false }: InvoiceDocumentProps) {
  const totals = calculateInvoiceTotals(invoice);
  const upiUrl = buildUpiPaymentUrl(invoice);

  return (
    <article
      id="invoice-document"
      className={`invoice-sheet overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-white text-[var(--color-ink)] shadow-[var(--shadow-elevated)] ${
        preview ? "text-[13px]" : "text-sm"
      }`}
    >
      <div className="relative overflow-hidden border-b border-[var(--color-line)] px-5 py-6 sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/brand/httpier-mark.png"
                alt=""
                width={42}
                height={28}
                className="h-7 w-auto"
              />
              <span className="font-mono-tight text-xl font-semibold tracking-tight">HTTPier</span>
            </div>
            <p className="mt-3 max-w-xs text-[12px] leading-5 text-[var(--color-ink-soft)]">
              Better Web, By Design.
              <br />
              httpier.in
            </p>
          </div>
          <div className="sm:text-right">
            <p className="font-mono-tight text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-blue)]">
              Invoice
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              {invoice.invoiceNumber || "Draft invoice"}
            </h1>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[var(--color-ink-soft)] sm:justify-end">
              <span>Issued {formatInvoiceDate(invoice.invoiceDate)}</span>
              <span>Due {formatInvoiceDate(invoice.dueDate)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-px border-b border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
        <section className="bg-white px-5 py-5 sm:px-8 sm:py-6">
          <p className="font-mono-tight text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
            Bill to
          </p>
          <p className="mt-3 text-base font-semibold">{invoice.clientName || "Client name"}</p>
          {invoice.companyName && <p className="mt-0.5 text-[var(--color-ink-soft)]">{invoice.companyName}</p>}
          {invoice.billingAddress && (
            <p className="mt-3 whitespace-pre-line leading-5 text-[var(--color-ink-soft)]">
              {invoice.billingAddress}
            </p>
          )}
          <div className="mt-3 space-y-1 text-[12px] text-[var(--color-ink-soft)]">
            {invoice.email && <p>{invoice.email}</p>}
            {invoice.phone && <p>{invoice.phone}</p>}
          </div>
        </section>
        <section className="bg-white px-5 py-5 sm:px-8 sm:py-6">
          <p className="font-mono-tight text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
            Project
          </p>
          <p className="mt-3 text-base font-semibold">{invoice.projectName || "Project name"}</p>
          <p className="mt-2 leading-5 text-[var(--color-ink-soft)]">
            {invoice.shortDescription || "Project scope and invoice summary."}
          </p>
        </section>
      </div>

      <section className="px-5 py-6 sm:px-8 sm:py-8">
        <div className="hidden grid-cols-[minmax(0,1fr)_72px_110px_110px] gap-4 border-b border-[var(--color-line)] pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-soft)] sm:grid">
          <span>Service</span>
          <span className="text-right">Qty</span>
          <span className="text-right">Rate</span>
          <span className="text-right">Amount</span>
        </div>
        <div className="divide-y divide-[var(--color-line)]">
          {invoice.items.map((item) => {
            const lineAmount = item.quantity * item.rate;
            return (
              <div
                key={item.id}
                className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_72px_110px_110px] sm:gap-4"
              >
                <div>
                  <p className="font-medium">{item.serviceName || "Service"}</p>
                  {item.description && (
                    <p className="mt-1 text-[12px] leading-5 text-[var(--color-ink-soft)]">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="flex justify-between text-[12px] sm:block sm:text-right sm:text-sm">
                  <span className="text-[var(--color-ink-soft)] sm:hidden">Quantity</span>
                  <span>{item.quantity}</span>
                </div>
                <div className="flex justify-between text-[12px] sm:block sm:text-right sm:text-sm">
                  <span className="text-[var(--color-ink-soft)] sm:hidden">Rate</span>
                  <span>{formatInr(item.rate)}</span>
                </div>
                <div className="flex justify-between font-semibold sm:block sm:text-right">
                  <span className="text-[12px] font-normal text-[var(--color-ink-soft)] sm:hidden">Amount</span>
                  <span>{formatInr(lineAmount)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid gap-8 border-t border-[var(--color-line)] pt-6 lg:grid-cols-[1fr_310px]">
          <div className="rounded-2xl bg-[var(--color-mist)] p-5">
            <p className="font-mono-tight text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-blue)]">
              Payment
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-[132px] w-[132px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
                {upiUrl ? (
                  <Image
                    src="/httpier_scan_pay_qr.png"
                    alt={`Scan to pay ${formatInr(totals.balance)} to HTTPier`}
                    width={132}
                    height={132}
                    unoptimized
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-[var(--color-line)] px-2 text-center text-[10px] leading-4 text-[var(--color-ink-soft)]">
                    {totals.balance <= 0 ? "Paid in full" : "Add UPI ID in server settings"}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-[var(--color-ink-soft)]">Amount to pay</p>
                <p className="mt-1 text-xl font-semibold tracking-[-0.04em]">{formatInr(totals.balance)}</p>
                {invoice.payment.upiId && (
                  <p className="mt-2 break-all text-[11px] text-[var(--color-ink-soft)]">
                    UPI: {invoice.payment.upiId}
                  </p>
                )}
                {invoice.payment.mobile && (
                  <p className="mt-1 text-[11px] text-[var(--color-ink-soft)]">
                    Mobile: {invoice.payment.mobile}
                  </p>
                )}
              </div>
            </div>
          </div>

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 text-[var(--color-ink-soft)]">
              <dt>Subtotal</dt>
              <dd>{formatInr(totals.subtotal)}</dd>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between gap-4 text-[var(--color-ink-soft)]">
                <dt>Discount</dt>
                <dd>- {formatInr(totals.discount)}</dd>
              </div>
            )}
            {invoice.taxRate > 0 && (
              <div className="flex justify-between gap-4 text-[var(--color-ink-soft)]">
                <dt>GST / tax ({invoice.taxRate}%)</dt>
                <dd>{formatInr(totals.taxAmount)}</dd>
              </div>
            )}
            <div className="flex justify-between gap-4 border-t border-[var(--color-line)] pt-3 font-semibold">
              <dt>Total</dt>
              <dd>{formatInr(totals.total)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-[var(--color-ink-soft)]">
              <dt>Paid</dt>
              <dd>{formatInr(totals.paid)}</dd>
            </div>
            <div className="flex justify-between gap-4 rounded-xl bg-[var(--color-ink)] px-4 py-3 text-white">
              <dt className="font-medium">Balance</dt>
              <dd className="font-semibold">{formatInr(totals.balance)}</dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className="border-t border-[var(--color-line)] px-5 py-5 text-center sm:px-8">
        <p className="font-medium">Thank you for choosing HTTPier.</p>
        <p className="mt-1 text-[11px] leading-5 text-[var(--color-ink-soft)]">
          Please include the invoice number in your payment reference.
        </p>
      </footer>
    </article>
  );
}
