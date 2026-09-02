"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

const stages = [
  {
    label: "Idea",
    code: `// intent
const goal =
  "book a stay in
   under 3 taps"`,
    ui: (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="h-2 w-2/3 rounded-full bg-[var(--color-ink)]/10" />
        <div className="h-2 w-1/2 rounded-full bg-[var(--color-ink)]/10" />
      </div>
    ),
  },
  {
    label: "Code",
    code: `function BookingFlow() {
  return (
    <Steps count={3}>
      <DatePicker />
      <RoomSelect />
      <Confirm cta="Book" />
    </Steps>
  )
}`,
    ui: (
      <div className="flex h-full flex-col justify-center gap-3 p-6">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-[var(--color-blue)]/25" />
          ))}
        </div>
        <div className="h-16 rounded-lg border border-[var(--color-line)] bg-white" />
        <div className="h-8 w-28 rounded-full bg-[linear-gradient(100deg,var(--color-blue),var(--color-cyan))]" />
      </div>
    ),
  },
  {
    label: "Experience",
    code: `// shipped
// LCP 1.1s · CLS 0
// +38% direct bookings`,
    ui: (
      <div className="flex h-full flex-col justify-center gap-3 p-6">
        <div className="flex items-center justify-between rounded-lg border border-[var(--color-line)] bg-white p-3">
          <div className="h-2 w-1/3 rounded-full bg-[var(--color-ink)]/10" />
          <div className="h-7 w-20 rounded-full bg-[linear-gradient(100deg,var(--color-blue),var(--color-violet))]" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-square rounded-lg bg-[var(--color-mist)]" />
          ))}
        </div>
      </div>
    ),
  },
];

export function DevExperience() {
  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-navy)] py-24 text-white sm:py-32">
      <div className="container-httpier">
        <div className="max-w-xl">
          <Reveal>
            <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-cyan)]">
              How it comes together
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Built from the first line of code.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 space-y-6">
          {stages.map((stage, i) => (
            <Reveal key={stage.label} delay={i * 0.05}>
              <motion.div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:grid-cols-2">
                <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
                  <span className="font-mono-tight text-[12px] uppercase tracking-wider text-[var(--color-cyan)]">
                    {stage.label}
                  </span>
                  <pre className="font-mono-tight text-[12.5px] leading-[1.7] text-white/80">
                    {stage.code}
                  </pre>
                </div>
                <div className="border-t border-white/10 bg-white/[0.02] md:border-l md:border-t-0">
                  {stage.ui}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
