import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <section className="py-20">
        <div className="container-httpier max-w-2xl space-y-6 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
          <p>
            This is placeholder legal copy. Replace with HTTPier&rsquo;s actual
            terms of service before launch.
          </p>
        </div>
      </section>
    </>
  );
}
