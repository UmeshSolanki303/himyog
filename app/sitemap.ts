import { MetadataRoute } from "next";
import { courses, hasDedicatedPage, getCourseUrl } from "@/lib/courses";
import { listPublishedBlogPosts } from "@/lib/admin-db";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://matrushaktiyog.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Courses with a dedicated page (prenatal, postnatal, the retreat) are
  // listed explicitly below instead — the generic /courses/[slug] route
  // now redirects for these, so submitting both would be duplicate URLs.
  const coursePages: MetadataRoute.Sitemap = courses
    .filter((c) => !hasDedicatedPage(c.slug))
    .map((c) => ({
      url: `${baseUrl}${getCourseUrl(c.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await listPublishedBlogPosts();
    blogPages = posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // DB unreachable at build time — sitemap still returns the static pages.
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/prenatal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/postnatal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/retreat`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/information-sessions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...coursePages,
    ...blogPages,
  ];
}
