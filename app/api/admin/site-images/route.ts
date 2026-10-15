import { NextRequest, NextResponse } from "next/server";
import { put as blobPut, del as blobDel } from "@vercel/blob";
import { getSessionFromRequest, requirePermission } from "@/lib/admin-auth";
import { listSiteImages, getSiteImage, setSiteImage, type SiteImage } from "@/lib/admin-db";
import { SITE_IMAGE_SLOT_KEYS } from "@/lib/site-images";

// GET — list every slot's current image (requires read)
export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const images = await listSiteImages();
  return NextResponse.json(images);
}

// POST — upload/replace the image for a slot (requires write)
export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const slotKey = (formData.get("slotKey") as string | null)?.trim() ?? "";
  const alt = (formData.get("alt") as string | null)?.trim() ?? "";
  const photo = formData.get("photo") as File | null;

  if (!SITE_IMAGE_SLOT_KEYS.includes(slotKey)) {
    return NextResponse.json({ error: "Unknown image slot" }, { status: 400 });
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

  // Replacing an existing slot — remove the old blob so storage doesn't
  // silently accumulate orphaned files every time a photo is swapped.
  const existing = await getSiteImage(slotKey);
  if (existing?.blobPath) {
    try {
      await blobDel(existing.blobPath);
    } catch (err) {
      console.error("Failed to delete previous blob for site image:", err);
    }
  }

  const bytes = await photo.arrayBuffer();
  const ext = photo.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const blobPath = `site-images/${slotKey}/${filename}`;

  const blob = await blobPut(blobPath, Buffer.from(bytes), {
    access: "public",
    contentType: photo.type,
  });

  const image: SiteImage = {
    slotKey,
    url: blob.url,
    blobPath,
    alt: alt || undefined,
    uploadedAt: new Date().toISOString(),
  };

  await setSiteImage(image);
  return NextResponse.json(image, { status: 201 });
}
