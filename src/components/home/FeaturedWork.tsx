"use client";

import Link from "next/link";
import { projects } from "@/lib/data";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/sections/WorkCard";

export function FeaturedWork() {
  return (
    <section className="border-t border-[var(--color-line)] py-24 sm:py-32">
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
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--color-blue)] hover:underline underline-offset-4"
            >
              View all work →
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </RevealGroup>

        <p className="mt-8 text-center text-[13px] text-[var(--color-ink-soft)]/60">
          Explore each case study or visit the live website.
        </p>
      </div>
    </section>
  );
}
