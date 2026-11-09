import type { InvoiceSupport } from "@/lib/invoice-support";
import { supportBenefits, supportDisclaimer, supportExpiryDate } from "@/lib/invoice-support";
import { formatInvoiceDate } from "@/lib/invoice-types";

export function InvoiceSupportSection({ support }: { support?: InvoiceSupport }) {
  if (!support) return null;
  const benefits = supportBenefits(support);
  if (!benefits.length && !support.customTerms.trim()) return null;
  const expiry = supportExpiryDate(support.deliveryDate, support.durationDays);
  return (
    <section className="invoice-support border-t border-[var(--color-line)] px-5 py-5 sm:px-8" aria-label="Post-Delivery Support & Benefits">
      <div className="invoice-support-heading">
        <h2 className="font-mono-tight text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-blue)]">Post-Delivery Support &amp; Benefits</h2>
        {expiry && <p className="mt-1.5 text-[11px] leading-4 text-[var(--color-ink-soft)]">
          Delivered {formatInvoiceDate(support.deliveryDate)} · Support until {formatInvoiceDate(expiry)}
        </p>}
      </div>
      <ul className="mt-3 grid gap-x-5 gap-y-3 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <li key={benefit.key} className="invoice-support-benefit flex items-start gap-2">
            <svg className="mt-0.5 size-3.5 shrink-0 text-[var(--color-blue)]" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div className="min-w-0"><h3 className="text-[11px] font-semibold leading-4">{benefit.title}</h3><p className="mt-1 text-[10px] leading-4 text-[var(--color-ink-soft)]">{benefit.text}</p></div>
          </li>
        ))}
      </ul>
      {support.customTerms.trim() && <div className="mt-3 text-[10px] leading-4"><h3 className="font-semibold">Client-specific support terms</h3><p className="mt-1 whitespace-pre-line [overflow-wrap:anywhere] text-[var(--color-ink-soft)]">{support.customTerms}</p></div>}
      <p className="invoice-support-disclaimer mt-3 border-t border-[var(--color-line)] pt-2 text-[9px] leading-4 text-[var(--color-ink-soft)]">{supportDisclaimer}</p>
    </section>
  );
}
