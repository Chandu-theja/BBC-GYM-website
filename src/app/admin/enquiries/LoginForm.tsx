"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="mx-auto mt-24 max-w-sm px-5">
      <h1 className="display text-3xl text-steel">Lead inbox</h1>
      <p className="mt-2 text-sm text-smoke">Staff only.</p>
      <input
        type="password"
        name="password"
        required
        autoComplete="current-password"
        placeholder="Password"
        aria-label="Admin password"
        className="mt-6 w-full rounded-lg border border-ink-line bg-ink px-4 py-3 text-steel placeholder:text-smoke/60 focus:border-flame-orange focus:outline-none"
      />
      {error && (
        <p role="alert" className="mt-2 text-sm text-flame-red">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 w-full rounded-full flame-bg py-3 font-bold text-ink disabled:opacity-60"
      >
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
