"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Project } from "@/lib/data";

type WorkCarouselProps = { projects: Project[] };

const AUTO_ROTATE_INTERVAL_MS = 3000;

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

function getRelativePosition(index: number, activeIndex: number, total: number) {
  let position = index - activeIndex;
  if (position > total / 2) position -= total;
  if (position < -total / 2) position += total;
  return position;
}

export function WorkCarousel({ projects }: WorkCarouselProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageWidth, setStageWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const select = useCallback(
    (index: number) => {
      if (projects.length) setActiveIndex((index + projects.length) % projects.length);
    },
    [projects.length],
  );

  const step = useCallback(
    (direction: number) => select(activeIndex + direction),
    [activeIndex, select],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => setStageWidth(entry.contentRect.width));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || projects.length < 2) return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % projects.length),
      AUTO_ROTATE_INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion, projects.length]);

  if (!projects.length) return null;

  const activeWidth = clamp(stageWidth * 0.58, 270, 670);
  const activeHeight = clamp(activeWidth * 0.64, 330, 430);
  const sideWidth = clamp(stageWidth * 0.105, 58, 132);
  const sideHeight = activeHeight * 0.78;
  const gap = clamp(stageWidth * 0.018, 8, 20);

  return (
    <div
      ref={stageRef}
      className="group relative h-[480px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#07101f] text-white shadow-[0_32px_90px_rgba(10,42,92,0.2)] sm:h-[560px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected HTTPier projects"
      tabIndex={0}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          step(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          step(1);
        }
      }}
      onPointerDown={(event) => {
        pointerStartRef.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (pointerStartRef.current === null) return;
        const distance = event.clientX - pointerStartRef.current;
        pointerStartRef.current = null;
        if (Math.abs(distance) > 45) step(distance > 0 ? -1 : 1);
      }}
      onPointerCancel={() => {
        pointerStartRef.current = null;
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[var(--color-blue)]/25 blur-[110px]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-cyan-400/15 blur-[120px]" />

      <div className="absolute inset-x-0 top-5 z-30 flex items-center justify-between px-5 sm:top-7 sm:px-8">
        <p className="font-mono-tight text-[11px] uppercase tracking-[0.22em] text-white/55">
          Drag or use arrows
        </p>
        <p className="font-mono-tight text-[11px] tracking-[0.22em] text-white/60">
          {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pt-2 sm:pt-5">
        {projects.map((project, index) => {
          const position = getRelativePosition(index, activeIndex, projects.length);
          const isActive = position === 0;
          const distance = Math.abs(position);
          const offset = position === 0
            ? 0
            : Math.sign(position) *
              (activeWidth / 2 + sideWidth / 2 + gap + (distance - 1) * (sideWidth + gap));

          return (
            <button
              key={project.slug}
              type="button"
              aria-label={isActive ? `Open ${project.name} case study` : `Show ${project.name}`}
              aria-current={isActive ? "true" : undefined}
              className="absolute overflow-hidden rounded-[1.4rem] border border-white/15 bg-[#101b2d] text-left shadow-2xl outline-none transition-[transform,width,height,opacity,filter,border-color,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:ring-2 focus-visible:ring-cyan-300 sm:rounded-[1.75rem]"
              style={{
                width: isActive ? activeWidth : sideWidth,
                height: isActive ? activeHeight : sideHeight,
                transform: `translate3d(${offset}px, ${distance * 8}px, 0) scale(${isActive ? 1 : Math.max(0.88, 0.96 - distance * 0.035)})`,
                opacity: distance > 2 ? 0 : isActive ? 1 : Math.max(0.42, 0.78 - distance * 0.16),
                filter: isActive ? "none" : `saturate(.62) brightness(${Math.max(0.55, 0.78 - distance * 0.07)})`,
                zIndex: projects.length - distance,
              }}
              onClick={() => {
                if (isActive) router.push(`/work/${project.slug}`);
                else select(index);
              }}
            >
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes={isActive ? "(max-width: 640px) 78vw, 58vw" : "132px"}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                preload={index === 0}
                quality={90}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#040b16] via-[#07101f]/25 to-transparent" />
              {isActive ? (
                <span className="absolute inset-x-0 bottom-0 block p-5 sm:p-8">
                  <span className="font-mono-tight text-[10px] uppercase tracking-[0.2em] text-cyan-300 sm:text-xs">
                    {project.industry}
                  </span>
                  <span className="mt-2 flex items-end justify-between gap-4">
                    <span className="text-2xl font-semibold tracking-tight sm:text-4xl">{project.name}</span>
                    <span className="shrink-0 text-xs font-medium text-white/70 sm:text-sm">
                      View case study -&gt;
                    </span>
                  </span>
                </span>
              ) : (
                <span className="absolute inset-x-0 bottom-5 flex justify-center">
                  <span className="[writing-mode:vertical-rl] rotate-180 font-mono-tight text-[10px] uppercase tracking-[0.18em] text-white/75">
                    {project.name}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="absolute inset-x-5 bottom-5 z-30 flex items-center justify-between sm:inset-x-8 sm:bottom-7">
        <div className="flex w-28 gap-1.5 sm:w-44">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              aria-label={`Show ${project.name}`}
              className="h-1 flex-1 overflow-hidden rounded-full bg-white/15"
              onClick={() => select(index)}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <span
                className={`block h-full rounded-full bg-cyan-300 transition-transform duration-500 ${
                  index === activeIndex ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {[-1, 1].map((direction) => (
            <button
              key={direction}
              type="button"
              aria-label={direction < 0 ? "Previous project" : "Next project"}
              className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-lg text-white backdrop-blur-md transition hover:border-cyan-300/70 hover:bg-[var(--color-blue)] hover:shadow-[0_0_24px_rgba(61,149,255,.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:size-11"
              onClick={() => step(direction)}
              onPointerDown={(event) => event.stopPropagation()}
            >
              {direction < 0 ? "‹" : "›"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
