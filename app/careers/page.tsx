import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PageHeader } from "@/components/marketing/page-header";
import { CareersExplorer } from "@/components/careers/careers-explorer";

export const metadata: Metadata = {
  title: "Career Library",
  description:
    "Browse 16+ careers across technology, business, healthcare, engineering, and more. Filter by salary, difficulty, demand, and remote-friendliness.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Career library"
          title="Find the career worth simulating"
          description="Every career here has a real day-in-the-life breakdown, a learning roadmap, and a simulation you can run before you commit."
        />
        <Suspense fallback={<CareersExplorerSkeleton />}>
          <CareersExplorer />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function CareersExplorerSkeleton() {
  return (
    <div className="container pb-24">
      <div className="skeleton mx-auto h-14 max-w-2xl rounded-2xl" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card p-6">
            <div className="skeleton h-4 w-20" />
            <div className="skeleton mt-4 h-5 w-32" />
            <div className="skeleton mt-3 h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
