"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    setMenuOpen(false);

    if (href === "/" && window.location.pathname === "/") {
      event.preventDefault();
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-httpier">
        <motion.div
          animate={{
            marginTop: scrolled ? 12 : 0,
            paddingInline: scrolled ? 10 : 4,
            backgroundColor: scrolled ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0)",
            borderColor: scrolled ? "rgba(228,234,243,1)" : "rgba(228,234,243,0)",
            boxShadow: scrolled
              ? "0 1px 2px rgba(10,14,26,0.04), 0 16px 40px -20px rgba(10,14,26,0.25)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between rounded-full border py-2.5 backdrop-blur-xl"
        >
          <Link
            href="/"
            onClick={(event) => handleNavClick(event, "/")}
            className="flex items-center gap-2 rounded-full px-2 py-1"
            data-cursor=""
          >
            <Image
              src="/brand/httpier-mark.png"
              alt=""
              width={32}
              height={21}
              className="h-7 w-auto"
              priority
            />
            <span className="font-mono-tight text-[17px] font-semibold tracking-tight text-[var(--color-ink)]">
              HTTPier
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="group relative rounded-full px-4 py-2 text-[14px] font-medium text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-0 h-px origin-left scale-x-0 bg-[var(--color-blue)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" className="!px-5 !py-2.5 text-[13.5px]">
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
        </motion.div>
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
              {navLinks.map((link, i) => (
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
                    className="flex min-h-11 items-center gap-4 text-3xl font-medium tracking-tight text-[var(--color-ink)] sm:text-4xl"
                  >
                    <span className="font-mono-tight text-sm text-[var(--color-blue)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="pt-6"
              >
                <Button href="/contact" className="w-full">
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
