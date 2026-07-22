"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { CareerConstellation } from "@/components/landing/career-constellation";

const headlineWords = ["Experience", "your", "dream", "career", "before", "choosing", "it."];

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative mesh-aurora bg-aurora-glow overflow-hidden pb-24 pt-36 md:pt-44"
    >
      {/* faint grid, fades toward the bottom */}
      <div className="pointer-events-none absolute inset-0 grid-overlay" />

      <div className="container relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Copy column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-glass px-3.5 py-1.5 text-xs text-muted"
            >
              <Sparkles className="h-3.5 w-3.5 text-secondary-400" />
              42+ careers, simulated with AI — free to start
            </motion.div>

            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    "mr-3 inline-block " +
                    (word === "career" || word === "choosing"
                      ? "text-gradient"
                      : "text-foreground")
                  }
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-6 max-w-xl text-lg text-muted"
            >
              Stop guessing from a job title. Run a realistic, AI-powered day-in-the-life
              simulation — real Slack messages, real deliverables, a real manager — and get a
              compatibility score before you commit four years to it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/quiz"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_10px_30px_-10px_rgba(99,102,241,0.5)] transition-transform hover:scale-[1.02]"
              >
                Take the free career quiz
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#careers"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-glass px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.06]"
              >
                Browse careers
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-10 flex items-center gap-6 text-xs text-muted"
            >
              <div className="flex -space-x-2.5">
                {["#6366F1", "#14B8A6", "#F472B6", "#818CF8"].map((c, i) => (
                  <span
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-background"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span>Joined by 128,000+ students exploring what&apos;s next</span>
            </motion.div>
          </div>

          {/* Visual column: dashboard preview + constellation signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <CareerConstellation />

            {/* Floating dashboard preview card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="gradient-border absolute -bottom-6 -left-4 w-56 shadow-2xl sm:w-64"
            >
              <div className="glass-strong rounded-[1.24rem] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-muted">Compatibility score</span>
                  <TrendingUp className="h-3.5 w-3.5 text-secondary-400" />
                </div>
                <div className="mb-1 font-display text-3xl font-semibold">87%</div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "87%" }}
                    transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-400"
                  />
                </div>
                <p className="mt-3 text-[11px] text-muted">AI Engineer · Simulation complete</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="glass absolute -top-4 -right-2 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-xl sm:right-2"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-500/20">
                <Zap className="h-3.5 w-3.5 text-accent-400" />
              </span>
              <div className="leading-tight">
                <div className="text-xs font-medium">+240 XP</div>
                <div className="text-[10px] text-muted">Sprint standup done</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
