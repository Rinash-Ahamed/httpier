"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { whyPrinciples } from "@/lib/data";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export function WhyHttpier() {
  const [openCard, setOpenCard] = useState<string | null>(null);

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
              <motion.button
                type="button"
                key={item.label}
                variants={revealItem}
                aria-expanded={openCard === item.label}
                aria-controls={`why-${item.label.toLowerCase()}`}
                onClick={() => setOpenCard((current) => current === item.label ? null : item.label)}
                className="group rounded-2xl border border-[var(--color-line)] p-7 text-left transition-colors hover:border-[var(--color-blue)]/30 hover:bg-[var(--color-mist)]/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-medium tracking-tight text-[var(--color-ink)]">
                    {item.label}
                  </h3>
                  <span
                    aria-hidden="true"
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[17px] font-light text-[var(--color-blue)] transition-transform ${openCard === item.label ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </div>
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
                <AnimatePresence initial={false}>
                  {openCard === item.label && (
                    <motion.div
                      id={`why-${item.label.toLowerCase()}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-5 border-t border-[var(--color-line)] pt-5 text-[14px] leading-relaxed text-[var(--color-ink-soft)]">
                        {item.more}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
