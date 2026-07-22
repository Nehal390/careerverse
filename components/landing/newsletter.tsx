"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email to continue.");
      return;
    }
    setError("");
    setSubmitted(true);
    // Wired to /api/newsletter route once the backend phase lands.
  }

  return (
    <section className="py-24">
      <div className="container">
        <div className="gradient-border mx-auto max-w-3xl">
          <div className="mesh-aurora glass-strong rounded-[1.24rem] px-8 py-14 text-center sm:px-16">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              New careers, dropped monthly
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted">
              One email a month: a new simulation, a real salary breakdown, and what AI actually
              changed in that field this quarter.
            </p>

            {submitted ? (
              <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                You&apos;re on the list — check your inbox to confirm.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field py-3"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
                >
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
            {error && <p className="mt-3 text-xs text-accent-400">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
