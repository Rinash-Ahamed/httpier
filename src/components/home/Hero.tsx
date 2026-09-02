import { Button } from "@/components/ui/Button";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { HeroVisual } from "@/components/home/HeroVisual";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-52">
      <AmbientBackground />

      <div className="container-httpier relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/80 px-3.5 py-1.5 font-mono-tight text-[12px] text-[var(--color-ink-soft)] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
              Modern technology. Meaningful outcomes.
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-[13vw] font-semibold leading-[0.98] tracking-[-0.03em] text-[var(--color-ink)] sm:text-6xl lg:text-[4.5rem]">
              We build
              <br />
              <span className="text-gradient">the better web.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[var(--color-ink-soft)]">
              High-performance websites and digital products engineered for
              speed, clarity and growth.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/contact">Start a Project</Button>
              <Button href="/work" variant="secondary">
                Explore Our Work
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-10 font-mono-tight text-[12.5px] tracking-wide text-[var(--color-ink-soft)]/70">
              Websites&nbsp;&middot;&nbsp;Web Apps&nbsp;&middot;&nbsp;SaaS&nbsp;&middot;&nbsp;E-commerce&nbsp;&middot;&nbsp;Digital Products
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={28}>
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
