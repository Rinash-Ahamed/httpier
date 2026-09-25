import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getAdminSession } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await getAdminSession();
  if (session.isAuthenticated) redirect("/admin/invoices");

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[var(--color-mist)] px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="pointer-events-none absolute left-[8%] top-28 h-64 w-64 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-48 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl" />
      <section className="relative mx-auto max-w-md rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-[var(--shadow-elevated)] backdrop-blur-xl sm:p-9">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-ink)]">
          <Image src="/brand/httpier-mark.png" alt="" width={34} height={23} className="h-6 w-auto brightness-0 invert" />
        </div>
        <p className="mt-8 font-mono-tight text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-blue)]">
          HTTPier admin
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Welcome back.</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-ink-soft)]">
          Sign in to prepare and share secure client invoices.
        </p>
        <LoginForm />
        <p className="mt-6 text-center text-[11px] leading-5 text-[var(--color-ink-soft)]">
          Protected by a signed, HTTP-only session.
        </p>
      </section>
    </div>
  );
}
