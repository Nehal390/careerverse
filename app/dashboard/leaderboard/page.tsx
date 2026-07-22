import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { leaderboard } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Leaderboard" };

const medalColor: Record<number, string> = {
  1: "text-yellow-600 dark:text-yellow-400",
  2: "text-zinc-500 dark:text-zinc-300",
  3: "text-amber-600",
};

export default function LeaderboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Leaderboard</h1>
        <p className="mt-1 text-sm text-muted">Top XP earners this month.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className={cn(
              "flex items-center justify-between border-b border-border px-6 py-4 last:border-0",
              entry.isYou && "bg-primary-500/10"
            )}
          >
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "w-6 text-center font-display text-sm",
                  entry.rank <= 3 ? medalColor[entry.rank] : "text-muted"
                )}
              >
                {entry.rank <= 3 ? <Trophy className="h-4 w-4" /> : entry.rank}
              </span>
              <span className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium text-white", entry.isYou ? "bg-gradient-to-br from-primary-500 to-secondary-500" : "bg-foreground/10")}>
                {entry.name.charAt(0)}
              </span>
              <span className={cn("text-sm", entry.isYou && "font-medium text-primary-400")}>
                {entry.name}
              </span>
            </div>
            <span className="font-mono text-sm text-muted">{entry.xp.toLocaleString()} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}
