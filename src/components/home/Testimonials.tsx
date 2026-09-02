import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-28 border-t border-[var(--color-line)] py-24 sm:py-32"
    >
      <div className="container-httpier grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
            Client perspective
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Built around the business.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="border-l-2 border-[var(--color-blue)] pl-6 sm:pl-8">
            <blockquote className="text-2xl font-medium leading-relaxed tracking-tight text-[var(--color-ink)] sm:text-3xl">
              &ldquo;HTTPier rebuilt our platform around the actual way our
              business operates, making it clearer for customers and easier
              for our team to grow.&rdquo;
            </blockquote>
            <figcaption className="mt-7">
              <p className="text-[15px] font-medium text-[var(--color-ink)]">
                ProfitPro
              </p>
              <p className="mt-1 font-mono-tight text-[12px] text-[var(--color-ink-soft)]/70">
                Hospitality SaaS
              </p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
