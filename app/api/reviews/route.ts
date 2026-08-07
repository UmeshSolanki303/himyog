import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { listApprovedReviews, insertReview, type AdminReview } from "@/lib/admin-db";
import { put as blobPut } from "@vercel/blob";

// Without this, Next.js treats GET() below as static (it touches no dynamic
// APIs) and caches its response at build time — Vercel would then keep
// serving whatever was in MongoDB at deploy time instead of live data.
export const dynamic = "force-dynamic";

const TELEGRAM_API_BASE = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

function ratingStars(n: number) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function buildReviewMessage(data: {
  name: string;
  city?: string;
  state: string;
  country: string;
  courseTitle: string;
  rating: number;
  text: string;
}): string {
  const location = [data.city, data.state, data.country].filter(Boolean).join(", ");
  return [
    "⭐ *New Review — Matrushakti Yog*",
    "",
    `👤 *Name:* ${escapeMarkdown(data.name)}`,
    `📍 *Location:* ${escapeMarkdown(location)}`,
    `🧘 *Course:* ${escapeMarkdown(data.courseTitle)}`,
    `⭐ *Rating:* ${ratingStars(data.rating)} \\(${data.rating}/5\\)`,
    "",
    `💬 *Review:*`,
    escapeMarkdown(data.text),
  ].join("\n");
}

async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const res = await fetch(`${TELEGRAM_API_BASE}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "MarkdownV2" }),
  });
  if (!res.ok) console.error("Telegram message error:", await res.text());
}

async function sendTelegramPhoto(
  buffer: Buffer,
  mimeType: string,
  filename: string,
  caption: string,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const fd = new FormData();
  fd.append("chat_id", chatId);
  const ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
  fd.append("photo", new Blob([ab], { type: mimeType }), filename);
  fd.append("caption", caption.slice(0, 1024));

  const res = await fetch(`${TELEGRAM_API_BASE}/sendPhoto`, {
    method: "POST",
    body: fd,
  });
  if (!res.ok) console.error("Telegram photo error:", await res.text());
}

// GET — return approved reviews for the public reviews page
export async function GET() {
  try {
    const reviews = await listApprovedReviews();
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = (formData.get("name") as string | null)?.trim() ?? "";
    const city = (formData.get("city") as string | null)?.trim() ?? "";
    const state = (formData.get("state") as string | null)?.trim() ?? "";
    const country = (formData.get("country") as string | null)?.trim() ?? "";
    const courseSlug = (formData.get("courseSlug") as string | null)?.trim() ?? "";
    const courseTitle = (formData.get("courseTitle") as string | null)?.trim() ?? "";
    const ratingRaw = formData.get("rating");
    const rating = Math.min(5, Math.max(1, Number(ratingRaw) || 5));
    const text = (formData.get("text") as string | null)?.trim() ?? "";
    const photoFile = formData.get("photo") as File | null;

    if (!name || !state || !country || !courseSlug || !text) {
      return NextResponse.json(
        { success: false, message: "name, state, country, course and review text are required" },
        { status: 400 },
      );
    }
    if (text.length > 2000) {
      return NextResponse.json(
        { success: false, message: "Review is too long (max 2000 characters)" },
        { status: 400 },
      );
    }

    // ── Upload photo to Blob storage ──
    let photoPath: string | null = null;
    let photoBuffer: Buffer | null = null;
    let photoMime = "image/jpeg";
    let photoFilename = "";

    if (photoFile && photoFile.size > 0 && photoFile.type.startsWith("image/")) {
      const bytes = await photoFile.arrayBuffer();
      photoBuffer = Buffer.from(bytes);
      photoMime = photoFile.type;
      const ext = photoFile.name.split(".").pop()?.toLowerCase() ?? "jpg";
      photoFilename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      try {
        const blob = await blobPut(`reviews/${photoFilename}`, photoBuffer, {
          access: "public",
          contentType: photoMime,
        });
        photoPath = blob.url;
      } catch (err) {
        console.error("Blob upload error:", err);
      }
    }

    // ── Save to database (pending moderation) ──
    try {
      const entry: AdminReview = {
        id: crypto.randomUUID(),
        name,
        city: city || undefined,
        state,
        country,
        courseSlug,
        courseTitle,
        rating,
        text,
        photo: photoPath ?? undefined,
        date: new Date().toISOString().split("T")[0],
        initials: name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
        status: "pending",
        submittedAt: new Date().toISOString(),
      };
      await insertReview(entry);
    } catch (err) {
      console.error("Review DB insert error:", err);
    }

    // ── Telegram notifications ──
    const msgText = buildReviewMessage({ name, city: city || undefined, state, country, courseTitle, rating, text });
    await sendTelegramMessage(msgText);

    if (photoBuffer) {
      await sendTelegramPhoto(
        photoBuffer,
        photoMime,
        photoFilename,
        `Review photo from ${name} — ${courseTitle}`,
      );
    }

    return NextResponse.json(
      { success: true, photoPath },
      { status: 200 },
    );
  } catch (error) {
    console.error("Review API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
