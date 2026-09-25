import Link from "next/link";
import { logoutAction } from "@/app/login/actions";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  await requireAdmin();

  return (
    <div className="admin-shell min-h-screen bg-[var(--color-mist)] pb-20 pt-6 sm:pt-8">
      <div className="admin-shell-container container-httpier">
        <div className="admin-toolbar mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white bg-white/85 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur sm:px-5">
          <div className="flex items-center gap-1">
            <Link
              href="/admin/invoices"
              className="rounded-full px-3 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-mist)]"
            >
              Invoices
            </Link>
            <Link
              href="/admin/invoices/new"
              className="rounded-full px-3 py-2 text-sm text-[var(--color-ink-soft)] transition hover:bg-[var(--color-mist)] hover:text-[var(--color-ink)]"
            >
              New invoice
            </Link>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-[var(--color-line)] px-4 py-2 text-xs font-medium text-[var(--color-ink-soft)] transition hover:border-slate-300 hover:text-[var(--color-ink)]"
            >
              Sign out
            </button>
          </form>
        </div>
        {children}
      </div>
    </div>
  );
}
