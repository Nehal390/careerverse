import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Wifi,
  GraduationCap,
  TrendingUp,
  Sparkles,
  Wrench,
  Award,
  FolderGit2,
  MessageCircleQuestion,
} from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { careers, categoryMeta, getCareerBySlug } from "@/lib/careers";
import { formatSalary } from "@/lib/utils";

export function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const career = getCareerBySlug(slug);
  if (!career) return { title: "Career not found" };
  return {
    title: career.title,
    description: career.shortDescription,
  };
}

const demandColor: Record<string, string> = {
  "Very High": "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  High: "text-secondary-400 bg-secondary-400/10 border-secondary-400/20",
  Moderate: "text-muted bg-foreground/5 border-border",
  Emerging: "text-accent-400 bg-accent-400/10 border-accent-400/20",
};

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const career = getCareerBySlug(slug);
  if (!career) notFound();

  const related = careers.filter((c) => c.category === career.category && c.slug !== career.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative mesh-aurora overflow-hidden pb-16 pt-36 md:pt-44">
          <div className="pointer-events-none absolute inset-0 grid-overlay" />
          <div className="container relative">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted">
              <Link href="/careers" className="hover:text-foreground">
                Career library
              </Link>
              <span>/</span>
              <Link href={`/careers?category=${career.category}`} className="hover:text-foreground">
                {categoryMeta[career.category].name}
              </Link>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div>
                <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  {career.title}
                </h1>
                <p className="mt-4 max-w-xl text-lg text-muted">{career.shortDescription}</p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${demandColor[career.demand]}`}>
                    {career.demand} demand
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {career.difficulty}
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    AI impact: {career.aiImpact}
                  </span>
                  {career.remote && (
                    <span className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-muted">
                      <Wifi className="h-3 w-3" /> Remote-friendly
                    </span>
                  )}
                </div>
              </div>

              <div className="gradient-border shadow-xl">
                <div className="glass-strong rounded-[1.24rem] p-6">
                  <div className="mb-1 text-xs text-muted">Annual salary range</div>
                  <div className="font-display text-2xl font-semibold">
                    {formatSalary(career.salaryMin)} – {formatSalary(career.salaryMax)}
                  </div>
                  <Link
                    href={`/careers/${career.slug}/simulate`}
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                  >
                    Start simulation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-3 text-center text-[11px] text-muted">
                    {career.simulation.estimatedMinutes} min · +{career.simulation.xpReward} XP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview + Day in life */}
        <section className="py-16">
          <div className="container grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold">Overview</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{career.overview}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">A day in the life</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{career.dayInLife}</p>
            </div>
          </div>
        </section>

        {/* Future outlook */}
        <section className="border-y border-border bg-surface/40 py-16">
          <div className="container grid gap-8 sm:grid-cols-3">
            <div className="flex gap-3">
              <TrendingUp className="h-5 w-5 shrink-0 text-secondary-400" />
              <div>
                <h3 className="text-sm font-medium">Future outlook</h3>
                <p className="mt-1 text-sm text-muted">{career.futureOutlook}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <GraduationCap className="h-5 w-5 shrink-0 text-primary-400" />
              <div>
                <h3 className="text-sm font-medium">Typical education</h3>
                <p className="mt-1 text-sm text-muted">{career.education}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Sparkles className="h-5 w-5 shrink-0 text-accent-400" />
              <div>
                <h3 className="text-sm font-medium">AI impact</h3>
                <p className="mt-1 text-sm text-muted">
                  Rated <strong className="text-foreground">{career.aiImpact}</strong> — see the future
                  outlook above for what's actually changing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills + Tools + Certifications */}
        <section className="py-16">
          <div className="container grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
                <Wrench className="h-4.5 w-4.5 text-secondary-400" /> Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((s) => (
                  <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
                <Wrench className="h-4.5 w-4.5 text-primary-400" /> Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {career.tools.map((s) => (
                  <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
                <Award className="h-4.5 w-4.5 text-accent-400" /> Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {career.certifications.map((s) => (
                  <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="border-y border-border bg-surface/40 py-16">
          <div className="container">
            <h2 className="mb-10 font-display text-2xl font-semibold">Learning roadmap</h2>
            <div className="grid gap-6 md:grid-cols-4">
              {career.roadmap.map((stage) => (
                <div key={stage.stage} className="card p-5">
                  <div className="mb-3 font-display text-sm text-primary-400">{stage.stage}</div>
                  <h3 className="font-medium">{stage.title}</h3>
                  <p className="mt-2 text-sm text-muted">{stage.description}</p>
                  <p className="mt-3 text-xs text-secondary-400">{stage.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses + Projects */}
        <section className="py-16">
          <div className="container grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-display text-2xl font-semibold">Recommended courses</h2>
              <ul className="space-y-3">
                {career.courses.map((c) => (
                  <li key={c.title} className="rounded-xl border border-border bg-surface p-4">
                    <div className="text-sm font-medium">{c.title}</div>
                    <div className="mt-1 text-xs text-muted">{c.provider}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-semibold">
                <FolderGit2 className="h-5 w-5 text-secondary-400" /> Practice projects
              </h2>
              <ul className="space-y-3">
                {career.projects.map((p) => (
                  <li key={p} className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Interview questions */}
        <section className="border-y border-border bg-surface/40 py-16">
          <div className="container">
            <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-semibold">
              <MessageCircleQuestion className="h-5 w-5 text-accent-400" /> Interview questions to expect
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {career.interviewQuestions.map((q) => (
                <div key={q} className="rounded-xl border border-border bg-surface p-5 text-sm text-muted">
                  "{q}"
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container">
            <div className="gradient-border mx-auto max-w-3xl">
              <div className="mesh-aurora glass-strong rounded-[1.24rem] px-8 py-14 text-center sm:px-16">
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Ready to try it for real?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                  {career.simulation.briefing}
                </p>
                <Link
                  href={`/careers/${career.slug}/simulate`}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  Start the {career.title} simulation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {related.length > 0 && (
              <div className="mx-auto mt-16 max-w-4xl">
                <h3 className="mb-5 text-sm font-medium text-muted">
                  More in {categoryMeta[career.category].name}
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/careers/${r.slug}`}
                      className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-foreground/20"
                    >
                      <div className="text-sm font-medium">{r.title}</div>
                      <div className="mt-1 text-xs text-muted">
                        {formatSalary(r.salaryMin)}–{formatSalary(r.salaryMax)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
