import { NextResponse } from "next/server";
import { listSiteImages } from "@/lib/admin-db";

// Public, read-only — just a map of { slotKey: { url, alt } } so client
// components (the Contact page, the homepage course grid) can show a real
// uploaded photo where one exists. No auth needed: this is the same image
// data the pages themselves already render.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const images = await listSiteImages();
    return NextResponse.json(images);
  } catch {
    return NextResponse.json({});
  }
}
