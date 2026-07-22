"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { categoryMeta, type CategorySlug } from "@/lib/careers";

const stageOptions = ["High school", "College student", "Recent graduate", "Career switcher"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<string | null>(null);
  const [interests, setInterests] = useState<CategorySlug[]>([]);

  function toggleInterest(slug: CategorySlug) {
    setInterests((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function finish() {
    // Preferences will be written to the profiles table once the backend
    // phase lands; for now they personalize this session's recommendations.
    router.push("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <div className="mesh-aurora pointer-events-none absolute inset-0" />
      <div className="relative w-full max-w-lg">
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
            <Compass className="h-4.5 w-4.5 text-white" strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            CareerVerse<span className="text-primary-400">AI</span>
          </span>
        </div>

        <div className="mb-8 flex items-center gap-2">
          {[0, 1].map((i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary-500" : "bg-foreground/10"}`} />
          ))}
        </div>

        <div className="gradient-border shadow-2xl">
          <div className="glass-strong rounded-[1.24rem] p-8">
            {step === 0 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-display text-2xl font-semibold">Where are you right now?</h1>
                <p className="mt-2 text-sm text-muted">This helps us calibrate simulation difficulty.</p>
                <div className="mt-6 space-y-2.5">
                  {stageOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStage(s)}
                      className={`block w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        stage === s
                          ? "border-primary-500/60 bg-primary-500/10 text-foreground"
                          : "border-border text-muted hover:bg-foreground/5"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  disabled={!stage}
                  onClick={() => setStep(1)}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-5 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-display text-2xl font-semibold">What sounds interesting?</h1>
                <p className="mt-2 text-sm text-muted">Pick as many as you like — you can change this later.</p>
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {(Object.keys(categoryMeta) as CategorySlug[]).map((slug) => (
                    <button
                      key={slug}
                      onClick={() => toggleInterest(slug)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        interests.includes(slug)
                          ? "border-primary-500/60 bg-primary-500/10 text-foreground"
                          : "border-border text-muted hover:bg-foreground/5"
                      }`}
                    >
                      {categoryMeta[slug].name}
                    </button>
                  ))}
                </div>
                <button
                  disabled={interests.length === 0}
                  onClick={finish}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-5 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                >
                  Go to my dashboard
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
