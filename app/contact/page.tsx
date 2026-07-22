import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PageHeader } from "@/components/marketing/page-header";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the CareerVerse AI team — support, partnerships, or feedback.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Contact"
          title="Talk to a human"
          description="Questions about a career, a bug you found, or a partnership idea — we read everything."
        />

        <section className="pb-24">
          <div className="container mx-auto grid max-w-4xl gap-10 md:grid-cols-[1fr_1.2fr]">
            <div className="space-y-6">
              <div className="card p-6">
                <Mail className="mb-3 h-5 w-5 text-secondary-400" />
                <h3 className="text-sm font-medium">Email support</h3>
                <p className="mt-1 text-sm text-muted">
                  <a href="mailto:support@careerverse.ai" className="text-primary-400 hover:underline">
                    support@careerverse.ai
                  </a>
                </p>
                <p className="mt-1 text-xs text-muted">Typical reply time: under 24 hours.</p>
              </div>
              <div className="card p-6">
                <MessageCircle className="mb-3 h-5 w-5 text-accent-400" />
                <h3 className="text-sm font-medium">Partnerships & schools</h3>
                <p className="mt-1 text-sm text-muted">
                  <a href="mailto:partners@careerverse.ai" className="text-primary-400 hover:underline">
                    partners@careerverse.ai
                  </a>
                </p>
                <p className="mt-1 text-xs text-muted">For Teams plan inquiries and bulk access.</p>
              </div>
            </div>

            <div className="gradient-border">
              <div className="glass-strong rounded-[1.24rem] p-6 sm:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
