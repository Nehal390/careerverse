import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PageHeader } from "@/components/marketing/page-header";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Ideas on career clarity, how AI is changing entry-level work, and honest advice on switching careers.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Blog"
          title="Career clarity, one idea at a time"
          description="No recycled listicles — just honest thinking about how people actually choose (and switch) careers."
        />

        <section className="pb-24">
          <div className="container mx-auto max-w-3xl space-y-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block card p-6 transition-colors hover:border-primary-500/40 sm:p-8"
              >
                <div className="mb-3 flex items-center gap-3 text-xs text-muted">
                  <span className="rounded-full border border-border px-2.5 py-1 text-secondary-400">
                    {post.tag}
                  </span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readMinutes} min read</span>
                </div>
                <h2 className="font-display text-xl font-semibold sm:text-2xl">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary-400">
                  Read the post
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
