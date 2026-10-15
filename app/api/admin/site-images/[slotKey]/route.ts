import { NextRequest, NextResponse } from "next/server";
import { del as blobDel } from "@vercel/blob";
import { getSessionFromRequest, requirePermission } from "@/lib/admin-auth";
import { getSiteImage, deleteSiteImage } from "@/lib/admin-db";

// DELETE — revert a slot back to its default (stock photo / initials)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slotKey: string }> },
) {
  const session = getSessionFromRequest(request);
  if (!requirePermission(session, "write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { slotKey } = await params;
  const existing = await getSiteImage(slotKey);
  if (!existing) {
    return NextResponse.json({ error: "Slot has no image set" }, { status: 404 });
  }

  const deleted = await deleteSiteImage(slotKey);

  if (existing.blobPath) {
    try {
      await blobDel(existing.blobPath);
    } catch (err) {
      console.error("Failed to delete blob for site image:", err);
    }
  }

  return NextResponse.json({ success: deleted });
}
