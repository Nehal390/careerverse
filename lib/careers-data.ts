import { careers, categoryMeta, getCategoryCounts, type CategorySlug } from "@/lib/careers";

export type CareerCategory = {
  slug: CategorySlug;
  name: string;
  count: number;
  icon:
    | "code"
    | "briefcase"
    | "megaphone"
    | "stethoscope"
    | "cog"
    | "palette"
    | "landmark"
    | "flask";
};

const counts = getCategoryCounts();

export const careerCategories: CareerCategory[] = (
  Object.keys(categoryMeta) as CategorySlug[]
).map((slug) => ({
  slug,
  name: categoryMeta[slug].name,
  count: counts[slug],
  icon: categoryMeta[slug].icon as CareerCategory["icon"],
}));

export type FeaturedCareer = {
  slug: string;
  title: string;
  category: string;
  avgSalary: number;
  demand: "Moderate" | "High" | "Very High" | "Emerging";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  aiImpact: "Low" | "Moderate" | "High" | "Transforming";
  remote: boolean;
  blurb: string;
  gradient: [string, string];
};

const featuredSlugs = [
  "ai-engineer",
  "product-manager",
  "ux-designer",
  "data-scientist",
  "digital-marketer",
  "software-engineer",
];

export const featuredCareers: FeaturedCareer[] = featuredSlugs
  .map((slug) => careers.find((c) => c.slug === slug))
  .filter((c): c is NonNullable<typeof c> => Boolean(c))
  .map((c) => ({
    slug: c.slug,
    title: c.title,
    category: categoryMeta[c.category].name,
    avgSalary: Math.round((c.salaryMin + c.salaryMax) / 2),
    demand: c.demand,
    difficulty: c.difficulty,
    aiImpact: c.aiImpact,
    remote: c.remote,
    blurb: c.shortDescription,
    gradient: c.gradient,
  }));

export const platformStats = [
  { label: "Careers to explore", value: careers.length, suffix: "+" },
  { label: "Simulations completed", value: 128000, suffix: "+" },
  { label: "Avg. time to clarity", value: 23, suffix: " min" },
  { label: "Students who felt more confident", value: 91, suffix: "%" },
];

export const testimonials = [
  {
    name: "Ananya R.",
    role: "12th Grade Student",
    quote:
      "I always thought I wanted to be a doctor. Two hours into the simulation I realized I loved the data side more. I'm applying for biostatistics now instead.",
  },
  {
    name: "Marcus T.",
    role: "Computer Science, Sophomore",
    quote:
      "The AI Engineer simulation felt like an actual sprint. Slack pings, a broken eval, a manager asking for a status update — nothing like a career quiz I've taken before.",
  },
  {
    name: "Priya K.",
    role: "Career Switcher, ex-Accountant",
    quote:
      "I ran the Product Manager and UX Designer simulations back to back. The compatibility scores made the decision to switch a lot less scary.",
  },
];

export const faqs = [
  {
    q: "Is this actually different from a career quiz?",
    a: "A quiz tells you a label. CareerVerse puts you inside a simulated Tuesday at that job — messages from a manager, a real deliverable, a deadline — then scores how you actually performed and responded.",
  },
  {
    q: "How long does one simulation take?",
    a: "Most run 20–45 minutes depending on the career and how deep you go. You can pause and resume; your progress and XP are saved automatically.",
  },
  {
    q: "Do I need any prior experience?",
    a: "No. Simulations start with context and ramp up, the same way an onboarding week would. Beginner-tagged careers assume zero background.",
  },
  {
    q: "What do I get at the end?",
    a: "A compatibility score, a breakdown of your strengths and gaps, a suggested learning path, and a certificate you can download as a PDF or share to LinkedIn.",
  },
  {
    q: "Is it free?",
    a: "You can run your first three simulations and the full career quiz for free. Unlimited simulations, certificates, and career comparisons are part of CareerVerse Plus.",
  },
];
