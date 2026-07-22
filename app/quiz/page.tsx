import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PageHeader } from "@/components/marketing/page-header";
import { QuizFlow } from "@/components/quiz/quiz-flow";

export const metadata: Metadata = {
  title: "Career Quiz",
  description: "Answer 5 quick questions and get your top 5 career matches, explained.",
};

export default function QuizPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="AI career quiz"
          title="Find your top 5 career matches"
          description="No right answers — just the instincts that already point you toward the right kind of work."
        />
        <QuizFlow />
      </main>
      <Footer />
    </>
  );
}
