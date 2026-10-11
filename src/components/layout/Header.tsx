"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navLinks } from "@/lib/data";
import { scrollWithinCurrentPage } from "@/lib/client-navigation";
import { Button } from "@/components/ui/Button";
import { shouldHideSiteChrome } from "@/lib/site-chrome";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const updateScrolledState = () => {
      const nextScrolled = window.scrollY > 24;

      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    setMenuOpen(false);
    if (scrollWithinCurrentPage(href)) {
      event.preventDefault();
    }
  }

  function isActivePath(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  if (shouldHideSiteChrome(pathname)) return null;

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <div className="container-httpier">
        <div
          className={`flex items-center justify-between rounded-full border px-2.5 py-2.5 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out ${
            scrolled
              ? "translate-y-3 border-[var(--color-line)] bg-white/95 shadow-[0_1px_2px_rgba(10,14,26,0.04),0_16px_40px_-20px_rgba(10,14,26,0.25)] lg:bg-white/75 lg:backdrop-blur-xl"
              : "translate-y-0 border-transparent bg-transparent shadow-none"
          }`}
        >
          <Link
            href="/"
            onClick={(event) => handleNavClick(event, "/")}
            className="flex items-center gap-2 rounded-full px-2 py-1"
            data-cursor=""
          >
            <Image
              src="/icon.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              quality={90}
              preload
            />
            <span className="font-mono-tight text-[17px] font-semibold tracking-tight text-[var(--color-ink)]">
              HTTPier
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const active = isActivePath(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  aria-current={active ? "page" : undefined}
                  className={`group relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                    active
                      ? "text-[var(--color-blue)]"
                      : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-4 bottom-0 h-0.5 origin-left rounded-full bg-[var(--color-blue)] transition-transform duration-300 ease-out ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button
              href="/contact"
              onClick={(event) => handleNavClick(event, "/contact")}
              className="!px-5 !py-2.5 text-[13.5px]"
            >
              Start a Project
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <motion.span
                className="absolute left-0 top-0 h-[1.5px] w-full bg-[var(--color-ink)]"
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
              <motion.span
                className="absolute left-0 top-[7px] h-[1.5px] w-full bg-[var(--color-ink)]"
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 bottom-0 h-[1.5px] w-full bg-[var(--color-ink)]"
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              className="flex h-full flex-col justify-start gap-1 overflow-y-auto px-6 pb-8 pt-24 sm:justify-center sm:gap-2 sm:px-8 sm:pb-20 sm:pt-0"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {navLinks.map((link, i) => {
                const active = isActivePath(link.href);

                return (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="shrink-0 overflow-hidden border-b border-[var(--color-line)] py-2.5 sm:py-3"
                  >
                    <Link
                      href={link.href}
                      onClick={(event) => handleNavClick(event, link.href)}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex min-h-11 items-center gap-4 text-3xl font-medium tracking-tight sm:text-4xl ${
                        active ? "text-[var(--color-blue)]" : "text-[var(--color-ink)]"
                      }`}
                    >
                      <span className="font-mono-tight text-sm text-[var(--color-blue)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-10 h-0.5 rounded-full bg-[var(--color-blue)] transition-transform duration-300 ${
                          active ? "w-20 scale-x-100" : "w-20 scale-x-0"
                        }`}
                      />
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="pt-6"
              >
                <Button
                  href="/contact"
                  onClick={(event) => handleNavClick(event, "/contact")}
                  className="w-full"
                >
                  Start a Project
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
