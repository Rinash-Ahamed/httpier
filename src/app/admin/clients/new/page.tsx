import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { ClientForm } from "@/components/admin/ClientForm";

export const metadata: Metadata = { title: "Add client", robots: { index: false, follow: false } };
export default async function NewClientPage() {
  await requireAdmin();
  return <main className="mx-auto max-w-3xl rounded-3xl bg-white p-5 shadow-sm sm:p-8"><Link href="/admin/clients" className="text-sm text-blue-700">Back to clients</Link><h1 className="mb-7 mt-4 text-3xl font-semibold tracking-tight">Add a client.</h1><ClientForm /></main>;
}
