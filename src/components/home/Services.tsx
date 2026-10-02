"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { services } from "@/lib/data";

const values = [
  {
    title: "Designed Better",
    description: "Interfaces shaped around purpose, clarity and personality.",
  },
  {
    title: "Built Faster",
    description: "Modern engineering focused on real-world performance.",
  },
  {
    title: "Made to Grow",
    description: "Scalable foundations designed around business growth.",
  },
];

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <motion.a
      ref={ref}
      href={`/services#${service.slug}`}
      onPointerMove={handleMove}
      variants={revealItem}
      data-cursor="VIEW"
      className="group relative min-w-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.09] sm:rounded-2xl sm:p-7"
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
            "radial-gradient(240px circle at var(--mx) var(--my), rgba(37,99,235,0.28), transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx) var(--my), rgba(6,182,212,0.48), transparent 40%)",
          padding: 1,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative flex justify-end">
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 15 15"
          fill="none"
          className="text-white/45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300"
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

      <h3 className="relative mt-5 text-[14px] font-medium leading-snug tracking-tight text-white sm:mt-8 sm:text-lg">
        {service.name}
      </h3>
      <p className="relative mt-2 text-[11.5px] leading-relaxed text-slate-300 sm:text-[14.5px]">
        {service.short}
      </p>
    </motion.a>
  );
}

export function Services() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#07101f] py-16 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(37,99,235,0.32),transparent_32%),radial-gradient(circle_at_88%_24%,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_52%_100%,rgba(79,70,229,0.20),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

      <div className="container-httpier">
        <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <p className="font-mono-tight text-[13px] uppercase tracking-widest text-cyan-300">
                Who we are / What we do
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]">
                Design-led engineering for the better web.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="max-w-xl lg:justify-self-end">
              <p className="text-lg leading-relaxed text-slate-300">
                HTTPier combines thoughtful design, modern engineering and performance to build digital experiences people enjoy using and businesses can grow with.
              </p>
              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-cyan-300 hover:text-white hover:underline underline-offset-4"
              >
                More about HTTPier -&gt;
              </Link>
            </div>
          </Reveal>
        </div>

        <RevealGroup className="relative mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-[0_24px_80px_-44px_rgba(6,182,212,0.6)] sm:mt-12 sm:grid-cols-3">
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={revealItem}
              className="group bg-[#0b1628]/90 p-6 transition-colors duration-300 hover:bg-[#101f35] sm:p-7"
            >
              <div className="mb-5 h-px w-8 bg-[linear-gradient(90deg,var(--color-blue),var(--color-cyan))] transition-all duration-300 group-hover:w-14" />
              <h3 className="text-lg font-medium tracking-tight text-white">
                {value.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-300">
                {value.description}
              </p>
            </motion.div>
          ))}
        </RevealGroup>

        <div className="relative mt-12 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <div>
              <p className="font-mono-tight text-[11px] uppercase tracking-[0.18em] text-cyan-300">
                Capabilities
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
                Everything your digital presence needs.
              </h3>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-cyan-300 hover:text-white hover:underline underline-offset-4"
            >
              View all services -&gt;
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="relative mt-7 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
