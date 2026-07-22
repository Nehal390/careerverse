"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Wifi } from "lucide-react";
import { featuredCareers } from "@/lib/careers-data";
import { formatSalary } from "@/lib/utils";

const demandColor: Record<string, string> = {
  "Very High": "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  High: "text-secondary-400 bg-secondary-400/10",
  Emerging: "text-accent-400 bg-accent-400/10",
};

export function FeaturedCareers() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-accent-400">
              Featured
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Careers people are simulating right now
            </h2>
          </div>
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            View all careers
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCareers.map((career, i) => (
            <motion.div
              key={career.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
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
                  <span className="text-xs text-muted">{career.category}</span>
                  {career.remote && (
                    <span className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted">
                      <Wifi className="h-3 w-3" /> Remote-friendly
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl font-semibold">{career.title}</h3>
                <p className="mt-2 text-sm text-muted">{career.blurb}</p>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-lg font-medium">
                      {formatSalary(career.avgSalary)}
                    </div>
                    <div className="text-[11px] text-muted">avg. annual salary</div>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${demandColor[career.demand]}`}
                  >
                    {career.demand} demand
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
