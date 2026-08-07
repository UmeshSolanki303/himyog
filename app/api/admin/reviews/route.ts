import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, requirePermission } from "@/lib/admin-auth";
import { listReviews, insertReview, type AdminReview } from "@/lib/admin-db";
import crypto from "crypto";

// GET — list all reviews (requires read)
export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") ?? undefined;
  const courseSlug = searchParams.get("course") ?? undefined;

  const reviews = await listReviews({ status, courseSlug });
  return NextResponse.json(reviews);
}

// POST — create a new review (requires write)
export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { name, city, state, country, courseSlug, courseTitle, rating, text, photo, status } = body;

  if (!name || !state || !country || !courseSlug || !text) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  const review: AdminReview = {
    id: crypto.randomUUID(),
    name,
    city: city || undefined,
    state,
    country,
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

  await insertReview(review);
  return NextResponse.json(review, { status: 201 });
}
