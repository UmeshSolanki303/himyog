import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, requirePermission } from "@/lib/admin-auth";
import { findReviewById, updateReview, deleteReview, type AdminReview } from "@/lib/admin-db";

// PUT — update a review
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const existing = await findReviewById(id);

  if (!existing) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  const patch: Partial<AdminReview> = {
    name: body.name ?? existing.name,
    city: body.city !== undefined ? body.city || undefined : existing.city,
    state: body.state ?? existing.state,
    country: body.country ?? existing.country,
    courseSlug: body.courseSlug ?? existing.courseSlug,
    courseTitle: body.courseTitle ?? existing.courseTitle,
    rating: body.rating != null ? Math.min(5, Math.max(1, Number(body.rating))) : existing.rating,
    text: body.text ?? existing.text,
    photo: body.photo !== undefined ? body.photo || undefined : existing.photo,
    status: body.status ?? existing.status,
    date: body.date ?? existing.date,
    initials: (body.name ?? existing.name)
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
  };

  const updated = await updateReview(id, patch);
  return NextResponse.json(updated);
}

// DELETE — remove a review
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const deleted = await deleteReview(id);

  if (!deleted) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
