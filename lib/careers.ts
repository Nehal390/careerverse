export type CategorySlug =
  | "technology"
  | "business"
  | "marketing"
  | "healthcare"
  | "engineering"
  | "creative"
  | "government-law"
  | "science-research";

export type RoadmapStage = {
  stage: string;
  title: string;
  description: string;
  duration: string;
};

export type Course = { title: string; provider: string };

export type ScenarioStep = {
  from: string; // who the message/task is from, e.g. "Priya (Engineering Manager)"
  channel: "slack" | "email" | "task" | "meeting";
  message: string;
  prompt: string; // what the user is asked to decide or produce
  options: string[]; // multiple-choice responses shown in the simulation demo
};

export type Career = {
  slug: string;
  title: string;
  category: CategorySlug;
  shortDescription: string;
  overview: string;
  dayInLife: string;
  salaryMin: number;
  salaryMax: number;
  currency: "USD";
  demand: "Moderate" | "High" | "Very High" | "Emerging";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  aiImpact: "Low" | "Moderate" | "High" | "Transforming";
  futureOutlook: string;
  remote: boolean;
  education: string;
  skills: string[];
  tools: string[];
  certifications: string[];
  roadmap: RoadmapStage[];
  courses: Course[];
  projects: string[];
  interviewQuestions: string[];
  gradient: [string, string];
  simulation: {
    title: string;
    estimatedMinutes: number;
    xpReward: number;
    briefing: string;
    steps: ScenarioStep[];
  };
};

export const categoryMeta: Record<CategorySlug, { name: string; icon: string }> = {
  technology: { name: "Technology", icon: "code" },
  business: { name: "Business", icon: "briefcase" },
  marketing: { name: "Marketing", icon: "megaphone" },
  healthcare: { name: "Healthcare", icon: "stethoscope" },
  engineering: { name: "Engineering", icon: "cog" },
  creative: { name: "Creative", icon: "palette" },
  "government-law": { name: "Government & Law", icon: "landmark" },
  "science-research": { name: "Science & Research", icon: "flask" },
};

