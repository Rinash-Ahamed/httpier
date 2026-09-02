import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/home/CTASection";
import { PrinciplesGrid } from "@/components/sections/PrinciplesGrid";

export const metadata: Metadata = {
  title: "About",
  description:
    "HTTPier combines design, engineering and performance to build digital experiences people actually enjoy using.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About HTTPier"
        title="Small details. Big difference."
        description="HTTPier focuses on combining design, engineering, performance and business outcomes - not just shipping a website."
      />

      <section className="py-20 sm:py-28">
        <div className="container-httpier grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-medium tracking-tight text-[var(--color-ink)]">
              A small, senior team.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink-soft)]">
              We stay close to every project, from the first sketch to the
              metrics after launch. No account layers, no handoffs between
              teams that never speak to each other - the people who design
              your product are the people who build it.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl font-medium tracking-tight text-[var(--color-ink)]">
              Design and engineering, together.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink-soft)]">
              A beautiful interface that loads slowly isn&rsquo;t a finished
              product, and a fast site with no visual identity isn&rsquo;t
              either. We treat design and performance as one discipline, not
              two departments trading files back and forth.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--color-line)] py-20 sm:py-28">
        <div className="container-httpier grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
              Founder
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              Curiosity became HTTPier.
            </h2>
            <p className="mt-3 text-[15px] font-medium text-[var(--color-ink-soft)]">
              Rinash Ahamed, Founder &amp; Developer
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-xl leading-relaxed text-[var(--color-ink)] sm:text-2xl">
              HTTPier started with a simple curiosity: how can technology make
              an idea easier to use, easier to trust and easier to grow?
            </p>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink-soft)]">
              Rinash explores that question through every project, combining
              modern web development with practical AI where it genuinely
              helps. The goal is simple: less friction for the business and a
              better experience for the customer.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--color-line)] py-20 sm:py-28">
        <div className="container-httpier">
          <Reveal>
            <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
              What we hold ourselves to
            </p>
          </Reveal>
          <PrinciplesGrid />
        </div>
      </section>

      <CTASection />
    </>
  );
}
