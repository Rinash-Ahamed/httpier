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

const serviceLabels = ["WEB", "APP", "SAAS", "SHOP", "UX", "CWV"];

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
        description="From first-line-of-code websites to full SaaS platforms - every engagement is shaped around what the project actually needs."
      />

      <section className="relative overflow-hidden border-t border-[var(--color-line)] bg-white py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.1),transparent_65%)]" />
        <div className="container-httpier relative">
          <div className="grid grid-cols-2 gap-2 sm:gap-4 xl:grid-cols-3">
            {services.map((service, index) => {
              return (
                <Reveal key={service.slug} delay={(index % 3) * 0.05} className="h-full">
                  <article
                    id={service.slug}
                    className="group relative flex h-full min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-xl border border-blue-300/15 bg-[#07101f] p-4 shadow-[0_22px_55px_-34px_rgba(15,23,42,0.7)] transition-[transform,border-color,background-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-[#0b1729] hover:shadow-[0_26px_70px_-30px_rgba(37,99,235,0.5)] sm:rounded-2xl sm:p-8"
                  >
                    <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-[var(--color-blue)]/0 blur-3xl transition-colors duration-500 group-hover:bg-[var(--color-blue)]/20" />
                    <div className="relative flex items-center justify-between">
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 font-mono-tight text-[8px] font-medium uppercase tracking-[0.14em] text-cyan-200 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.18em]">
                        {serviceLabels[index]}
                      </span>
                      <span className="h-px w-7 bg-[linear-gradient(90deg,transparent,var(--color-cyan))] opacity-50 transition-all duration-500 group-hover:w-10 group-hover:opacity-100 sm:w-16 sm:group-hover:w-24" />
                    </div>

                    <h2 className="relative mt-5 text-[15px] font-semibold leading-snug tracking-tight text-white sm:mt-7 sm:text-[1.7rem]">
                      {service.name}
                    </h2>
                    <p className="relative mt-2 text-[11.5px] font-medium leading-relaxed text-cyan-100/80 sm:mt-3 sm:text-[15px]">
                      {service.short}
                    </p>
                    <p className="relative mt-4 hidden flex-1 text-[14.5px] leading-relaxed text-white/55 sm:block">
                      {service.description}
                    </p>

                    <ul className="relative mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-4 sm:mt-7 sm:gap-2 sm:pt-6">
                      {service.capabilities.map((capability, capabilityIndex) => (
                        <li
                          key={capability}
                          className={`rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] leading-tight text-white/60 transition-colors group-hover:border-cyan-300/20 group-hover:text-white/80 sm:px-3 sm:py-1.5 sm:text-[11.5px] ${capabilityIndex > 1 ? "hidden sm:block" : ""}`}
                        >
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.08}>
            <div className="mt-12 flex justify-center sm:mt-16">
              <Button href="/contact">Start a Project</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
