import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-20">
        <div className="container-httpier max-w-2xl space-y-6 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
          <p>
            This is placeholder legal copy. Replace with HTTPier&rsquo;s actual
            privacy policy before launch, covering what data is collected
            through this site (such as the contact form), how it is used and
            stored, and how visitors can request its removal.
          </p>
        </div>
      </section>
    </>
  );
}
