"use client";

import { useActionState } from "react";
import { saveClientAction } from "@/app/admin/clients/actions";
import { clientStatuses, type ClientRecord, type ClientActionState } from "@/lib/client-records";

const field = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
const initial: ClientActionState = {};

export function ClientForm({ client }: { client?: ClientRecord }) {
  const [state, action, pending] = useActionState(saveClientAction, initial);
  return (
    <form action={action}>
      <input type="hidden" name="id" value={client?.id || ""} />
      <fieldset disabled={pending} className="grid min-w-0 gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">Client name *<input name="name" required maxLength={120} defaultValue={client?.name} autoComplete="name" className={field} /></label>
        <label className="text-sm font-medium">Company<input name="company" maxLength={160} defaultValue={client?.company} autoComplete="organization" className={field} /></label>
        <label className="text-sm font-medium">Email<input name="email" type="email" maxLength={254} defaultValue={client?.email} autoComplete="email" className={field} /></label>
        <label className="text-sm font-medium">Phone<input name="phone" type="tel" maxLength={40} defaultValue={client?.phone} autoComplete="tel" className={field} /></label>
        <label className="text-sm font-medium sm:col-span-2">Billing address<textarea name="billingAddress" rows={2} maxLength={1200} defaultValue={client?.billingAddress} autoComplete="street-address" className={field} /></label>
        <label className="text-sm font-medium">Project name<input name="projectName" maxLength={200} defaultValue={client?.projectName} className={field} /></label>
        <label className="text-sm font-medium">Project status<select name="status" defaultValue={client?.status || "Lead"} className={field}>{clientStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
        <label className="text-sm font-medium">Agreed fee (INR) *<input name="agreedAmount" type="number" inputMode="decimal" min={client ? client.paidPaise / 100 : 0} max={999999999.99} step="0.01" required defaultValue={client ? client.agreedPaise / 100 : 0} className={field} /><span className="mt-1 block text-xs font-normal text-slate-500">Enter the final agreed total, including any applicable tax.</span></label>
        <label className="text-sm font-medium">Commission amount (INR)<input name="commissionAmount" type="number" inputMode="decimal" min={0} max={999999999.99} step="0.01" defaultValue={(client?.commissionPaise ?? 0) / 100} className={field} /><span className="mt-1 block text-xs font-normal text-slate-500">For internal tracking only. Does not change the agreed fee or client balance.</span></label>
        <label className="text-sm font-medium">Payment due date<input name="dueDate" type="date" defaultValue={client?.dueDate} className={field} /></label>
        <label className="text-sm font-medium sm:col-span-2">Internal notes<textarea name="notes" rows={3} maxLength={4000} defaultValue={client?.notes} className={field} /></label>
        {state.error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{state.error}</p>}
        <button disabled={pending} className="min-h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white disabled:opacity-50 sm:col-span-2">{pending ? "Saving..." : client ? "Save changes" : "Add client"}</button>
      </fieldset>
    </form>
  );
}
