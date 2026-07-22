-- =====================================================================
-- CareerVerse AI — Supabase Schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).
--
-- AUTH MODEL
-- Authentication is handled by Clerk, not Supabase Auth. Clerk issues a
-- Supabase-compatible JWT (Clerk Dashboard > JWT Templates > "supabase"),
-- so `auth.jwt() ->> 'sub'` below resolves to the Clerk user id inside
-- Postgres RLS policies. Every table that stores user data keys off
-- `clerk_user_id text`, not a Supabase `auth.users` uuid.
-- =====================================================================

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------
-- PROFILES — mirrors the subset of Clerk user data we need in Postgres
-- ---------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  clerk_user_id text unique not null,
  email text not null,
  full_name text,
  avatar_url text,
  role text not null default 'student' check (role in ('student', 'admin')),
  onboarding_completed boolean not null default false,
  total_xp integer not null default 0,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_active_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_clerk_user_id on profiles (clerk_user_id);
create index if not exists idx_profiles_total_xp on profiles (total_xp desc);

-- ---------------------------------------------------------------------
-- CAREER CATEGORIES
-- ---------------------------------------------------------------------
create table if not exists career_categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  icon text,
  sort_order integer not null default 0
);

-- ---------------------------------------------------------------------
-- CAREERS — the full career library / detail pages
-- ---------------------------------------------------------------------
create table if not exists careers (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  category_id uuid references career_categories (id) on delete set null,
  short_description text not null,
  overview text not null,
  day_in_life text,
  avg_salary_min integer,
  avg_salary_max integer,
  salary_currency text not null default 'USD',
  demand text not null default 'Moderate' check (demand in ('Low', 'Moderate', 'High', 'Very High', 'Emerging')),
  difficulty text not null default 'Intermediate' check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  ai_impact text not null default 'Moderate' check (ai_impact in ('Low', 'Moderate', 'High', 'Transforming')),
  future_outlook text,
  remote_friendly boolean not null default false,
  required_education text,
  skills text[] not null default '{}',
  tools text[] not null default '{}',
  certifications text[] not null default '{}',
  roadmap jsonb not null default '[]',        -- [{ stage, title, description, duration }]
  recommended_courses jsonb not null default '[]', -- [{ title, provider, url }]
  sample_projects text[] not null default '{}',
  interview_questions text[] not null default '{}',
  gradient_from text default '#8B5CF6',
  gradient_to text default '#22D3EE',
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_careers_category on careers (category_id);
create index if not exists idx_careers_demand on careers (demand);
create index if not exists idx_careers_published on careers (is_published);

-- ---------------------------------------------------------------------
-- SIMULATIONS — the definition of a simulation flow for a career
-- ---------------------------------------------------------------------
create table if not exists simulations (
  id uuid primary key default uuid_generate_v4(),
  career_id uuid not null references careers (id) on delete cascade,
  title text not null,
  description text not null,
  estimated_minutes integer not null default 30,
  difficulty text not null default 'Intermediate' check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  scenario jsonb not null default '[]', -- ordered array of scenario steps/messages/tasks
  scoring_rubric jsonb not null default '{}', -- weights used to compute the compatibility score
  xp_reward integer not null default 100,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_simulations_career on simulations (career_id);

-- ---------------------------------------------------------------------
-- SIMULATION ATTEMPTS — a user's run through a simulation
-- ---------------------------------------------------------------------
create table if not exists simulation_attempts (
  id uuid primary key default uuid_generate_v4(),
  clerk_user_id text not null references profiles (clerk_user_id) on delete cascade,
  simulation_id uuid not null references simulations (id) on delete cascade,
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'abandoned')),
  responses jsonb not null default '[]',        -- user's answers/actions per scenario step
  compatibility_score integer,                  -- 0-100
  strengths text[] not null default '{}',
  weaknesses text[] not null default '{}',
  recommended_skills text[] not null default '{}',
  ai_feedback text,
  xp_earned integer not null default 0,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists idx_attempts_user on simulation_attempts (clerk_user_id);
create index if not exists idx_attempts_simulation on simulation_attempts (simulation_id);
create index if not exists idx_attempts_status on simulation_attempts (status);

-- ---------------------------------------------------------------------
-- CAREER QUIZ RESULTS
-- ---------------------------------------------------------------------
create table if not exists quiz_results (
  id uuid primary key default uuid_generate_v4(),
  clerk_user_id text not null references profiles (clerk_user_id) on delete cascade,
  answers jsonb not null default '[]',
  top_career_ids uuid[] not null default '{}',
  ai_summary text,
  created_at timestamptz not null default now()
);

create index if not exists idx_quiz_results_user on quiz_results (clerk_user_id);

-- ---------------------------------------------------------------------
-- XP EVENTS — an auditable ledger of every XP change
-- ---------------------------------------------------------------------
create table if not exists xp_events (
  id uuid primary key default uuid_generate_v4(),
  clerk_user_id text not null references profiles (clerk_user_id) on delete cascade,
  amount integer not null,
  reason text not null, -- e.g. 'simulation_completed', 'daily_login', 'quiz_completed'
  related_id uuid,       -- simulation_attempt id, quiz_result id, etc.
  created_at timestamptz not null default now()
);

create index if not exists idx_xp_events_user on xp_events (clerk_user_id);

-- ---------------------------------------------------------------------
-- BADGES + USER BADGES
-- ---------------------------------------------------------------------
create table if not exists badges (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text not null,
  icon text not null,
  criteria jsonb not null default '{}'
);

create table if not exists user_badges (
  id uuid primary key default uuid_generate_v4(),
  clerk_user_id text not null references profiles (clerk_user_id) on delete cascade,
  badge_id uuid not null references badges (id) on delete cascade,
  earned_at timestamptz not null default now(),
  unique (clerk_user_id, badge_id)
);

create index if not exists idx_user_badges_user on user_badges (clerk_user_id);

-- ---------------------------------------------------------------------
-- CERTIFICATES
-- ---------------------------------------------------------------------
create table if not exists certificates (
  id uuid primary key default uuid_generate_v4(),
  clerk_user_id text not null references profiles (clerk_user_id) on delete cascade,
  simulation_attempt_id uuid not null references simulation_attempts (id) on delete cascade,
  career_id uuid not null references careers (id) on delete cascade,
  certificate_number text unique not null,
  compatibility_score integer not null,
  pdf_url text,
  issued_at timestamptz not null default now()
);

create index if not exists idx_certificates_user on certificates (clerk_user_id);

-- ---------------------------------------------------------------------
-- BOOKMARKS (saved careers)
-- ---------------------------------------------------------------------
create table if not exists bookmarks (
  id uuid primary key default uuid_generate_v4(),
  clerk_user_id text not null references profiles (clerk_user_id) on delete cascade,
  career_id uuid not null references careers (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (clerk_user_id, career_id)
);

create index if not exists idx_bookmarks_user on bookmarks (clerk_user_id);

-- ---------------------------------------------------------------------
-- NOTIFICATIONS
-- ---------------------------------------------------------------------
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  clerk_user_id text not null references profiles (clerk_user_id) on delete cascade,
  title text not null,
  body text not null,
  type text not null default 'system' check (type in ('system', 'achievement', 'reminder', 'social')),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_notifications_user on notifications (clerk_user_id, is_read);

-- ---------------------------------------------------------------------
-- LEADERBOARD VIEW — top XP earners
-- ---------------------------------------------------------------------
create or replace view leaderboard as
select
  p.clerk_user_id,
  p.full_name,
  p.avatar_url,
  p.total_xp,
  p.current_streak,
  rank() over (order by p.total_xp desc) as rank
from profiles p
where p.total_xp > 0
order by p.total_xp desc;

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================
alter table profiles enable row level security;
alter table simulation_attempts enable row level security;
alter table quiz_results enable row level security;
alter table xp_events enable row level security;
alter table user_badges enable row level security;
alter table certificates enable row level security;
alter table bookmarks enable row level security;
alter table notifications enable row level security;

-- Public read tables (careers, categories, simulations, badges) — no RLS needed
-- beyond the default "readable by everyone" since they contain no user data.
alter table careers enable row level security;
alter table career_categories enable row level security;
alter table simulations enable row level security;
alter table badges enable row level security;

create policy "Careers are publicly readable" on careers
  for select using (is_published = true);
create policy "Categories are publicly readable" on career_categories
  for select using (true);
create policy "Simulations are publicly readable" on simulations
  for select using (is_published = true);
create policy "Badges are publicly readable" on badges
  for select using (true);

-- Profiles: a user can read/update only their own row.
create policy "Users can view own profile" on profiles
  for select using (auth.jwt() ->> 'sub' = clerk_user_id);
create policy "Users can update own profile" on profiles
  for update using (auth.jwt() ->> 'sub' = clerk_user_id);
create policy "Users can insert own profile" on profiles
  for insert with check (auth.jwt() ->> 'sub' = clerk_user_id);

-- Simulation attempts: fully scoped to the owner.
create policy "Users can view own attempts" on simulation_attempts
  for select using (auth.jwt() ->> 'sub' = clerk_user_id);
create policy "Users can insert own attempts" on simulation_attempts
  for insert with check (auth.jwt() ->> 'sub' = clerk_user_id);
create policy "Users can update own attempts" on simulation_attempts
  for update using (auth.jwt() ->> 'sub' = clerk_user_id);

-- Quiz results
create policy "Users can view own quiz results" on quiz_results
  for select using (auth.jwt() ->> 'sub' = clerk_user_id);
create policy "Users can insert own quiz results" on quiz_results
  for insert with check (auth.jwt() ->> 'sub' = clerk_user_id);

-- XP events (read-only for users; writes happen via service role in API routes)
create policy "Users can view own xp events" on xp_events
  for select using (auth.jwt() ->> 'sub' = clerk_user_id);

-- Badges earned
create policy "Users can view own badges" on user_badges
  for select using (auth.jwt() ->> 'sub' = clerk_user_id);

-- Certificates
create policy "Users can view own certificates" on certificates
  for select using (auth.jwt() ->> 'sub' = clerk_user_id);

-- Bookmarks
create policy "Users can manage own bookmarks" on bookmarks
  for all using (auth.jwt() ->> 'sub' = clerk_user_id)
  with check (auth.jwt() ->> 'sub' = clerk_user_id);

-- Notifications
create policy "Users can view own notifications" on notifications
  for select using (auth.jwt() ->> 'sub' = clerk_user_id);
create policy "Users can update own notifications" on notifications
  for update using (auth.jwt() ->> 'sub' = clerk_user_id);

-- Leaderboard (profiles.total_xp, name, avatar) is intentionally public —
-- it's a view over profiles, so give it its own read policy via a
-- security-definer function if you want it visible to signed-out users.
-- For now leaderboard reads go through the service role in an API route.

-- =====================================================================
-- SEED: career categories (safe to re-run)
-- =====================================================================
insert into career_categories (slug, name, icon, sort_order) values
  ('technology', 'Technology', 'code', 1),
  ('business', 'Business', 'briefcase', 2),
  ('marketing', 'Marketing', 'megaphone', 3),
  ('healthcare', 'Healthcare', 'stethoscope', 4),
  ('engineering', 'Engineering', 'cog', 5),
  ('creative', 'Creative', 'palette', 6),
  ('government-law', 'Government & Law', 'landmark', 7),
  ('science-research', 'Science & Research', 'flask', 8)
on conflict (slug) do nothing;
