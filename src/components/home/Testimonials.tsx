"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { usePageVisibility } from "@/hooks/usePageVisibility";

const testimonials = [
  {
    quote:
      "Earlier, we had to explain our services on almost every call. The new website makes our revenue management and hotel onboarding work much easier to understand, so conversations now start with better context.",
    client: "ProfitPro",
    industry: "Revenue management team",
  },
  {
    quote:
      "We wanted Ayursarga to feel trustworthy and modern without losing the warmth associated with Ayurveda. The hospital search and appointment journey now feels much simpler for families to use.",
    client: "Ayursarga",
    industry: "Healthcare platform team",
  },
  {
    quote:
      "We did not want another standard shopping template. HTTPier understood the fashion-first direction we had in mind and turned it into a site that feels like AMIGOS, especially on mobile.",
    client: "AMIGOS Fashion",
    industry: "Fashion retail team",
  },
  {
    quote:
      "Our projects needed to be the focus. The new site gives the photography room to speak and helps prospective clients understand our work without having to search through too much information.",
    client: "Space-D Infra",
    industry: "Real estate development team",
  },
] as const;

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <figure
      className="group relative flex h-[420px] w-[min(82vw,430px)] shrink-0 flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white p-7 shadow-[0_20px_55px_-35px_rgba(10,14,26,0.42)] transition-[transform,border-color,background-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-blue-400/50 hover:bg-blue-50/40 hover:shadow-[0_26px_75px_-28px_rgba(37,99,235,0.62)] sm:h-[390px] sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-400/25 opacity-30 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100"
      />
      <span
        className="relative text-5xl font-medium leading-none text-[var(--color-blue)]/25 transition-colors duration-500 group-hover:text-[var(--color-blue)]/50"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <blockquote className="relative mt-4 flex-1 text-[16px] leading-relaxed text-[var(--color-ink)] sm:text-lg">
        {testimonial.quote}
      </blockquote>
      <figcaption className="relative mt-7 flex items-center gap-3 border-t border-[var(--color-line)] pt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-mist)] font-mono-tight text-[14px] font-semibold text-[var(--color-blue)] transition-colors duration-500 group-hover:bg-blue-100">
          {testimonial.client.charAt(0)}
        </span>
        <div>
          <p className="text-[15px] font-medium text-[var(--color-ink)]">
            {testimonial.client}
          </p>
          <p className="mt-0.5 text-[12px] text-[var(--color-ink-soft)]/70">
            {testimonial.industry}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

function TestimonialGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className={`flex shrink-0 items-start gap-4 pr-4 sm:gap-5 sm:pr-5 ${duplicate ? "testimonial-duplicate" : ""}`}
      aria-hidden={duplicate || undefined}
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={`${duplicate ? "duplicate-" : ""}${testimonial.client}`}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.01 });
  const isPageVisible = usePageVisibility();

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="scroll-mt-28 overflow-hidden border-t border-[var(--color-line)] py-16 sm:py-24"
    >
      <div className="container-httpier">
        <Reveal>
          <div className="max-w-xl">
            <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
              What clients noticed
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              Built around the business.
            </h2>
          </div>
        </Reveal>

        <div className="testimonial-viewport relative mt-10 overflow-hidden pb-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] sm:mt-12">
          <div className="testimonial-track flex w-max items-start" style={{ animationPlayState: isInView && isPageVisible ? undefined : "paused" }}>
            <TestimonialGroup />
            <TestimonialGroup duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
