// Shared, DB-free helpers used by both the admin editor (client) and the
// public blog pages (server) — kept dependency-free so it's safe in either.

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Strips the most common Markdown syntax down to plain text, for excerpts
// and <meta description> fallbacks where raw "**bold**" / "## heading"
// characters would look broken.
export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images -> alt text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> label
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/\n{2,}/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function deriveExcerpt(markdown: string, maxLength = 160): string {
  const text = stripMarkdown(markdown);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}

export function readingTime(markdown: string): string {
  const words = stripMarkdown(markdown).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function parseKeywords(input: string): string[] {
  return dedupeKeywords(input.split(","));
}

// Case-insensitive de-dupe that keeps the first spelling seen.
export function dedupeKeywords(list: (string | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of list) {
    const k = raw?.trim();
    if (!k || seen.has(k.toLowerCase())) continue;
    seen.add(k.toLowerCase());
    out.push(k);
  }
  return out;
}

// Everything a post should rank for, most important first — used for
// <meta name="keywords"> and the BlogPosting JSON-LD.
export function postKeywords(post: {
  focusKeyword?: string;
  seoKeywords?: string[];
  tags: string[];
}): string[] {
  return dedupeKeywords([post.focusKeyword, ...(post.seoKeywords ?? []), ...post.tags]);
}

export function wordCount(markdown: string): number {
  return stripMarkdown(markdown).split(/\s+/).filter(Boolean).length;
}

export interface SeoCheck {
  label: string;
  ok: boolean;
}

// Lightweight on-page checklist shown in the admin editor while writing.
export function seoChecks(post: {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
}): SeoCheck[] {
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || deriveExcerpt(post.content);
  const kw = post.focusKeyword.trim().toLowerCase();
  const has = (text: string) => !!kw && text.toLowerCase().includes(kw);
  const firstParagraph = stripMarkdown(post.content.split(/\n\s*\n/).find((b) => b.trim() && !/^#/.test(b.trim())) ?? "");
  const headings = (post.content.match(/^#{2,6}\s+.+$/gm) ?? []).join(" ");
  const words = wordCount(post.content);

  return [
    { label: "Focus keyword is set", ok: !!kw },
    { label: "Focus keyword appears in the SEO title", ok: has(title) },
    { label: "Focus keyword appears in the meta description", ok: has(description) },
    { label: "Focus keyword appears in the slug", ok: has(post.slug.replace(/-/g, " ")) },
    { label: "Focus keyword appears in the first paragraph", ok: has(firstParagraph) },
    { label: "Focus keyword appears in a subheading (##)", ok: has(headings) },
    { label: "SEO title is 30–60 characters", ok: title.length >= 30 && title.length <= 60 },
    { label: "Meta description is 70–160 characters", ok: description.length >= 70 && description.length <= 160 },
    { label: "Content has at least 300 words", ok: words >= 300 },
    { label: "Content uses subheadings (##)", ok: headings.length > 0 },
    { label: "Cover image is set (used for social sharing)", ok: !!post.coverImage.trim() },
  ];
}
