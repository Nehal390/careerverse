import type { Metadata } from "next";
import { MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata: Metadata = {
  title: "Careers at CareerVerse",
  description: "Open roles at CareerVerse AI — join us in building a better way to choose a career.",
};

const openRoles = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "Remote (US/EU hours)",
    type: "Full-time",
    description:
      "Own features end to end across our Next.js frontend and Supabase backend, with a focus on the simulation engine.",
  },
  {
    title: "AI/ML Engineer — Simulation Systems",
    team: "AI",
    location: "Remote",
    type: "Full-time",
    description:
      "Build and evaluate the models behind our realistic career simulations, from scenario generation to scoring.",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Shape the end-to-end experience of our simulation engine and dashboard, working closely with engineering.",
  },
  {
    title: "Content Lead — Career Library",
    team: "Content",
    location: "Remote",
    type: "Contract",
    description:
      "Research and write accurate, up-to-date career profiles across technology, healthcare, business, and more.",
  },
];

export default function JobsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Careers at CareerVerse"
          title="Help us build a better way to choose a career"
          description="We're a small, remote-first team building tools we wish existed when we were figuring out what to do with our lives."
        />

        <section className="pb-24">
          <div className="container mx-auto max-w-3xl space-y-4">
            {openRoles.map((role) => (
              <div key={role.title} className="card p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{role.title}</h3>
                    <span className="mt-1 inline-block rounded-full border border-border px-2.5 py-0.5 text-[11px] text-secondary-400">
                      {role.team}
                    </span>
                  </div>
                  <a
                    href={`mailto:careers@careerverse.ai?subject=${encodeURIComponent(role.title)}`}
                    className="rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background"
                  >
                    Apply
                  </a>
                </div>
                <p className="mt-3 text-sm text-muted">{role.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {role.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {role.type}
                  </span>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted">
              Don't see a fit but think you'd be great here anyway?{" "}
              <a href="mailto:careers@careerverse.ai" className="text-primary-400 hover:underline">
                Reach out directly
              </a>
              .
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
