import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
        404
      </span>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mt-4 max-w-sm text-[15px] text-[var(--color-ink-soft)]">
        The page you&rsquo;re looking for may have moved or never existed.
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/">Back Home</Button>
        <Link
          href="/work"
          className="inline-flex items-center px-6 py-3.5 text-[15px] font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-blue)]"
        >
          View Work
        </Link>
      </div>
    </section>
  );
}
