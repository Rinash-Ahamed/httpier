"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const steps = [
  {
    word: "HTTP",
    eyebrow: "The foundation",
    note: "Where every web experience begins.",
    color: "#2563eb",
  },
  {
    word: "Higher Tier",
    eyebrow: "Raised standards",
    note: "Design and engineering, elevated.",
    color: "#06b6d4",
  },
  {
    word: "Happier",
    eyebrow: "Human outcomes",
    note: "Better for businesses and customers.",
    color: "#8b5cf6",
  },
  {
    word: "HTTPier",
    eyebrow: "The idea, brought together",
    note: "A higher tier of the web.",
    color: "#4f46e5",
  },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), {
    stiffness: 140,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), {
    stiffness: 140,
    damping: 24,
  });
  const step = steps[phase];

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = window.setInterval(() => {
      setPhase((current) => (current + 1) % steps.length);
    }, 2500);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-[4/3.6] w-full max-w-[590px]"
      style={{ perspective: 1400 }}
      aria-label="The story behind the HTTPier name"
    >
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full overflow-hidden rounded-[28px] border border-white/90 bg-white/75 shadow-[var(--shadow-elevated)] backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <motion.div
          aria-hidden="true"
          animate={{ backgroundColor: `${step.color}24` }}
          transition={{ duration: 0.8, ease }}
          className="absolute -right-[16%] -top-[28%] h-[66%] w-[66%] rounded-full blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          animate={{ backgroundColor: `${steps[(phase + 1) % steps.length].color}18` }}
          transition={{ duration: 0.8, ease }}
          className="absolute -bottom-[22%] -left-[16%] h-[58%] w-[58%] rounded-full blur-3xl"
        />

        <div className="absolute inset-x-0 top-0 z-30 flex h-12 items-center justify-between border-b border-[var(--color-line)]/80 bg-white/50 px-4 backdrop-blur sm:h-14 sm:px-5">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/httpier-mark.png"
              alt=""
              width={30}
              height={20}
              className="h-4 w-auto"
            />
            <span className="font-mono-tight text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink)]">
              Origin of HTTPier
            </span>
          </div>
          <span className="font-mono-tight text-[8px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]/60">
            httpier.in
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-[35%] top-12 overflow-hidden sm:top-14">
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  y: phase === 1 ? index * -12 + 12 : index * -4 + 4,
                  scale: phase === 1 ? 1 - index * 0.08 : 0.82 - index * 0.05,
                  opacity: phase === 1 ? 0.2 - index * 0.045 : 0.055,
                  rotateX: phase === 1 ? 58 : 72,
                }}
                transition={{ duration: 0.8, delay: index * 0.05, ease }}
                className="absolute h-[46%] w-[62%] rounded-[28px] border"
                style={{ borderColor: step.color, backgroundColor: `${step.color}12` }}
              />
            ))}
          </div>

          <motion.svg
            aria-hidden="true"
            viewBox="0 0 560 280"
            className="absolute inset-0 h-full w-full"
            animate={{ opacity: phase === 0 ? 0.42 : 0.08 }}
            transition={{ duration: 0.65 }}
          >
            <path d="M48 74H176L222 118H338L386 72H512" fill="none" stroke="url(#http-line)" strokeWidth="1.4" strokeDasharray="5 7" />
            <path d="M58 211H164L219 165H348L406 214H508" fill="none" stroke="url(#http-line)" strokeWidth="1.4" strokeDasharray="5 7" />
            <circle cx="48" cy="74" r="5" fill="#2563eb" />
            <circle cx="512" cy="74" r="5" fill="#06b6d4" />
            <circle cx="58" cy="211" r="5" fill="#4f46e5" />
            <circle cx="508" cy="214" r="5" fill="#8b5cf6" />
            <defs>
              <linearGradient id="http-line" x1="48" y1="0" x2="512" y2="0">
                <stop stopColor="#2563eb" />
                <stop offset="0.5" stopColor="#06b6d4" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </motion.svg>

          <motion.div
            aria-hidden="true"
            animate={{ opacity: phase === 3 ? 0.75 : 0, scale: phase === 3 ? 1 : 0.72, rotate: phase === 3 ? 0 : -12 }}
            transition={{ duration: 0.8, ease }}
            className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/25 sm:h-52 sm:w-52"
          >
            <span className="absolute inset-3 rounded-full border border-dashed border-cyan-300/30" />
            <span className="absolute inset-8 rounded-full border border-violet-300/30" />
          </motion.div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step.word}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 34, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -34, filter: "blur(8px)" }}
                transition={{ duration: 0.62, ease }}
              >
                <p className="font-mono-tight text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--color-blue)] sm:text-[9px]">
                  {step.eyebrow}
                </p>
                <p
                  className={`mt-2 font-semibold leading-none tracking-[-0.075em] ${
                    phase === 1 ? "text-[clamp(2.6rem,10vw,5rem)]" : "text-[clamp(3.5rem,13vw,6.5rem)]"
                  } ${phase === 3 ? "text-gradient" : "text-[var(--color-ink)]"}`}
                >
                  {step.word}
                </p>
                <p className="mx-auto mt-3 max-w-[250px] text-[10px] text-[var(--color-ink-soft)] sm:text-xs">
                  {step.note}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute inset-x-[4%] bottom-[4%] z-20 rounded-2xl border border-white/90 bg-white/88 p-4 shadow-[0_16px_44px_-28px_rgba(10,14,26,0.38)] backdrop-blur-xl sm:inset-x-[5%] sm:p-5">
          <p className="text-[10px] leading-[1.55] text-[var(--color-ink-soft)] sm:text-[11.5px] sm:leading-[1.65]">
            HTTPier comes from <strong className={phase === 0 ? "text-[var(--color-blue)]" : "text-[var(--color-ink)]"}>HTTP</strong>, the foundation of the web, with the idea of a <strong className={phase === 1 ? "text-[var(--color-cyan)]" : "text-[var(--color-ink)]"}>Higher Tier</strong> of digital experience - built to make businesses and their customers <strong className={phase === 2 ? "text-[var(--color-violet)]" : "text-[var(--color-ink)]"}>Happier</strong>.
          </p>
          <p className="mt-2.5 text-[10px] font-semibold tracking-[-0.01em] text-[var(--color-ink)] sm:text-xs">
            HTTP. Higher Tier. Happier. That&apos;s HTTPier.
          </p>
          <div className="mt-3 flex gap-1" aria-hidden="true">
            {steps.map((item, index) => (
              <span key={item.word} className="h-[2px] flex-1 overflow-hidden rounded-full bg-[var(--color-line)]">
                {index === phase && (
                  <motion.span
                    key={`${item.word}-${phase}`}
                    initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 2.45, ease: "linear" }}
                    className="block h-full origin-left rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
