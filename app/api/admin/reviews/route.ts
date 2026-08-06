import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, requirePermission } from "@/lib/admin-auth";
import { readReviews, writeReviews, type AdminReview } from "@/lib/admin-db";
import crypto from "crypto";

// GET — list all reviews (requires read)
export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const courseSlug = searchParams.get("course");

  let reviews = await readReviews();
  if (status) reviews = reviews.filter((r) => r.status === status);
  if (courseSlug) reviews = reviews.filter((r) => r.courseSlug === courseSlug);

  // Sort newest first
  reviews = reviews.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return NextResponse.json(reviews);
}

// POST — create a new review (requires write)
export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { name, city, state, courseSlug, courseTitle, rating, text, photo, status } = body;

  if (!name || !city || !state || !courseSlug || !text) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  const reviews = await readReviews();
  const review: AdminReview = {
    id: crypto.randomUUID(),
    name,
    city,
    state,
    courseSlug,
    courseTitle: courseTitle ?? courseSlug,
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    text,
    photo: photo || undefined,
    date: new Date().toISOString().split("T")[0],
    initials: name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
    status: status ?? "approved",
    submittedAt: new Date().toISOString(),
  };

  reviews.unshift(review);
  await writeReviews(reviews);
  return NextResponse.json(review, { status: 201 });
}
