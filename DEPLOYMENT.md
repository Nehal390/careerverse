# Deployment Guide

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "CareerVerse AI — Phase 1 scaffold"
git branch -M main
git remote add origin https://github.com/<your-username>/careerverse-ai.git
git push -u origin main
```

## 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. SQL Editor → paste the contents of `supabase/schema.sql` → Run.
3. Settings → API → copy the Project URL, anon key, and service role key into
   your environment variables (see below).
4. Settings → Auth is not used for login (Clerk handles that), but you still
   need the Clerk JWT template so RLS can trust `auth.jwt() ->> 'sub'` —
   see step 3 in the main README.

## 3. Set up Clerk

1. Create an application at [dashboard.clerk.com](https://dashboard.clerk.com).
2. Enable the **Email** and **Google** sign-in methods (Configure → SSO connections).
3. API Keys → copy the publishable key and secret key.
4. JWT Templates → New template → choose the **Supabase** preset → Save. This is
   what lets Supabase RLS recognize the signed-in Clerk user.

## 4. Set up OpenAI

1. Create an API key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).
2. Set a spending limit appropriate for your usage (Settings → Limits).

## 5. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo.
2. Vercel auto-detects the Next.js framework from `vercel.json`.
3. Add environment variables (Project Settings → Environment Variables) — copy
   every key from `.env.example` with your real values, for both **Production**
   and **Preview** environments.
4. Click **Deploy**.
5. Once deployed, update `NEXT_PUBLIC_APP_URL` to your production URL and
   redeploy so metadata, `sitemap.xml`, and Open Graph tags resolve correctly.

## 6. Post-deploy checklist

- [ ] Visit `/sitemap.xml` and `/robots.txt` to confirm they render.
- [ ] Run a Lighthouse pass on the landing page (target 90+ on Performance/SEO).
- [ ] Confirm Supabase RLS policies by testing a signed-in request from the app,
      not just the SQL editor (which runs as a superuser and bypasses RLS).
- [ ] Set up a custom domain in Vercel → Project → Domains.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Troubleshooting

**"Invalid API key" from Supabase** — double-check you copied the `anon` key,
not the `service_role` key, into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

**Clerk redirects to the wrong page after sign-in** — check
`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` in
your environment variables.

**RLS blocks all reads even when signed in** — confirm the Clerk JWT template is
named exactly `supabase` and that the Supabase client is initialized with that
token as its `accessToken` (wired in the auth phase of this build).
