"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePageVisibility } from "@/hooks/usePageVisibility";

const steps = [
  {
    word: "HTTP", lines: ["HTTP"], eyebrow: "The foundation",
    note: "Where every web experience begins.", color: "#2563eb", softColor: "#dbeafe",
    browserTitle: "Connected by design", browserMeta: "Request / Response",
    score: "200", scoreLabel: "Status", compactTitle: "Web foundation",
    compactMeta: "Fast. Secure. Reliable.",
    metrics: [["Protocol", "HTTPS"], ["Response", "42ms"], ["Secure", "Live"]],
  },
  {
    word: "Higher Tier", lines: ["Higher", "Tier"], eyebrow: "Raised standards",
    note: "Design and engineering, elevated.", color: "#06b6d4", softColor: "#cffafe",
    browserTitle: "Better digital craft", browserMeta: "Clarity / Performance",
    score: "98", scoreLabel: "Performance", compactTitle: "Premium experience",
    compactMeta: "Every screen considered.",
    metrics: [["LCP", "0.8s"], ["Load", "Fast"], ["Quality", "98"]],
  },
  {
    word: "Happier", lines: ["Happier"], eyebrow: "Human outcomes",
    note: "Better for businesses and customers.", color: "#8b5cf6", softColor: "#ede9fe",
    browserTitle: "Journeys that feel easy", browserMeta: "Useful / Human",
    score: "96%", scoreLabel: "Satisfaction", compactTitle: "Meaningful outcomes",
    compactMeta: "Designed around people.",
    metrics: [["Clarity", "+42%"], ["Friction", "Low"], ["Growth", "Up"]],
  },
] as const;

const PHASE_DURATION_MS = 3400;
type Step = (typeof steps)[number];

function BrowserPanel({ step }: { step: Step }) {
  return (
    <div className="origin-float-panel absolute left-0 top-[12%] z-20 w-[36%] -rotate-[5deg] rounded-xl border border-white/90 bg-white/90 p-1.5 shadow-[0_18px_45px_-24px_rgba(37,99,235,0.5)] sm:-left-[4%] sm:rounded-2xl sm:p-2">
      <div className="flex items-center justify-between px-1 py-0.5">
        <div className="flex gap-0.5"><span className="size-1 rounded-full bg-blue-300" /><span className="size-1 rounded-full bg-cyan-300" /><span className="size-1 rounded-full bg-violet-300" /></div>
        <span className="h-0.5 w-5 rounded-full bg-slate-200" />
      </div>
      <div key={step.word} className="origin-panel-enter mt-1 overflow-hidden rounded-lg bg-[#eff6ff] p-2 sm:p-3">
        <div className="h-1 w-[46%] rounded-full bg-[var(--origin-accent)]" />
        <p className="mt-1.5 text-[clamp(5px,1vw,8px)] font-semibold leading-tight text-slate-800">{step.browserTitle}</p>
        <p className="mt-1 text-[clamp(4px,.8vw,6px)] text-slate-500">{step.browserMeta}</p>
        <div className="mt-2 h-7 rounded-md bg-[linear-gradient(120deg,var(--origin-accent),#60a5fa_55%,#a78bfa)] opacity-85 sm:h-10" />
      </div>
    </div>
  );
}

function ScorePanel({ step }: { step: Step }) {
  const scoreDegrees = step.word === "HTTP" ? 360 : step.word === "Higher Tier" ? 352 : 345;
  return (
    <div className="origin-float-panel absolute right-0 top-[9%] z-20 w-[30%] rotate-[3deg] rounded-xl border border-white/90 bg-white/90 p-2.5 shadow-[0_18px_45px_-24px_rgba(37,99,235,0.45)] sm:-right-[4%] sm:rounded-2xl sm:p-3.5">
      <div key={step.word} className="origin-panel-enter flex items-center gap-2 sm:gap-3">
        <div className="grid aspect-square w-[38%] place-items-center rounded-full p-[3px]" style={{ background: `conic-gradient(${step.color} ${scoreDegrees}deg, #e2e8f0 0deg)` }}>
          <span className="grid size-full place-items-center rounded-full bg-white text-[clamp(6px,1.4vw,12px)] font-semibold text-slate-800">{step.score}</span>
        </div>
        <div className="min-w-0"><p className="text-[clamp(5px,1vw,8px)] font-semibold text-slate-800">{step.scoreLabel}</p><p className="mt-1 text-[clamp(4px,.8vw,6px)] text-emerald-600">● Live</p></div>
      </div>
    </div>
  );
}

