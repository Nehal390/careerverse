# CareerVerse AI

**Experience your dream career before choosing it.**

CareerVerse AI lets students, grads, and career switchers run realistic AI-powered
work simulations across 40+ careers before committing years to one path.

---

## Status: all core pages live, no dead links

Every route linked from the navbar, hero, cards, footer, and CTAs now resolves
to a real page with complete content — nothing here is a placeholder or TODO.

- [x] Project scaffold (Next.js 15 App Router, TypeScript, Tailwind, config files)
- [x] Supabase schema (`supabase/schema.sql`) — careers, simulations, XP, badges, certificates
- [x] Landing page (hero, search, categories, featured careers, stats, how-it-works,
      testimonials, FAQ, newsletter, footer)
- [x] SEO (metadata, `sitemap.xml`, `robots.txt`, Open Graph, manifest)
- [x] Clerk authentication — sign-in, sign-up, onboarding, protected dashboard routes
- [x] Dashboard (overview, achievements, certificates, leaderboard, profile, settings)
- [x] Career library (search/filter) + 16 full career detail pages across all 8 categories
- [x] AI career quiz (5-question flow → top 5 matches with reasons)
- [x] Interactive simulation engine (per-career scenario steps → compatibility score)
- [x] Marketing pages: About, Pricing, Blog (+ 3 posts), Careers/Jobs, Contact, Privacy, Terms

**Not yet wired to a live backend:** simulation results, quiz results, XP, and
certificates currently compute and display client-side but aren't persisted to
Supabase yet — that's the next phase (writing to `simulation_attempts`,
`xp_events`, and `certificates` via API routes using the schema already in
`supabase/schema.sql`). The dashboard currently reads from
`lib/dashboard-data.ts` mock data so the UI is fully explorable today.

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · shadcn/ui primitives
(Radix) · Framer Motion · Supabase (Postgres + RLS) · Clerk (auth) · OpenAI API ·
TanStack Query · React Hook Form + Zod · Chart.js · jsPDF

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real keys, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project → Settings → API (server-only, keep secret) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | Clerk dashboard → API Keys |
| `OPENAI_API_KEY` | platform.openai.com → API Keys |

## Database setup

1. Create a new Supabase project.
2. Open the SQL editor and run `supabase/schema.sql` — it creates every table,
   index, RLS policy, the `leaderboard` view, and seeds the 8 career categories.
3. In Clerk's dashboard, go to **JWT Templates** and add a template named
   `supabase` (Clerk's built-in preset) so Clerk-issued tokens work with Supabase
   Row Level Security via `auth.jwt() ->> 'sub'`.
4. Pass that Clerk-issued Supabase token as the `accessToken` when creating the
   Supabase client so RLS policies resolve the signed-in user correctly (wired in
   `lib/supabase/client.ts` / `server.ts` once auth lands in the next phase).

## Project structure

```
app/
  layout.tsx          Root layout — fonts, metadata, ClerkProvider
  page.tsx             Landing page
  globals.css          Design tokens, glass/gradient utility classes
  robots.ts            robots.txt route
  sitemap.ts           sitemap.xml route
  about/                About page
  pricing/              Pricing page
  blog/                 Blog listing + blog/[slug] post detail
  jobs/                 Careers-at-CareerVerse page
  contact/              Contact page
  privacy/ terms/        Legal pages
  quiz/                  AI career quiz
  careers/               Career library
  careers/[slug]/         Career detail page
  careers/[slug]/simulate/ Interactive simulation runner
  sign-in/ sign-up/       Clerk auth pages
  onboarding/             Post-signup preferences flow (protected)
  dashboard/              Protected dashboard: overview, achievements,
                          certificates, leaderboard, profile, settings
  api/                    Route handlers (upcoming — simulation/XP persistence)
components/
  landing/             Hero, navbar, career search, categories, featured careers,
                        stats, how-it-works, testimonials, FAQ, newsletter, footer
  marketing/            Shared page header, contact form
  careers/               Career library filter/search UI
  quiz/                   Quiz flow
  simulation/             Simulation runner
  dashboard/              Sidebar, topbar, XP chart
  auth/                   Shared branded auth shell
  ui/                     shadcn/ui primitives (added as features need them)
lib/
  utils.ts             cn(), formatters, slugify
  careers.ts            Canonical career dataset (16 careers, full detail + simulation scenarios)
  careers-data.ts        Landing-page derived data (categories, featured, testimonials, FAQ)
  quiz-data.ts            Quiz question bank
  blog-data.ts             Blog post content
  dashboard-data.ts         Mock dashboard data (until Supabase wiring lands)
  supabase/
    client.ts           Browser Supabase client
    server.ts             Server Supabase client + admin client
    types.ts               Hand-written Database types matching schema.sql
supabase/
  schema.sql             Full Postgres schema, RLS policies, seed data
middleware.ts             Clerk route protection (/dashboard, /onboarding)
```

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the full guide.

Quick path: push to GitHub → import into Vercel → add the environment variables
from `.env.example` in the Vercel project settings → deploy. `vercel.json` is
already configured with the Next.js framework preset and security headers.

## Design system

- **Light mode is the default**, with a full dark mode available via the
  theme toggle in the navbar/dashboard topbar (persisted with `next-themes`).
- Colors are CSS-variable-backed semantic tokens (`background`, `foreground`,
  `surface`, `border`, `muted`) defined in `app/globals.css` under `:root`
  (light) and `.dark` — this is what makes every page re-theme automatically.
- Accent palette: primary indigo `#6366F1`, secondary teal `#14B8A6`, accent
  pink `#F472B6` — softened from the original neon purple/cyan/pink and
  calibrated so the "400" shades stay readable as text on both themes.
- Display face: Space Grotesk. Body: Inter. Data/mono: JetBrains Mono.
- Shared component classes in `app/globals.css`: `.btn-primary`,
  `.btn-secondary`, `.btn-ghost`, `.card`, `.card-interactive`,
  `.input-field`, `.skeleton`, plus the existing `.glass`, `.glass-strong`,
  `.gradient-border`, `.text-gradient`, `.mesh-aurora`, `.grid-overlay` — all
  theme-aware, none require per-page dark-mode logic.
- Loading states use `app/careers/loading.tsx`, `app/dashboard/loading.tsx`,
  and a skeleton-grid Suspense fallback instead of spinner text.
# careerverse
