import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { put as blobPut } from "@vercel/blob";
import { getSessionFromRequest, requirePermission } from "@/lib/admin-auth";
import { listCourseGalleryImages, insertCourseGalleryImage, type CourseGalleryImage } from "@/lib/admin-db";
import { courses } from "@/lib/courses";

const VALID_SLUGS = new Set(courses.map((c) => c.slug));

// GET — list gallery images, optionally filtered by course (requires read)
export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const courseSlug = searchParams.get("course") ?? undefined;

  const images = await listCourseGalleryImages(courseSlug);
  return NextResponse.json(images);
}

// POST — upload a new real photo for a course (requires write)
export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const courseSlug = (formData.get("courseSlug") as string | null)?.trim() ?? "";
  const alt = (formData.get("alt") as string | null)?.trim() ?? "";
  const caption = (formData.get("caption") as string | null)?.trim() ?? "";
  const photo = formData.get("photo") as File | null;

  if (!VALID_SLUGS.has(courseSlug)) {
    return NextResponse.json({ error: "Unknown course" }, { status: 400 });
  }
  if (!photo || photo.size === 0) {
    return NextResponse.json({ error: "Photo is required" }, { status: 400 });
  }
  if (!photo.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }
  if (photo.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be under 8 MB" }, { status: 400 });
  }

  const bytes = await photo.arrayBuffer();
  const ext = photo.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const blobPath = `course-gallery/${courseSlug}/${filename}`;

  const blob = await blobPut(blobPath, Buffer.from(bytes), {
    access: "public",
    contentType: photo.type,
  });

  const existing = await listCourseGalleryImages(courseSlug);

  const image: CourseGalleryImage = {
    id: crypto.randomUUID(),
    courseSlug,
    url: blob.url,
    blobPath,
    alt: alt || `Photo from ${courseSlug}`,
    caption: caption || undefined,
    order: existing.length,
    uploadedAt: new Date().toISOString(),
  };

  await insertCourseGalleryImage(image);
  return NextResponse.json(image, { status: 201 });
}
