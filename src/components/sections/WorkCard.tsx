"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/lib/data";
import { revealItem } from "@/components/ui/Reveal";

function Mockup({ project }: { project: Project }) {
  return (
    <div className="relative h-full w-full bg-[var(--color-mist)]">
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        quality={90}
        sizes="(min-width: 1024px) 80vw, 100vw"
        className="object-cover object-top"
      />
    </div>
  );
}

export function WorkCard({ project }: { project: Project }) {
  return (
    <motion.div variants={revealItem}>
      <Link
        href={`/work/${project.slug}`}
        data-cursor="OPEN"
        className="group block overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition-shadow duration-300 hover:shadow-[var(--shadow-elevated)]"
      >
        <div className="aspect-[16/10] overflow-hidden bg-[var(--color-mist)]">
          <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.025]">
            <Mockup project={project} />
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 p-6">
          <div>
            <div className="flex items-center gap-2 text-[12px] text-[var(--color-ink-soft)]/70">
              <span className="font-mono-tight">{project.industry}</span>
              <span>&middot;</span>
              <span>{project.year}</span>
            </div>
            <h3 className="mt-1.5 text-xl font-medium tracking-tight text-[var(--color-ink)]">
              {project.name}
            </h3>
            <p className="mt-1 text-[14px] text-[var(--color-ink-soft)]">{project.result}</p>
          </div>
          <span className="mt-1 shrink-0 rounded-full border border-[var(--color-line)] p-2.5 text-[var(--color-ink-soft)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-[var(--color-blue)]/40 group-hover:text-[var(--color-blue)]">
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path
                d="M4 11L11 4M11 4H5M11 4V10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export { Mockup };