export const careers: Career[] = [
  {
    slug: "software-engineer",
    title: "Software Engineer",
    category: "technology",
    shortDescription: "Ship code, review PRs, fix bugs, and stand up for your estimate.",
    overview:
      "Software engineers design, build, and maintain the applications and systems people use every day. The role blends problem-solving, writing and reviewing code, and constant communication with teammates about tradeoffs, deadlines, and bugs.",
    dayInLife:
      "Most days start with a standup — a 15-minute check-in on what shipped, what's blocked, and what's next. The rest of the day splits between focused coding blocks, reviewing a teammate's pull request, debugging something that broke in production, and a design discussion about how a new feature should work.",
    salaryMin: 85000,
    salaryMax: 165000,
    currency: "USD",
    demand: "Very High",
    difficulty: "Intermediate",
    aiImpact: "Moderate",
    futureOutlook:
      "AI coding assistants are changing how engineers write boilerplate, but demand for people who can architect systems, debug production issues, and make judgment calls keeps growing.",
    remote: true,
    education: "Bachelor's in CS or equivalent portfolio/bootcamp experience",
    skills: ["Problem solving", "Data structures", "Git", "Debugging", "Code review", "Communication"],
    tools: ["VS Code", "GitHub", "Docker", "Slack", "Linear", "Postman"],
    certifications: ["AWS Certified Developer", "Meta Front-End Developer Certificate"],
    roadmap: [
      { stage: "01", title: "Learn the fundamentals", description: "Master one language deeply (JavaScript, Python, or Java) and core data structures & algorithms.", duration: "3–4 months" },
      { stage: "02", title: "Build real projects", description: "Ship 3–4 full projects with a database, an API, and a deployed frontend — not tutorials.", duration: "2–3 months" },
      { stage: "03", title: "Contribute & collaborate", description: "Open-source contributions or a team project to practice code review and git workflows.", duration: "1–2 months" },
      { stage: "04", title: "Interview prep", description: "Practice data-structure interviews and system design basics; apply broadly.", duration: "1–2 months" },
    ],
    courses: [
      { title: "CS50: Introduction to Computer Science", provider: "Harvard (edX)" },
      { title: "The Odin Project — Full Stack JavaScript", provider: "The Odin Project" },
      { title: "Meta Front-End Developer Certificate", provider: "Coursera" },
    ],
    projects: [
      "A full-stack task tracker with auth and a real database",
      "A CLI tool that automates something in your own workflow",
      "A clone of a product you use daily, rebuilt from scratch",
    ],
    interviewQuestions: [
      "Walk me through how you'd design a URL shortener.",
      "Tell me about a bug that took you a long time to find.",
      "How do you decide when code is 'good enough' to ship?",
    ],
    gradient: ["#6366F1", "#14B8A6"],
    simulation: {
      title: "A Sprint at a Series B Startup",
      estimatedMinutes: 35,
      xpReward: 220,
      briefing:
        "You're joining the checkout team at a mid-size fintech startup for a single sprint. You'll triage a bug report, review a teammate's pull request, and handle a scope change from your manager mid-sprint.",
      steps: [
        {
          from: "Dana (Engineering Manager)",
          channel: "slack",
          message: "Morning! Before standup — support flagged that some users see a blank cart page on mobile Safari. Can you take a first look?",
          prompt: "How do you respond?",
          options: [
            "Ask for a screen recording and the user's browser/OS version before diving in",
            "Immediately start changing CSS to see if anything fixes it",
            "Tell Dana it's probably a support/user error and move on",
          ],
        },
        {
          from: "GitHub",
          channel: "task",
          message: "You find the bug: a date-formatting function crashes on Safari because of a non-standard date string. A teammate's PR to fix it is ready for your review.",
          prompt: "What do you check first in the review?",
          options: [
            "Whether the fix has a test that would have caught this on Safari specifically",
            "Only whether the code compiles and the diff looks reasonably sized",
            "Approve immediately since the demo GIF in the PR looks fine",
          ],
        },
        {
          from: "Dana (Engineering Manager)",
          channel: "meeting",
          message: "Mid-sprint, product asks to add a 'save for later' button to checkout before Friday's demo — on top of your existing tickets.",
          prompt: "How do you handle the new ask?",
          options: [
            "Flag the tradeoff: it can happen, but one of the current tickets slips — let's agree which",
            "Say yes and quietly work extra hours to fit everything in",
            "Refuse outright and tell them to file it for next sprint",
          ],
        },
      ],
    },
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    category: "technology",
    shortDescription: "Design, fine-tune, and ship the models powering modern products.",
    overview:
      "AI engineers build the systems that let products use machine learning and large language models in production — from choosing the right model, to prompt and fine-tuning work, to building evaluation pipelines that catch regressions before users do.",
    dayInLife:
      "A typical day mixes experimentation (testing prompts or fine-tuning approaches in a notebook), engineering (wiring a model into a real API with proper error handling), and evaluation (running a test set to see if a change actually improved results or just looks like it did).",
    salaryMin: 110000,
    salaryMax: 210000,
    currency: "USD",
    demand: "Very High",
    difficulty: "Advanced",
    aiImpact: "Transforming",
    futureOutlook:
      "One of the fastest-growing roles in tech. As more companies embed AI into products, the need for engineers who understand both ML fundamentals and production software grows with it.",
    remote: true,
    education: "Bachelor's/Master's in CS, Math, or Statistics — strong self-taught paths exist too",
    skills: ["Python", "Prompt engineering", "Model evaluation", "Vector databases", "API design", "Statistics"],
    tools: ["PyTorch", "Hugging Face", "LangChain", "OpenAI API", "Weights & Biases", "Docker"],
    certifications: ["DeepLearning.AI TensorFlow Developer", "AWS Certified Machine Learning"],
    roadmap: [
      { stage: "01", title: "Python + ML fundamentals", description: "Solid Python, then the math and intuition behind neural networks and transformers.", duration: "3–4 months" },
      { stage: "02", title: "Work with real models", description: "Fine-tune an open model, build a RAG pipeline, and learn prompt evaluation.", duration: "2–3 months" },
      { stage: "03", title: "Ship a production project", description: "Wire a model into a real app with logging, fallbacks, and cost controls.", duration: "2 months" },
      { stage: "04", title: "Specialize", description: "Pick a lane — applied LLM engineering, MLOps, or research — and go deep.", duration: "Ongoing" },
    ],
    courses: [
      { title: "Deep Learning Specialization", provider: "DeepLearning.AI" },
      { title: "Hugging Face NLP Course", provider: "Hugging Face" },
      { title: "Building LLM Applications", provider: "DeepLearning.AI (short course)" },
    ],
    projects: [
      "A RAG chatbot over your own document set",
      "A fine-tuned classifier for a real dataset with a written evaluation report",
      "An eval harness that scores a prompt across 50+ test cases",
    ],
    interviewQuestions: [
      "How would you evaluate whether a new prompt is actually better than the old one?",
      "Walk me through the tradeoffs between fine-tuning and RAG for a given problem.",
      "How do you control cost and latency in an LLM-backed feature?",
    ],
    gradient: ["#6366F1", "#14B8A6"],
    simulation: {
      title: "Shipping a Support Bot Feature",
      estimatedMinutes: 40,
      xpReward: 260,
      briefing:
        "Your team wants to launch an AI support assistant. You'll choose a retrieval strategy, review evaluation results, and decide whether the feature is ready to ship.",
      steps: [
        {
          from: "Leo (Product Manager)",
          channel: "slack",
          message: "The support bot keeps citing outdated pricing. Docs update weekly. What's your fix?",
          prompt: "How do you respond?",
          options: [
            "Move to a retrieval setup that pulls from the live docs instead of a static prompt",
            "Manually update the system prompt every time pricing changes",
            "Tell Leo the model just needs to be 'smarter'",
          ],
        },
        {
          from: "Eval dashboard",
          channel: "task",
          message: "Your new eval run shows accuracy improved from 71% to 89%, but average response time went from 1.2s to 3.4s.",
          prompt: "What do you do with this result?",
          options: [
            "Investigate whether a smaller retrieval window keeps most of the accuracy gain with less latency",
            "Ship it — accuracy is what matters most",
            "Revert everything since latency got worse",
          ],
        },
        {
          from: "Leo (Product Manager)",
          channel: "meeting",
          message: "Leadership wants to launch tomorrow. Your eval set only covers English queries so far.",
          prompt: "What's your call?",
          options: [
            "Recommend launching to English-only users first and flag the gap clearly",
            "Launch to everyone — most users are probably English speakers anyway",
            "Delay the whole launch by two weeks without discussing options",
          ],
        },
      ],
    },
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    category: "business",
    shortDescription: "Own the roadmap and turn ambiguous problems into shipped features.",
    overview:
      "Product managers decide what a team builds and why. The job is equal parts research (talking to users, reading data), communication (aligning engineering, design, and leadership), and prioritization (saying no to good ideas so the great one ships on time).",
    dayInLife:
      "The day is a string of context switches: a sprint planning meeting, a one-on-one with a designer about a wireframe, writing a spec for the next feature, and a stakeholder update explaining why a launch slipped a week.",
    salaryMin: 95000,
    salaryMax: 175000,
    currency: "USD",
    demand: "High",
    difficulty: "Intermediate",
    aiImpact: "Moderate",
    futureOutlook:
      "PM headcount growth has slowed at large tech companies but demand remains strong at startups and mid-size companies, especially for PMs who can work directly with data and AI features.",
    remote: true,
    education: "Bachelor's in any field; MBA helps but isn't required",
    skills: ["Prioritization", "User research", "Data analysis", "Writing specs", "Stakeholder communication"],
    tools: ["Linear", "Figma", "Amplitude", "Notion", "Slack"],
    certifications: ["Reforge Product Strategy", "Pragmatic Institute PMC"],
    roadmap: [
      { stage: "01", title: "Learn the craft", description: "Study prioritization frameworks, spec writing, and how metrics tie to product decisions.", duration: "2–3 months" },
      { stage: "02", title: "Get reps in", description: "Run a side project or volunteer PM work — write real specs, ship real features.", duration: "2–3 months" },
      { stage: "03", title: "Build a portfolio", description: "Document 2–3 case studies: the problem, your process, the outcome.", duration: "1 month" },
      { stage: "04", title: "Break in", description: "Target APM programs or smaller companies where the scope is broader.", duration: "2–4 months" },
    ],
    courses: [
      { title: "Reforge Product Strategy", provider: "Reforge" },
      { title: "Product Management Fundamentals", provider: "Product School" },
    ],
    projects: [
      "A PRD for a feature on a product you use, with mocked-up user research",
      "A prioritized roadmap for a hypothetical quarter with tradeoffs explained",
    ],
    interviewQuestions: [
      "Tell me about a time you said no to a feature everyone else wanted.",
      "How would you prioritize a backlog with three equally loud stakeholders?",
      "Walk me through how you'd measure success for a new onboarding flow.",
    ],
    gradient: ["#14B8A6", "#F472B6"],
    simulation: {
      title: "Prioritizing a Contested Roadmap",
      estimatedMinutes: 30,
      xpReward: 200,
      briefing:
        "Sales wants a custom-reporting feature closed this quarter. Engineering flags it as a 6-week job. You have room for one more mid-size project. What do you do?",
      steps: [
        {
          from: "Marcus (Head of Sales)",
          channel: "slack",
          message: "We're about to lose the Whitmore account without custom reporting. Can we commit to this quarter?",
          prompt: "How do you respond?",
          options: [
            "Ask for the actual revenue at risk and how many other accounts need the same thing",
            "Commit immediately since it's one big account",
            "Say no without looking into it further",
          ],
        },
        {
          from: "Sana (Eng Lead)",
          channel: "meeting",
          message: "Custom reporting is 6 weeks and would bump our planned performance work to next quarter.",
          prompt: "What's your call?",
          options: [
            "Scope a smaller version that solves Whitmore's specific need in 2 weeks, keep performance work on track",
            "Push the full 6-week build and let performance work slip",
            "Tell Sana to just make both happen in parallel",
          ],
        },
        {
          from: "Leadership",
          channel: "email",
          message: "You're asked to justify the tradeoff in the next roadmap review.",
          prompt: "How do you frame it?",
          options: [
            "Show the revenue-at-risk number against the cost of delaying performance work, with the scoped-down plan",
            "Say 'sales asked for it' with no further detail",
            "Avoid presenting numbers and hope no one asks",
          ],
        },
      ],
    },
  },
  {
    slug: "ux-designer",
    title: "UX Designer",
    category: "technology",
    shortDescription: "Turn research and wireframes into interfaces people love using.",
    overview:
      "UX designers research how people actually use a product, then translate that understanding into flows, wireframes, and polished interfaces. Good UX designers spend as much time asking questions as they do in design tools.",
    dayInLife:
      "Expect a mix of user interview synthesis, wireframing a new flow, a design critique with the team, and a working session with an engineer to make sure what shipped matches the design intent.",
    salaryMin: 70000,
    salaryMax: 135000,
    currency: "USD",
    demand: "High",
    difficulty: "Intermediate",
    aiImpact: "Moderate",
    futureOutlook:
      "AI tools speed up production work (mockups, variations), which is shifting the job further toward research, systems thinking, and judgment — the parts hardest to automate.",
    remote: true,
    education: "Bachelor's in design, HCI, or a strong self-taught portfolio",
    skills: ["User research", "Wireframing", "Prototyping", "Information architecture", "Design systems"],
    tools: ["Figma", "Maze", "Notion", "FigJam"],
    certifications: ["Google UX Design Certificate", "NN/g UX Certification"],
    roadmap: [
      { stage: "01", title: "Learn design fundamentals", description: "Typography, layout, color, and the basics of user research methods.", duration: "2–3 months" },
      { stage: "02", title: "Learn the tools", description: "Get fluent in Figma — wireframes, components, and prototyping.", duration: "1 month" },
      { stage: "03", title: "Build a portfolio", description: "3 case studies showing research → decisions → final design, not just pretty screens.", duration: "2–3 months" },
      { stage: "04", title: "Get real feedback", description: "Redesign a real product's flow and get critique from working designers.", duration: "1–2 months" },
    ],
    courses: [
      { title: "Google UX Design Certificate", provider: "Coursera" },
      { title: "Refactoring UI", provider: "Adam Wathan & Steve Schoger" },
    ],
    projects: [
      "A case study redesigning a flow in an app you use, with research to back it up",
      "A small design system with reusable components",
    ],
    interviewQuestions: [
      "Walk me through your process from research to final design.",
      "Tell me about a time user research changed your design direction.",
      "How do you handle disagreement with an engineer about feasibility?",
    ],
    gradient: ["#F472B6", "#6366F1"],
    simulation: {
      title: "Redesigning a Broken Checkout Flow",
      estimatedMinutes: 30,
      xpReward: 200,
      briefing:
        "Support tickets show users abandon checkout at the shipping-address step. You'll review session recordings, propose a fix, and defend it in a design critique.",
      steps: [
        {
          from: "Support data",
          channel: "task",
          message: "40% of drop-off happens right after users see the shipping form. Session recordings show repeated back-and-forth scrolling.",
          prompt: "What's your first move?",
          options: [
            "Watch 5–10 recordings closely to see exactly where users hesitate before proposing a fix",
            "Redesign the whole checkout flow immediately based on the drop-off number alone",
            "Assume it's a copy problem and rewrite the button text",
          ],
        },
        {
          from: "You",
          channel: "task",
          message: "You find the address form has 11 fields on one long page with no clear grouping.",
          prompt: "What do you propose?",
          options: [
            "Group fields logically and break the form into short, clearly labeled sections",
            "Remove several required fields without checking if they're needed for shipping",
            "Add a progress bar but leave the form structure unchanged",
          ],
        },
        {
          from: "Team critique",
          channel: "meeting",
          message: "An engineer pushes back: 'This will take two sprints to build.'",
          prompt: "How do you respond?",
          options: [
            "Propose a smaller first version — regrouped fields only — then layer in progressive disclosure later",
            "Insist on the full redesign regardless of timeline",
            "Drop the whole proposal to avoid the conversation",
          ],
        },
      ],
    },
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    category: "technology",
    shortDescription: "Pull signal from messy data and turn it into decisions.",
    overview:
      "Data scientists find patterns in data and translate them into recommendations a business can act on. The job blends statistics, programming, and — just as often — explaining a nuanced result to people who don't have a stats background.",
    dayInLife:
      "A day might include cleaning a messy dataset, building a model to predict churn, presenting findings to a skeptical stakeholder, and debating with an engineer about how to put a model into production.",
    salaryMin: 90000,
    salaryMax: 170000,
    currency: "USD",
    demand: "Very High",
    difficulty: "Advanced",
    aiImpact: "High",
    futureOutlook:
      "Routine analysis is increasingly automated, but the demand for people who can frame the right question and validate a model's real-world impact keeps growing.",
    remote: true,
    education: "Bachelor's/Master's in Statistics, CS, Math, or a related quantitative field",
    skills: ["Python/R", "SQL", "Statistics", "Machine learning", "Data visualization", "Communication"],
    tools: ["Jupyter", "pandas", "scikit-learn", "Tableau", "SQL"],
    certifications: ["Google Data Analytics Certificate", "Microsoft Certified: Azure Data Scientist"],
    roadmap: [
      { stage: "01", title: "Statistics + Python", description: "Core statistics, then Python for data manipulation and visualization.", duration: "3–4 months" },
      { stage: "02", title: "Machine learning fundamentals", description: "Regression, classification, and how to validate a model honestly.", duration: "2–3 months" },
      { stage: "03", title: "Real projects", description: "End-to-end projects with messy, real-world data — not clean Kaggle sets.", duration: "2–3 months" },
      { stage: "04", title: "Communicate results", description: "Practice explaining findings to a non-technical audience clearly.", duration: "Ongoing" },
    ],
    courses: [
      { title: "Google Data Analytics Certificate", provider: "Coursera" },
      { title: "Statistical Learning", provider: "Stanford Online" },
    ],
    projects: [
      "An end-to-end churn prediction model with a written explanation of tradeoffs",
      "A dashboard that answers a real business question from public data",
    ],
    interviewQuestions: [
      "How do you know if a model is actually good, not just accurate on paper?",
      "Walk me through how you'd explain a complex model to a non-technical exec.",
      "Tell me about a time your analysis contradicted what stakeholders expected.",
    ],
    gradient: ["#6366F1", "#F472B6"],
    simulation: {
      title: "Explaining a Surprising Churn Result",
      estimatedMinutes: 35,
      xpReward: 220,
      briefing:
        "Your churn model says price isn't the top driver of cancellations — support wait time is. Leadership expected a pricing story. You'll validate the finding and present it.",
      steps: [
        {
          from: "You",
          channel: "task",
          message: "Your model ranks 'average support response time' above price sensitivity as a churn predictor.",
          prompt: "What's your next step before presenting this?",
          options: [
            "Check for confounding variables — do slow-response users also happen to be lower-value customers?",
            "Present the finding immediately since the model output is clear",
            "Discard the result because it doesn't match expectations",
          ],
        },
        {
          from: "VP of Customer Success",
          channel: "meeting",
          message: "We've always assumed pricing drives churn. Are you sure about this?",
          prompt: "How do you respond?",
          options: [
            "Walk through the validation you did and show the effect holds even controlling for plan tier",
            "Say you're not fully sure and let leadership decide without more detail",
            "Get defensive about the model's accuracy",
          ],
        },
        {
          from: "Leadership",
          channel: "email",
          message: "They ask what to do with this insight.",
          prompt: "What do you recommend?",
          options: [
            "Recommend a scoped pilot — faster support SLAs for one at-risk segment — with a clear way to measure impact",
            "Recommend an org-wide support overhaul immediately with no pilot",
            "Suggest ignoring it since it wasn't the expected story",
          ],
        },
      ],
    },
  },
  {
    slug: "digital-marketer",
    title: "Digital Marketing Manager",
    category: "marketing",
    shortDescription: "Plan campaigns, read analytics, and grow an audience from zero.",
    overview:
      "Digital marketing managers plan and run campaigns across channels — search, social, email, paid ads — then use analytics to figure out what's actually working and double down on it.",
    dayInLife:
      "The day includes checking campaign performance dashboards, briefing a designer on new ad creative, writing email copy, and presenting a monthly report on what drove growth.",
    salaryMin: 55000,
    salaryMax: 110000,
    currency: "USD",
    demand: "High",
    difficulty: "Beginner",
    aiImpact: "High",
    futureOutlook:
      "AI tools have automated a lot of campaign execution, shifting the job toward strategy, brand judgment, and interpreting data rather than manual setup.",
    remote: true,
    education: "Bachelor's in marketing, communications, or a strong portfolio of campaign results",
    skills: ["Copywriting", "Analytics", "SEO basics", "Paid ads", "A/B testing"],
    tools: ["Google Analytics", "Meta Ads Manager", "Mailchimp", "Canva", "HubSpot"],
    certifications: ["Google Ads Certification", "HubSpot Content Marketing Certification"],
    roadmap: [
      { stage: "01", title: "Learn the channels", description: "SEO basics, paid social, email — understand how each one actually drives results.", duration: "2 months" },
      { stage: "02", title: "Run real campaigns", description: "Manage a small budget campaign (even a personal project) end to end.", duration: "1–2 months" },
      { stage: "03", title: "Learn analytics", description: "Get comfortable reading Google Analytics and building a simple report.", duration: "1 month" },
      { stage: "04", title: "Build a portfolio", description: "Document 2–3 campaigns with real numbers, even small ones.", duration: "1 month" },
    ],
    courses: [
      { title: "Google Digital Marketing & E-commerce Certificate", provider: "Coursera" },
      { title: "HubSpot Content Marketing Certification", provider: "HubSpot Academy" },
    ],
    projects: [
      "A small paid ad campaign with a documented budget, targeting, and results",
      "An email sequence with open/click data from a real send",
    ],
    interviewQuestions: [
      "Walk me through a campaign that underperformed — what did you change?",
      "How do you decide which channel to invest budget in?",
      "What metric matters most for a product with a long sales cycle vs. a short one?",
    ],
    gradient: ["#14B8A6", "#6366F1"],
    simulation: {
      title: "Rescuing an Underperforming Launch Campaign",
      estimatedMinutes: 25,
      xpReward: 180,
      briefing:
        "A product launch campaign is two weeks in and underperforming its signup target by 40%. You'll dig into the numbers and decide where to reallocate budget.",
      steps: [
        {
          from: "Dashboard",
          channel: "task",
          message: "Paid social is driving clicks but almost no signups. Email has a small list but a strong conversion rate.",
          prompt: "What's your first move?",
          options: [
            "Check the landing page experience for paid social traffic specifically — clicks without conversions usually means a mismatch there",
            "Immediately cut the paid social budget to zero",
            "Assume the product itself is the problem and escalate to the product team",
          ],
        },
        {
          from: "You",
          channel: "task",
          message: "The paid social ad promises 'early access' but the landing page shows a generic signup form with no mention of it.",
          prompt: "What do you fix first?",
          options: [
            "Rewrite the landing page to match the ad's promise before spending more on traffic",
            "Change the ad copy to match the generic landing page instead",
            "Leave both as-is and hope conversion improves naturally",
          ],
        },
        {
          from: "Manager",
          channel: "slack",
          message: "We have $2,000 left this month. Where does it go?",
          prompt: "How do you allocate it?",
          options: [
            "Shift most of it to email (higher conversion) while testing a fixed landing page with a small paid social budget",
            "Put it all into paid social again without changes",
            "Save it for next month and pause everything",
          ],
        },
      ],
    },
  },
  {
    slug: "doctor",
    title: "Doctor (Physician)",
    category: "healthcare",
    shortDescription: "Diagnose, treat, and guide patients through some of their hardest days.",
    overview:
      "Physicians diagnose and treat illness and injury, working across a huge range of specialties from family medicine to surgery. The path is long — years of school and training — but the work is central to people's lives in a way few careers are.",
    dayInLife:
      "A primary-care physician's day might include back-to-back patient visits, reviewing lab results, coordinating with specialists, and documenting each visit thoroughly for the medical record — often running behind schedule by mid-morning.",
    salaryMin: 190000,
    salaryMax: 350000,
    currency: "USD",
    demand: "Very High",
    difficulty: "Advanced",
    aiImpact: "Moderate",
    futureOutlook:
      "Persistent shortages in primary care and rural areas keep demand high. AI is changing diagnostics and documentation, but the license, judgment, and trust required for patient care remain firmly human.",
    remote: false,
    education: "MD or DO — 4 years med school + 3–7 years residency depending on specialty",
    skills: ["Clinical reasoning", "Bedside manner", "Attention to detail", "Working under pressure", "Documentation"],
    tools: ["Electronic Health Records (Epic, Cerner)", "Diagnostic imaging systems", "Clinical decision support tools"],
    certifications: ["USMLE Steps 1–3", "Board certification in chosen specialty"],
    roadmap: [
      { stage: "01", title: "Pre-med foundation", description: "Strong biology/chemistry coursework and MCAT prep.", duration: "4 years (undergrad)" },
      { stage: "02", title: "Medical school", description: "Two years of coursework, two years of clinical rotations across specialties.", duration: "4 years" },
      { stage: "03", title: "Residency", description: "Specialty-specific supervised practice — family medicine is shortest, surgical specialties longest.", duration: "3–7 years" },
      { stage: "04", title: "Board certification & practice", description: "Pass board exams in your specialty and begin independent practice.", duration: "Ongoing" },
    ],
    courses: [
      { title: "MCAT Prep", provider: "Khan Academy / AAMC" },
      { title: "Anatomy & Physiology", provider: "Any accredited pre-med program" },
    ],
    projects: [
      "Shadow a physician in a specialty you're curious about and journal what surprises you",
      "Volunteer in a clinical setting to see patient interaction firsthand",
    ],
    interviewQuestions: [
      "Tell me about a time you had to deliver difficult news.",
      "How do you handle disagreement with a colleague about a treatment plan?",
      "Why this specialty, specifically?",
    ],
    gradient: ["#6366F1", "#14B8A6"],
    simulation: {
      title: "A Morning in Family Medicine",
      estimatedMinutes: 30,
      xpReward: 200,
      briefing:
        "You're a family medicine physician running a slightly overbooked morning clinic. You'll triage symptoms, make a call under time pressure, and communicate clearly with a worried patient.",
      steps: [
        {
          from: "Nurse",
          channel: "task",
          message: "Room 3: a patient with chest tightness and shortness of breath, otherwise healthy, 34 years old.",
          prompt: "What's your immediate priority?",
          options: [
            "Rule out cardiac and other urgent causes first, even if anxiety is a likely explanation",
            "Assume it's anxiety and prescribe accordingly without further exam",
            "Ask the nurse to reschedule since the clinic is already behind",
          ],
        },
        {
          from: "You",
          channel: "task",
          message: "Vitals and exam are reassuring; history strongly suggests a panic episode, not cardiac.",
          prompt: "How do you communicate this to the patient?",
          options: [
            "Explain the findings clearly, validate that the symptoms are real, and outline next steps and when to seek urgent care",
            "Say 'it's just anxiety' and move on quickly",
            "Order an extensive battery of tests to be maximally cautious without explaining why",
          ],
        },
        {
          from: "Front desk",
          channel: "slack",
          message: "You're now 25 minutes behind and the next patient is getting frustrated.",
          prompt: "How do you handle the rest of the morning?",
          options: [
            "Have the front desk give patients an honest update and briefly tighten visit times where clinically safe to do so",
            "Rush through remaining visits without communicating the delay",
            "Ignore the backlog and proceed exactly as planned",
          ],
        },
      ],
    },
  },
  {
    slug: "psychologist",
    title: "Psychologist",
    category: "healthcare",
    shortDescription: "Help people understand their minds and navigate hard seasons of life.",
    overview:
      "Psychologists assess, diagnose, and treat mental and emotional conditions through therapy, testing, and research. The role requires deep listening, clinical judgment, and the ability to hold space for difficult emotions session after session.",
    dayInLife:
      "A clinical psychologist's day is largely back-to-back therapy sessions, with time between for notes, occasional crisis calls, and case consultations with colleagues on complex clients.",
    salaryMin: 65000,
    salaryMax: 120000,
    currency: "USD",
    demand: "High",
    difficulty: "Advanced",
    aiImpact: "Low",
    futureOutlook:
      "Demand for mental health services continues to outpace supply in most regions. The therapeutic relationship itself is hard to automate, keeping this a resilient, human-centered field.",
    remote: true,
    education: "Doctorate (PhD or PsyD) for licensed clinical practice; Master's for some counseling roles",
    skills: ["Active listening", "Clinical assessment", "Empathy", "Boundary-setting", "Case documentation"],
    tools: ["Electronic health record systems", "Standardized assessment instruments", "Teletherapy platforms"],
    certifications: ["State licensure (required to practice)", "Specialty certifications (e.g., CBT, trauma-informed care)"],
    roadmap: [
      { stage: "01", title: "Undergraduate psychology", description: "Bachelor's degree with research experience if possible.", duration: "4 years" },
      { stage: "02", title: "Graduate training", description: "PhD or PsyD program with supervised clinical practicum.", duration: "5–7 years" },
      { stage: "03", title: "Supervised hours + licensure", description: "Complete required supervised clinical hours and pass licensing exams.", duration: "1–2 years" },
      { stage: "04", title: "Independent practice", description: "Begin practicing independently or join a group practice/hospital system.", duration: "Ongoing" },
    ],
    courses: [
      { title: "Introduction to Psychology", provider: "Any accredited university" },
      { title: "Abnormal Psychology", provider: "Any accredited university" },
    ],
    projects: [
      "Volunteer at a crisis text line or peer support program",
      "Read and summarize case studies in a therapeutic modality that interests you",
    ],
    interviewQuestions: [
      "How do you handle a client who is resistant to treatment?",
      "Tell me about a time you had to manage your own emotional response in session.",
      "How do you know when to refer a client elsewhere?",
    ],
    gradient: ["#F472B6", "#6366F1"],
    simulation: {
      title: "A First Session with a Resistant Client",
      estimatedMinutes: 25,
      xpReward: 180,
      briefing:
        "Your new client was referred by a worried family member and isn't sure therapy will help. You'll build rapport in the first session without pushing too hard.",
      steps: [
        {
          from: "Client",
          channel: "meeting",
          message: "'My sister made me come. I don't really think I need this.'",
          prompt: "How do you respond?",
          options: [
            "Acknowledge the resistance honestly and ask what would make this hour worth their time, even if they didn't choose to be here",
            "Insist that therapy will help and explain why they're wrong to doubt it",
            "Move straight into standard intake questions, ignoring the comment",
          ],
        },
        {
          from: "Client",
          channel: "meeting",
          message: "They open up slightly about work stress but shut down when you ask about family.",
          prompt: "What do you do?",
          options: [
            "Respect the boundary, note it, and return to it gently in a later session once trust builds",
            "Push further on the family topic since it seems important",
            "Change the subject completely and never return to it",
          ],
        },
        {
          from: "End of session",
          channel: "task",
          message: "You have five minutes left and need to close the session.",
          prompt: "How do you wrap up?",
          options: [
            "Summarize what was shared, validate the effort it took to show up, and offer a low-pressure plan for next time",
            "End abruptly once the clock runs out",
            "Schedule the next session without any reflection on this one",
          ],
        },
      ],
    },
  },
  {
    slug: "mechanical-engineer",
    title: "Mechanical Engineer",
    category: "engineering",
    shortDescription: "Design and test the physical systems that make products work.",
    overview:
      "Mechanical engineers design, analyze, and test mechanical systems — everything from engines to medical devices to consumer products. The work blends physics, CAD modeling, and hands-on prototyping.",
    dayInLife:
      "A day might include CAD design work, running stress simulations on a part, reviewing test results from a physical prototype, and a design review meeting with the manufacturing team about tolerances.",
    salaryMin: 68000,
    salaryMax: 125000,
    currency: "USD",
    demand: "High",
    difficulty: "Intermediate",
    aiImpact: "Moderate",
    futureOutlook:
      "Steady demand across manufacturing, energy, aerospace, and robotics. AI-assisted simulation tools are speeding up design iteration without replacing the engineering judgment behind it.",
    remote: false,
    education: "Bachelor's in Mechanical Engineering (ABET-accredited)",
    skills: ["CAD modeling", "Physics/statics", "Materials science", "Prototyping", "Problem solving"],
    tools: ["SolidWorks", "AutoCAD", "ANSYS", "MATLAB"],
    certifications: ["Fundamentals of Engineering (FE) Exam", "Professional Engineer (PE) License"],
    roadmap: [
      { stage: "01", title: "Core engineering fundamentals", description: "Statics, dynamics, thermodynamics, and materials science.", duration: "2 years" },
      { stage: "02", title: "CAD & simulation tools", description: "Get fluent in SolidWorks or similar, plus basic FEA simulation.", duration: "1 year (concurrent)" },
      { stage: "03", title: "Internship/co-op", description: "Real-world design experience is highly valued by employers.", duration: "3–12 months" },
      { stage: "04", title: "FE exam & entry-level role", description: "Pass the FE exam and start as a junior design or test engineer.", duration: "First year on the job" },
    ],
    courses: [
      { title: "Mechanics of Materials", provider: "MIT OpenCourseWare" },
      { title: "SolidWorks Essentials", provider: "SolidWorks / Dassault Systèmes" },
    ],
    projects: [
      "Design and 3D-print a functional mechanical assembly",
      "Build and document a stress analysis on a simple bracket design",
    ],
    interviewQuestions: [
      "Walk me through a design you had to iterate on after it failed testing.",
      "How do you balance cost, manufacturability, and performance in a design?",
      "Tell me about a time you disagreed with a manufacturing constraint.",
    ],
    gradient: ["#14B8A6", "#6366F1"],
    simulation: {
      title: "A Bracket Fails Load Testing",
      estimatedMinutes: 30,
      xpReward: 200,
      briefing:
        "A mounting bracket you designed failed at 80% of its rated load during testing, two weeks before a manufacturing deadline.",
      steps: [
        {
          from: "Test engineer",
          channel: "task",
          message: "The bracket cracked at a stress concentration point near the mounting hole.",
          prompt: "What's your first step?",
          options: [
            "Re-run the FEA simulation focused on that specific stress concentration to confirm the failure mode",
            "Immediately thicken the entire part without analysis",
            "Assume it was a manufacturing defect and re-order the same design",
          ],
        },
        {
          from: "You",
          channel: "task",
          message: "The simulation confirms a sharp internal corner is concentrating stress well above the safety margin.",
          prompt: "What design change do you make?",
          options: [
            "Add a fillet radius at the corner to distribute stress, then re-test before approving",
            "Switch to a much more expensive material without changing the geometry",
            "Leave the geometry unchanged and just add a warning label",
          ],
        },
        {
          from: "Manager",
          channel: "slack",
          message: "The deadline is in two weeks. Can we make it?",
          prompt: "How do you respond?",
          options: [
            "Give a realistic timeline for re-testing the fix and flag the risk if it doesn't hold, rather than overpromising",
            "Promise it'll definitely be ready without re-testing",
            "Say it's impossible without proposing any path forward",
          ],
        },
      ],
    },
  },
  {
    slug: "architect",
    title: "Architect",
    category: "creative",
    shortDescription: "Design buildings and spaces that balance beauty, function, and code.",
    overview:
      "Architects design buildings and spaces, balancing a client's vision with structural feasibility, budget, and building codes. The work spans creative design, technical drafting, and a lot of coordination with engineers and contractors.",
    dayInLife:
      "A day might include a client presentation of design concepts, detailed drafting work in CAD software, a site visit to check construction progress, and code-compliance review with a structural engineer.",
    salaryMin: 60000,
    salaryMax: 130000,
    currency: "USD",
    demand: "Moderate",
    difficulty: "Advanced",
    aiImpact: "Moderate",
    futureOutlook:
      "AI-assisted rendering and drafting tools speed up early concept work, but licensed architects remain essential for code compliance, structural coordination, and client accountability.",
    remote: false,
    education: "Bachelor's or Master's in Architecture (accredited) + licensure",
    skills: ["Spatial design", "CAD/BIM software", "Building codes", "Client communication", "Project management"],
    tools: ["AutoCAD", "Revit", "SketchUp", "Rhino"],
    certifications: ["Architect Registration Examination (ARE)", "LEED Accreditation"],
    roadmap: [
      { stage: "01", title: "Architecture degree", description: "B.Arch (5 years) or M.Arch after a related bachelor's.", duration: "5 years" },
      { stage: "02", title: "Internship (AXP)", description: "Required supervised work experience hours before licensure.", duration: "2–3 years" },
      { stage: "03", title: "Licensing exams", description: "Pass the multi-part Architect Registration Examination.", duration: "1–2 years" },
      { stage: "04", title: "Licensed practice", description: "Practice independently or advance within a firm.", duration: "Ongoing" },
    ],
    courses: [
      { title: "Introduction to Architectural Design", provider: "Coursera / university extension" },
      { title: "Revit Architecture Fundamentals", provider: "Autodesk" },
    ],
    projects: [
      "Design a small residential floor plan with code-compliant dimensions",
      "Build a 3D model of an existing building you admire and analyze its design choices",
    ],
    interviewQuestions: [
      "Walk me through how you balance a client's vision with budget constraints.",
      "Tell me about a design you had to significantly change due to code requirements.",
      "How do you handle disagreement with a structural engineer?",
    ],
    gradient: ["#F472B6", "#14B8A6"],
    simulation: {
      title: "Balancing Vision and Budget",
      estimatedMinutes: 30,
      xpReward: 200,
      briefing:
        "Your client wants a dramatic glass atrium in their home design, but it's pushing 20% over budget. You'll find a design compromise and present it well.",
      steps: [
        {
          from: "Client",
          channel: "meeting",
          message: "'The atrium was the whole reason we hired you. We don't want to lose it.'",
          prompt: "How do you respond?",
          options: [
            "Explore a scaled-down version that keeps the visual impact with less structural glass",
            "Tell them flatly it's not possible and move on",
            "Agree to keep it as-is and quietly let the budget overrun happen",
          ],
        },
        {
          from: "Structural engineer",
          channel: "email",
          message: "The scaled-down atrium is structurally sound but needs a support beam that changes the ceiling line slightly.",
          prompt: "What do you do?",
          options: [
            "Incorporate the beam into the design intentionally rather than hiding it awkwardly",
            "Ignore the engineer's note and proceed with the original plan",
            "Scrap the atrium concept entirely without exploring the fix",
          ],
        },
        {
          from: "Client",
          channel: "meeting",
          message: "You present the revised design.",
          prompt: "How do you frame the changes?",
          options: [
            "Show the budget tradeoff clearly and explain how the beam became a design feature, not just a constraint",
            "Present it without mentioning the budget reasoning at all",
            "Apologize repeatedly for not delivering the original vision",
          ],
        },
      ],
    },
  },
  {
    slug: "lawyer",
    title: "Lawyer",
    category: "government-law",
    shortDescription: "Advise clients, build arguments, and navigate the legal system.",
    overview:
      "Lawyers advise clients on legal matters, draft contracts and filings, and represent clients in negotiations or court. The field spans many specialties — corporate, criminal, family, intellectual property — each with a different day-to-day rhythm.",
    dayInLife:
      "A litigation associate's day might include drafting a motion, reviewing discovery documents, a client call to explain next steps in plain language, and prepping questions for an upcoming deposition.",
    salaryMin: 65000,
    salaryMax: 200000,
    currency: "USD",
    demand: "High",
    difficulty: "Advanced",
    aiImpact: "High",
    futureOutlook:
      "AI is automating document review and legal research, shifting junior work toward higher-judgment tasks earlier in a career. Demand for specialized legal expertise remains strong.",
    remote: false,
    education: "Bachelor's + Juris Doctor (JD) + passing the bar exam",
    skills: ["Legal research", "Argumentation", "Writing", "Negotiation", "Attention to detail"],
    tools: ["Westlaw / LexisNexis", "Clio (practice management)", "Document review platforms"],
    certifications: ["State Bar Admission (required to practice)"],
    roadmap: [
      { stage: "01", title: "Undergraduate degree", description: "Any major; strong writing and analytical coursework helps.", duration: "4 years" },
      { stage: "02", title: "LSAT + law school", description: "Take the LSAT, then complete a 3-year JD program.", duration: "3 years" },
      { stage: "03", title: "Bar exam", description: "Pass the bar exam in the state where you intend to practice.", duration: "3–4 months prep" },
      { stage: "04", title: "Practice & specialize", description: "Start at a firm, government office, or in-house team and build a specialty.", duration: "Ongoing" },
    ],
    courses: [
      { title: "LSAT Prep", provider: "Khan Academy (official free prep)" },
      { title: "Introduction to U.S. Law", provider: "Coursera (Yale)" },
    ],
    projects: [
      "Moot court or mock trial participation",
      "Summarize a real court opinion in plain language for a general audience",
    ],
    interviewQuestions: [
      "Walk me through how you'd approach a case with conflicting evidence.",
      "Tell me about a time you had to explain something complex to a client simply.",
      "How do you handle the pressure of a tight filing deadline?",
    ],
    gradient: ["#6366F1", "#14B8A6"],
    simulation: {
      title: "Advising a Client Under Pressure",
      estimatedMinutes: 30,
      xpReward: 200,
      briefing:
        "Your client, a small business owner, wants to fire an employee immediately after a heated dispute. You'll advise them on risk before they act.",
      steps: [
        {
          from: "Client",
          channel: "meeting",
          message: "'I want them gone today. Can we just do that?'",
          prompt: "How do you respond?",
          options: [
            "Ask clarifying questions about the employee's history and any protected characteristics before advising",
            "Say yes immediately since it's the client's business",
            "Refuse to discuss it further until they calm down",
          ],
        },
        {
          from: "You",
          channel: "task",
          message: "You learn the employee recently filed a workplace complaint — raising retaliation risk if fired now.",
          prompt: "What do you advise?",
          options: [
            "Explain the retaliation risk clearly and recommend a documented, delayed process instead of an immediate firing",
            "Tell the client the complaint is irrelevant and proceed as planned",
            "Advise firing immediately to avoid further complaints",
          ],
        },
        {
          from: "Client",
          channel: "email",
          message: "They push back: 'This is my company, I make the calls.'",
          prompt: "How do you hold your ground professionally?",
          options: [
            "Reaffirm your legal advice clearly, document it in writing, and let them make an informed final decision",
            "Cave and tell them to do whatever they want",
            "End the client relationship immediately over the disagreement",
          ],
        },
      ],
    },
  },
  {
    slug: "research-scientist",
    title: "Research Scientist",
    category: "science-research",
    shortDescription: "Design experiments and chase answers no one has found yet.",
    overview:
      "Research scientists design and run experiments to answer open questions in a field — from biology to physics to materials science. The job involves as much grant-writing and failure as it does discovery.",
    dayInLife:
      "A day might include running an experiment in the lab, analyzing results that contradict your hypothesis, writing part of a grant proposal, and a lab meeting discussing a paper that just came out in your field.",
    salaryMin: 60000,
    salaryMax: 140000,
    currency: "USD",
    demand: "Moderate",
    difficulty: "Advanced",
    aiImpact: "Moderate",
    futureOutlook:
      "AI is accelerating hypothesis generation and data analysis in research, but designing rigorous experiments and interpreting ambiguous results still requires deep domain expertise.",
    remote: false,
    education: "PhD in relevant field (typical for independent research roles)",
    skills: ["Experimental design", "Statistical analysis", "Scientific writing", "Critical thinking", "Grant writing"],
    tools: ["Lab-specific equipment", "R/Python for analysis", "Reference management (Zotero/EndNote)"],
    certifications: ["Field-specific lab safety certifications", "PhD (functions as the core credential)"],
    roadmap: [
      { stage: "01", title: "Undergraduate research", description: "Get into a lab early — research experience matters more than grades alone.", duration: "2–4 years" },
      { stage: "02", title: "PhD program", description: "Original research culminating in a dissertation, typically with published papers.", duration: "5–6 years" },
      { stage: "03", title: "Postdoctoral research", description: "Common next step to build an independent research record.", duration: "2–4 years" },
      { stage: "04", title: "Independent research role", description: "Faculty position, national lab, or industry research scientist role.", duration: "Ongoing" },
    ],
    courses: [
      { title: "Research Methods & Statistics", provider: "Any accredited university" },
      { title: "Scientific Writing", provider: "Coursera (Stanford)" },
    ],
    projects: [
      "An independent research project with a clearly stated hypothesis and honest reporting of null results",
      "A literature review summarizing the current state of a narrow research question",
    ],
    interviewQuestions: [
      "Tell me about an experiment that didn't go as expected — what did you learn?",
      "How do you decide when you have enough data to draw a conclusion?",
      "Walk me through how you'd design a study to test a specific hypothesis.",
    ],
    gradient: ["#14B8A6", "#F472B6"],
    simulation: {
      title: "An Experiment Contradicts the Hypothesis",
      estimatedMinutes: 30,
      xpReward: 200,
      briefing:
        "Your results contradict your original hypothesis two weeks before a grant progress report is due. You'll decide how to interpret and report this honestly.",
      steps: [
        {
          from: "Lab notebook",
          channel: "task",
          message: "The compound shows no significant effect — the opposite of what preliminary data suggested.",
          prompt: "What's your first step?",
          options: [
            "Check for confounds in the experimental setup and consider replicating before drawing conclusions",
            "Adjust the data slightly to better match the preliminary trend",
            "Assume the compound is a dead end and abandon the line of research immediately",
          ],
        },
        {
          from: "Replication",
          channel: "task",
          message: "The replicated result confirms no significant effect.",
          prompt: "How do you report this in your progress report?",
          options: [
            "Report the null result honestly along with what you learned and a revised direction",
            "Omit the result and only report earlier, more promising preliminary data",
            "Report it vaguely to avoid drawing attention to the negative finding",
          ],
        },
        {
          from: "PI (Principal Investigator)",
          channel: "meeting",
          message: "'This is disappointing, but talk me through what's next.'",
          prompt: "How do you respond?",
          options: [
            "Propose a specific revised hypothesis based on what the null result actually tells you",
            "Say you're not sure what to do next",
            "Suggest repeating the exact same experiment with no changes",
          ],
        },
      ],
    },
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    category: "technology",
    shortDescription: "Own the end-to-end design of a product, from concept to shipped feature.",
    overview:
      "Product designers work across UX, visual design, and sometimes front-end implementation to own a feature from concept to ship. It's a broader remit than a pure UX or visual design role — you're accountable for the outcome, not just the artifact.",
    dayInLife:
      "A day includes early concept sketching for a new feature, a critique session, close collaboration with a PM on scope, and reviewing the built feature against the design spec before launch.",
    salaryMin: 75000,
    salaryMax: 150000,
    currency: "USD",
    demand: "High",
    difficulty: "Intermediate",
    aiImpact: "Moderate",
    futureOutlook:
      "Companies increasingly want designers who can move fast across research, design, and even light prototyping in code — a broad skill set that's hard to automate away.",
    remote: true,
    education: "Bachelor's in design or a strong self-taught portfolio",
    skills: ["Visual design", "Interaction design", "Prototyping", "Cross-functional collaboration"],
    tools: ["Figma", "Framer", "Principle", "Notion"],
    certifications: ["Google UX Design Certificate"],
    roadmap: [
      { stage: "01", title: "Design fundamentals", description: "Visual design principles plus core UX methods.", duration: "3 months" },
      { stage: "02", title: "End-to-end projects", description: "Own a feature from problem framing to a shippable design.", duration: "2–3 months" },
      { stage: "03", title: "Portfolio + case studies", description: "Show your process and reasoning, not just polished screens.", duration: "1–2 months" },
      { stage: "04", title: "Break in", description: "Target smaller companies first where the design role is broader.", duration: "2–3 months" },
    ],
    courses: [
      { title: "Google UX Design Certificate", provider: "Coursera" },
      { title: "Designing Interfaces", provider: "O'Reilly" },
    ],
    projects: [
      "A complete case study: problem, research, iterations, final shipped design",
      "A small interactive prototype built in Figma or Framer",
    ],
    interviewQuestions: [
      "Walk me through a project from problem to shipped design.",
      "Tell me about a time you had to cut scope to hit a deadline.",
      "How do you balance visual polish with usability?",
    ],
    gradient: ["#6366F1", "#F472B6"],
    simulation: {
      title: "Owning a Feature End to End",
      estimatedMinutes: 30,
      xpReward: 200,
      briefing:
        "You're designing a new notifications settings page. You'll scope the problem, design the flow, and defend cut corners under a tight deadline.",
      steps: [
        {
          from: "PM",
          channel: "slack",
          message: "We need granular notification controls shipped in two weeks — can design keep up?",
          prompt: "How do you respond?",
          options: [
            "Propose a scoped v1 with the most-requested controls, deferring edge cases to a v2",
            "Agree to build every possible control in two weeks without scoping",
            "Say it's impossible without offering an alternative",
          ],
        },
        {
          from: "You",
          channel: "task",
          message: "Early user testing shows people are confused by the toggle grouping.",
          prompt: "What do you do with this feedback so close to the deadline?",
          options: [
            "Make the specific, high-impact grouping fix and leave lower-impact polish for later",
            "Ignore the feedback to protect the timeline",
            "Redesign the entire page from scratch, risking the deadline",
          ],
        },
        {
          from: "Engineer",
          channel: "meeting",
          message: "One of your interaction patterns isn't feasible with the current notification backend.",
          prompt: "How do you handle it?",
          options: [
            "Work with the engineer to find a close alternative that's feasible in the timeline",
            "Insist on the original pattern regardless of feasibility",
            "Remove the feature entirely without discussing alternatives",
          ],
        },
      ],
    },
  },
  {
    slug: "financial-analyst",
    title: "Financial Analyst",
    category: "business",
    shortDescription: "Model the numbers that drive real business decisions.",
    overview:
      "Financial analysts build models, analyze performance, and support decisions about budgets, investments, and forecasts. The work is detail-heavy but the good analysts translate spreadsheets into clear recommendations.",
    dayInLife:
      "A day might include updating a quarterly forecast model, investigating a budget variance, preparing a slide for an exec review, and fielding questions from a department head about their spend.",
    salaryMin: 60000,
    salaryMax: 115000,
    currency: "USD",
    demand: "High",
    difficulty: "Intermediate",
    aiImpact: "High",
    futureOutlook:
      "AI tools are automating routine data pulls and first-draft models, pushing the role toward interpretation, scenario planning, and communicating tradeoffs to decision-makers.",
    remote: true,
    education: "Bachelor's in Finance, Accounting, or Economics",
    skills: ["Financial modeling", "Excel", "Forecasting", "Communication", "Attention to detail"],
    tools: ["Excel", "SQL", "Tableau", "NetSuite/SAP"],
    certifications: ["CFA (Chartered Financial Analyst)", "FMVA (Financial Modeling & Valuation Analyst)"],
    roadmap: [
      { stage: "01", title: "Core finance & accounting", description: "Understand financial statements deeply — not just formulas.", duration: "3–4 months" },
      { stage: "02", title: "Excel mastery", description: "Build real models: forecasts, valuations, scenario analysis.", duration: "1–2 months" },
      { stage: "03", title: "Real-world practice", description: "Model a real public company from its filings, end to end.", duration: "1 month" },
      { stage: "04", title: "Certifications & entry role", description: "Consider CFA Level 1 and apply broadly to FP&A or analyst roles.", duration: "3–6 months" },
    ],
    courses: [
      { title: "Financial Modeling & Valuation", provider: "Corporate Finance Institute" },
      { title: "CFA Level 1 Prep", provider: "CFA Institute" },
    ],
    projects: [
      "A full 3-statement financial model for a public company built from scratch",
      "A budget variance analysis with a written recommendation",
    ],
    interviewQuestions: [
      "Walk me through how you'd build a 3-statement model.",
      "Tell me about a time your analysis changed a business decision.",
      "How do you double-check a model for errors before presenting it?",
    ],
    gradient: ["#14B8A6", "#6366F1"],
    simulation: {
      title: "Explaining a Budget Overrun",
      estimatedMinutes: 25,
      xpReward: 180,
      briefing:
        "Marketing spent 30% over budget last quarter. You'll investigate the variance and present findings to the department head without pointing fingers unfairly.",
      steps: [
        {
          from: "You",
          channel: "task",
          message: "You dig into the ledger: most of the overrun is one large one-time campaign, not ongoing overspend.",
          prompt: "How do you frame this in your analysis?",
          options: [
            "Separate the one-time cost from ongoing spend so the trend isn't misread as a pattern",
            "Report only the total overrun number without context",
            "Assume it's ongoing overspend without checking further",
          ],
        },
        {
          from: "Marketing Director",
          channel: "meeting",
          message: "'That campaign drove our best quarter ever for signups. Was it worth flagging?'",
          prompt: "How do you respond?",
          options: [
            "Acknowledge the results, but recommend it be pre-approved as a planned exception next time, not an overrun",
            "Say it doesn't matter how well it performed, budget is budget",
            "Agree it wasn't worth flagging and drop the analysis",
          ],
        },
        {
          from: "CFO",
          channel: "email",
          message: "They ask for your recommendation on next quarter's budget process.",
          prompt: "What do you propose?",
          options: [
            "Suggest a small reserved 'high-opportunity campaign' line item to avoid this ambiguity next time",
            "Propose cutting marketing's budget as a penalty",
            "Propose no process change at all",
          ],
        },
      ],
    },
  },
  {
    slug: "civil-engineer",
    title: "Civil Engineer",
    category: "engineering",
    shortDescription: "Design the infrastructure that cities run on — roads, bridges, water systems.",
    overview:
      "Civil engineers design and oversee construction of infrastructure — roads, bridges, water systems, and buildings. The role blends technical design with heavy coordination across contractors, regulators, and the public.",
    dayInLife:
      "A day might include structural calculations for a bridge component, a site inspection, a permitting meeting with a city planning office, and reviewing a contractor's proposed change order.",
    salaryMin: 65000,
    salaryMax: 120000,
    currency: "USD",
    demand: "High",
    difficulty: "Intermediate",
    aiImpact: "Low",
    futureOutlook:
      "Aging infrastructure across the country means sustained long-term demand, especially for engineers who can navigate both design and regulatory approval processes.",
    remote: false,
    education: "Bachelor's in Civil Engineering (ABET-accredited) + PE license for senior roles",
    skills: ["Structural analysis", "AutoCAD/Civil 3D", "Project management", "Regulatory knowledge"],
    tools: ["AutoCAD Civil 3D", "STAAD.Pro", "GIS software"],
    certifications: ["Fundamentals of Engineering (FE)", "Professional Engineer (PE) License"],
    roadmap: [
      { stage: "01", title: "Core engineering coursework", description: "Statics, structural analysis, soil mechanics, fluid dynamics.", duration: "3–4 years" },
      { stage: "02", title: "Internship/co-op", description: "Field and design experience with a civil engineering firm.", duration: "6–12 months" },
      { stage: "03", title: "FE exam + entry role", description: "Pass the FE exam and start as an engineer-in-training (EIT).", duration: "First year" },
      { stage: "04", title: "PE licensure", description: "After 4 years of supervised experience, sit for the PE exam.", duration: "4 years post-grad" },
    ],
    courses: [
      { title: "Structural Analysis", provider: "MIT OpenCourseWare" },
      { title: "Civil 3D Essentials", provider: "Autodesk" },
    ],
    projects: [
      "Design a simple bridge truss and calculate load capacity by hand",
      "Analyze a local infrastructure project's public design documents",
    ],
    interviewQuestions: [
      "Walk me through how you'd approach a project with conflicting stakeholder demands.",
      "Tell me about a time a design had to change due to site conditions.",
      "How do you manage safety margins in your calculations?",
    ],
    gradient: ["#6366F1", "#14B8A6"],
    simulation: {
      title: "A Site Condition Changes the Plan",
      estimatedMinutes: 30,
      xpReward: 200,
      briefing:
        "Soil testing at a construction site reveals conditions different from the original geotechnical report, two weeks before foundation work begins.",
      steps: [
        {
          from: "Site inspector",
          channel: "task",
          message: "New soil samples show lower load-bearing capacity than the original report assumed.",
          prompt: "What's your first step?",
          options: [
            "Recalculate the foundation design against the new soil data before construction proceeds",
            "Proceed with the original design since testing takes too long",
            "Assume the new samples are an error and dismiss them",
          ],
        },
        {
          from: "You",
          channel: "task",
          message: "The recalculation shows the original foundation design needs a modified footing.",
          prompt: "How do you handle the change?",
          options: [
            "Document the change clearly, get sign-off from the structural lead, and communicate the delay honestly",
            "Make the change without documenting it to save time",
            "Ignore the finding and hope it doesn't matter in practice",
          ],
        },
        {
          from: "Project owner",
          channel: "meeting",
          message: "'This is going to cost more and take longer. Can we avoid that?'",
          prompt: "How do you respond?",
          options: [
            "Explain the safety reasoning clearly and present the realistic revised cost and timeline",
            "Downplay the issue to avoid an uncomfortable conversation",
            "Agree to skip the redesign to save time",
          ],
        },
      ],
    },
  },
];

export function getCareerBySlug(slug: string) {
  return careers.find((c) => c.slug === slug);
}

export function getCareersByCategory(category: CategorySlug) {
  return careers.filter((c) => c.category === category);
}

export function getCategoryCounts() {
  const counts = {} as Record<CategorySlug, number>;
  (Object.keys(categoryMeta) as CategorySlug[]).forEach((c) => (counts[c] = 0));
  careers.forEach((c) => (counts[c.category] += 1));
  return counts;
}
