import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/home/CTASection";
import { PrinciplesGrid } from "@/components/sections/PrinciplesGrid";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "HTTPier combines design, engineering and performance to build digital experiences people actually enjoy using.",
  path: "/about",
});

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

      <section className="border-t border-[var(--color-line)] bg-[var(--color-mist)] py-20 sm:py-28">
        <div className="container-httpier">
          <div className="grid items-end gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
                Inside the mark
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
                Every layer, working together.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
                The HTTPier mark brings our approach into one system - clear
                design, reliable engineering, strong performance and products
                ready to grow beyond launch.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12} y={24} className="mt-10 sm:mt-14">
            <a
              href="/explodedview.png"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the detailed HTTPier mark illustration"
              className="group block overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[var(--shadow-soft)] focus-visible:outline-offset-4"
            >
              <Image
                src="/explodedview.png"
                alt="Expanded HTTPier mark connecting clean code, modern UI and UX, design systems, performance, global reach, cloud infrastructure, a robust backend, and launch."
                width={1536}
                height={1024}
                sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 64px), 1280px"
                quality={82}
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              />
            </a>
            <p className="mt-3 text-center font-mono-tight text-[11px] text-[var(--color-ink-soft)]/70 sm:hidden">
              Tap the illustration to view every detail
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
