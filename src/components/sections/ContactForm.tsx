"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { projectTypes, timelines } from "@/lib/data";

type FormState = {
  name: string;
  company: string;
  email: string;
  goal: string;
  projectType: string;
  timeline: string;
  details: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  goal: "",
  projectType: "",
  timeline: "",
  details: "",
};

function PillGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[14px] font-medium text-[var(--color-ink)]">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-[13.5px] transition-colors duration-200 ${
                active
                  ? "border-transparent bg-[var(--color-ink)] text-white"
                  : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-blue)]/40"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!form.email.trim()) {
      next.email = "Enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.goal.trim()) next.goal = "Tell us what you want to build.";
    if (!form.projectType) next.projectType = "Select a project type.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      // Placeholder submission - wire up to a real endpoint (email, CRM, etc).
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-10 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(100deg,var(--color-blue),var(--color-cyan))]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10.5L8 14.5L16 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-5 text-2xl font-medium tracking-tight text-[var(--color-ink)]">
          Thanks - that&rsquo;s on its way.
        </h3>
        <p className="mt-2 text-[15px] text-[var(--color-ink-soft)]">
          We&rsquo;ll get back to you within one business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-[14px] font-medium text-[var(--color-ink)]">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="mt-2 w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[15px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-blue)]"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-[13px] text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="text-[14px] font-medium text-[var(--color-ink)]">
            Company
          </label>
          <input
            id="company"
            type="text"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[15px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-blue)]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-[14px] font-medium text-[var(--color-ink)]">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="mt-2 w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[15px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-blue)]"
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-[13px] text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="goal" className="text-[14px] font-medium text-[var(--color-ink)]">
          What do you want to build?
        </label>
        <textarea
          id="goal"
          rows={3}
          value={form.goal}
          onChange={(e) => update("goal", e.target.value)}
          aria-invalid={Boolean(errors.goal)}
          aria-describedby={errors.goal ? "goal-error" : undefined}
          className="mt-2 w-full resize-none rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[15px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-blue)]"
        />
        {errors.goal && (
          <p id="goal-error" className="mt-1.5 text-[13px] text-red-600">
            {errors.goal}
          </p>
        )}
      </div>

      <div>
        <PillGroup
          label="Project type"
          options={projectTypes}
          value={form.projectType}
          onChange={(v) => update("projectType", v)}
        />
        {errors.projectType && (
          <p className="mt-1.5 text-[13px] text-red-600">{errors.projectType}</p>
        )}
      </div>

      <PillGroup
        label="Timeline"
        options={timelines}
        value={form.timeline}
        onChange={(v) => update("timeline", v)}
      />

      <div>
        <label htmlFor="details" className="text-[14px] font-medium text-[var(--color-ink)]">
          Project details{" "}
          <span className="font-normal text-[var(--color-ink-soft)]">(optional)</span>
        </label>
        <textarea
          id="details"
          rows={4}
          value={form.details}
          onChange={(e) => update("details", e.target.value)}
          className="mt-2 w-full resize-none rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[15px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-blue)]"
        />
      </div>

      {status === "error" && (
        <p className="text-[14px] text-red-600">
          Something went wrong sending your message. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,var(--color-blue)_0%,var(--color-cyan)_100%)] px-6 py-4 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.55)] transition-opacity disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Sending
          </>
        ) : (
          "Let's Build It"
        )}
      </button>
    </form>
  );
}
