"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/lib/data";
import { revealItem } from "@/components/ui/Reveal";
import { Mockup } from "@/components/sections/ProjectMockup";

export function WorkCard({ project }: { project: Project }) {
  return (
    <motion.div variants={revealItem}>
      <Link
        href={`/work/${project.slug}`}
        className="group block overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition-shadow duration-300 hover:shadow-[var(--shadow-elevated)]"
      >
        <div className="aspect-[16/10] overflow-hidden bg-[var(--color-mist)]">
          <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.025]">
            <Mockup
              project={project}
              sizes="(min-width: 1344px) 628px, (min-width: 640px) calc(50vw - 44px), calc(100vw - 40px)"
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 p-3 sm:gap-4 sm:p-6">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
            <div className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-[var(--color-line)] bg-white p-1.5 shadow-sm sm:size-14 sm:p-2">
              <Image
                src={project.logo}
                alt={project.logoAlt}
                fill
                sizes="56px"
                className="object-contain p-1.5"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-[14px] font-medium leading-snug tracking-tight text-[var(--color-ink)] sm:text-xl">
                {project.name}
              </h3>
              <p className="mt-1 font-mono-tight text-[9.5px] leading-snug text-[var(--color-ink-soft)]/70 sm:mt-1.5 sm:text-[12px]">
                {project.industry}
              </p>
            </div>
          </div>
          <span className="mt-1 hidden shrink-0 rounded-full border border-[var(--color-line)] p-2.5 text-[var(--color-ink-soft)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-[var(--color-blue)]/40 group-hover:text-[var(--color-blue)] sm:block">
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

