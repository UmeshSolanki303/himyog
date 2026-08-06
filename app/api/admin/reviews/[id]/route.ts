import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, requirePermission } from "@/lib/admin-auth";
import { readReviews, writeReviews } from "@/lib/admin-db";

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
  const reviews = await readReviews();
  const idx = reviews.findIndex((r) => r.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  reviews[idx] = {
    ...reviews[idx],
    name: body.name ?? reviews[idx].name,
    city: body.city ?? reviews[idx].city,
    state: body.state ?? reviews[idx].state,
    courseSlug: body.courseSlug ?? reviews[idx].courseSlug,
    courseTitle: body.courseTitle ?? reviews[idx].courseTitle,
    rating: body.rating != null ? Math.min(5, Math.max(1, Number(body.rating))) : reviews[idx].rating,
    text: body.text ?? reviews[idx].text,
    photo: body.photo !== undefined ? body.photo || undefined : reviews[idx].photo,
    status: body.status ?? reviews[idx].status,
    date: body.date ?? reviews[idx].date,
    initials: (body.name ?? reviews[idx].name)
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
  };

  await writeReviews(reviews);
  return NextResponse.json(reviews[idx]);
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
  const reviews = await readReviews();
  const next = reviews.filter((r) => r.id !== id);

  if (next.length === reviews.length) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  await writeReviews(next);
  return NextResponse.json({ success: true });
}
