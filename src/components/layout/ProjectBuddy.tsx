"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/data";
import { shouldHideSiteChrome } from "@/lib/site-chrome";

type AnswerKey = "projectType" | "goal" | "features" | "timeline" | "name";

type Question = {
  key: AnswerKey;
  prompt: string;
  type: "options" | "text" | "textarea";
  options?: readonly string[];
  placeholder?: string;
  optional?: boolean;
};

const questions: readonly Question[] = [
  {
    key: "projectType",
    prompt: "What would you like HTTPier to build?",
    type: "options",
    options: ["Website", "Web application", "SaaS product", "E-commerce", "Redesign", "Not sure yet"],
  },
  {
    key: "goal",
    prompt: "What should this project help your business achieve?",
    type: "textarea",
    placeholder: "For example: generate better leads, simplify bookings or launch a new product...",
  },
  {
    key: "features",
    prompt: "Any must-have features or references?",
    type: "textarea",
    placeholder: "Share features, links or anything useful. You can also skip this.",
    optional: true,
  },
  {
    key: "timeline",
    prompt: "When would you like to get started?",
    type: "options",
    options: ["As soon as possible", "Within a month", "1-3 months", "Just exploring"],
  },
  {
    key: "name",
    prompt: "Great. What should I call you?",
    type: "text",
    placeholder: "Your name or company name",
  },
] as const;

