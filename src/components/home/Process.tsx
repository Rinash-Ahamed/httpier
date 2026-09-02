"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { processSteps } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 40%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="border-t border-[var(--color-line)] py-24 sm:py-32">
      <div className="container-httpier">
        <div className="max-w-xl">
          <Reveal>
            <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
              How we work
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              Simple process. Serious execution.
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-[var(--color-line)] sm:block" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-[linear-gradient(180deg,var(--color-blue),var(--color-cyan),var(--color-violet))] sm:block"
          />

          <ol className="space-y-10 sm:space-y-14">
            {processSteps.map((step, i) => (
              <Reveal key={step.index} delay={i * 0.04}>
                <li className="relative flex gap-6 pl-0 sm:pl-12">
                  <span className="absolute left-0 top-0.5 hidden h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] bg-white font-mono-tight text-[11px] text-[var(--color-blue)] sm:flex">
                    {step.index}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 sm:hidden">
                      <span className="font-mono-tight text-[12px] text-[var(--color-blue)]">
                        {step.index}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium tracking-tight text-[var(--color-ink)]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
