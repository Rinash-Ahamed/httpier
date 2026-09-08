"use client";

import { motion, type Variants } from "motion/react";
import { useRef } from "react";
import { techStack } from "@/lib/data";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { useViewportMotion } from "@/hooks/useViewportMotion";

const techItem: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldAnimate = useViewportMotion(sectionRef);

  return (
    <section ref={sectionRef} className="border-t border-[var(--color-line)] bg-[var(--color-navy)] py-24 text-white sm:py-32">
      <div className="container-httpier">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-cyan)]">
                Technology
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Modern technology.
                <br />
                Chosen with purpose.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
                We don&rsquo;t default to one stack. Every technology below is
                selected based on what a project actually requires -
                scale, budget, team and timeline.
              </p>
            </Reveal>
          </div>

          <RevealGroup
            stagger={0.06}
            className="relative grid grid-cols-2 gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-2 [perspective:900px] sm:grid-cols-3"
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 top-1/4 h-48 w-48 rounded-full bg-[var(--color-blue)]/15 blur-3xl"
              animate={shouldAnimate ? { x: [0, 280, 0], y: [0, 180, 0] } : { x: 0, y: 0 }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                variants={techItem}
                className="relative min-h-32 [transform-style:preserve-3d]"
              >
                <motion.div
                  animate={
                    shouldAnimate
                      ? {
                          y: [-6, 6, -6],
                          rotateX: [3, -3, 3],
                          rotateY: [-2, 2, -2],
                          scale: [1.012, 0.992, 1.012],
                        }
                      : { y: 0, rotateX: 0, rotateY: 0, scale: 1 }
                  }
                  transition={{
                    duration: 7.2,
                    delay: -index * 0.45,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="group relative flex h-full min-h-32 flex-col justify-between gap-6 overflow-hidden rounded-xl border border-white/10 bg-[#0e1829]/95 p-5 shadow-[0_14px_36px_-24px_rgba(6,182,212,0.55)] transition-colors duration-500 [backface-visibility:hidden] [will-change:transform] hover:bg-[#122039]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-blue),var(--color-cyan),var(--color-violet))] transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                  <span className="font-mono-tight text-[15px] font-medium tracking-tight">
                    {tech.name}
                  </span>
                  <span className="text-[11.5px] text-white/45">{tech.role}</span>
                </motion.div>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
