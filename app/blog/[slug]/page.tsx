import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="pb-24 pt-36 md:pt-44">
        <article className="container mx-auto max-w-2xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
          </Link>

          <div className="mt-6 flex items-center gap-3 text-xs text-muted">
            <span className="rounded-full border border-border px-2.5 py-1 text-secondary-400">{post.tag}</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readMinutes} min read</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted">By {post.author}</p>

          <div className="mt-10 space-y-5">
            {post.content.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground/90">
                {para}
              </p>
            ))}
          </div>
        </article>

        {more.length > 0 && (
          <div className="container mx-auto mt-20 max-w-2xl border-t border-border pt-10">
            <h2 className="mb-5 text-sm font-medium text-muted">More from the blog</h2>
            <div className="space-y-4">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary-500/40"
                >
                  <div className="text-sm font-medium">{p.title}</div>
                  <div className="mt-1 text-xs text-muted">{p.readMinutes} min read</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
