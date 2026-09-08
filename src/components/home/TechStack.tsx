"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { techStack } from "@/lib/data";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";

const techItem: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function TechStack() {
  const shouldReduceMotion = Boolean(useReducedMotion());

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

          <RevealGroup
            stagger={0.06}
            className="relative grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3"
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 z-10 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(6,182,212,0.08),transparent)] blur-xl"
              initial={{ x: "-150%" }}
              animate={shouldReduceMotion ? { x: "150%" } : { x: ["-150%", "450%"] }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            />
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                variants={techItem}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="group relative flex min-h-32 flex-col justify-between gap-6 overflow-hidden bg-[var(--color-navy)] p-5 transition-colors duration-300 hover:bg-[#101b30]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-blue),var(--color-cyan),var(--color-violet))] transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono-tight text-[15px] font-medium tracking-tight">
                    {tech.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-1 h-2 w-2 shrink-0 scale-75 rounded-full bg-[var(--color-cyan)] opacity-40 shadow-[0_0_0_0_rgba(6,182,212,0)] transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-[0_0_18px_4px_rgba(6,182,212,0.35)]"
                  />
                </div>
                <span className="text-[11.5px] text-white/45">{tech.role}</span>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
