import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSessionFromRequest, requirePermission } from "@/lib/admin-auth";
import {
  listBlogPosts,
  generateUniqueBlogSlug,
  insertBlogPost,
  type AdminBlogPost,
} from "@/lib/admin-db";
import { slugify, deriveExcerpt } from "@/lib/blog-utils";

// GET — list all blog posts, any status (requires read)
export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;

  const posts = await listBlogPosts({ status, tag });
  return NextResponse.json(posts);
}

// POST — create a new blog post (requires write)
export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const {
    title,
    slug,
    excerpt,
    content,
    coverImage,
    author,
    tags,
    status,
    seoTitle,
    seoDescription,
  } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const baseSlug = slugify(slug || title);
  const uniqueSlug = await generateUniqueBlogSlug(baseSlug);
  const now = new Date().toISOString();
  const postStatus: AdminBlogPost["status"] = status === "published" ? "published" : "draft";

  const post: AdminBlogPost = {
    id: crypto.randomUUID(),
    title,
    slug: uniqueSlug,
    excerpt: excerpt?.trim() || deriveExcerpt(content),
    content,
    coverImage: coverImage || undefined,
    // A display name, not the admin login handle — the login username is
    // never shown on the public site.
    author: author?.trim() || "Matrushakti Yog",
    tags: Array.isArray(tags) ? tags.filter(Boolean) : [],
    status: postStatus,
    seoTitle: seoTitle || undefined,
    seoDescription: seoDescription || undefined,
    publishedAt: postStatus === "published" ? now : undefined,
    createdAt: now,
    updatedAt: now,
  };

  await insertBlogPost(post);
  return NextResponse.json(post, { status: 201 });
}
