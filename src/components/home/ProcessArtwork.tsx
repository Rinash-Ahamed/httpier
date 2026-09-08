"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export type ProcessTitle = "Discover" | "Design" | "Develop" | "Refine" | "Launch";

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="relative h-full min-h-72 overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-4 shadow-[0_28px_80px_-32px_rgba(37,99,235,0.35)] backdrop-blur sm:p-6">
      <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-4">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--color-blue)]/25" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-cyan)]/25" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-violet)]/25" />
        </div>
        <span className="font-mono-tight text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)]/55">
          {label}
        </span>
      </div>
      <div className="relative h-[calc(100%-2.5rem)]">{children}</div>
    </div>
  );
}

function Discover({ animated }: { animated: boolean }) {
  return (
    <Frame label="Discovery workspace">
      <div className="grid h-full grid-cols-[1.12fr_0.88fr] gap-3 py-5">
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: animated ? 0.6 : 0 }}
          className="rounded-xl border border-[var(--color-line)] bg-white p-3 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono-tight text-[9px] uppercase tracking-wider text-[var(--color-blue)]">
              Project brief
            </span>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[8px] text-emerald-700">
              Aligned
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["Goal", "More direct bookings"],
              ["Audience", "Independent travellers"],
              ["Measure", "Completed enquiries"],
            ].map(([label, value], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: animated ? 0.12 + index * 0.1 : 0, duration: 0.45 }}
                className="rounded-lg bg-[var(--color-mist)] p-2.5"
              >
                <span className="block text-[8px] uppercase tracking-wide text-[var(--color-ink-soft)]/55">{label}</span>
                <span className="mt-1 block text-[10px] font-medium text-[var(--color-ink)]">{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex min-w-0 flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: animated ? 0.18 : 0, duration: 0.55 }}
            className="relative flex-1 overflow-hidden rounded-xl bg-[linear-gradient(145deg,#172554,#2563eb_58%,#06b6d4)] p-3 text-white shadow-sm"
          >
            <motion.span
              aria-hidden="true"
              className="absolute -right-6 -top-8 h-20 w-20 rounded-full border border-white/25"
              animate={animated ? { scale: [1, 1.18, 1] } : undefined}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative self-end">
              <span className="font-mono-tight text-[8px] uppercase tracking-wider text-white/60">User insight</span>
              <p className="mt-2 text-[11px] font-medium leading-snug">&ldquo;Show me the right choice without making me search.&rdquo;</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animated ? 0.3 : 0, duration: 0.5 }}
            className="rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-3"
          >
            <span className="font-mono-tight text-[8px] uppercase tracking-wider text-[var(--color-ink-soft)]/55">Opportunity</span>
            <div className="mt-2 flex items-end justify-between gap-2">
              <span className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">3 taps</span>
              <motion.span
                className="mb-1 h-1.5 flex-1 origin-left rounded-full bg-[linear-gradient(90deg,var(--color-blue),var(--color-cyan))]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: animated ? 0.9 : 0, delay: animated ? 0.4 : 0 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Frame>
  );
}

