import { PageHero } from "@/components/sections/PageHero";
import { services } from "@/lib/data";
import { createPageMetadata, serializeJsonLd } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/home/CTASection";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Website development, web applications, SaaS, e-commerce, UI/UX design and performance optimization from HTTPier.",
  path: "/services",
});

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((service, i) => ({
    "@type": "Service",
    position: i + 1,
    name: service.name,
    description: service.description,
    provider: { "@type": "Organization", name: "HTTPier" },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(servicesJsonLd) }}
      />
      <PageHero
        eyebrow="Services"
        title="Everything your digital presence needs."
        description="From first-line-of-code websites to full SaaS platforms - each service is scoped around what a project actually needs."
      />

      <section className="py-20 sm:py-28">
        <div className="container-httpier space-y-20">
          {services.map((service) => (
            <Reveal key={service.slug} delay={0.02}>
              <div
                id={service.slug}
                className="grid scroll-mt-28 gap-8 border-t border-[var(--color-line)] pt-10 lg:grid-cols-[0.3fr_0.7fr] lg:gap-16"
              >
                <div>
                  <span className="font-mono-tight text-[13px] text-[var(--color-blue)]">
                    {service.index}
                  </span>
                  <h2 className="mt-3 text-3xl font-medium tracking-tight text-[var(--color-ink)]">
                    {service.name}
                  </h2>
                </div>
                <div>
                  <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
                    {service.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="rounded-full border border-[var(--color-line)] px-3.5 py-1.5 text-[13px] text-[var(--color-ink-soft)]"
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.05}>
            <div className="flex justify-center pt-6">
              <Button href="/contact">Start a Project</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
