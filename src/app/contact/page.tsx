import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you want to build - HTTPier responds within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title="Let's put it on the web."
        description="Tell us what you're building. We'll get back to you within one business day."
      />

      <section className="pb-24 pt-4 sm:pb-32">
        <div className="container-httpier max-w-3xl">
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
