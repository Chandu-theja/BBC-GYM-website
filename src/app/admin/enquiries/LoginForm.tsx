"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="mx-auto mt-24 max-w-sm px-5">
      <h1 className="display text-3xl text-bone">Lead inbox</h1>
      <p className="mt-2 text-sm text-muted">Staff only.</p>
      <input
        type="password"
        name="password"
        required
        autoComplete="current-password"
        placeholder="Password"
        aria-label="Admin password"
        className="mt-6 w-full rounded-lg border border-ink-line bg-ink px-4 py-3 text-bone placeholder:text-muted focus:border-gold focus:outline-none"
      />
      {error && (
        <p role="alert" className="mt-2 text-sm text-gold">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 w-full rounded-full bg-gold py-3 font-bold text-ink disabled:opacity-60"
      >
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
