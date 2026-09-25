"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode, type SVGProps } from "react";

type ProfileState = "compact" | "profile" | "bio";
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function SvgIcon({
  size = 24,
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

function PlusIcon() {
  return (
    <SvgIcon size={24}>
      <path d="M12 5v14M5 12h14" />
    </SvgIcon>
  );
}

function UserIcon() {
  return (
    <SvgIcon size={21}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </SvgIcon>
  );
}

function ArrowLeftIcon() {
  return (
    <SvgIcon size={20}>
      <path d="m15 18-6-6 6-6M9 12h10" />
    </SvgIcon>
  );
}

function FounderAvatar({ compact = false }: { compact?: boolean }) {
  return (
    <motion.span
      layoutId="founder-avatar"
      className={`grid shrink-0 place-items-center rounded-full border-[3px] border-white bg-[linear-gradient(135deg,var(--color-blue),var(--color-cyan),var(--color-violet))] font-mono-tight font-semibold text-white shadow-lg ${
        compact ? "h-[52px] w-[52px] text-[13px]" : "h-[58px] w-[58px] text-[14px]"
      }`}
    >
      RA
    </motion.span>
  );
}

const shellSpring = {
  type: "spring" as const,
  stiffness: 470,
  damping: 38,
  mass: 0.82,
};

export function FounderProfile() {
  const [state, setState] = useState<ProfileState>("compact");
  const shouldReduceMotion = Boolean(useReducedMotion());
  const transition = shouldReduceMotion
    ? { duration: 0.001 }
    : shellSpring;

  return (
    <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-mist)] p-5 sm:min-h-[340px] sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.16),transparent_48%)]"
      />
      <p className="absolute left-5 top-5 font-mono-tight text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink-soft)]/55 sm:left-7 sm:top-7">
        Tap to meet the founder
      </p>

      <motion.div
        layout
        transition={transition}
        className={`relative overflow-hidden bg-[var(--color-ink)] text-white shadow-[0_20px_42px_rgba(10,14,26,0.18),0_4px_12px_rgba(10,14,26,0.12)] ${
          state === "compact"
            ? "h-[62px] w-[116px] rounded-full"
            : state === "profile"
              ? "h-[72px] w-full max-w-[340px] rounded-full"
              : "min-h-[178px] w-full max-w-[520px] rounded-[22px]"
        }`}
      >
        <AnimatePresence initial={false} mode="wait">
          {state === "compact" && (
            <motion.div
              key="compact"
              className="absolute inset-0 flex items-center justify-between p-[5px]"
              initial={{ opacity: 0, filter: "blur(6px)", scale: 0.94 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(6px)", scale: 0.94 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.17 }}
            >
              <FounderAvatar compact />
              <motion.button
                type="button"
                aria-label="Open founder profile"
                onClick={() => setState("profile")}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
                className="grid h-[52px] w-[52px] place-items-center rounded-full bg-[#27c95f] text-white"
              >
                <PlusIcon />
              </motion.button>
            </motion.div>
          )}

          {state === "profile" && (
            <motion.div
              key="profile"
              className="absolute inset-0 flex items-center gap-2.5 p-[7px] pr-2"
              initial={{ opacity: 0, filter: "blur(6px)", scale: 0.96 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(6px)", scale: 0.96 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.17 }}
            >
              <button
                type="button"
                aria-label="Close founder profile"
                onClick={() => setState("compact")}
                className="shrink-0 rounded-full"
              >
                <FounderAvatar />
              </button>

              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-[12px] text-white/50">Hello, I&rsquo;m</p>
                <p className="mt-1 truncate text-[16px] font-semibold tracking-tight sm:text-[18px]">
                  Rinash Ahamed
                </p>
              </div>

              <motion.button
                type="button"
                aria-label="Read about Rinash Ahamed"
                onClick={() => setState("bio")}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
                className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-[#ff8a00] text-white"
              >
                <UserIcon />
              </motion.button>
            </motion.div>
          )}

          {state === "bio" && (
            <motion.button
              key="bio"
              type="button"
              aria-label="Return to founder profile"
              onClick={() => setState("profile")}
              className="flex min-h-[178px] w-full flex-col justify-between gap-5 p-6 text-left sm:p-7"
              initial={{ opacity: 0, filter: "blur(7px)", y: 7 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(7px)", y: -5 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
            >
              <span className="text-[15px] leading-relaxed text-white/75 sm:text-[16px]">
                I enjoy turning complex ideas into clear digital products,
                combining modern web engineering with practical AI where it
                creates a genuinely better customer experience.
              </span>
              <span className="inline-flex items-center gap-2 font-mono-tight text-[11px] uppercase tracking-[0.14em] text-[var(--color-cyan)]">
                <ArrowLeftIcon /> Back to profile
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
