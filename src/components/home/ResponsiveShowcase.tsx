"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

const frame = (
  <>
    <div className="flex items-center justify-between px-3 py-2">
      <div className="h-1.5 w-8 rounded-full bg-[var(--color-ink)]/15" />
      <div className="h-2 w-2 rounded-full bg-[linear-gradient(100deg,var(--color-blue),var(--color-cyan))]" />
    </div>
    <div className="space-y-1.5 px-3 pb-3">
      <div className="h-2 w-3/4 rounded-full bg-[var(--color-ink)]/10" />
      <div className="h-2 w-1/2 rounded-full bg-[var(--color-ink)]/10" />
    </div>
  </>
);

const devices = [
  { label: "Desktop", width: "100%", height: 150 },
  { label: "Tablet", width: "62%", height: 170 },
  { label: "Mobile", width: "30%", height: 190 },
];

export function ResponsiveShowcase() {
  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-mist)] py-24 sm:py-32">
      <div className="container-httpier">
        <div className="max-w-xl">
          <Reveal>
            <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
              Responsive by default
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              Perfect at every size.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink-soft)]">
              Every layout is designed independently for its breakpoint -
              never simply scaled down.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-center">
          {devices.map((device, i) => (
            <motion.div
              key={device.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3"
              style={{ width: device.width, maxWidth: 360 }}
            >
              <div
                className="w-full overflow-hidden rounded-xl border border-[var(--color-line)] bg-white shadow-[var(--shadow-soft)]"
                style={{ height: device.height }}
              >
                {frame}
                <div className="mx-3 h-px bg-[var(--color-line)]" />
                <div className="grid grid-cols-3 gap-1.5 p-3">
                  <div className="aspect-square rounded-md bg-[var(--color-mist)]" />
                  <div className="aspect-square rounded-md bg-[var(--color-mist)]" />
                  <div className="aspect-square rounded-md bg-[var(--color-mist)]" />
                </div>
              </div>
              <span className="font-mono-tight text-[12px] text-[var(--color-ink-soft)]">
                {device.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
