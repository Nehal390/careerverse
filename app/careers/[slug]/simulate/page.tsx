import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { careers, getCareerBySlug } from "@/lib/careers";
import { SimulationRunner } from "@/components/simulation/simulation-runner";

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
  if (!career) return { title: "Simulation not found" };
  return { title: `${career.title} Simulation` };
}

export default async function SimulatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const career = getCareerBySlug(slug);
  if (!career) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-24 pt-32">
        <SimulationRunner career={career} />
      </main>
      <Footer />
    </>
  );
}
