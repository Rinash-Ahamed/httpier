import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Invoices",
  robots: { index: false, follow: false },
};

export default async function InvoicesPage() {
  await requireAdmin();

  return (
    <main>
      <section className="relative overflow-hidden rounded-[32px] bg-[var(--color-ink)] px-6 py-10 text-white sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="font-mono-tight text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Invoice studio
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
            Clear invoices.
            <br />
            Faster payments.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Build a polished HTTPier invoice, review every detail, then share one encrypted payment link with your client.
          </p>
          <Link
            href="/admin/invoices/new"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-cyan-100"
          >
            Create an invoice
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["01", "Build", "Enter client, project and service details in one focused workspace."],
          ["02", "Review", "See totals, balance and payment QR update instantly before sharing."],
          ["03", "Share", "Create an encrypted client link without exposing the admin area."],
        ].map(([index, title, description]) => (
          <article key={title} className="rounded-2xl border border-white bg-white p-6 shadow-[var(--shadow-soft)]">
            <span className="font-mono-tight text-[11px] font-semibold text-[var(--color-blue)]">{index}</span>
            <h2 className="mt-5 text-xl font-semibold tracking-[-0.035em]">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-ink-soft)]">{description}</p>
          </article>
        ))}
      </section>

      <aside className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/80 px-5 py-4 text-sm leading-6 text-blue-950">
        This version intentionally stores no invoice database. Each generated client link securely contains that invoice snapshot, so save the link after sharing it.
      </aside>
    </main>
  );
}
