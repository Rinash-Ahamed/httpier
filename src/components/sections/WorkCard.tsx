"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/lib/data";
import { revealItem } from "@/components/ui/Reveal";

function Mockup({ project }: { project: Project }) {
  const gradient = `bg-gradient-to-br ${project.accent}`;

  if (project.layout === "mobile") {
    return (
      <div className="flex h-full items-center justify-center bg-[var(--color-mist)] py-8">
        <div className="h-full w-[52%] rounded-[1.4rem] border-[5px] border-[var(--color-ink)] bg-white shadow-lg">
          <div className={`h-1/3 rounded-t-[1rem] ${gradient} opacity-90`} />
          <div className="space-y-2 p-3">
            <div className="h-1.5 w-3/4 rounded-full bg-[var(--color-line)]" />
            <div className="h-1.5 w-1/2 rounded-full bg-[var(--color-line)]" />
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              <div className="aspect-square rounded-md bg-[var(--color-mist)]" />
              <div className="aspect-square rounded-md bg-[var(--color-mist)]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.layout === "dashboard") {
    return (
      <div className="flex h-full flex-col justify-center gap-2 bg-[var(--color-mist)] p-6">
        <div className="flex gap-2">
          <div className="h-16 w-16 shrink-0 rounded-lg bg-white shadow-sm" />
          <div className="flex-1 space-y-2 rounded-lg bg-white p-3 shadow-sm">
            <div className={`h-1.5 w-1/3 rounded-full ${gradient}`} />
            <div className="flex items-end gap-1 pt-1">
              {[40, 65, 30, 80, 55, 90].map((h, i) => (
                <div
                  key={i}
                  className={`w-2.5 rounded-sm ${gradient} opacity-70`}
                  style={{ height: `${h * 0.3}px` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-3 shadow-sm">
          <div className="h-1.5 w-1/4 rounded-full bg-[var(--color-line)]" />
          <div className="mt-2 h-1.5 w-full rounded-full bg-[var(--color-line)]" />
          <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-[var(--color-line)]" />
        </div>
      </div>
    );
  }

  if (project.layout === "split") {
    return (
      <div className="grid h-full grid-cols-2 gap-2 bg-[var(--color-mist)] p-4">
        <div className="rounded-lg bg-white p-3 shadow-sm">
          <div className={`aspect-square rounded-md ${gradient} opacity-80`} />
          <div className="mt-2 h-1.5 w-3/4 rounded-full bg-[var(--color-line)]" />
        </div>
        <div className="rounded-lg bg-white p-3 shadow-sm">
          <div className={`aspect-square rounded-md ${gradient} opacity-60`} />
          <div className="mt-2 h-1.5 w-3/4 rounded-full bg-[var(--color-line)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-[var(--color-mist)] p-4">
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-[var(--color-line)] bg-white shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-[var(--color-line)] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <div className={`flex-1 ${gradient} opacity-90`} />
      </div>
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
        <div className="aspect-[16/10] overflow-hidden">
          <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
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
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
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
