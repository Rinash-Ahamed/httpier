import Link from "next/link";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export function LegalDocument({ updated, introduction, summary, sections }: {
  updated: string;
  introduction: string;
  summary: string[];
  sections: LegalSection[];
}) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-httpier grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono-tight text-[11px] uppercase tracking-[0.16em] text-[var(--color-ink-soft)]/60">Last updated</p>
          <p className="mt-2 text-[14px] font-medium text-[var(--color-ink)]">{updated}</p>
          <nav aria-label="On this page" className="mt-8 hidden border-l border-[var(--color-line)] pl-5 lg:block">
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-soft)]/55">On this page</p>
            <ul className="space-y-2.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-[13px] leading-snug text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-blue)]">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <p className="text-lg leading-relaxed text-[var(--color-ink-soft)]">{introduction}</p>
          <div className="mt-10 rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-6 sm:p-8">
            <p className="font-mono-tight text-[11px] uppercase tracking-[0.16em] text-[var(--color-blue)]">At a glance</p>
            <ul className="mt-4 space-y-3">
              {summary.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-[var(--color-ink-soft)]">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 py-10 sm:py-12">
                <div className="grid gap-4 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-6">
                  <span className="font-mono-tight text-[11px] text-[var(--color-blue)]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="text-2xl font-medium tracking-tight text-[var(--color-ink)]">{section.title}</h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-[15px] leading-7 text-[var(--color-ink-soft)]">{paragraph}</p>
                    ))}
                    {section.items && (
                      <ul className="mt-5 space-y-3">
                        {section.items.map((item) => (
                          <li key={item} className="flex gap-3 text-[15px] leading-7 text-[var(--color-ink-soft)]">
                            <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-[var(--color-blue)]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-[var(--color-navy)] p-6 text-white sm:p-8">
            <p className="text-lg font-medium">Questions about this document?</p>
            <p className="mt-2 text-[14px] leading-relaxed text-white/60">Send a message through the contact page or call +91 9489813846.</p>
            <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--color-navy)] transition-transform hover:-translate-y-0.5">
              Contact HTTPier
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
