import type { Metadata } from "next";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { listPublishedBlogPosts } from "@/lib/admin-db";
import { readingTime } from "@/lib/blog-utils";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";

// Blog content is edited from /admin/blog at any time, so the list must stay
// fresh — ISR re-checks the database at most once a minute rather than
// freezing on whatever was published at build/deploy time.
export const revalidate = 60;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}): Promise<Metadata> {
  const { tag } = await searchParams;
  // Tag-filtered views are the same listing — pageMetadata always points the
  // canonical at /blog so search engines don't index near-duplicate pages.
  return pageMetadata({
    ...PAGE_SEO.blog,
    title: tag ? `${tag} Articles` : PAGE_SEO.blog.title,
    keywords: tag ? [tag, ...PAGE_SEO.blog.keywords] : PAGE_SEO.blog.keywords,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const posts = await listPublishedBlogPosts(tag);
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  return (
    <main>
      <PageHero
        title="The Matrushakti Journal"
        description="Practical guidance, yogic wisdom, and honest reflections on pregnancy, birth, and motherhood — from our instructors to you."
      />

      <section className="py-12 sm:py-20 md:py-24 bg-beige-50 w-full">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-10">
              <Link
                href="/blog"
                className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  !tag
                    ? "bg-sage-600 text-white shadow-soft"
                    : "bg-white text-charcoal/70 border border-sage-100 hover:bg-beige-100"
                }`}
              >
                All Posts
              </Link>
              {allTags.map((t) => (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(t)}`}
                  className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-medium capitalize transition-all duration-200 ${
                    tag === t
                      ? "bg-sage-600 text-white shadow-soft"
                      : "bg-white text-charcoal/70 border border-sage-100 hover:bg-beige-100"
                  }`}
                >
                  {t}
                </Link>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="flex flex-col items-center text-center py-20 gap-4">
              <span className="text-5xl">📝</span>
              <p className="text-charcoal font-serif text-xl">
                {tag ? "No posts with this tag yet" : "No posts published yet"}
              </p>
              <p className="text-slate-muted text-sm">
                Check back soon — new stories are on the way.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full rounded-3xl overflow-hidden bg-white border border-beige-200/60 shadow-soft hover:shadow-soft-lg hover:border-sage-200 transition-all duration-300"
                >
                  {post.coverImage ? (
                    <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${post.coverImage})` }}
                        aria-hidden
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] overflow-hidden shrink-0 bg-gradient-to-br from-sage-100 via-beige-100 to-gold-100" />
                  )}

                  <div className="flex flex-col flex-1 p-6">
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-sage-50 text-sage-600 border border-sage-100"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="font-serif text-xl text-charcoal font-medium leading-snug mb-2 group-hover:text-sage-700 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-slate-muted text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-soft mt-auto">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        {formatDate(post.publishedAt ?? post.createdAt)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        {readingTime(post.content)}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sage-600 text-sm font-medium mt-4 group-hover:gap-2.5 transition-all">
                      Read more <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
