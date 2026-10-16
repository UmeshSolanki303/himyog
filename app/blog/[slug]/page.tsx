import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { findBlogPostBySlug, listPublishedBlogPosts } from "@/lib/admin-db";
import { readingTime, postKeywords, wordCount } from "@/lib/blog-utils";
import { Footer } from "@/components/Footer";

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://matrushaktiyog.com";
const BRAND = "Matrushakti Yog";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPublishedPost(slug: string) {
  const post = await findBlogPostBySlug(slug);
  if (!post || post.status !== "published") return null;
  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = `${siteUrl}/blog/${post.slug}`;
  const keywords = postKeywords(post);
  const images = post.coverImage ? [{ url: post.coverImage, alt: post.title }] : undefined;

  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    robots: { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type: "article",
      siteName: BRAND,
      locale: "en_IN",
      title,
      description,
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      section: post.tags[0],
      tags: keywords,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const html = marked.parse(post.content) as string;

  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const keywords = postKeywords(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    inLanguage: "en-IN",
    wordCount: wordCount(post.content),
    articleSection: post.tags[0],
    // Guest/instructor bylines are people; the default byline is the brand.
    author:
      post.author === BRAND
        ? { "@type": "Organization", name: BRAND, url: siteUrl }
        : { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Matrushakti Yog",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo-bk.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    keywords: keywords.join(", ") || undefined,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  // Lightweight related-posts: same first tag, excluding this post.
  const related = post.tags.length
    ? (await listPublishedBlogPosts(post.tags[0])).filter((p) => p.id !== post.id).slice(0, 3)
    : [];

  return (
    <main className="pb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <header className="relative w-full bg-beige-100 border-b border-beige-200/80 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 65% 100% at 95% 50%, rgba(184,64,112,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 45% 70% at 0% 100%, rgba(212,164,40,0.05) 0%, transparent 55%)
            `,
          }}
          aria-hidden
        />
        <div
          className="relative z-10 mx-auto px-4 sm:px-6 pt-8 pb-10 sm:pt-12 sm:pb-14"
          style={{ maxWidth: "48rem" }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 text-xs sm:text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            Back to journal
          </Link>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((t) => (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(t)}`}
                  className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-sage-50 text-sage-600 border border-sage-100 hover:bg-sage-100 transition-colors"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}

          <h1 className="font-serif text-2xl sm:text-4xl md:text-[2.75rem] font-semibold text-charcoal leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-charcoal-light">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 shrink-0 text-sage-500" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 shrink-0 text-sage-500" />
              {formatDate(post.publishedAt ?? post.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0 text-sage-500" />
              {readingTime(post.content)}
            </span>
          </div>
        </div>
      </header>

      {post.coverImage && (
        <div className="mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-10" style={{ maxWidth: "56rem" }}>
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-soft-lg border border-beige-200/60">
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-10 sm:py-14 bg-beige-50 w-full">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "48rem" }}>
          <article
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="pb-14 sm:pb-20 bg-beige-50 w-full">
          <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "48rem" }}>
            <div className="h-px bg-beige-200 mb-10" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600 mb-5">
              Related reading
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-beige-200/60 bg-white p-4 hover:border-sage-200 hover:shadow-soft transition-all"
                >
                  <p className="font-serif text-sm text-charcoal font-medium leading-snug group-hover:text-sage-700 transition-colors line-clamp-2">
                    {p.title}
                  </p>
                  <p className="text-xs text-slate-soft mt-2">
                    {formatDate(p.publishedAt ?? p.createdAt)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
