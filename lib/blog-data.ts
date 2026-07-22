export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readMinutes: number;
  tag: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "career-quiz-vs-simulation",
    title: "Why a career quiz couldn't tell you what a simulation can",
    excerpt:
      "Personality quizzes are popular because they're easy. They're also missing the one thing that actually predicts whether you'll like a job: the work itself.",
    author: "CareerVerse Team",
    date: "July 10, 2026",
    readMinutes: 6,
    tag: "Career clarity",
    content: [
      "Most career quizzes work the same way: answer a set of questions about your personality or preferences, and get matched to a list of job titles. It feels productive — you get a concrete answer in five minutes. But it's answering the wrong question.",
      "A quiz can tell you that you're 'analytical' or 'people-oriented.' It can't tell you what it actually feels like to be the only engineer on call when production breaks at 11pm, or what it's like to deliver hard feedback to a client who doesn't want to hear it. Those are the moments that actually determine whether a career fits — and no multiple-choice question captures them.",
      "This is why job shadowing has always been considered the gold standard for career exploration. Spending a real day next to someone doing the job teaches you more in six hours than a hundred quiz questions ever could. The problem is access: most people can't shadow a surgeon, an architect, and a product manager in the same month to compare.",
      "Simulation closes that gap. Instead of asking how you'd describe yourself, it puts you inside a specific, realistic scenario — a bug report on a Tuesday morning, a budget disagreement in a client meeting — and watches how you actually respond. The result isn't a label. It's a felt sense of whether the day-to-day rhythm of that job energizes you or drains you.",
      "That's the difference we built CareerVerse around: not another label to add to your identity, but an honest preview of the work itself.",
    ],
  },
  {
    slug: "ai-changing-entry-level-jobs",
    title: "How AI is actually changing entry-level jobs (not the headlines version)",
    excerpt:
      "The panic headlines say AI is coming for junior roles. The more useful question is which specific tasks are shifting, and what that means for how you should prepare.",
    author: "CareerVerse Team",
    date: "June 28, 2026",
    readMinutes: 8,
    tag: "Future of work",
    content: [
      "It's easy to find a headline this year claiming AI is 'coming for' some category of job. It's much harder to find a clear, task-level breakdown of what's actually changing — which is the level of detail that matters if you're choosing a career in the next few years.",
      "Take software engineering. AI coding assistants have gotten genuinely good at writing boilerplate, generating test scaffolding, and explaining unfamiliar code. That's real and it's not going away. But the tasks that make an engineer valuable — debugging a subtle production issue, deciding how a system should be architected, knowing which corners are safe to cut under a deadline — are still deeply human judgment calls, and if anything, they matter more now that the easy parts are faster.",
      "The same pattern shows up in marketing, data analysis, and law: routine, well-specified tasks are automating fastest. Tasks that require judgment under ambiguity, direct human relationships, or accountability for a decision are automating slowest.",
      "What this means practically: when you're evaluating a career, don't just ask 'will AI replace this job.' Ask which specific parts of a typical day are routine versus judgment-heavy, and whether you'd enjoy the judgment-heavy parts enough to stick around as the routine parts shrink. That's exactly the kind of thing a simulation can show you that a job description can't.",
    ],
  },
  {
    slug: "career-switch-after-25",
    title: "What it actually takes to switch careers after 25 (from people who did it)",
    excerpt:
      "Career switching isn't starting over from zero. Here's what the honest version of a mid-career pivot looks like — timeline, tradeoffs, and all.",
    author: "CareerVerse Team",
    date: "June 15, 2026",
    readMinutes: 7,
    tag: "Career switching",
    content: [
      "'Starting over' is the phrase people reach for when they talk about switching careers, and it's almost always the wrong frame. Nobody who switches from accounting to product design is starting over — they're bringing years of business judgment, communication skills, and domain knowledge into a new context.",
      "The honest timeline for a serious switch is usually 6 to 18 months, depending on how far the fields are apart and how much you can practice alongside your current job. The biggest lever isn't talent, it's whether you can get real practice reps — actual projects, not just courses — before you're applying for roles.",
      "The tradeoffs are real too: most switchers take a pay cut in year one, and imposter syndrome doesn't fully go away until you've shipped something real in the new field. What helps most isn't more research or more courses — it's the earliest possible exposure to what the actual work feels like, so you're not making a 12-month bet on a guess.",
      "That's the exact gap a simulation is built to close before you commit months of study to a direction that might not fit the way you imagined.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
