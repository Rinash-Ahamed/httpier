import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/data";
import { Mockup } from "@/components/sections/WorkCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/home/CTASection";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      <section className="border-b border-[var(--color-line)] pb-16 pt-36 sm:pt-44">
        <div className="container-httpier">
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-blue)]"
            >
              ← All work
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono-tight text-[13px] text-[var(--color-ink-soft)]">
              <span>{project.industry}</span>
              <span>&middot;</span>
              <span>{project.year}</span>
            </div>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-6xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
              {project.summary}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[var(--color-line)] px-3.5 py-1.5 text-[13px] text-[var(--color-ink-soft)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <Button href={project.url} external>
                Visit live website
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-httpier">
          <Reveal>
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--color-line)]">
              <Mockup project={project} />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            <Reveal className="rounded-2xl border border-[var(--color-line)] p-6">
              <p className="text-[12px] uppercase tracking-wider text-[var(--color-ink-soft)]/70">
                Project status
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-gradient">
                {project.result}
              </p>
            </Reveal>
            <Reveal delay={0.05} className="rounded-2xl border border-[var(--color-line)] p-6">
              <p className="text-[12px] uppercase tracking-wider text-[var(--color-ink-soft)]/70">
                Industry
              </p>
              <p className="mt-2 text-lg font-medium text-[var(--color-ink)]">{project.industry}</p>
            </Reveal>
            <Reveal delay={0.1} className="rounded-2xl border border-[var(--color-line)] p-6">
              <p className="text-[12px] uppercase tracking-wider text-[var(--color-ink-soft)]/70">
                Services
              </p>
              <p className="mt-2 text-lg font-medium text-[var(--color-ink)]">
                {project.services.join(", ")}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <p className="mt-14 max-w-2xl text-[13px] text-[var(--color-ink-soft)]/60">
              This project is live. Use the link above to explore the production website.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--color-line)] py-20">
        <div className="container-httpier">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight text-[var(--color-ink)]">
              More work
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {otherProjects.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  href={`/work/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition-shadow hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="aspect-[16/10]">
                    <Mockup project={p} />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-[var(--color-ink)]">{p.name}</h3>
                    <p className="text-[13.5px] text-[var(--color-ink-soft)]">{p.result}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.05}>
            <div className="mt-10 flex justify-center">
              <Button href="/contact">Start a Project</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
