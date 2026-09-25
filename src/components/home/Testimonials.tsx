"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

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
];

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full min-h-[390px] flex-col rounded-3xl border border-[var(--color-line)] bg-white p-7 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1 sm:min-h-0 sm:p-8">
      <span
        className="text-5xl font-medium leading-none text-[var(--color-blue)]/25"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-[var(--color-ink)] sm:text-xl">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3 border-t border-[var(--color-line)] pt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-mist)] font-mono-tight text-[14px] font-semibold text-[var(--color-blue)]">
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

function MobileTestimonialStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <div className="mt-14 sm:hidden">
      <div className="relative pb-3 pr-2">
        <div
          aria-hidden="true"
          className="absolute inset-x-2 bottom-0 top-3 rounded-3xl border border-[var(--color-line)] bg-[var(--color-mist-2)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-1 bottom-1.5 top-1.5 rounded-3xl border border-[var(--color-line)] bg-[var(--color-mist)]"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={testimonials[activeIndex].client}
            className="relative"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <TestimonialCard testimonial={testimonials[activeIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2" aria-label="Choose testimonial">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.client}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show testimonial from ${testimonial.client}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-7 bg-[var(--color-blue)]"
                : "w-2 bg-[var(--color-line)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-28 border-t border-[var(--color-line)] py-24 sm:py-32"
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

        <MobileTestimonialStack />

        <div className="mt-14 hidden gap-5 sm:grid sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.client} delay={index * 0.05}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
