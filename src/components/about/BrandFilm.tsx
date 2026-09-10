"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

export function BrandFilm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || !containerRef.current) return;

    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const shouldAvoidVideo =
      connection?.saveData ||
      ["slow-2g", "2g"].includes(connection?.effectiveType ?? "");

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
        if (entry.isIntersecting && !shouldAvoidVideo) setShouldLoad(true);
      },
      { rootMargin: "300px 0px", threshold: 0.01 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isReady) return;

    if (isNearViewport) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isNearViewport, isReady]);

  return (
    <div>
      <div
        ref={containerRef}
        className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[var(--shadow-soft)]"
      >
        <Image
          src="/brand/httpier-mark.png"
          alt="HTTPier mark"
          fill
          sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 64px), 1280px"
          className={`object-contain p-[14%] transition-opacity duration-700 ${isReady ? "opacity-0" : "opacity-100"}`}
        />

        {shouldLoad && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            aria-label="The HTTPier mark assembling in motion"
            onLoadedData={() => setIsReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}
          >
            <source src="/htppierhero.mp4" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        )}

        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/30" />
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 px-1">
        <p className="font-mono-tight text-[11px] uppercase tracking-[0.16em] text-[var(--color-ink-soft)]/70">
          The mark in motion
        </p>
        <p className="text-right text-[12px] text-[var(--color-ink-soft)]/60">
          Design and engineering, moving as one
        </p>
      </div>
    </div>
  );
}
