export const dashboardUser = {
  totalXp: 1840,
  xpToNextLevel: 2200,
  level: 4,
  currentStreak: 6,
  longestStreak: 14,
  simulationsCompleted: 3,
  careersBookmarked: 5,
};

export const continueSimulation = {
  careerSlug: "ai-engineer",
  careerTitle: "AI Engineer",
  simulationTitle: "Shipping a Support Bot Feature",
  progressPercent: 66,
  stepLabel: "Step 2 of 3",
};

export const recentActivity = [
  { label: "Completed Software Engineer simulation", xp: 220, time: "2 days ago" },
  { label: "Earned the 'Fast Learner' badge", xp: 0, time: "3 days ago" },
  { label: "Bookmarked Data Scientist", xp: 0, time: "5 days ago" },
  { label: "Completed the career quiz", xp: 80, time: "1 week ago" },
];

export const xpHistory = [
  { day: "Mon", xp: 40 },
  { day: "Tue", xp: 120 },
  { day: "Wed", xp: 60 },
  { day: "Thu", xp: 220 },
  { day: "Fri", xp: 90 },
  { day: "Sat", xp: 30 },
  { day: "Sun", xp: 150 },
];

export const recommendations = [
  { slug: "data-scientist", title: "Data Scientist", reason: "Matches your quiz results" },
  { slug: "product-designer", title: "Product Designer", reason: "Based on UX Designer simulation" },
  { slug: "financial-analyst", title: "Financial Analyst", reason: "Popular in Business this week" },
];

export const achievements = [
  { slug: "first-sim", name: "First Steps", description: "Completed your first simulation", earned: true, icon: "footprints" },
  { slug: "fast-learner", name: "Fast Learner", description: "Completed a simulation in under 20 minutes", earned: true, icon: "zap" },
  { slug: "explorer", name: "Explorer", description: "Viewed 10 different career pages", earned: true, icon: "compass" },
  { slug: "three-in-a-row", name: "On a Roll", description: "Completed 3 simulations", earned: false, icon: "flame" },
  { slug: "category-master", name: "Category Master", description: "Tried a career from 5 different categories", earned: false, icon: "layout-grid" },
  { slug: "high-scorer", name: "High Scorer", description: "Scored 90%+ compatibility on a simulation", earned: false, icon: "trophy" },
];

export const certificates = [
  {
    id: "cert-001",
    careerTitle: "Software Engineer",
    score: 84,
    issuedAt: "July 14, 2026",
    certificateNumber: "CV-SE-84213",
  },
];

export const leaderboard = [
  { rank: 1, name: "Ishaan V.", xp: 6420, isYou: false },
  { rank: 2, name: "Grace L.", xp: 5980, isYou: false },
  { rank: 3, name: "Omar F.", xp: 5510, isYou: false },
  { rank: 4, name: "Ananya R.", xp: 4890, isYou: false },
  { rank: 5, name: "Beatriz S.", xp: 4102, isYou: false },
  { rank: 6, name: "Diego M.", xp: 3760, isYou: false },
  { rank: 7, name: "Rin T.", xp: 3105, isYou: false },
  { rank: 8, name: "You", xp: 1840, isYou: true },
];

export const learningRoadmapProgress = [
  { stage: "01", title: "Learn the fundamentals", status: "complete" as const },
  { stage: "02", title: "Build real projects", status: "in_progress" as const },
  { stage: "03", title: "Contribute & collaborate", status: "locked" as const },
  { stage: "04", title: "Interview prep", status: "locked" as const },
];
