"use client";

import { useActionState, useState } from "react";
import { loginAction, resetAdminPasswordAction, type LoginState } from "@/app/login/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);
  const [resetState, resetAction, resetPending] = useActionState(resetAdminPasswordAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-8">
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="email" className="text-sm font-medium">Admin email</label>
        <input id="email" name="email" type="email" autoComplete="username" required autoFocus maxLength={254}
          className="mt-2 h-12 w-full rounded-xl border border-[var(--color-line)] bg-white px-4 text-base focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10" />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-[var(--color-ink)]">
          Admin password
        </label>
        <div className="relative mt-2">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          required
          className="h-12 w-full rounded-xl border border-[var(--color-line)] bg-white py-3 pl-4 pr-14 text-base text-[var(--color-ink)] shadow-sm transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[var(--color-blue)] focus:outline-none focus:ring-4 focus:ring-blue-500/10"
          placeholder="Enter your password"
        />
        <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"} aria-controls="password" aria-pressed={showPassword} className="absolute inset-y-0 right-1 my-auto flex size-11 items-center justify-center rounded-lg text-[var(--color-ink-soft)] transition hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{showPassword && <path d="m3 3 18 18" />}</svg>
        </button>
        </div>
      </div>
      {state.error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--color-ink)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-blue)] disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in to admin"}
      </button>
    </form>
    <form action={resetAction} className="mt-5 border-t border-[var(--color-line)] pt-4">
      <button type="submit" disabled={resetPending || pending} className="min-h-11 text-sm font-medium text-[var(--color-blue)] underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-wait disabled:opacity-60">{resetPending ? "Requesting reset..." : "Forgot password? Reset password"}</button>
      <p className="mt-1 text-xs leading-5 text-[var(--color-ink-soft)]">The reset link goes only to the configured admin email. No alternate email is needed.</p>
      {resetState.success && <p role="status" className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm leading-5 text-blue-950">{resetState.success}</p>}
      {resetState.error && <p role="alert" className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-5 text-red-700">{resetState.error}</p>}
    </form>
    </div>
  );
}
