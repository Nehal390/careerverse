"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, SearchX, Wifi, SlidersHorizontal, X } from "lucide-react";
import { careers, categoryMeta, type CategorySlug } from "@/lib/careers";
import { formatSalary, cn } from "@/lib/utils";

const demandColor: Record<string, string> = {
  "Very High": "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  High: "text-secondary-400 bg-secondary-400/10",
  Moderate: "text-muted bg-foreground/5",
  Emerging: "text-accent-400 bg-accent-400/10",
};

const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;
const categorySlugs = Object.keys(categoryMeta) as CategorySlug[];

export function CareersExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<string>(searchParams.get("category") ?? "all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return careers.filter((c) => {
      const matchesQuery =
        query.trim() === "" ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.shortDescription.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || c.category === category;
      const matchesDifficulty = difficulty === "all" || c.difficulty === difficulty;
      const matchesRemote = !remoteOnly || c.remote;
      return matchesQuery && matchesCategory && matchesDifficulty && matchesRemote;
    });
  }, [query, category, difficulty, remoteOnly]);

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setDifficulty("all");
    setRemoteOnly(false);
    router.replace("/careers");
  }

  const hasActiveFilters =
    query !== "" || category !== "all" || difficulty !== "all" || remoteOnly;

  return (
    <div className="container pb-24">
      {/* Search bar */}
      <div className="gradient-border mx-auto max-w-2xl shadow-xl">
        <div className="glass-strong flex items-center gap-3 rounded-[1.24rem] px-5 py-4">
          <Search className="h-4.5 w-4.5 shrink-0 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search careers by title or description…"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search">
              <X className="h-4 w-4 text-muted hover:text-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile filter toggle */}
      <div className="mt-6 flex items-center justify-between md:hidden">
        <span className="text-sm text-muted">{filtered.length} careers</span>
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[240px_1fr]">
        {/* Filters sidebar */}
        <aside className={cn("space-y-8", filtersOpen ? "block" : "hidden md:block")}>
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
              Category
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={() => setCategory("all")}
                className={cn(
                  "block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors",
                  category === "all" ? "bg-primary-500/15 text-primary-400" : "text-muted hover:text-foreground"
                )}
              >
                All categories
              </button>
              {categorySlugs.map((slug) => (
                <button
                  key={slug}
                  onClick={() => setCategory(slug)}
                  className={cn(
                    "block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors",
                    category === slug ? "bg-primary-500/15 text-primary-400" : "text-muted hover:text-foreground"
                  )}
                >
                  {categoryMeta[slug].name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
              Difficulty
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={() => setDifficulty("all")}
                className={cn(
                  "block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors",
                  difficulty === "all" ? "bg-primary-500/15 text-primary-400" : "text-muted hover:text-foreground"
                )}
              >
                Any level
              </button>
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors",
                    difficulty === d ? "bg-primary-500/15 text-primary-400" : "text-muted hover:text-foreground"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
              Work style
            </h3>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="h-4 w-4 rounded border-border bg-transparent accent-primary-500"
              />
              Remote-friendly only
            </label>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-primary-400 underline-offset-2 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </aside>

        {/* Results */}
        <div>
          <div className="mb-4 hidden items-center justify-between md:flex">
            <span className="text-sm text-muted">{filtered.length} careers</span>
          </div>

          {filtered.length === 0 ? (
            <div className="card flex flex-col items-center p-12 text-center">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5">
                <SearchX className="h-5 w-5 text-muted" />
              </span>
              <p className="text-sm text-muted">
                No careers match those filters yet. Try clearing a filter or searching a
                different term.
              </p>
              <button onClick={clearFilters} className="btn-secondary mt-5 px-4 py-2 text-xs">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((career) => (
                <Link
                  key={career.slug}
                  href={`/careers/${career.slug}`}
                  className="card-interactive group relative block overflow-hidden p-6"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.08] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.14]"
                    style={{
                      background: `linear-gradient(135deg, ${career.gradient[0]}, ${career.gradient[1]})`,
                    }}
                  />
                  <div className="mb-4 flex items-start justify-between">
                    <span className="text-xs text-muted">{categoryMeta[career.category].name}</span>
                    {career.remote && (
                      <span className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted">
                        <Wifi className="h-3 w-3" /> Remote
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{career.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{career.shortDescription}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-base font-medium">
                        {formatSalary(career.salaryMin)}–{formatSalary(career.salaryMax)}
                      </div>
                      <div className="text-[11px] text-muted">annual salary range</div>
                    </div>
                    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", demandColor[career.demand])}>
                      {career.demand}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
