"use client";

import Link from "next/link";
import { useRef } from "react";
import { services } from "@/lib/data";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { motion } from "motion/react";

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.a
      ref={ref}
      href={`/services#${service.slug}`}
      onPointerMove={handleMove}
      variants={revealItem}
      data-cursor="VIEW"
      className="group relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white p-7 transition-colors duration-300 hover:border-transparent"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx) var(--my), rgba(37,99,235,0.12), transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx) var(--my), rgba(6,182,212,0.35), transparent 40%)",
          padding: 1,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative flex items-start justify-between">
        <span className="font-mono-tight text-[13px] text-[var(--color-ink-soft)]/60">
          {service.index}
        </span>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 15 15"
          fill="none"
          className="text-[var(--color-ink-soft)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-blue)]"
        >
          <path
            d="M4 11L11 4M11 4H5M11 4V10"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h3 className="relative mt-8 text-lg font-medium tracking-tight text-[var(--color-ink)]">
        {service.name}
      </h3>
      <p className="relative mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-soft)]">
        {service.short}
      </p>
    </motion.a>
  );
}

export function Services() {
  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-mist)] py-24 sm:py-32">
      <div className="container-httpier">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
                What we do
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
                Everything your digital presence needs.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--color-blue)] hover:underline underline-offset-4"
            >
              View all services →
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
