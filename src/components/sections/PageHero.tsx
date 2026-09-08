import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)] pb-16 pt-36 sm:pt-44">
      <AmbientBackground />
      <div className="container-httpier relative max-w-3xl">
        <Reveal>
          <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-4 text-[clamp(2.5rem,11vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-[var(--color-ink)]">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
