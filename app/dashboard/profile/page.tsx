import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { Zap, Flame, PlayCircle, Bookmark } from "lucide-react";
import { dashboardUser } from "@/lib/dashboard-data";
import { careers } from "@/lib/careers";

export const metadata: Metadata = { title: "Profile" };

const bookmarkedSlugs = ["data-scientist", "product-designer", "financial-analyst", "architect", "civil-engineer"];

export default async function ProfilePage() {
  const user = await currentUser();
  const fullName = user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "Your name";
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const bookmarked = careers.filter((c) => bookmarkedSlugs.includes(c.slug));

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        {user?.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={fullName || "Profile photo"}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full border border-border object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 font-display text-xl text-white">
            {fullName ? fullName.charAt(0) : "U"}
          </div>
        )}
        <div>
          <h1 className="font-display text-2xl font-semibold">{fullName || "Your profile"}</h1>
          <p className="text-sm text-muted">{email}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="card p-5 text-center">
          <Zap className="mx-auto mb-2 h-4 w-4 text-accent-400" />
          <div className="font-display text-xl font-semibold">{dashboardUser.totalXp.toLocaleString()}</div>
          <div className="text-[11px] text-muted">Total XP</div>
        </div>
        <div className="card p-5 text-center">
          <Flame className="mx-auto mb-2 h-4 w-4 text-orange-500 dark:text-orange-400" />
          <div className="font-display text-xl font-semibold">{dashboardUser.currentStreak}</div>
          <div className="text-[11px] text-muted">Day streak</div>
        </div>
        <div className="card p-5 text-center">
          <PlayCircle className="mx-auto mb-2 h-4 w-4 text-secondary-400" />
          <div className="font-display text-xl font-semibold">{dashboardUser.simulationsCompleted}</div>
          <div className="text-[11px] text-muted">Simulations</div>
        </div>
        <div className="card p-5 text-center">
          <Bookmark className="mx-auto mb-2 h-4 w-4 text-primary-400" />
          <div className="font-display text-xl font-semibold">{bookmarked.length}</div>
          <div className="text-[11px] text-muted">Bookmarks</div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-sm font-medium">Bookmarked careers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarked.map((c) => (
            <Link
              key={c.slug}
              href={`/careers/${c.slug}`}
              className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary-500/40"
            >
              <div className="text-sm font-medium">{c.title}</div>
              <div className="mt-1 text-xs text-muted">{c.shortDescription}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
