import { NextRequest, NextResponse } from "next/server";
import { del as blobDel } from "@vercel/blob";
import { getSessionFromRequest, requirePermission } from "@/lib/admin-auth";
import { findCourseGalleryImageById, deleteCourseGalleryImage } from "@/lib/admin-db";

// DELETE — remove a gallery image (and its stored file)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const existing = await findCourseGalleryImageById(id);
  if (!existing) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  const deleted = await deleteCourseGalleryImage(id);

  if (existing.blobPath) {
    try {
      await blobDel(existing.blobPath);
    } catch (err) {
      // The DB record is already gone — log and move on rather than leave
      // the admin stuck on an orphaned blob they can't retry deleting.
      console.error("Failed to delete blob for gallery image:", err);
    }
  }

  return NextResponse.json({ success: deleted });
}
