"use client";

import { motion } from "motion/react";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { whyPrinciples } from "@/lib/data";

export function PrinciplesGrid() {
  return (
    <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {whyPrinciples.map((item) => (
        <motion.div
          key={item.label}
          variants={revealItem}
          className="rounded-2xl border border-[var(--color-line)] p-7"
        >
          <h3 className="text-lg font-medium tracking-tight text-[var(--color-ink)]">
            {item.label}
          </h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-soft)]">
            {item.detail}
          </p>
        </motion.div>
      ))}
    </RevealGroup>
  );
}
