"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Zap,
  MessageSquare,
  Mail,
  ClipboardList,
  Users,
  TrendingUp,
  Award,
  RotateCcw,
} from "lucide-react";
import type { Career } from "@/lib/careers";
import { cn } from "@/lib/utils";

const channelIcon = {
  slack: MessageSquare,
  email: Mail,
  task: ClipboardList,
  meeting: Users,
};

type Phase = "briefing" | "running" | "results";

export function SimulationRunner({ career }: { career: Career }) {
  const [phase, setPhase] = useState<Phase>("briefing");
  const [stepIndex, setStepIndex] = useState(0);
  const [choices, setChoices] = useState<number[]>([]);

  const totalSteps = career.simulation.steps.length;
  const currentStep = career.simulation.steps[stepIndex];

  function selectOption(optionIndex: number) {
    const next = [...choices, optionIndex];
    setChoices(next);
    if (stepIndex + 1 < totalSteps) {
      setStepIndex(stepIndex + 1);
    } else {
      setPhase("results");
    }
  }

  function restart() {
    setPhase("briefing");
    setStepIndex(0);
    setChoices([]);
  }

  // The first-listed option in each step represents the strongest response —
  // score reflects how often that thoughtful choice was picked, with a floor
  // so no attempt reads as a total failure.
  const strongChoices = choices.filter((c) => c === 0).length;
  const rawScore = totalSteps === 0 ? 0 : Math.round((strongChoices / totalSteps) * 100);
  const compatibilityScore = Math.max(58, rawScore);

  return (
    <div className="container max-w-3xl">
      <AnimatePresence mode="wait">
        {phase === "briefing" && (
          <motion.div
            key="briefing"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-4 text-xs text-muted">
              <Link href={`/careers/${career.slug}`} className="hover:text-foreground">
                {career.title}
              </Link>{" "}
              / Simulation
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {career.simulation.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">{career.simulation.briefing}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted">
                <Clock className="h-3.5 w-3.5" /> ~{career.simulation.estimatedMinutes} min
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted">
                <Zap className="h-3.5 w-3.5 text-accent-400" /> +{career.simulation.xpReward} XP
              </span>
              <span className="rounded-full border border-border px-3 py-1.5 text-xs text-muted">
                {totalSteps} scenario steps
              </span>
            </div>

            <div className="mt-10 card p-6">
              <h2 className="text-sm font-medium">What to expect</h2>
              <p className="mt-2 text-sm text-muted">
                You'll get a series of realistic messages and tasks, the way they'd actually arrive at
                this job — Slack pings, a manager's ask, a task handoff. Pick how you'd respond. At the
                end you'll get a compatibility score and a breakdown of your strengths.
              </p>
            </div>

            <button
              onClick={() => setPhase("running")}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Begin simulation
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {phase === "running" && currentStep && (
          <motion.div
            key={`step-${stepIndex}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-6 flex items-center gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-full",
                    i < stepIndex ? "bg-primary-500" : i === stepIndex ? "bg-primary-500/50" : "bg-foreground/10"
                  )}
                />
              ))}
            </div>
            <div className="mb-2 text-xs text-muted">
              Step {stepIndex + 1} of {totalSteps}
            </div>

            <div className="gradient-border">
              <div className="glass-strong rounded-[1.24rem] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/10">
                    {(() => {
                      const Icon = channelIcon[currentStep.channel];
                      return <Icon className="h-4.5 w-4.5 text-secondary-400" />;
                    })()}
                  </span>
                  <div>
                    <div className="text-sm font-medium">{currentStep.from}</div>
                    <div className="text-[11px] uppercase tracking-wide text-muted">
                      {currentStep.channel}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">"{currentStep.message}"</p>
              </div>
            </div>

            <h3 className="mb-4 mt-8 text-sm font-medium">{currentStep.prompt}</h3>
            <div className="space-y-3">
              {currentStep.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => selectOption(i)}
                  className="block w-full rounded-xl border border-border bg-surface p-4 text-left text-sm text-foreground/90 transition-colors hover:border-primary-500/50 hover:bg-foreground/5"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center">
              <span className="text-xs font-medium uppercase tracking-widest text-secondary-400">
                Simulation complete
              </span>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Your {career.title} compatibility score
              </h1>
            </div>

            <div className="mx-auto mt-10 max-w-sm">
              <div className="gradient-border shadow-2xl">
                <div className="glass-strong rounded-[1.24rem] p-8 text-center">
                  <div className="font-display text-6xl font-semibold text-gradient">
                    {compatibilityScore}%
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${compatibilityScore}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-400"
                    />
                  </div>
                  <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
                    <Zap className="h-3.5 w-3.5 text-accent-400" /> +{career.simulation.xpReward} XP earned
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="card p-6">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Strengths this run showed
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  {career.skills.slice(0, 3).map((s) => (
                    <li key={s}>· Judgment calls consistent with strong {s.toLowerCase()}</li>
                  ))}
                </ul>
              </div>
              <div className="card p-6">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <Award className="h-4 w-4 text-primary-400" /> Suggested next step
                </h3>
                <p className="text-sm text-muted">
                  Start with{" "}
                  <span className="text-foreground">{career.roadmap[0]?.title ?? "the fundamentals"}</span> —
                  {" "}{career.roadmap[0]?.description}
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-primary-500/30 bg-primary-500/5 p-6 text-center">
              <p className="text-sm text-muted">
                Sign in to save this result to your dashboard and unlock a downloadable certificate.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/sign-up"
                  className="rounded-xl bg-foreground px-5 py-2.5 text-xs font-medium text-background"
                >
                  Create free account
                </Link>
                <button
                  onClick={restart}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border px-5 py-2.5 text-xs text-muted hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Run again
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/careers" className="text-xs text-muted hover:text-foreground">
                ← Explore more careers
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
