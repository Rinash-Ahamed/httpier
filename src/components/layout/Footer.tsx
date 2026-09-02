"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/lib/data";

const footerNav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const social = [
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "GitHub", href: siteConfig.social.github },
];

export function Footer() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <footer className="relative overflow-hidden bg-[var(--color-navy)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_75%_0%,rgba(37,99,235,0.28),transparent_55%)]"
      />
      <motion.button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ opacity }}
        aria-label="Back to top"
        className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 backdrop-blur transition-colors hover:border-white/30 hover:bg-white/15 hover:text-white sm:right-10"
      >
        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path
            d="M7.5 12V3M7.5 3L3.5 7M7.5 3L11.5 7"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>

      <div className="container-httpier relative py-16 sm:py-20">
        <div className="grid gap-8 border-b border-white/10 pb-14 pr-14 md:grid-cols-[1fr_auto] md:items-end md:pr-0">
          <div className="max-w-3xl">
            <p className="font-mono-tight text-[12px] uppercase tracking-[0.18em] text-[var(--color-cyan)]">
              Have something in mind?
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Let&rsquo;s build something
              <span className="block text-white/45">worth remembering.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[15px] font-medium text-[var(--color-navy)] transition-transform hover:-translate-y-0.5"
          >
            Start a project
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.7fr_1fr_0.7fr] lg:gap-14">
          <div className="max-w-sm">
            <Link href="/" className="font-mono-tight text-2xl font-semibold tracking-tight">
              HTTPier
            </Link>
            <p className="mt-4 text-[15px] leading-relaxed text-white/55">
              High-performance websites and digital products built for clarity,
              growth and the people who use them.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              Navigate
            </p>
            <ul className="mt-4 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[14px] text-white/65 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              Contact
            </p>
            <div className="mt-4 space-y-3">
              <a href={`tel:${siteConfig.phone}`} className="block text-[14px] text-white/65 transition-colors hover:text-white">
                +91 9489813846
              </a>
              <Link href="/contact" className="block text-[14px] text-white/65 transition-colors hover:text-white">
                Send a project enquiry
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              Follow
            </p>
            <ul className="mt-4 space-y-3">
              {social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-white/65 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/40">
            &copy; {new Date().getFullYear()} HTTPier. All rights reserved.
          </p>
          <div className="flex gap-5 text-[12px] text-white/40">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