function Design({ animated }: { animated: boolean }) {
  return (
    <Frame label="Interface system">
      <div className="grid h-full grid-cols-[0.7fr_1.3fr] gap-3 py-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-3"
        >
          <div className="h-5 w-5 rounded-md bg-[var(--color-blue)]/20" />
          {[72, 92, 58, 80].map((width) => (
            <div key={width} className="h-2 rounded-full bg-[var(--color-ink)]/10" style={{ width: `${width}%` }} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: animated ? 0.14 : 0, duration: 0.6 }}
          className="relative overflow-hidden rounded-xl border border-[var(--color-line)] bg-white p-3 shadow-sm"
        >
          <div className="h-20 rounded-lg bg-[linear-gradient(125deg,#dbeafe,#cffafe_48%,#ede9fe)] p-3">
            <div className="h-2 w-1/2 rounded-full bg-[var(--color-blue)]/30" />
            <div className="mt-2 h-2 w-1/3 rounded-full bg-[var(--color-ink)]/10" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="h-14 rounded-lg bg-[var(--color-mist)]" />
            <div className="h-14 rounded-lg bg-[var(--color-mist-2)]" />
          </div>
          <motion.div
            aria-hidden="true"
            className="absolute h-4 w-4 rounded-full border-2 border-white bg-[var(--color-blue)] shadow-[0_0_18px_rgba(37,99,235,0.65)]"
            animate={animated ? { x: [28, 130, 105, 28], y: [38, 38, 125, 38] } : { x: 105, y: 125 }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </Frame>
  );
}

function Develop({ animated }: { animated: boolean }) {
  return (
    <Frame label="Build system">
      <div className="grid h-full grid-cols-2 gap-3 py-5">
        <div className="rounded-xl bg-[var(--color-navy)] p-4 font-mono-tight text-[9px] leading-5 text-white/55">
          <span className="text-[var(--color-cyan)]">const</span> experience =
          <br />
          <span className="pl-3 text-white/80">build(&#123;</span>
          <br />
          <span className="pl-6">fast: true,</span>
          <br />
          <span className="pl-6">useful: true</span>
          <br />
          <span className="pl-3 text-white/80">&#125;);</span>
          <motion.div
            className="mt-4 h-px origin-left bg-[linear-gradient(90deg,var(--color-blue),var(--color-cyan))]"
            animate={{ scaleX: animated ? [0.15, 1, 0.15] : 1 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col justify-between rounded-xl border border-[var(--color-line)] bg-white p-3 shadow-sm"
        >
          <div className="h-16 rounded-lg bg-[linear-gradient(135deg,var(--color-blue),var(--color-violet))]" />
          <div className="space-y-2">
            <div className="h-2 w-4/5 rounded-full bg-[var(--color-ink)]/12" />
            <div className="h-2 w-1/2 rounded-full bg-[var(--color-ink)]/8" />
          </div>
          <div className="h-7 w-20 rounded-full bg-[linear-gradient(90deg,var(--color-blue),var(--color-cyan))]" />
        </motion.div>
      </div>
    </Frame>
  );
}

function Refine({ animated, idPrefix }: { animated: boolean; idPrefix: string }) {
  const scoreGradientId = `${idPrefix}-score-ring`;

  return (
    <Frame label="Quality pass">
      <div className="grid h-full grid-cols-[0.9fr_1.1fr] items-center gap-5 px-2 py-5">
        <div className="relative mx-auto flex aspect-square w-full max-w-36 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="48" fill="none" stroke="#e4eaf3" strokeWidth="8" />
            <motion.circle
              cx="60"
              cy="60"
              r="48"
              fill="none"
              stroke={`url(#${scoreGradientId})`}
              strokeWidth="8"
              strokeLinecap="round"
              pathLength="1"
              initial={{ strokeDasharray: "0 1" }}
              animate={{ strokeDasharray: "0.96 1" }}
              transition={{ duration: animated ? 1.3 : 0, ease: [0.16, 1, 0.3, 1] }}
            />
            <defs>
              <linearGradient id={scoreGradientId}>
                <stop stopColor="#2563eb" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute text-3xl font-semibold tracking-tight text-[var(--color-ink)]">96</span>
        </div>
        <div className="space-y-4">
          {["Performance", "Accessibility", "Best practices"].map((label, index) => (
            <div key={label}>
              <div className="mb-1.5 flex justify-between text-[10px] text-[var(--color-ink-soft)]">
                <span>{label}</span>
                <span>{96 - index}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-line)]">
                <motion.div
                  className="h-full origin-left rounded-full bg-[linear-gradient(90deg,var(--color-blue),var(--color-cyan))]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: animated ? 0.9 : 0, delay: animated ? 0.18 + index * 0.14 : 0 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function Launch({ animated }: { animated: boolean }) {
  return (
    <Frame label="Live product">
      <div className="relative flex h-full items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute h-56 w-56 rounded-full border border-[var(--color-blue)]/12"
          animate={animated ? { rotate: 360, scale: [0.92, 1.05, 0.92] } : undefined}
          transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        >
          <span className="absolute left-5 top-7 h-3 w-3 rounded-full bg-[var(--color-cyan)] shadow-[0_0_20px_rgba(6,182,212,0.7)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] bg-[linear-gradient(145deg,var(--color-blue),var(--color-cyan)_52%,var(--color-violet))] shadow-[0_24px_60px_-18px_rgba(37,99,235,0.75)]"
        >
          <svg aria-hidden="true" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M17 31L31 17M20 14H34V28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-5 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 font-mono-tight text-[10px] text-[var(--color-blue)] shadow-sm"
          animate={animated ? { y: [0, -4, 0] } : undefined}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Deployed globally
        </motion.div>
      </div>
    </Frame>
  );
}

export function ProcessArtwork({
  step,
  animate = true,
  idPrefix,
}: {
  step: ProcessTitle;
  animate?: boolean;
  idPrefix: string;
}) {
  const reduced = Boolean(useReducedMotion());
  const animated = animate && !reduced;

  if (step === "Discover") return <Discover animated={animated} />;
  if (step === "Design") return <Design animated={animated} />;
  if (step === "Develop") return <Develop animated={animated} />;
  if (step === "Refine") return <Refine animated={animated} idPrefix={idPrefix} />;
  return <Launch animated={animated} />;
}
