"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Wifi } from "lucide-react";
import { quizQuestions } from "@/lib/quiz-data";
import { careers, categoryMeta, type CategorySlug } from "@/lib/careers";
import { formatSalary } from "@/lib/utils";

type Phase = "intro" | "running" | "results";

export function QuizFlow() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Partial<Record<CategorySlug, number>>>({});

  const question = quizQuestions[step];

  function selectOption(categoriesWeight: Partial<Record<CategorySlug, number>>) {
    const next = { ...scores };
    (Object.keys(categoriesWeight) as CategorySlug[]).forEach((cat) => {
      next[cat] = (next[cat] ?? 0) + (categoriesWeight[cat] ?? 0);
    });
    setScores(next);

    if (step + 1 < quizQuestions.length) {
      setStep(step + 1);
    } else {
      setPhase("results");
    }
  }

  function restart() {
    setPhase("intro");
    setStep(0);
    setScores({});
  }

  const rankedCategories = (Object.keys(scores) as CategorySlug[]).sort(
    (a, b) => (scores[b] ?? 0) - (scores[a] ?? 0)
  );

  const topCareers = (() => {
    const picked: typeof careers = [];
    for (const cat of rankedCategories) {
      const inCategory = careers
        .filter((c) => c.category === cat && !picked.includes(c))
        .sort((a, b) => (b.demand === "Very High" ? 1 : 0) - (a.demand === "Very High" ? 1 : 0));
      for (const c of inCategory) {
        if (picked.length >= 5) break;
        picked.push(c);
      }
      if (picked.length >= 5) break;
    }
    // Fill remaining slots from anywhere if fewer than 5 matched
    if (picked.length < 5) {
      for (const c of careers) {
        if (picked.length >= 5) break;
        if (!picked.includes(c)) picked.push(c);
      }
    }
    return picked;
  })();

  return (
    <div className="container max-w-2xl pb-24">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="text-center"
          >
            <p className="text-sm text-muted">
              {quizQuestions.length} quick questions, no right answers — just go with your gut.
            </p>
            <button
              onClick={() => setPhase("running")}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Start the quiz
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {phase === "running" && question && (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6 flex items-center gap-2">
              {quizQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < step ? "bg-primary-500" : i === step ? "bg-primary-500/50" : "bg-foreground/10"
                  }`}
                />
              ))}
            </div>
            <div className="mb-2 text-xs text-muted">
              Question {step + 1} of {quizQuestions.length}
            </div>
            <h2 className="mb-6 font-display text-2xl font-semibold">{question.question}</h2>
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => selectOption(option.categories)}
                  className="block w-full rounded-xl border border-border bg-surface p-4 text-left text-sm transition-colors hover:border-primary-500/50 hover:bg-foreground/5"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center">
              <span className="text-xs font-medium uppercase tracking-widest text-secondary-400">
                Your results
              </span>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                Your top career matches
              </h1>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                Based on your answers, these careers lean into the same instincts you just showed us.
                Run a simulation on any of them to see how it actually feels.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {topCareers.map((career, i) => (
                <Link
                  key={career.slug}
                  href={`/careers/${career.slug}`}
                  className="group flex items-center justify-between gap-4 card p-5 transition-colors hover:border-primary-500/40"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-lg text-muted">0{i + 1}</span>
                    <div>
                      <div className="font-medium">{career.title}</div>
                      <div className="mt-0.5 text-xs text-muted">
                        {categoryMeta[career.category].name} · matches your{" "}
                        {rankedCategories[0] === career.category ? "top" : "secondary"} interest
                      </div>
                    </div>
                  </div>
                  <div className="hidden text-right sm:block">
                    <div className="font-mono text-sm">{formatSalary(career.salaryMin)}+</div>
                    {career.remote && (
                      <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted">
                        <Wifi className="h-3 w-3" /> Remote
                      </div>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-primary-500/30 bg-primary-500/5 p-6 text-center">
              <p className="text-sm text-muted">
                Sign in to save these results to your dashboard.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Link href="/sign-up" className="rounded-xl bg-foreground px-5 py-2.5 text-xs font-medium text-background">
                  Create free account
                </Link>
                <button
                  onClick={restart}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border px-5 py-2.5 text-xs text-muted hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Retake quiz
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
