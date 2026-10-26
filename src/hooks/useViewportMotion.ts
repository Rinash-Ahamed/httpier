"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useState, type RefObject } from "react";
import { usePageVisibility } from "@/hooks/usePageVisibility";

/** Runs decorative motion only near the viewport and respects reduced motion. */
export function useViewportMotion<T extends Element>(ref: RefObject<T | null>) {
  const isNearViewport = useInView(ref, { margin: "200px 0px", amount: 0.01 });
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isPageVisible = usePageVisibility();
  const [supportsDecorativeMotion, setSupportsDecorativeMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setSupportsDecorativeMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isNearViewport && isPageVisible && supportsDecorativeMotion && !shouldReduceMotion;
}
