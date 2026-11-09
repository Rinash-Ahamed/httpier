"use client";

import { createDefaultSupport, supportExpiryDate, type InvoiceSupport } from "@/lib/invoice-support";
import { formatInvoiceDate } from "@/lib/invoice-types";

const field = "mt-2 h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
const toggles = [
  ["bugFixes", "Free bug fixes"], ["minorChanges", "Complimentary minor changes"],
  ["handover", "Deployment & handover assistance"], ["guidance", "Post-delivery technical guidance"],
] as const;

export function InvoiceSupportFields({ support, onChange }: { support?: InvoiceSupport; onChange: (value: InvoiceSupport) => void }) {
  const value = support ?? createDefaultSupport();
  const update = (patch: Partial<InvoiceSupport>) => onChange({ ...value, ...patch });
  const expiry = supportExpiryDate(value.deliveryDate, value.durationDays);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-[var(--color-ink-soft)]">Project delivery date<input type="date" value={value.deliveryDate} onChange={(e) => update({ deliveryDate: e.target.value })} className={field} /></label>
        <label className="text-xs font-semibold text-[var(--color-ink-soft)]">Support duration (days)<input type="number" min={1} max={3650} step={1} value={value.durationDays} onChange={(e) => update({ durationDays: Number(e.target.value) })} className={field} /></label>
        <label className="text-xs font-semibold text-[var(--color-ink-soft)]">Free minor change requests<input type="number" min={0} max={100} step={1} value={value.changeRequests} onChange={(e) => update({ changeRequests: Number(e.target.value) })} className={field} /></label>
        <div className="rounded-xl bg-blue-50 p-3 text-xs leading-5 text-blue-950"><p className="font-semibold">Support expiry</p><p>{expiry ? formatInvoiceDate(expiry) : "Enter the delivery date and a valid duration."}</p></div>
      </div>
      <fieldset className="grid gap-3 sm:grid-cols-2"><legend className="mb-3 text-xs font-semibold">Included benefits</legend>{toggles.map(([key, label]) => <label key={key} className="flex items-start gap-2 text-xs leading-5"><input type="checkbox" checked={value[key]} onChange={(e) => update({ [key]: e.target.checked })} className="mt-0.5 size-4 shrink-0 accent-blue-600" />{label}</label>)}</fieldset>
      <label className="block text-xs font-semibold text-[var(--color-ink-soft)]">Client-specific support terms<textarea maxLength={2000} rows={3} value={value.customTerms} onChange={(e) => update({ customTerms: e.target.value })} className={`${field} h-auto py-3 font-normal leading-5`} placeholder="Optional additional terms for this client" /></label>
      <p className="text-xs leading-5 text-[var(--color-ink-soft)]">These terms apply only to this invoice. Turn off all benefits and clear custom terms to omit the section. Bug fixes never consume minor change requests.</p>
    </div>
  );
}
