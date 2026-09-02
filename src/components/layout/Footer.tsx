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
    <footer className="relative border-t border-[var(--color-line)] bg-white">
      <motion.button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ opacity }}
        aria-label="Back to top"
        className="absolute -top-5 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-ink-soft)] shadow-[var(--shadow-soft)] transition-colors hover:border-[var(--color-blue)]/40 hover:text-[var(--color-blue)] sm:right-10"
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
      <div className="container-httpier py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <span className="font-mono-tight text-lg font-semibold tracking-tight text-[var(--color-ink)]">
              HTTPier
            </span>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-soft)]">
              {siteConfig.tagline}
            </p>
            <a
              href={`tel:${siteConfig.phone}`}
              className="mt-4 inline-block text-[14px] font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-blue)]"
            >
              +91 9489813846
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--color-ink-soft)]/70">
                Navigate
              </p>
              <ul className="mt-3 space-y-2">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-blue)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--color-ink-soft)]/70">
                Social
              </p>
              <ul className="mt-3 space-y-2">
                {social.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-blue)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--color-ink-soft)]/70">
                Legal
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/privacy" className="text-[14px] text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-blue)]">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-[14px] text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-blue)]">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start gap-4 border-t border-[var(--color-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-[var(--color-ink-soft)]/70">
            © {new Date().getFullYear()} HTTPier. All rights reserved.
          </p>
          <p className="font-mono-tight text-[13px] text-[var(--color-ink-soft)]/70">
            {"</> Built by HTTPier"}
          </p>
        </div>
      </div>
    </footer>
  );
}
