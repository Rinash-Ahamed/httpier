"use client";

import Link from "next/link";
import { useRef, type MouseEventHandler, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const MotionLink = motion.create(Link);

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

/**
 * Primary CTA. On fine-pointer devices, the button nudges toward the
 * cursor within its bounds ("magnetic" behaviour). Falls back to a
 * plain hover/tap treatment on touch devices automatically since no
 * pointermove events fire there.
 */
export function Button({ href, children, variant = "primary", className = "", external, onClick }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  function handlePointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.28);
    y.set(relY * 0.5);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors duration-300 will-change-transform";

  const styles: Record<string, string> = {
    primary:
      "text-white bg-[linear-gradient(100deg,var(--color-blue)_0%,var(--color-cyan)_100%)] shadow-[0_8px_24px_-8px_rgba(37,99,235,0.55)] hover:shadow-[0_12px_32px_-8px_rgba(37,99,235,0.65)]",
    secondary:
      "text-[var(--color-ink)] bg-white border border-[var(--color-line)] hover:border-[var(--color-blue)]/40 hover:bg-[var(--color-mist)]",
    ghost: "text-[var(--color-ink)] hover:text-[var(--color-blue)]",
  };

  return (
    <MotionLink
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      <svg
        aria-hidden="true"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <path
          d="M4 11L11 4M11 4H5M11 4V10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </MotionLink>
  );
}
