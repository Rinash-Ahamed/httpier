"use client";

import Link from "next/link";
import { useState } from "react";
import { clientStatuses, paymentStatus, type ClientRecord } from "@/lib/client-records";
import { formatInr } from "@/lib/invoice-types";

export function ClientList({ clients }: { clients: ClientRecord[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const filtered = clients.filter((client) => (!status || client.status === status) && [client.name, client.company, client.email, client.phone, client.projectName].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  const agreed = clients.reduce((sum, client) => sum + client.agreedPaise, 0);
  const paid = clients.reduce((sum, client) => sum + client.paidPaise, 0);
  return <>
    <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">{[["Clients", clients.length], ["Agreed fees", formatInr(agreed / 100)], ["Received", formatInr(paid / 100)], ["Outstanding", formatInr((agreed - paid) / 100)]].map(([label, value]) => <div key={label} className="min-w-0 rounded-2xl border border-blue-100 bg-white p-4 sm:p-5"><p className="text-xs text-slate-500">{label}</p><p className="mt-2 break-words text-xl font-semibold tracking-tight text-blue-700 sm:text-2xl">{value}</p></div>)}</div>
    <div className="mt-6 flex flex-col gap-3 sm:flex-row"><label className="flex-1"><span className="sr-only">Search clients</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search client, company or project" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base" /></label><label><span className="sr-only">Filter by project status</span><select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base"><option value="">All project statuses</option>{clientStatuses.map((item) => <option key={item}>{item}</option>)}</select></label></div>
    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((client) => <Link key={client.id} href={`/admin/clients/${client.id}`} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-blue-300">
      <div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">{client.status}</span><span className="text-xs font-medium text-slate-600">{paymentStatus(client)}</span></div>
      <h2 className="mt-4 break-words text-xl font-semibold">{client.name}</h2><p className="mt-1 break-words text-sm text-slate-500">{client.company || "Individual client"}</p><p className="mt-3 break-words text-sm">{client.projectName || "Project not set"}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500"><div>Received<strong className="mt-1 block break-words text-sm text-slate-900">{formatInr(client.paidPaise / 100)}</strong></div><div>Balance<strong className="mt-1 block break-words text-sm text-blue-700">{formatInr((client.agreedPaise - client.paidPaise) / 100)}</strong></div></div>
    </Link>)}</div>
    {!filtered.length && <p className="mt-6 rounded-2xl bg-white p-8 text-center text-sm text-slate-500">{clients.length ? "No clients match this search." : "Add your first client to start tracking projects and payments."}</p>}
    <p className="mt-4 text-xs text-slate-500">Showing up to 200 most recently updated clients. Totals cover these records.</p>
  </>;
}