function CompactPanel({ step }: { step: Step }) {
  return (
    <div className="origin-float-panel absolute bottom-[20%] left-[1%] z-20 w-[24%] rotate-[5deg] rounded-xl border border-white/90 bg-white/90 p-1.5 shadow-[0_18px_45px_-24px_rgba(37,99,235,0.45)] sm:-left-[2%] sm:rounded-2xl sm:p-2">
      <div key={step.word} className="origin-panel-enter">
        <div className="h-10 rounded-lg bg-[linear-gradient(145deg,var(--origin-soft),white)] p-1.5 sm:h-14"><div className="h-full rounded-md border border-white/80 bg-[linear-gradient(135deg,var(--origin-accent),#8b5cf6)] opacity-75" /></div>
        <p className="mt-1.5 text-[clamp(5px,1vw,8px)] font-semibold leading-tight text-slate-800">{step.compactTitle}</p>
        <p className="mt-0.5 truncate text-[clamp(4px,.75vw,6px)] text-slate-500">{step.compactMeta}</p>
      </div>
    </div>
  );
}

function MetricsPanel({ step }: { step: Step }) {
  return (
    <div className="origin-float-panel absolute bottom-[17%] right-0 z-20 w-[34%] -rotate-[3deg] rounded-xl border border-white/90 bg-white/90 p-2.5 shadow-[0_18px_45px_-24px_rgba(37,99,235,0.45)] sm:-right-[3%] sm:rounded-2xl sm:p-3.5">
      <div key={step.word} className="origin-panel-enter space-y-1.5 sm:space-y-2">
        {step.metrics.map(([label, value], index) => (
          <div key={label}>
            <div className="flex items-center justify-between gap-1 text-[clamp(4px,.8vw,7px)]"><span className="text-slate-500">{label}</span><span className="font-semibold text-slate-800">{value}</span></div>
            <span className="mt-0.5 block h-0.5 rounded-full bg-slate-100"><span className="block h-full rounded-full bg-[var(--origin-accent)]" style={{ width: `${88 - index * 14}%` }} /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const isPageVisible = usePageVisibility();
  const step = steps[phase];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setShouldReduceMotion(media.matches);
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: "120px 0px", threshold: 0.05 });
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => { media.removeEventListener("change", updateMotionPreference); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!isVisible || !isPageVisible || shouldReduceMotion) return;
    const timer = window.setInterval(() => setPhase((current) => (current + 1) % steps.length), PHASE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [isVisible, isPageVisible, phase, shouldReduceMotion]);

  const visualStyle = { "--origin-accent": step.color, "--origin-soft": step.softColor } as CSSProperties;

  return (
    <div ref={containerRef} data-motion-active={isVisible && isPageVisible} className="relative mx-auto aspect-[4/3.9] w-full max-w-[610px]" style={visualStyle} aria-label={`Origin of HTTPier: ${step.word}. ${step.note}`}>
      <div className="relative h-full overflow-visible">
        <div className="absolute inset-x-[7%] bottom-[21%] top-[7%] rounded-[42%] bg-[radial-gradient(circle_at_50%_43%,rgba(255,255,255,0.98)_0%,rgba(239,246,255,0.82)_44%,rgba(238,242,255,0.35)_68%,transparent_78%)]" />
        <div className="absolute inset-x-[6%] bottom-[21%] top-[7%] bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_73%)]" />
        <div className="absolute -right-[18%] -top-[22%] size-[58%] rounded-full bg-[var(--origin-soft)] opacity-75 blur-3xl transition-colors duration-700" />
        <div className="absolute -bottom-[24%] -left-[16%] size-[54%] rounded-full bg-cyan-100/70 blur-3xl" />

        <div className="absolute left-1/2 top-[1%] z-30 flex h-10 w-max -translate-x-1/2 items-center rounded-full border border-blue-100/80 bg-white/90 px-3.5 shadow-[0_12px_35px_-22px_rgba(37,99,235,0.55)] backdrop-blur-md sm:h-11 sm:px-4">
          <div className="flex items-center gap-2"><Image src="/brand/httpier-mark.png" alt="" width={30} height={20} className="h-4 w-auto" /><span className="font-mono-tight text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink)]">Origin of HTTPier</span></div>
        </div>

        <div className="absolute inset-x-[-2%] bottom-[22%] top-[8%] overflow-visible sm:inset-x-[-5%]">
          <svg aria-hidden="true" viewBox="0 0 560 320" className="absolute inset-0 h-full w-full opacity-45">
            <path d="M24 170C88 42 452 38 536 170S454 302 280 260 82 286 24 170Z" fill="none" stroke="url(#origin-orbit)" strokeWidth="1.3" />
            <path d="M72 244C142 300 420 284 494 112" fill="none" stroke="url(#origin-orbit)" strokeWidth="1" strokeDasharray="5 8" />
            <circle cx="24" cy="170" r="4" fill="#2563eb" /><circle cx="494" cy="112" r="4" fill="#06b6d4" /><circle cx="422" cy="276" r="4" fill="#8b5cf6" />
            <defs><linearGradient id="origin-orbit" x1="24" y1="0" x2="536" y2="0"><stop stopColor="#2563eb" /><stop offset=".5" stopColor="#06b6d4" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient></defs>
          </svg>
          <BrowserPanel step={step} /><ScorePanel step={step} /><CompactPanel step={step} /><MetricsPanel step={step} />
          <div className="pointer-events-none absolute inset-0 z-[25] flex items-center justify-center px-6 text-center">
            <div key={step.word} className="origin-word-enter -translate-y-[2%]">
              <p className="font-mono-tight text-[7px] font-semibold uppercase tracking-[0.22em] text-[var(--origin-accent)] sm:text-[9px]">{step.eyebrow}</p>
              <div className={`origin-chrome-word mt-2 px-[0.08em] py-[0.1em] font-semibold leading-[1.08] tracking-[-0.07em] ${step.lines.length > 1 ? "text-[clamp(2.7rem,10.5vw,5rem)]" : "text-[clamp(3.8rem,14vw,7rem)]"}`}>
                {step.lines.map((line) => <span key={line} className="block">{line}</span>)}
              </div>
              <p className="mx-auto mt-1 max-w-[230px] text-[8px] font-medium text-slate-600 sm:text-[10px]">{step.note}</p>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-[6%] bottom-0 z-30 rounded-2xl border border-white bg-white/92 p-3.5 shadow-[0_16px_44px_-28px_rgba(10,14,26,0.32)] backdrop-blur-md sm:inset-x-[9%] sm:p-4">
          <p className="text-[9px] leading-[1.55] text-[var(--color-ink-soft)] sm:text-[11px] sm:leading-[1.6]">HTTPier begins with <strong className={phase === 0 ? "text-blue-600" : "text-[var(--color-ink)]"}>HTTP</strong>, raises the experience to a <strong className={phase === 1 ? "text-cyan-600" : "text-[var(--color-ink)]"}>Higher Tier</strong>, and creates <strong className={phase === 2 ? "text-violet-600" : "text-[var(--color-ink)]"}>Happier</strong> businesses and customers.</p>
          <div className="mt-1 grid grid-cols-3 gap-1.5" role="group" aria-label="Choose an origin story stage">
            {steps.map((item, index) => (
              <button key={item.word} type="button" onClick={() => setPhase(index)} aria-label={`Show ${item.word}`} aria-pressed={index === phase} className="relative flex h-5 items-center">
                <span className="block h-1 w-full overflow-hidden rounded-full bg-slate-200">
                  {index === phase && <span key={`${item.word}-${phase}`} className={`block h-full origin-left rounded-full bg-[var(--origin-accent)] ${isVisible && isPageVisible && !shouldReduceMotion ? "origin-progress-fill" : "w-full"}`} />}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-center font-mono-tight text-[7px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-[8px]">HTTP. Higher Tier. Happier. That&rsquo;s HTTPier.</p>
        </div>
      </div>
    </div>
  );
}
