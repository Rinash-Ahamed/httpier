import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { randomUUID } from "node:crypto";
import { requireAdmin } from "@/lib/admin-auth";
import { getClient, getPayments } from "@/lib/clients";
import { paymentStatus } from "@/lib/client-records";
import { formatInr, formatInvoiceDate } from "@/lib/invoice-types";
import { ClientForm } from "@/components/admin/ClientForm";
import { PaymentForm } from "@/components/admin/PaymentForm";

export const metadata: Metadata = { title: "Client details", robots: { index: false, follow: false } };
export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();
  const payments = await getPayments(id);
  const balance = client.agreedPaise - client.paidPaise;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return <main>
    <Link href="/admin/clients" className="text-sm text-blue-700">Back to clients</Link>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-4"><div className="min-w-0"><h1 className="break-words text-3xl font-semibold tracking-tight">{client.name}</h1><p className="mt-2 text-sm text-slate-500">{client.projectName || "Client workspace"}</p></div><span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">{paymentStatus(client)}</span></div>
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">{[["Agreed fee", client.agreedPaise], ["Received", client.paidPaise], ["Outstanding", balance]].map(([label, value]) => <div key={label} className="rounded-2xl bg-white p-5"><p className="text-xs text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold text-blue-700">{formatInr(Number(value) / 100)}</p></div>)}</div>
    <div className="mt-6 grid items-start gap-6 xl:grid-cols-2">
      <section className="min-w-0 rounded-3xl bg-white p-5 sm:p-7"><h2 className="mb-6 text-xl font-semibold">Client and project details</h2><ClientForm client={client} /></section>
      <div className="min-w-0 space-y-6"><section className="rounded-3xl bg-white p-5 sm:p-7"><h2 className="mb-5 text-xl font-semibold">Record a payment</h2>{balance > 0 ? <PaymentForm key={client.updatedAt} clientId={id} paymentId={randomUUID()} balancePaise={balance} today={today} /> : <p className="text-sm text-slate-500">{client.agreedPaise ? "All agreed fees have been paid." : "Set an agreed fee before recording payments."}</p>}</section>
      <section className="rounded-3xl bg-white p-5 sm:p-7"><h2 className="text-xl font-semibold">Payment history</h2><p className="mt-2 text-xs text-slate-500">Most recent 200 entries. Amounts are recorded manually.</p><div className="mt-5 divide-y divide-slate-100">{payments.map((payment) => <article key={payment.id} className="py-4"><div className="flex flex-wrap justify-between gap-2"><strong className="text-blue-700">{formatInr(payment.amountPaise / 100)}</strong><span className="text-xs text-slate-500">{formatInvoiceDate(payment.date)}</span></div><p className="mt-2 break-words text-sm text-slate-600">{payment.method}{payment.reference ? ` / ${payment.reference}` : ""}</p>{payment.notes && <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-500">{payment.notes}</p>}</article>)}{!payments.length && <p className="text-sm text-slate-500">No payments recorded yet.</p>}</div></section></div>
    </div>
  </main>;
}
