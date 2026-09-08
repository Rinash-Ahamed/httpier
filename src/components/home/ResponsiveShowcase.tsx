"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useViewportMotion } from "@/hooks/useViewportMotion";

function BrowserBar({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center justify-between border-b border-white/10 ${compact ? "px-2 py-1.5" : "px-3 py-2.5"}`}>
      <div className="flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
      </div>
      <div className={`${compact ? "h-1 w-8" : "h-1.5 w-16"} rounded-full bg-white/10`} />
    </div>
  );
}

function AdaptiveInterface({ mode, animate }: { mode: "desktop" | "tablet" | "mobile"; animate: boolean }) {
  const compact = mode === "mobile";
  const showSidebar = mode === "desktop";

  return (
    <div className="h-full overflow-hidden bg-[#0c1728]">
      <BrowserBar compact={compact} />
      <div className={`grid h-[calc(100%-2.25rem)] ${showSidebar ? "grid-cols-[0.28fr_1fr]" : "grid-cols-1"}`}>
        {showSidebar && (
          <div className="border-r border-white/10 p-3">
            <div className="h-5 w-5 rounded-md bg-[linear-gradient(135deg,var(--color-blue),var(--color-cyan))]" />
            <div className="mt-5 space-y-2.5">
              {[72, 90, 58, 76].map((width) => (
                <div key={width} className="h-1.5 rounded-full bg-white/10" style={{ width: `${width}%` }} />
              ))}
            </div>
          </div>
        )}

        <div className={compact ? "p-2" : "p-3 sm:p-4"}>
          <div className={`relative overflow-hidden rounded-lg bg-[linear-gradient(125deg,#1d4ed8,#06b6d4_55%,#8b5cf6)] ${compact ? "h-[42%] p-2" : "h-[48%] p-3 sm:p-4"}`}>
            <div className="relative z-10 h-1.5 w-1/2 rounded-full bg-white/80" />
            <div className="relative z-10 mt-2 h-1 w-1/3 rounded-full bg-white/40" />
            <div className={`relative z-10 mt-3 rounded-full bg-white ${compact ? "h-4 w-10" : "h-6 w-16"}`} />
            <motion.div
              aria-hidden="true"
              className="absolute -right-[8%] -top-[45%] aspect-square w-[58%] rounded-full border border-white/30"
              animate={animate ? { rotate: 360 } : undefined}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className={`mt-2 grid gap-2 ${mode === "mobile" ? "grid-cols-1" : "grid-cols-3"}`}>
            {(mode === "mobile" ? [0, 1] : [0, 1, 2]).map((item) => (
              <div
                key={item}
                className={`rounded-md border border-white/8 bg-white/[0.055] ${compact ? "h-8" : mode === "tablet" ? "h-12" : "h-14"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Device({
  mode,
  className,
  label,
  delay,
  active,
}: {
  mode: "desktop" | "tablet" | "mobile";
  className: string;
  label: string;
  delay: number;
  active: boolean;
}) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const radius = mode === "mobile" ? "rounded-[1.4rem]" : "rounded-2xl";
  const aspect = mode === "desktop" ? "aspect-[16/10]" : mode === "tablet" ? "aspect-[3/4]" : "aspect-[9/16]";

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.div
        animate={active ? { y: [-4, 4, -4], rotateY: mode === "desktop" ? [-1, 1, -1] : [1.5, -1.5, 1.5] } : { y: 0, rotateY: 0 }}
        transition={{ duration: 7 + delay * 3, repeat: Infinity, ease: "easeInOut" }}
        className={`${radius} ${aspect} border border-white/15 bg-[#111d31] p-1.5 shadow-[0_28px_70px_-24px_rgba(6,182,212,0.42)] [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform]`}
      >
        <div className={`${radius} h-full overflow-hidden`}>
          <AdaptiveInterface mode={mode} animate={active} />
        </div>
      </motion.div>
      <div className="mt-3 flex items-center justify-between font-mono-tight text-[10px] uppercase tracking-[0.14em] text-white/45">
        <span>{label}</span>
        <span>{mode === "desktop" ? "1440" : mode === "tablet" ? "768" : "390"} px</span>
      </div>
    </motion.div>
  );
}

export function ResponsiveShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldAnimate = useViewportMotion(sectionRef);

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-white/10 bg-[var(--color-navy)] py-24 text-white sm:py-32">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[var(--color-blue)]/15 blur-3xl"
        animate={shouldAnimate ? { x: [0, 220, 0], y: [0, 90, 0] } : { x: 0, y: 0 }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container-httpier relative">
        <div className="grid items-end gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-cyan)]">
                Responsive by design
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                One experience.
                <br />
                Every screen.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-xl text-lg leading-relaxed text-white/60">
              The layout does more than shrink. Content reprioritizes,
              navigation adapts and every interaction stays natural to the
              screen in someone&rsquo;s hand.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14 grid grid-cols-[1.25fr_0.75fr] items-end gap-4 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 [perspective:1100px] sm:mt-16 sm:block sm:h-[590px] sm:p-8">
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.045]" />
          <div aria-hidden="true" className="absolute inset-x-[12%] bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.24),transparent_68%)]" />

          <Device
            mode="desktop"
            label="Wide canvas"
            delay={0}
            active={shouldAnimate}
            className="relative z-10 col-span-2 sm:absolute sm:left-[3%] sm:top-[8%] sm:w-[68%]"
          />
          <Device
            mode="tablet"
            label="Touch layout"
            delay={0.12}
            active={shouldAnimate}
            className="relative z-20 sm:absolute sm:right-[4%] sm:top-[17%] sm:w-[27%]"
          />
          <Device
            mode="mobile"
            label="Pocket flow"
            delay={0.24}
            active={shouldAnimate}
            className="relative z-30 sm:absolute sm:bottom-[5%] sm:right-[35%] sm:w-[15%]"
          />

          <motion.div
            aria-hidden="true"
            className="absolute bottom-[13%] left-[29%] hidden h-px w-[44%] origin-left bg-[linear-gradient(90deg,var(--color-blue),var(--color-cyan),var(--color-violet))] sm:block"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono-tight text-[11px] uppercase tracking-[0.14em] text-white/35">
          <span>Content priority</span>
          <span>Touch targets</span>
          <span>Fluid type</span>
          <span>Adaptive navigation</span>
        </div>
      </div>
    </section>
  );
}
