import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export function AboutTeaser() {
  return (
    <section className="border-t border-[var(--color-line)] py-24 sm:py-32">
      <div className="container-httpier">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
              About HTTPier
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              Small details.
              <br />
              Big difference.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-[var(--color-ink-soft)]">
              HTTPier focuses on the combination that actually moves a
              business forward - design, engineering, performance and the
              outcomes they produce together. We&rsquo;re a small, senior
              team that stays close to the work, from the first sketch to
              the metrics after launch.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--color-blue)] hover:underline underline-offset-4"
            >
              More about how we work →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
