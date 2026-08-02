import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  course?: string;
  message: string;
}

function buildTelegramMessage(data: ContactPayload): string {
  const lines = [
    "🪷 *New enquiry — Matrushakti Yog*",
    "",
    `👤 *Name:* ${escapeMarkdown(data.name)}`,
    `📧 *Email:* ${escapeMarkdown(data.email)}`,
  ];

  if (data.phone?.trim()) {
    lines.push(`📱 *Phone:* ${escapeMarkdown(data.phone)}`);
  }

  if (data.course?.trim()) {
    lines.push(`🧘 *Interested in:* ${escapeMarkdown(data.course)}`);
  }

  lines.push("", `💬 *Message:*`, escapeMarkdown(data.message));

  return lines.join("\n");
}

// Escape special chars for Telegram MarkdownV2
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

async function sendTelegramNotification(data: ContactPayload): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram env vars not set — skipping notification");
    return;
  }

  const response = await fetch(TELEGRAM_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildTelegramMessage(data),
      parse_mode: "MarkdownV2",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Telegram API error: ${err}`);
  }
}

function validatePayload(body: unknown): ContactPayload {
  if (typeof body !== "object" || body === null) {
    throw new Error("Invalid request body");
  }
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";

  if (!name || !email || !message) {
    throw new Error("name, email and message are required");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address");
  }
  if (message.length > 2000) {
    throw new Error("Message too long");
  }

  return {
    name: name.slice(0, 120),
    email: email.slice(0, 254),
    phone: typeof b.phone === "string" ? b.phone.trim().slice(0, 30) : undefined,
    course: typeof b.course === "string" ? b.course.trim().slice(0, 120) : undefined,
    message,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = validatePayload(body);

    await sendTelegramNotification(data);

    return NextResponse.json(
      { success: true, message: "Thank you for your message." },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    const isValidation = message.includes("required") || message.includes("Invalid");

    console.error("Contact API error:", error);

    return NextResponse.json(
      { success: false, message: isValidation ? message : "Something went wrong." },
      { status: isValidation ? 400 : 500 }
    );
  }
}
