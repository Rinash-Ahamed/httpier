"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this would report to an error-tracking service.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
        Something went wrong
      </span>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
        That didn&rsquo;t load right.
      </h1>
      <p className="mt-4 max-w-sm text-[15px] text-[var(--color-ink-soft)]">
        Something unexpected happened on our end. Try again, or head back
        home.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center rounded-full bg-[linear-gradient(100deg,var(--color-blue)_0%,var(--color-cyan)_100%)] px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.55)]"
        >
          Try again
        </button>
        <Button href="/" variant="secondary">
          Back Home
        </Button>
      </div>
    </section>
  );
}
