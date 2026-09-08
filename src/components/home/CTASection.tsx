"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <section className="border-t border-[var(--color-line)] py-24 sm:py-32">
      <div className="container-httpier">
        <div
          ref={ref}
          onPointerMove={handleMove}
          style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
          className="relative overflow-hidden rounded-3xl bg-[var(--color-navy)] px-5 py-16 text-center sm:px-16 sm:py-28"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(480px circle at var(--mx) var(--my), rgba(37,99,235,0.35), transparent 60%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent_80%)]" />

          <Reveal className="relative">
            <h2 className="text-[clamp(1.85rem,8vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-white">
              Have an idea?
              <br />
              Let&rsquo;s put it on the web.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="relative mt-9 flex justify-center">
            <Button href="/contact">Start Your Project</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
