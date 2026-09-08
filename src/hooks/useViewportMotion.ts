"use client";

import { useInView, useReducedMotion } from "motion/react";
import type { RefObject } from "react";

/** Runs decorative motion only near the viewport and respects reduced motion. */
export function useViewportMotion<T extends Element>(ref: RefObject<T | null>) {
  const isNearViewport = useInView(ref, { margin: "200px 0px", amount: 0.01 });
  const shouldReduceMotion = Boolean(useReducedMotion());

  return isNearViewport && !shouldReduceMotion;
}
