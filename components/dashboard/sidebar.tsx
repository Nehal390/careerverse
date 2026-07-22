"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Award,
  FileBadge,
  Trophy,
  User,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/careers", label: "Career library", icon: Compass },
  { href: "/dashboard/achievements", label: "Achievements", icon: Award },
  { href: "/dashboard/certificates", label: "Certificates", icon: FileBadge },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col gap-1 p-4">
      <div className="mb-4 flex items-center justify-between px-2 lg:hidden">
        <span className="text-xs font-medium uppercase tracking-widest text-muted">Menu</span>
        <button onClick={onNavigate} aria-label="Close menu">
          <X className="h-4 w-4 text-muted" />
        </button>
      </div>
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors",
              active
                ? "bg-primary-500/15 text-primary-400"
                : "text-muted hover:bg-foreground/5 hover:text-foreground"
            )}
          >
            <item.icon className="h-4.5 w-4.5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
