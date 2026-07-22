import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PageHeader } from "@/components/marketing/page-header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Start free with 3 simulations and the full career quiz. Upgrade to CareerVerse Plus for unlimited access.",
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Enough to find real clarity on your first career question.",
    features: [
      "Full AI career quiz",
      "3 career simulations",
      "Career library access",
      "Basic XP & badges",
      "1 downloadable certificate",
    ],
    cta: "Start free",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "$12",
    period: "/month",
    description: "For students and switchers seriously narrowing down a path.",
    features: [
      "Everything in Free",
      "Unlimited simulations",
      "Unlimited certificates",
      "Career comparison tool",
      "Priority AI feedback depth",
      "Learning roadmap tracking",
    ],
    cta: "Start Plus",
    href: "/sign-up",
    highlighted: true,
  },
  {
    name: "Teams",
    price: "Custom",
    period: "per school / org",
    description: "For schools, bootcamps, and career centers supporting many students.",
    features: [
      "Everything in Plus",
      "Admin dashboard & analytics",
      "Bulk seat management",
      "Progress reporting for counselors",
      "Dedicated onboarding support",
    ],
    cta: "Talk to us",
    href: "/contact",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes — Plus is month-to-month with no contract. Cancel anytime from your account settings and you'll keep access until the end of your billing period.",
  },
  {
    q: "Do students get a discount?",
    a: "Yes. Verified students get 40% off Plus. The discount is applied automatically when you sign up with a school email address.",
  },
  {
    q: "What happens to my certificates if I downgrade?",
    a: "Certificates you've already earned stay in your account permanently, even on the Free plan.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Pricing"
          title="Simple pricing, real clarity"
          description="Start free. Upgrade only if you want unlimited simulations and comparisons."
        />

        <section className="pb-16">
          <div className="container grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "relative rounded-2xl border p-8",
                  tier.highlighted
                    ? "border-primary-500/50 bg-primary-500/5 shadow-[0_0_50px_-15px_rgba(99,102,241,0.35)]"
                    : "border-border bg-surface"
                )}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-3 py-1 text-[10px] font-semibold text-white">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold">{tier.price}</span>
                  <span className="text-sm text-muted">{tier.period}</span>
                </div>
                <p className="mt-3 text-sm text-muted">{tier.description}</p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={cn(
                    "mt-8 block rounded-xl px-5 py-3 text-center text-sm font-semibold transition-transform hover:scale-[1.02]",
                    tier.highlighted
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                      : "border border-border text-foreground"
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-16">
          <div className="container mx-auto max-w-2xl">
            <h2 className="mb-8 text-center font-display text-2xl font-semibold">Pricing FAQ</h2>
            <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
              {faqs.map((f) => (
                <div key={f.q} className="p-6">
                  <h3 className="text-sm font-medium">{f.q}</h3>
                  <p className="mt-2 text-sm text-muted">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
