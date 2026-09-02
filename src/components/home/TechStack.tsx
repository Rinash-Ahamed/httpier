"use client";

import { motion } from "motion/react";
import { techStack } from "@/lib/data";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";

export function TechStack() {
  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-navy)] py-24 text-white sm:py-32">
      <div className="container-httpier">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-cyan)]">
                Technology
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Modern technology.
                <br />
                Chosen with purpose.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
                We don&rsquo;t default to one stack. Every technology below is
                selected based on what a project actually requires -
                scale, budget, team and timeline.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                variants={revealItem}
                className="group flex flex-col justify-between gap-6 bg-[var(--color-navy)] p-5 transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <span className="font-mono-tight text-[15px] font-medium tracking-tight">
                  {tech.name}
                </span>
                <span className="text-[11.5px] text-white/45">{tech.role}</span>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
