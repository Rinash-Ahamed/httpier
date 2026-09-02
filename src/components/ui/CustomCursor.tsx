"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeNoop() {
  return () => {};
}

function useFinePointerNoReducedMotion() {
  return useSyncExternalStore(
    subscribeNoop,
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

/**
 * A minimal, optional custom cursor for desktop/fine-pointer devices.
 * It never renders on touch devices and never removes the native
 * cursor's function - it's a purely additive visual layer that reads
 * `data-cursor="VIEW" | "OPEN" | "DRAG"` off the element under the pointer.
 */
export function CustomCursor() {
  const enabled = useFinePointerNoReducedMotion();
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      setLabel(target?.dataset.cursor ?? null);
    }
    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={label ?? "dot"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center rounded-full bg-white"
          style={
            label
              ? { width: 64, height: 64 }
              : { width: 10, height: 10 }
          }
        >
          {label && (
            <span className="font-mono-tight text-[10px] font-semibold tracking-wide text-black">
              {label}
            </span>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
