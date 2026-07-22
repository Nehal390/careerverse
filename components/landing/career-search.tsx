"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

const suggestions = ["AI Engineer", "UX Designer", "Doctor", "Product Manager", "Pilot"];

export function CareerSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/careers?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section className="relative -mt-6 pb-4">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="gradient-border mx-auto max-w-2xl shadow-2xl"
        >
          <div className="glass-strong flex items-center gap-3 rounded-[1.24rem] px-5 py-4">
            <Search className="h-4.5 w-4.5 shrink-0 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 42+ careers — try “Data Scientist” or “Architect”"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
            <button
              type="submit"
              className="hidden shrink-0 items-center gap-1.5 rounded-lg bg-foreground/10 px-3.5 py-2 text-xs font-medium transition-colors hover:bg-foreground/20 sm:flex"
            >
              Search
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted">Popular:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => router.push(`/careers?q=${encodeURIComponent(s)}`)}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-primary-500/50 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
