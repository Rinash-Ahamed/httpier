"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { whyPrinciples } from "@/lib/data";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";

export function WhyHttpier() {
  const [openCard, setOpenCard] = useState<string | null>(null);

  return (
    <section className="border-t border-[var(--color-line)] py-16 sm:py-24">
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

        <RevealGroup className="mt-10 grid grid-cols-2 gap-2 sm:mt-12 sm:gap-4 lg:grid-cols-3">
          {whyPrinciples.map((item) => {
            return (
              <motion.button
                type="button"
                key={item.label}
                variants={revealItem}
                aria-expanded={openCard === item.label}
                aria-controls={`why-${item.label.toLowerCase()}`}
                onClick={() => setOpenCard((current) => current === item.label ? null : item.label)}
                className="group min-w-0 rounded-xl border border-[var(--color-line)] p-4 text-left transition-colors hover:border-[var(--color-blue)]/30 hover:bg-[var(--color-mist)]/60 sm:rounded-2xl sm:p-7"
              >
                <div className="flex items-start justify-between gap-2 sm:gap-4">
                  <h3 className="text-[15px] font-medium tracking-tight text-[var(--color-ink)] sm:text-lg">
                    {item.label}
                  </h3>
                  <span
                    aria-hidden="true"
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[15px] font-light text-[var(--color-blue)] transition-transform sm:h-7 sm:w-7 sm:text-[17px] ${openCard === item.label ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-ink-soft)] sm:text-[14.5px]">
                  {item.detail}
                </p>
                <div className="mt-4 flex flex-col gap-0.5 border-t border-[var(--color-line)] pt-3 sm:mt-6 sm:flex-row sm:items-baseline sm:gap-2 sm:pt-5">
                  <span className="text-gradient text-xl font-semibold tracking-tight sm:text-2xl">
                    {item.metric}
                  </span>
                  <span className="text-[10px] leading-tight text-[var(--color-ink-soft)]/70 sm:text-[12px]">
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
                      <p className="mt-3 border-t border-[var(--color-line)] pt-3 text-[11.5px] leading-relaxed text-[var(--color-ink-soft)] sm:mt-5 sm:pt-5 sm:text-[14px]">
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
