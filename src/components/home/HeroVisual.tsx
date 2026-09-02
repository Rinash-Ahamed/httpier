"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
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
      style={{ perspective: 1400 }}
      className="relative mx-auto aspect-[4/3.4] w-full max-w-[560px]"
    >
      {/* the browser canvas itself */}
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-2xl border border-[var(--color-line)] bg-white shadow-[var(--shadow-elevated)]"
      >
        {/* browser chrome */}
        <div className="flex items-center gap-1.5 rounded-t-2xl border-b border-[var(--color-line)] bg-[var(--color-mist)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex h-6 flex-1 items-center rounded-full bg-white px-3">
            <span className="font-mono-tight text-[10px] text-[var(--color-ink-soft)]/60">
              httier.in
            </span>
          </div>
        </div>

        {/* canvas body */}
        <div className="relative grid h-[calc(100%-42px)] grid-cols-5 gap-3 overflow-hidden p-4">
          <div className="col-span-2 flex flex-col gap-3">
            <div className="rounded-xl bg-[var(--color-mist)] p-3">
              <pre className="font-mono-tight text-[9.5px] leading-[1.6] text-[var(--color-ink-soft)]">
{`function Hero() {
  return (
    <Canvas
      speed="fast"
      motion="smooth"
    />
  )
}`}
              </pre>
            </div>
            <div className="flex-1 rounded-xl bg-gradient-to-br from-[var(--color-blue)]/10 to-[var(--color-violet)]/10 p-3">
              <div className="h-2 w-3/4 rounded-full bg-[var(--color-blue)]/25" />
              <div className="mt-2 h-2 w-1/2 rounded-full bg-[var(--color-blue)]/15" />
            </div>
          </div>

          <div className="col-span-3 flex flex-col gap-3">
            <div className="flex-1 rounded-xl border border-[var(--color-line)] bg-[linear-gradient(135deg,rgba(37,99,235,0.08),rgba(6,182,212,0.08))] p-4">
              <div className="h-2.5 w-2/3 rounded-full bg-[var(--color-ink)]/15" />
              <div className="mt-2 h-2 w-1/2 rounded-full bg-[var(--color-ink)]/10" />
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="aspect-square rounded-lg bg-white shadow-sm" />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--color-line)] bg-white p-3">
              <div className="h-2 w-1/3 rounded-full bg-[var(--color-ink)]/10" />
              <div className="h-7 w-16 rounded-full bg-[linear-gradient(100deg,var(--color-blue),var(--color-cyan))]" />
            </div>
          </div>

          {/* pointer dot */}
          <motion.span
            aria-hidden="true"
            className="absolute h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--color-indigo)] shadow-md"
            style={{
              left: useTransform(mx, [-0.5, 0.5], ["18%", "82%"]),
              top: useTransform(my, [-0.5, 0.5], ["18%", "82%"]),
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
