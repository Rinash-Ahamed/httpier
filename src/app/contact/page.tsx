import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Tell us what you want to build - HTTPier responds within one business day.",
  path: "/contact",
});

const whatsappUrl = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi HTTPier, I would like to discuss a project.",
)}`;

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(145deg,#f8fbff_0%,#eef7ff_46%,#f7f2ff_100%)] pb-20 pt-32 sm:pb-24 sm:pt-40">
      <div className="pointer-events-none absolute -left-32 top-32 size-80 rounded-full bg-blue-400/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-12 size-80 rounded-full bg-violet-400/18 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 size-72 -translate-x-1/2 rounded-full bg-cyan-300/15 blur-[100px]" />

      <div className="container-httpier relative">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono-tight text-[13px] uppercase tracking-widest text-[var(--color-blue)]">
              Start a project
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-4 text-[clamp(2.7rem,11vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--color-ink)]">
              Let&rsquo;s put it <span className="text-gradient">on the web.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
              Tell us what you&rsquo;re building. We&rsquo;ll get back to you within one business day.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_30px_90px_-40px_rgba(37,99,235,0.38)] lg:bg-white/70 lg:backdrop-blur-xl lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal className="h-full">
            <aside className="relative flex h-full min-h-80 flex-col justify-between overflow-hidden bg-[linear-gradient(145deg,#0b1220_0%,#102a56_58%,#164e63_100%)] p-7 text-white sm:p-9 lg:min-h-full">
              <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-blue-500/35 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 size-64 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="relative">
                <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 font-mono-tight text-[11px] uppercase tracking-[0.16em] text-cyan-200">
                  Clear ideas welcome
                </span>
                <h2 className="mt-6 max-w-sm text-3xl font-semibold leading-tight tracking-tight">
                  A thoughtful first conversation, with no hard sell.
                </h2>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/65">
                  Share the goal, the challenge and where you are today. We&rsquo;ll help shape the right next step.
                </p>
              </div>

              <div className="relative mt-12 space-y-4 border-t border-white/12 pt-6">
                <div>
                  <p className="font-mono-tight text-[10px] uppercase tracking-[0.16em] text-cyan-200/65">Response time</p>
                  <p className="mt-1 text-[14px] text-white/85">Within one business day</p>
                </div>
                <div>
                  <p className="font-mono-tight text-[10px] uppercase tracking-[0.16em] text-cyan-200/65">Prefer a call?</p>
                  <a href={`tel:${siteConfig.phone}`} className="mt-1 inline-block text-[14px] text-white/85 transition-colors hover:text-cyan-200">
                    +91 9489813846
                  </a>
                </div>
                <div>
                  <p className="font-mono-tight text-[10px] uppercase tracking-[0.16em] text-cyan-200/65">
                    Prefer WhatsApp?
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#25D366]/35 bg-[#25D366]/12 px-4 py-2 text-[13px] font-medium text-white transition hover:-translate-y-0.5 hover:border-[#25D366]/60 hover:bg-[#25D366]/20"
                    aria-label="Chat with HTTPier on WhatsApp - opens in a new tab"
                  >
                    <span className="size-2 rounded-full bg-[#25D366] shadow-[0_0_12px_rgba(37,211,102,0.8)]" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <div className="p-6 sm:p-9 lg:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
