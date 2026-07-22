"use client";

import { motion } from "framer-motion";
import { ClipboardList, PlayCircle, Award, Compass as CompassIcon } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Take the 3-minute quiz",
    description:
      "Answer questions about how you think and what energizes you. We surface your top 5 career matches with reasons, not just labels.",
  },
  {
    icon: PlayCircle,
    title: "Run a live simulation",
    description:
      "Step into a real Tuesday at that job: Slack messages, a manager, a deliverable, a deadline. The AI adapts to how you respond.",
  },
  {
    icon: CompassIcon,
    title: "See your compatibility score",
    description:
      "Get a breakdown of your strengths, your gaps, and a learning path tailored to close them — not a generic percentage.",
  },
  {
    icon: Award,
    title: "Earn a shareable certificate",
    description:
      "Download a PDF or post straight to LinkedIn. It's proof you looked before you leaped, not just a personality label.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-primary-400">
            The process
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            From unsure to certain, in four steps
          </h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface font-display text-sm text-primary-400">
                0{i + 1}
              </div>
              <step.icon className="mb-3 h-5 w-5 text-secondary-400" />
              <h3 className="font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
