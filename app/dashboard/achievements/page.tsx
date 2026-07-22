import type { Metadata } from "next";
import { Footprints, Zap, Compass, Flame, LayoutGrid, Trophy, type LucideIcon } from "lucide-react";
import { achievements } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Achievements" };

const icons: Record<string, LucideIcon> = {
  footprints: Footprints,
  zap: Zap,
  compass: Compass,
  flame: Flame,
  "layout-grid": LayoutGrid,
  trophy: Trophy,
};

export default function AchievementsPage() {
  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Achievements</h1>
        <p className="mt-1 text-sm text-muted">
          {earnedCount} of {achievements.length} earned
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((badge) => {
          const Icon = icons[badge.icon];
          return (
            <div
              key={badge.slug}
              className={cn(
                "rounded-2xl border p-6",
                badge.earned ? "border-primary-500/30 bg-primary-500/5" : "border-border bg-surface opacity-60"
              )}
            >
              <div
                className={cn(
                  "mb-4 flex h-11 w-11 items-center justify-center rounded-xl",
                  badge.earned ? "bg-gradient-to-br from-primary-500 to-secondary-500" : "bg-foreground/5"
                )}
              >
                <Icon className={cn("h-5 w-5", badge.earned ? "text-white" : "text-muted")} />
              </div>
              <h3 className="font-medium">{badge.name}</h3>
              <p className="mt-1.5 text-sm text-muted">{badge.description}</p>
              {!badge.earned && <p className="mt-3 text-[11px] text-muted/70">Not earned yet</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
