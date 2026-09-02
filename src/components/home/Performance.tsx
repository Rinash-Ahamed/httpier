"use client";

import { motion } from "motion/react";
import { performanceStats } from "@/lib/data";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export function Performance() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-line)] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-blue),transparent)]" />
      <div className="container-httpier">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-8">
          <div>
            <Reveal>
              <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
                Performance
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl">
                Fast isn&rsquo;t a feature.
                <br />
                It&rsquo;s the foundation.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--color-ink-soft)]">
                Every build is measured against real Core Web Vitals - not
                just a Lighthouse tab left open once at launch.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="grid grid-cols-2 gap-4">
            {performanceStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={revealItem}
                className="relative overflow-hidden rounded-2xl border border-[var(--color-line)] p-6"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--color-mist)]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-[linear-gradient(90deg,var(--color-blue),var(--color-cyan))]"
                  />
                </div>
                <span className="text-gradient text-4xl font-semibold tracking-tight">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </span>
                <p className="mt-2 text-[13.5px] text-[var(--color-ink-soft)]">{stat.label}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
