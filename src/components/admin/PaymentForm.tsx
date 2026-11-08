"use client";

import { useActionState, useEffect, useRef } from "react";
import { recordPaymentAction } from "@/app/admin/clients/actions";
import { paymentMethods, type ClientActionState } from "@/lib/client-records";

const initial: ClientActionState = {};
const field = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export function PaymentForm({ clientId, paymentId, balancePaise, today }: { clientId: string; paymentId: string; balancePaise: number; today: string }) {
  const [state, action, pending] = useActionState(recordPaymentAction, initial);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state.success) ref.current?.reset(); }, [state]);
  return (
    <form ref={ref} action={action}>
      <input type="hidden" name="clientId" value={clientId} />
      <input type="hidden" name="paymentId" value={paymentId} />
      <fieldset disabled={pending || balancePaise <= 0} className="grid min-w-0 gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">Amount received (INR)<input name="amount" type="number" inputMode="decimal" min="0.01" max={balancePaise / 100} step="0.01" required className={field} /></label>
        <label className="text-sm font-medium">Payment date<input name="date" type="date" required defaultValue={today} className={field} /></label>
        <label className="text-sm font-medium">Method<select name="method" className={field}>{paymentMethods.map((method) => <option key={method}>{method}</option>)}</select></label>
        <label className="text-sm font-medium">Transaction reference<input name="reference" maxLength={200} className={field} /></label>
        <label className="text-sm font-medium sm:col-span-2">Payment notes<textarea name="notes" rows={2} maxLength={1500} className={field} /></label>
        <p className="text-xs leading-5 text-slate-500 sm:col-span-2">Record payments you have already received. This does not charge the client or verify a bank transfer.</p>
        <button disabled={pending || balancePaise <= 0} className="min-h-12 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50 sm:col-span-2">{pending ? "Recording..." : "Record payment"}</button>
      </fieldset>
      {state.error && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
      {state.success && <p role="status" className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{state.success}</p>}
    </form>
  );
}
