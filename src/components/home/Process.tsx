"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";
import { processSteps } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessArtwork, type ProcessTitle } from "@/components/home/ProcessArtwork";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    mass: 0.45,
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextStep = Math.min(
      processSteps.length - 1,
      Math.max(0, Math.round(progress * (processSteps.length - 1))),
    );
    setActiveStep((current) => (current === nextStep ? current : nextStep));
  });

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

        <div ref={ref} className="relative mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="relative">
            <div className="absolute bottom-[10%] left-[15px] top-[10%] w-px bg-[var(--color-line)]" />
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute bottom-[10%] left-[15px] top-[10%] w-px origin-top bg-[linear-gradient(180deg,var(--color-blue),var(--color-cyan),var(--color-violet))]"
            />

            <ol>
              {processSteps.map((step, index) => {
                const isActive = index === activeStep;

                return (
                  <li
                    key={step.index}
                    className="relative flex min-h-[34vh] items-center pl-12 py-8 lg:min-h-[42vh]"
                  >
                    <motion.span
                      animate={{
                        backgroundColor: isActive ? "#2563eb" : "#ffffff",
                        borderColor: isActive ? "#2563eb" : "#e4eaf3",
                        color: isActive ? "#ffffff" : "#2563eb",
                        scale: isActive && !shouldReduceMotion ? 1.12 : 1,
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border bg-white font-mono-tight text-[11px] shadow-[0_0_0_5px_white]"
                    >
                      {step.index}
                    </motion.span>

                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.48,
                        x: isActive && !shouldReduceMotion ? 5 : 0,
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full"
                    >
                      <h3 className="text-2xl font-medium tracking-tight text-[var(--color-ink)]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                        {step.description}
                      </p>

                      <div className="mt-7 lg:hidden">
                        <ProcessArtwork
                          step={step.title as ProcessTitle}
                          animate={isActive}
                          idPrefix={`mobile-${step.index}`}
                        />
                      </div>
                    </motion.div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-28 h-[min(62vh,34rem)]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-[linear-gradient(145deg,rgba(37,99,235,0.08),rgba(6,182,212,0.05)_45%,rgba(139,92,246,0.09))] blur-2xl" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={processSteps[activeStep].title}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.965, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.98, filter: "blur(8px)" }}
                  transition={{ duration: shouldReduceMotion ? 0.12 : 0.58, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <ProcessArtwork
                    step={processSteps[activeStep].title as ProcessTitle}
                    idPrefix={`desktop-${processSteps[activeStep].index}`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