function createWhatsAppUrl(answers: Partial<Record<AnswerKey, string>>) {
  const message = [
    "Hi HTTPier, I planned my project with Hippy.",
    "",
    `Name / company: ${answers.name ?? "Not provided"}`,
    `Project: ${answers.projectType ?? "Not specified"}`,
    `Goal: ${answers.goal ?? "Not specified"}`,
    `Must-have features / references: ${answers.features || "Not specified"}`,
    `Timeline: ${answers.timeline ?? "Not specified"}`,
    "",
    "I would like to discuss the next steps.",
  ].join("\n");

  return `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export function ProjectBuddy() {
  const pathname = usePathname();
  const transcriptRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<AnswerKey, string>>>({});
  const [draft, setDraft] = useState("");

  const currentQuestion = questions[stepIndex];
  const isComplete = stepIndex >= questions.length;

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !transcriptRef.current) return;
    transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
  }, [isOpen, stepIndex]);

  if (shouldHideSiteChrome(pathname)) return null;

  function saveAnswer(value: string) {
    if (!currentQuestion) return;

    const cleanValue = value.trim();
    if (!cleanValue && !currentQuestion.optional) return;

    setAnswers((current) => ({ ...current, [currentQuestion.key]: cleanValue }));
    setDraft("");
    setStepIndex((current) => current + 1);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveAnswer(draft);
  }

  function resetConversation() {
    setAnswers({});
    setDraft("");
    setStepIndex(0);
  }

  return (
    <div className="site-interaction fixed bottom-4 right-3 z-[70] sm:bottom-5 sm:right-5">
      {isOpen && (
        <section
          id="httpier-project-buddy"
          role="dialog"
          aria-modal="false"
          aria-labelledby="project-buddy-title"
          className="absolute bottom-[calc(100%+0.75rem)] right-0 flex max-h-[min(42rem,calc(100svh-7rem))] w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-[0_30px_90px_-28px_rgba(15,45,100,0.45)] sm:w-[390px]"
        >
          <header className="relative overflow-hidden bg-[linear-gradient(135deg,#07101f,#102a56_62%,#164e63)] px-5 py-4 text-white">
            <div className="pointer-events-none absolute -right-10 -top-16 size-40 rounded-full bg-blue-500/30 blur-3xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-cyan-300/25 bg-white/10">
                  <Image
                    src="/buddy/hippy.png"
                    alt="Hippy, the HTTPier digital guide"
                    width={96}
                    height={96}
                    sizes="48px"
                    className="size-full object-contain p-0.5"
                  />
                </span>
                <div>
                  <h2 id="project-buddy-title" className="text-[15px] font-semibold">
                    Hippy
                  </h2>
                  <p className="mt-0.5 max-w-[220px] text-[11px] leading-snug text-cyan-100/70">
                    Your friendly guide to better digital experiences.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close project assistant"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none">
                  <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="relative mt-4 flex gap-1" aria-label={`Question ${Math.min(stepIndex + 1, questions.length)} of ${questions.length}`}>
              {questions.map((question, index) => (
                <span
                  key={question.key}
                  className={`h-1 flex-1 rounded-full ${index < stepIndex || isComplete ? "bg-cyan-300" : index === stepIndex ? "bg-blue-400" : "bg-white/15"}`}
                />
              ))}
            </div>
          </header>

          <div ref={transcriptRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#f5f8fd] px-4 py-5" aria-live="polite">
            <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-blue-100 bg-white px-4 py-3 text-[13px] leading-relaxed text-[var(--color-ink-soft)] shadow-sm">
              Welcome! I&rsquo;m Hippy, your friendly HTTPier guide. It&rsquo;s great to have you here. Tell me what you need, and I&rsquo;ll help shape the right digital experience for your business.
            </div>

            {questions.slice(0, stepIndex).map((question) => (
              <div key={question.key} className="space-y-2">
                <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-blue-100 bg-white px-4 py-3 text-[13px] leading-relaxed text-[var(--color-ink-soft)] shadow-sm">
                  {question.prompt}
                </div>
                <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-[var(--color-blue)] px-4 py-3 text-[13px] leading-relaxed text-white">
                  {answers[question.key] || "No preference"}
                </div>
              </div>
            ))}

            {!isComplete && currentQuestion && (
              <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-blue-100 bg-white px-4 py-3 text-[13px] leading-relaxed text-[var(--color-ink)] shadow-sm">
                {currentQuestion.prompt}
              </div>
            )}

            {isComplete && (
              <div className="rounded-2xl border border-cyan-200 bg-white p-4 shadow-sm">
                <p className="text-[14px] font-semibold text-[var(--color-ink)]">Your enquiry is ready.</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--color-ink-soft)]">
                  Review it in WhatsApp, add anything else you want us to know, then tap Send.
                </p>
                <a
                  href={createWhatsAppUrl(answers)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-[13px] font-semibold text-[#062f17] transition hover:-translate-y-0.5 hover:bg-[#35df75]"
                >
                  Continue on WhatsApp
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={resetConversation}
                  className="mt-3 w-full text-center text-[11px] font-medium text-[var(--color-blue)] hover:underline"
                >
                  Start again
                </button>
              </div>
            )}
          </div>

          {!isComplete && currentQuestion && (
            <div className="border-t border-[var(--color-line)] bg-white p-4">
              {currentQuestion.type === "options" ? (
                <div className="flex flex-wrap gap-2">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => saveAnswer(option)}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-left text-[12px] font-medium text-blue-800 transition hover:border-blue-400 hover:bg-blue-100"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <form key={currentQuestion.key} onSubmit={handleSubmit} className="space-y-2.5">
                  {currentQuestion.type === "textarea" ? (
                    <textarea
                      autoFocus
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder={currentQuestion.placeholder}
                      rows={3}
                      className="w-full resize-none rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] px-3.5 py-3 text-[13px] text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
                    />
                  ) : (
                    <input
                      autoFocus
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] px-3.5 text-[13px] text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
                    />
                  )}
                  <div className="flex items-center justify-end gap-3">
                    {currentQuestion.optional && (
                      <button type="button" onClick={() => saveAnswer("")} className="text-[12px] font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                        Skip
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={!draft.trim() && !currentQuestion.optional}
                      className="rounded-full bg-[var(--color-blue)] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="httpier-project-buddy"
        aria-label={isOpen ? "Close Hippy" : "Chat with Hippy"}
        className="ml-auto flex h-13 items-center gap-2.5 rounded-full border border-blue-200 bg-white px-3.5 text-[13px] font-semibold text-[var(--color-ink)] shadow-[0_12px_34px_-14px_rgba(37,99,235,0.5)] transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-[0_16px_38px_-12px_rgba(37,99,235,0.6)]"
      >
        <span className="relative grid size-9 place-items-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#dbeafe,#cffafe)]">
          <Image
            src="/buddy/hippy.png"
            alt=""
            width={72}
            height={72}
            sizes="36px"
            className="size-full object-contain p-0.5"
          />
        </span>
        <span className="hidden sm:inline">Chat with Hippy</span>
      </button>
    </div>
  );
}
