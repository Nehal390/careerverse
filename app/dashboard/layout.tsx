import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border lg:block">
          <div className="flex h-16 items-center gap-2 border-b border-border px-6">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
              <span className="font-display text-xs font-bold text-white">CV</span>
            </span>
            <span className="font-display text-sm font-semibold">CareerVerse</span>
          </div>
          <DashboardSidebar />
        </aside>

        <div className="min-w-0 flex-1">
          <DashboardTopbar />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
