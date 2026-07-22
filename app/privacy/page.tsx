import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CareerVerse AI collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader eyebrow="Legal" title="Privacy Policy" />
        <section className="pb-24">
          <div className="container mx-auto max-w-2xl space-y-10 text-sm leading-relaxed text-muted">
            <p className="text-xs text-muted/70">Last updated: July 22, 2026</p>

            <div>
              <h2 className="mb-3 font-display text-lg font-semibold text-foreground">1. What we collect</h2>
              <p>
                When you create an account, we collect your name, email address, and authentication
                details through our authentication provider, Clerk. When you use the platform, we
                store your simulation responses, quiz answers, XP, achievements, and bookmarked
                careers so your progress persists across sessions.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-display text-lg font-semibold text-foreground">2. How we use it</h2>
              <p>
                We use your data to run the core product: saving your progress, generating your
                compatibility scores and learning recommendations, showing you on the leaderboard
                (using only your display name), and improving the accuracy of our career
                simulations over time. We do not sell your personal data to third parties.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-display text-lg font-semibold text-foreground">3. AI processing</h2>
              <p>
                Some features, including simulation feedback and quiz recommendations, use
                third-party AI providers (such as OpenAI) to process your responses. We send only
                the data necessary to generate that feature's output and do not send your email
                address or account credentials to these providers.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-display text-lg font-semibold text-foreground">4. Data storage & security</h2>
              <p>
                Your data is stored in a Supabase-hosted PostgreSQL database with row-level
                security policies restricting access to your own records. Authentication is
                handled by Clerk, which maintains its own security and compliance practices.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-display text-lg font-semibold text-foreground">5. Cookies</h2>
              <p>
                We use essential cookies for authentication and session management. We do not use
                third-party advertising cookies or trackers.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-display text-lg font-semibold text-foreground">6. Your rights</h2>
              <p>
                You can view, update, or delete your account data at any time from your dashboard
                settings. To request full account deletion or a copy of your data, contact us at{" "}
                <a href="mailto:privacy@careerverse.ai" className="text-primary-400 hover:underline">
                  privacy@careerverse.ai
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-display text-lg font-semibold text-foreground">7. Children's privacy</h2>
              <p>
                CareerVerse AI is intended for users 13 and older. If you believe a child under 13
                has created an account, contact us and we'll remove it promptly.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-display text-lg font-semibold text-foreground">8. Changes to this policy</h2>
              <p>
                We'll update the "last updated" date above whenever this policy changes materially,
                and notify active users of significant changes by email.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
