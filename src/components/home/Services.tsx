"use client";

import Image from "next/image";
import Link from "next/link";
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

const capabilityImages: Record<(typeof services)[number]["slug"], string> = {
  "website-development": "/capabilities/website-development.svg",
  "web-applications": "/capabilities/web-applications.svg",
  "saas-development": "/capabilities/saas-development.svg",
  ecommerce: "/capabilities/ecommerce.svg",
  "ui-ux-design": "/capabilities/ui-ux-design.svg",
  "performance-optimization": "/capabilities/performance-optimization.svg",
};

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <motion.a
      href={`/services#${service.slug}`}
      variants={revealItem}
      className="group relative min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#0b1628] p-4 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_18px_46px_-28px_rgba(6,182,212,0.7)] sm:rounded-2xl sm:p-7"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[72%] overflow-hidden opacity-30 transition-opacity duration-700 ease-out [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.5)_26%,black_70%)] group-hover:opacity-75 group-focus-visible:opacity-75"
      >
        <Image
          src={capabilityImages[service.slug]}
          alt=""
          fill
          sizes="(min-width: 1024px) 24vw, 36vw"
          className="translate-x-[12%] scale-[1.48] object-cover object-center transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[8%] group-hover:scale-[1.38] group-focus-visible:translate-x-[8%] group-focus-visible:scale-[1.38]"
        />
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0b1628_0%,rgba(11,22,40,0.96)_48%,rgba(11,22,40,0.38)_100%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(7,16,31,0.72)_100%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at 82% 18%, rgba(37,99,235,0.28), transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at 82% 18%, rgba(6,182,212,0.48), transparent 40%)",
          padding: 1,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative flex items-center justify-end gap-1.5">
        <span className="translate-x-1 font-mono-tight text-[9px] font-medium uppercase tracking-[0.15em] text-cyan-300 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
          View
        </span>
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
