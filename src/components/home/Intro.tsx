"use client";

import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { motion } from "motion/react";

const values = [
  {
    title: "Designed Better",
    description: "Interfaces with purpose, clarity and personality.",
  },
  {
    title: "Built Faster",
    description: "Modern engineering focused on real-world performance.",
  },
  {
    title: "Made to Grow",
    description: "Scalable foundations designed around business growth.",
  },
];

export function Intro() {
  return (
    <section className="border-t border-[var(--color-line)] py-24 sm:py-32">
      <div className="container-httpier">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
              Who we are
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              Not another web agency.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink-soft)]">
              HTTPier combines design, engineering and performance to build
              digital experiences people actually enjoy using.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-3">
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={revealItem}
              className="group relative bg-white p-8 transition-colors duration-300 hover:bg-[var(--color-mist)]"
            >
              <div className="mb-6 h-px w-8 bg-[linear-gradient(90deg,var(--color-blue),var(--color-cyan))] transition-all duration-300 group-hover:w-14" />
              <h3 className="text-xl font-medium tracking-tight text-[var(--color-ink)]">
                {value.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                {value.description}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
