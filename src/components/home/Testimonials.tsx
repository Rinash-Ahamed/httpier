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

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.client} delay={index * 0.05}>
              <figure className="group flex h-full flex-col rounded-3xl border border-[var(--color-line)] bg-white p-7 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1 sm:p-8">
                <span className="text-5xl font-medium leading-none text-[var(--color-blue)]/25" aria-hidden="true">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
