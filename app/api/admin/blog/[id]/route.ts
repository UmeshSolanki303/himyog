import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, requirePermission } from "@/lib/admin-auth";
import {
  findBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  generateUniqueBlogSlug,
  type AdminBlogPost,
} from "@/lib/admin-db";
import { slugify, deriveExcerpt } from "@/lib/blog-utils";

// PUT — update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const existing = await findBlogPostById(id);

  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  let slug = existing.slug;
  if (body.slug !== undefined && slugify(body.slug) !== existing.slug) {
    slug = await generateUniqueBlogSlug(slugify(body.slug) || slugify(existing.title), id);
  }

  const nextStatus: AdminBlogPost["status"] = body.status ?? existing.status;
  const content = body.content ?? existing.content;

  const patch: Partial<AdminBlogPost> = {
    title: body.title ?? existing.title,
    slug,
    excerpt: body.excerpt !== undefined ? (body.excerpt.trim() || deriveExcerpt(content)) : existing.excerpt,
    content,
    coverImage: body.coverImage !== undefined ? (body.coverImage || undefined) : existing.coverImage,
    author: body.author !== undefined ? (body.author.trim() || existing.author) : existing.author,
    tags: Array.isArray(body.tags) ? body.tags.filter(Boolean) : existing.tags,
    status: nextStatus,
    seoTitle: body.seoTitle !== undefined ? (body.seoTitle || undefined) : existing.seoTitle,
    seoDescription:
      body.seoDescription !== undefined ? (body.seoDescription || undefined) : existing.seoDescription,
    // First publish stamps publishedAt; later edits to an already-published
    // post don't bump it, so "published" date stays stable.
    publishedAt:
      nextStatus === "published" ? (existing.publishedAt ?? new Date().toISOString()) : existing.publishedAt,
    updatedAt: new Date().toISOString(),
  };

  const updated = await updateBlogPost(id, patch);
  return NextResponse.json(updated);
}

// DELETE — remove a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const deleted = await deleteBlogPost(id);

  if (!deleted) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
