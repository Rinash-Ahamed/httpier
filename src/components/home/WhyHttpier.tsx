"use client";

import { motion } from "motion/react";
import { whyPrinciples } from "@/lib/data";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export function WhyHttpier() {
  return (
    <section className="border-t border-[var(--color-line)] py-24 sm:py-32">
      <div className="container-httpier">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
              Why HTTPier
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              Websites should do more than look good.
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyPrinciples.map((item) => {
            const leadingDigits = item.metric.match(/^\d+/)?.[0];
            const isNumeric = Boolean(leadingDigits);
            const numeric = leadingDigits ? Number.parseInt(leadingDigits, 10) : 0;
            const suffix = leadingDigits ? item.metric.slice(leadingDigits.length) : "";
            return (
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
                <div className="mt-6 flex items-baseline gap-2 border-t border-[var(--color-line)] pt-5">
                  <span className="text-gradient text-2xl font-semibold tracking-tight">
                    {isNumeric ? (
                      <AnimatedNumber value={numeric} suffix={suffix} />
                    ) : (
                      item.metric
                    )}
                  </span>
                  <span className="text-[12px] text-[var(--color-ink-soft)]/70">
                    {item.metricLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
