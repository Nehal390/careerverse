import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Flame, Zap, Bookmark, PlayCircle, CheckCircle2, Circle, Lock } from "lucide-react";
import {
  dashboardUser,
  continueSimulation,
  recentActivity,
  recommendations,
  learningRoadmapProgress,
} from "@/lib/dashboard-data";
import { XpChart } from "@/components/dashboard/xp-chart";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

const statusIcon = {
  complete: CheckCircle2,
  in_progress: Circle,
  locked: Lock,
};

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName ?? "there";
  const xpPercent = Math.round((dashboardUser.totalXp / dashboardUser.xpToNextLevel) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Welcome back, {firstName}</h1>
        <p className="mt-1 text-sm text-muted">Here's where you left off.</p>
      </div>

      {/* Top stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Total XP</span>
            <Zap className="h-4 w-4 text-accent-400" />
          </div>
          <div className="mt-3 font-display text-2xl font-semibold">{dashboardUser.totalXp.toLocaleString()}</div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
            <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-400" style={{ width: `${xpPercent}%` }} />
          </div>
          <div className="mt-1.5 text-[11px] text-muted">Level {dashboardUser.level} · {xpPercent}% to next level</div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Current streak</span>
            <Flame className="h-4 w-4 text-orange-500 dark:text-orange-400" />
          </div>
          <div className="mt-3 font-display text-2xl font-semibold">{dashboardUser.currentStreak} days</div>
          <div className="mt-1.5 text-[11px] text-muted">Longest streak: {dashboardUser.longestStreak} days</div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Simulations done</span>
            <PlayCircle className="h-4 w-4 text-secondary-400" />
          </div>
          <div className="mt-3 font-display text-2xl font-semibold">{dashboardUser.simulationsCompleted}</div>
          <div className="mt-1.5 text-[11px] text-muted">Across {dashboardUser.simulationsCompleted} careers</div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Bookmarked careers</span>
            <Bookmark className="h-4 w-4 text-primary-400" />
          </div>
          <div className="mt-3 font-display text-2xl font-semibold">{dashboardUser.careersBookmarked}</div>
          <Link href="/careers" className="mt-1.5 inline-block text-[11px] text-primary-400 hover:underline">
            Browse more →
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Continue simulation */}
        <div className="gradient-border lg:col-span-2">
          <div className="glass-strong rounded-[1.24rem] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-muted">Continue where you left off</span>
                <h2 className="mt-1 font-display text-xl font-semibold">
                  {continueSimulation.careerTitle} — {continueSimulation.simulationTitle}
                </h2>
              </div>
              <Link
                href={`/careers/${continueSimulation.careerSlug}/simulate`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                Resume
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-400"
                style={{ width: `${continueSimulation.progressPercent}%` }}
              />
            </div>
            <div className="mt-1.5 text-[11px] text-muted">{continueSimulation.stepLabel}</div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="card p-6">
          <h2 className="mb-4 text-sm font-medium">Recent activity</h2>
          <ul className="space-y-3.5">
            {recentActivity.map((a) => (
              <li key={a.label} className="flex items-start justify-between gap-3 text-xs">
                <span className="text-muted">{a.label}</span>
                <span className="shrink-0 text-muted/70">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* XP chart */}
        <div className="card p-6 lg:col-span-2">
          <h2 className="mb-4 text-sm font-medium">This week's XP</h2>
          <XpChart />
        </div>

        {/* Learning roadmap */}
        <div className="card p-6">
          <h2 className="mb-4 text-sm font-medium">Software Engineer roadmap</h2>
          <ul className="space-y-4">
            {learningRoadmapProgress.map((stage) => {
              const Icon = statusIcon[stage.status];
              return (
                <li key={stage.stage} className="flex items-start gap-3">
                  <Icon
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      stage.status === "complete" && "text-emerald-600 dark:text-emerald-400",
                      stage.status === "in_progress" && "text-secondary-400",
                      stage.status === "locked" && "text-muted/50"
                    )}
                  />
                  <div>
                    <div className={cn("text-sm", stage.status === "locked" && "text-muted")}>{stage.title}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium">Recommended for you</h2>
          <Link href="/careers" className="text-xs text-muted hover:text-foreground">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {recommendations.map((rec) => (
            <Link
              key={rec.slug}
              href={`/careers/${rec.slug}`}
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary-500/40"
            >
              <div className="text-sm font-medium">{rec.title}</div>
              <div className="mt-1.5 text-xs text-muted">{rec.reason}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
