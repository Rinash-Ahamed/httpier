"use client";

import Link from "next/link";
import { WorkCarousel } from "@/components/home/WorkCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/lib/data";

export function FeaturedWork() {
  return (
    <section className="border-t border-[var(--color-line)] py-16 sm:py-24">
      <div className="container-httpier">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
                Selected work
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
                Work that speaks before we do.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--color-blue)] underline-offset-4 hover:underline"
            >
              View all work -&gt;
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 sm:mt-12">
            <WorkCarousel projects={projects} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
