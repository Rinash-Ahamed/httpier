"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

const stages = [
  {
    label: "Idea",
    code: `// intent
const goal =
  "book a stay in
   under 3 taps"`,
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
  },
  {
    label: "Experience",
    code: `// shipped
// LCP 1.1s · CLS 0
// +38% direct bookings`,
  },
] as const;

const enterContainer: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.12,
      duration: 0.55,
      staggerChildren: 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const enterItem: Variants = {
  hidden: { opacity: 0, y: 12, scaleX: 0.75 },
  visible: {
    opacity: 1,
    y: 0,
    scaleX: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function IdeaVisual({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      variants={enterContainer}
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-[#0e192b] p-4 shadow-2xl"
    >
      <div className="mb-5 flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      </div>
      <div className="grid grid-cols-[0.55fr_1fr] gap-3">
        <motion.div variants={enterItem} className="h-24 origin-left rounded-lg border border-dashed border-white/15" />
        <div className="space-y-3 pt-1">
          <motion.div variants={enterItem} className="h-2 w-4/5 origin-left rounded-full bg-white/12" />
          <motion.div variants={enterItem} className="h-2 w-3/5 origin-left rounded-full bg-white/8" />
          <motion.div variants={enterItem} className="mt-5 h-7 w-24 origin-left rounded-full border border-dashed border-[var(--color-cyan)]/40" />
        </div>
      </div>
      <motion.span
        aria-hidden="true"
        className="absolute h-3 w-3 rounded-full border-2 border-white bg-[var(--color-blue)] shadow-[0_0_18px_rgba(59,130,246,0.9)]"
        animate={reduced ? { x: 20, y: 35 } : { x: [20, 205, 176, 205, 20], y: [35, 35, 104, 73, 35] }}
        transition={reduced ? { duration: 0 } : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function CodeVisual({ reduced }: { reduced: boolean }) {
  return (
    <motion.div variants={enterContainer} className="relative mx-auto w-full max-w-sm">
      <motion.div
        aria-hidden="true"
        className="absolute inset-8 rounded-full bg-[var(--color-blue)]/25 blur-3xl"
        animate={reduced ? undefined : { scale: [0.85, 1.15, 0.85], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#101d32] p-4 shadow-2xl">
        <div className="flex gap-2">
          {[0, 1, 2].map((item) => (
            <motion.div
              key={item}
              variants={enterItem}
              className="h-1.5 flex-1 origin-left overflow-hidden rounded-full bg-white/10"
            >
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-blue),var(--color-cyan))]"
                animate={reduced ? { scaleX: 1 } : { scaleX: [0.15, 1, 0.15] }}
                style={{ transformOrigin: "left" }}
                transition={{ duration: 3.2, delay: item * 0.35, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>
        <motion.div variants={enterItem} className="mt-4 grid origin-center grid-cols-[0.7fr_1fr] gap-3 rounded-lg bg-white p-3">
          <div className="rounded-md bg-[linear-gradient(145deg,#dbeafe,#ede9fe)]" />
          <div className="space-y-2 py-2">
            <div className="h-2 w-4/5 rounded-full bg-[var(--color-ink)]/15" />
            <div className="h-2 w-3/5 rounded-full bg-[var(--color-ink)]/10" />
            <motion.div
              className="mt-3 h-6 w-20 rounded-full bg-[linear-gradient(90deg,var(--color-blue),var(--color-cyan))]"
              animate={reduced ? undefined : { boxShadow: ["0 0 0 rgba(6,182,212,0)", "0 0 22px rgba(6,182,212,0.5)", "0 0 0 rgba(6,182,212,0)"] }}
              transition={{ duration: 2.6, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ExperienceVisual({ reduced }: { reduced: boolean }) {
  return (
    <motion.div variants={enterContainer} className="relative mx-auto w-full max-w-sm">
      <motion.div
        aria-hidden="true"
        className="absolute -inset-3 rounded-3xl bg-[linear-gradient(120deg,var(--color-blue),var(--color-cyan),var(--color-violet))] opacity-25 blur-2xl"
        animate={reduced ? undefined : { rotate: [0, 4, 0], scale: [0.96, 1.05, 0.96] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        variants={enterItem}
        animate={reduced ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-hidden rounded-xl border border-white/15 bg-white p-3 shadow-2xl"
      >
        <div className="relative h-20 overflow-hidden rounded-lg bg-[linear-gradient(120deg,#172554,#2563eb_48%,#8b5cf6)] p-3">
          <motion.div
            aria-hidden="true"
            className="absolute -right-5 -top-8 h-24 w-24 rounded-full border border-white/25"
            animate={reduced ? undefined : { scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative h-2 w-1/2 rounded-full bg-white/75" />
          <div className="relative mt-2 h-1.5 w-1/3 rounded-full bg-white/35" />
          <div className="relative mt-4 h-5 w-16 rounded-full bg-white" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((item) => (
            <motion.div
              key={item}
              variants={enterItem}
              className="aspect-[1.3] rounded-md bg-[linear-gradient(145deg,var(--color-mist),var(--color-mist-2))]"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function StageVisual({ stage, reduced }: { stage: (typeof stages)[number]["label"]; reduced: boolean }) {
  if (stage === "Idea") return <IdeaVisual reduced={reduced} />;
  if (stage === "Code") return <CodeVisual reduced={reduced} />;
  return <ExperienceVisual reduced={reduced} />;
}

export function DevExperience() {
  const shouldReduceMotion = Boolean(useReducedMotion());

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
          {stages.map((stage, index) => (
            <Reveal key={stage.label} delay={index * 0.05}>
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -3, borderColor: "rgba(255,255,255,0.2)" }}
                transition={{ duration: 0.25 }}
                className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:grid-cols-2"
              >
                <div className="flex min-w-0 flex-col justify-center gap-3 p-6 md:p-8">
                  <span className="font-mono-tight text-[12px] uppercase tracking-wider text-[var(--color-cyan)]">
                    {stage.label}
                  </span>
                  <pre className="max-w-full overflow-x-auto pb-1 font-mono-tight text-[12.5px] leading-[1.7] text-white/80">
                    {stage.code}
                  </pre>
                </div>
                <div className="flex min-h-56 items-center overflow-hidden border-t border-white/10 bg-white/[0.02] p-6 md:border-l md:border-t-0">
                  <StageVisual stage={stage.label} reduced={shouldReduceMotion} />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
