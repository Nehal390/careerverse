import type { CategorySlug } from "@/lib/careers";

export type QuizOption = {
  label: string;
  categories: Partial<Record<CategorySlug, number>>;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "energize",
    question: "Which of these sounds most like a good day at work?",
    options: [
      { label: "Solving a tricky technical problem no one else could crack", categories: { technology: 2, engineering: 1 } },
      { label: "Convincing a room of people to get behind your plan", categories: { business: 2, marketing: 1 } },
      { label: "Helping someone through a hard moment", categories: { healthcare: 2 } },
      { label: "Making something people find beautiful or delightful", categories: { creative: 2, marketing: 1 } },
    ],
  },
  {
    id: "environment",
    question: "Which environment appeals to you most?",
    options: [
      { label: "A fast-moving startup where things change weekly", categories: { technology: 1, business: 1 } },
      { label: "A courtroom, government office, or highly structured institution", categories: { "government-law": 2 } },
      { label: "A lab or research environment chasing open questions", categories: { "science-research": 2 } },
      { label: "A studio or creative space", categories: { creative: 2 } },
    ],
  },
  {
    id: "problem-type",
    question: "When you face a problem, what's your instinct?",
    options: [
      { label: "Break it into smaller pieces and build a solution step by step", categories: { technology: 2, engineering: 1 } },
      { label: "Look at the data first, then decide", categories: { technology: 1, business: 1, "science-research": 1 } },
      { label: "Talk to the people affected before doing anything else", categories: { healthcare: 1, business: 1 } },
      { label: "Sketch a few different approaches and see what feels right", categories: { creative: 2 } },
    ],
  },
  {
    id: "impact",
    question: "What kind of impact matters most to you?",
    options: [
      { label: "Building something millions of people use", categories: { technology: 2 } },
      { label: "Directly changing one person's life for the better", categories: { healthcare: 2, "government-law": 1 } },
      { label: "Growing a business or team from an idea into something real", categories: { business: 2, marketing: 1 } },
      { label: "Advancing what we know or understand about the world", categories: { "science-research": 2, engineering: 1 } },
    ],
  },
  {
    id: "pace",
    question: "How do you feel about ambiguity?",
    options: [
      { label: "I like clear rules and a well-defined process", categories: { "government-law": 1, engineering: 1 } },
      { label: "I'm comfortable making a call with incomplete information", categories: { business: 2, technology: 1 } },
      { label: "I want to test and iterate until something works", categories: { creative: 1, technology: 1, marketing: 1 } },
      { label: "I like following the scientific method to get a rigorous answer", categories: { "science-research": 2 } },
    ],
  },
];
