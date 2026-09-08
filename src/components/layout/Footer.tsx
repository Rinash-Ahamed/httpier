"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { navLinks, siteConfig } from "@/lib/data";
import { scrollWithinCurrentPage } from "@/lib/client-navigation";

const footerNav = [
  ...navLinks,
  { label: "Contact", href: "/contact" },
];

const social = [
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "GitHub", href: siteConfig.social.github },
];

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

function DeferredFooterVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || !containerRef.current) return;

    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (
      connection?.saveData ||
      ["slow-2g", "2g"].includes(connection?.effectiveType ?? "")
    ) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearFooter(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "300px 0px", threshold: 0.01 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (isNearFooter) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isNearFooter, shouldLoad]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
      {shouldLoad && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          className="h-full w-full object-cover opacity-20"
        >
          <source src="/httpier.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,32,0.94),rgba(11,18,32,0.68),rgba(11,18,32,0.9))]" />
    </div>
  );
}

export function Footer() {
  const { scrollYProgress } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowBackToTop(latest > 0.05);
  });

  function handleInternalLink(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (scrollWithinCurrentPage(href)) event.preventDefault();
  }

  return (
    <footer className="relative overflow-hidden bg-[var(--color-navy)] text-white">
      <DeferredFooterVideo />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_75%_0%,rgba(37,99,235,0.28),transparent_55%)]"
      />
      <motion.button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        animate={{ opacity: showBackToTop ? 1 : 0 }}
        tabIndex={showBackToTop ? 0 : -1}
        aria-hidden={!showBackToTop}
        aria-label="Back to top"
        className={`absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 backdrop-blur transition-colors hover:border-white/30 hover:bg-white/15 hover:text-white sm:right-10 ${showBackToTop ? "pointer-events-auto" : "pointer-events-none"}`}
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
            onClick={(event) => handleInternalLink(event, "/contact")}
            className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[15px] font-medium text-[var(--color-navy)] transition-transform hover:-translate-y-0.5"
          >
            Start a project
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.7fr_1fr_0.7fr] lg:gap-14">
          <div className="max-w-sm">
            <Link
              href="/"
              onClick={(event) => handleInternalLink(event, "/")}
              className="font-mono-tight text-2xl font-semibold tracking-tight"
            >
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
                  <Link
                    href={item.href}
                    onClick={(event) => handleInternalLink(event, item.href)}
                    className="text-[14px] text-white/65 transition-colors hover:text-white"
                  >
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
              <Link
                href="/contact"
                onClick={(event) => handleInternalLink(event, "/contact")}
                className="block text-[14px] text-white/65 transition-colors hover:text-white"
              >
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
            <Link
              href="/privacy"
              onClick={(event) => handleInternalLink(event, "/privacy")}
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              onClick={(event) => handleInternalLink(event, "/terms")}
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
