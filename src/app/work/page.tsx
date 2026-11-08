import { PageHero } from "@/components/sections/PageHero";
import { projects } from "@/lib/data";
import { RevealGroup } from "@/components/ui/Reveal";
import { CTASection } from "@/components/home/CTASection";
import { WorkCard } from "@/components/sections/WorkCard";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Work",
  description: "Selected HTTPier websites and digital experiences across business consulting, gaming, wellness, hospitality, healthcare, retail and more.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Work that speaks before we do."
        description="A selection of live websites and digital experiences across business consulting, gaming, wellness, hospitality, healthcare, retail and more."
      />

      <section className="py-20 sm:py-28">
        <div className="container-httpier">
          <RevealGroup className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection />
    </>
  );
}
