"use client";

import { useRef, type ReactNode } from "react";
import { useViewportMotion } from "@/hooks/useViewportMotion";

export function AmbientMotion({ children, className }: { children: ReactNode; className: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldAnimate = useViewportMotion(containerRef);

  return (
    <div ref={containerRef} aria-hidden="true" data-motion-active={shouldAnimate} className={className}>
      {children}
    </div>
  );
}
