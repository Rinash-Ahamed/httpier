import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { listClients } from "@/lib/clients";
import { ClientList } from "@/components/admin/ClientList";

export const metadata: Metadata = { title: "Clients", robots: { index: false, follow: false } };

export default async function ClientsPage() {
  await requireAdmin();
  let clients;
  try { clients = await listClients(); } catch {
    return <main className="rounded-2xl bg-white p-8"><h1 className="text-2xl font-semibold">Connect your client workspace</h1><p className="mt-3 text-sm leading-6 text-slate-600">Firestore is not available yet. Check the Firebase server credentials, create the default Firestore database, and grant the service account access.</p><Link href="/admin/invoices" className="mt-5 inline-block text-sm text-blue-700">Go to invoices</Link></main>;
  }
  return <main><div className="flex flex-wrap items-end justify-between gap-4 rounded-3xl bg-slate-950 p-6 text-white sm:p-9"><div><p className="font-mono-tight text-xs uppercase tracking-widest text-cyan-300">HTTPier workspace</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Clients, projects and payments.</h1><p className="mt-3 text-sm text-slate-300">A clear view of who you work with and what is due.</p></div><Link href="/admin/clients/new" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700">Add client</Link></div><ClientList clients={clients} /></main>;
}
