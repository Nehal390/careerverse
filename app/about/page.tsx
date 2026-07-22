import type { Metadata } from "next";
import { Target, Users, Sparkles, Heart } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "Why we built CareerVerse AI, and what we believe about choosing a career.",
};

const values = [
  {
    icon: Target,
    title: "Clarity over certainty",
    description:
      "We're not here to tell you the one right career. We're here to replace vague guesses with a real, felt sense of what a job actually involves.",
  },
  {
    icon: Users,
    title: "Built for people who haven't decided yet",
    description:
      "High schoolers, college students switching majors, career switchers starting over — this is for anyone standing at a fork in the road.",
  },
  {
    icon: Sparkles,
    title: "Realistic, not gamified fluff",
    description:
      "Our simulations are built from how the work actually happens — real messages, real tradeoffs — not trivia questions with a career label attached.",
  },
  {
    icon: Heart,
    title: "Honest about AI's role",
    description:
      "We use AI to build realistic scenarios and generate feedback, but we're upfront when a feature is still evolving. No fake polish.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="About us"
          title="We built the thing we wish existed at 17"
          description="A career quiz gave us a label. It never told us what the actual work would feel like on a Tuesday."
        />

        <section className="py-16">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-semibold">Our story</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
              <p>
                CareerVerse AI started from a simple, frustrating pattern we kept seeing: people
                picking a major, a bootcamp, or a first job based on a title and a vibe — then
                discovering two years in that the actual day-to-day work wasn't what they imagined.
              </p>
              <p>
                Career quizzes weren't the answer. They're built on self-reported personality
                traits, and they hand you a label, not an experience. Job shadowing is the real
                gold standard, but it's slow, hard to access, and rarely available for more than
                one or two careers.
              </p>
              <p>
                So we built something in between: realistic, AI-powered simulations that put you
                inside a specific day at a specific job — the Slack messages, the ambiguous
                requests, the deadline pressure — so you can feel whether it fits before you commit
                years of your life to finding out the hard way.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface/40 py-16">
          <div className="container">
            <h2 className="mb-10 text-center font-display text-2xl font-semibold">What we believe</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((v) => (
                <div key={v.title} className="card p-6">
                  <v.icon className="mb-4 h-5 w-5 text-secondary-400" />
                  <h3 className="font-medium">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-semibold">Where we're headed</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              We're early. The career library and simulation engine are growing every month, and
              we're building toward a full learning path that connects a simulation you loved to
              the courses and projects that actually get you there. If you have feedback, we
              genuinely want to hear it — reach out any time.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
