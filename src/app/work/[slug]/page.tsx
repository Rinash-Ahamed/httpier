import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/data";
import { Mockup } from "@/components/sections/WorkCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/home/CTASection";
import { createPageMetadata } from "@/lib/seo";

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
  return createPageMetadata({
    title: project.name,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
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
              &larr; All work
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono-tight text-[13px] text-[var(--color-ink-soft)]">
              <span>{project.industry}</span>
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

          <div className="mx-auto mt-20 max-w-5xl divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            <Reveal>
              <article className="grid gap-4 py-10 sm:grid-cols-[11rem_1fr] sm:gap-10">
                <h2 className="font-mono-tight text-[12px] uppercase tracking-widest text-[var(--color-blue)]">
                  Problem
                </h2>
                <p className="text-xl leading-relaxed text-[var(--color-ink)]">
                  {project.problem}
                </p>
              </article>
            </Reveal>
            <Reveal>
              <article className="grid gap-4 py-10 sm:grid-cols-[11rem_1fr] sm:gap-10">
                <h2 className="font-mono-tight text-[12px] uppercase tracking-widest text-[var(--color-blue)]">
                  Solution
                </h2>
                <p className="text-xl leading-relaxed text-[var(--color-ink)]">
                  {project.solution}
                </p>
              </article>
            </Reveal>
            <Reveal>
              <article className="grid gap-4 py-10 sm:grid-cols-[11rem_1fr] sm:gap-10">
                <h2 className="font-mono-tight text-[12px] uppercase tracking-widest text-[var(--color-blue)]">
                  What HTTPier built
                </h2>
                <p className="text-xl leading-relaxed text-[var(--color-ink)]">
                  {project.contribution}
                </p>
              </article>
            </Reveal>
            <Reveal>
              <article className="grid gap-4 py-10 sm:grid-cols-[11rem_1fr] sm:gap-10">
                <h2 className="font-mono-tight text-[12px] uppercase tracking-widest text-[var(--color-blue)]">
                  Tech
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-[var(--color-line)] bg-[var(--color-mist)] px-4 py-2 text-[14px] text-[var(--color-ink)]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
            <Reveal>
              <article className="grid gap-4 py-10 sm:grid-cols-[11rem_1fr] sm:gap-10">
                <h2 className="font-mono-tight text-[12px] uppercase tracking-widest text-[var(--color-blue)]">
                  Outcome
                </h2>
                <p className="text-xl leading-relaxed text-[var(--color-ink)]">
                  {project.outcome}
                </p>
              </article>
            </Reveal>
          </div>
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
                    <p className="text-[13.5px] text-[var(--color-ink-soft)]">{p.industry}</p>
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
