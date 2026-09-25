"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/login/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label htmlFor="password" className="text-sm font-medium text-[var(--color-ink)]">
          Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="mt-2 h-12 w-full rounded-xl border border-[var(--color-line)] bg-white px-4 text-base text-[var(--color-ink)] shadow-sm transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[var(--color-blue)] focus:outline-none focus:ring-4 focus:ring-blue-500/10"
          placeholder="Enter your password"
        />
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
        {pending ? "Signing in..." : "Continue to invoices"}
      </button>
    </form>
  );
}
