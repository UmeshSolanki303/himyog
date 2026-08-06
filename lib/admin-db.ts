import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { createSalt, hashPassword, type Role, type Permission } from "./admin-auth";

const DATA_DIR = path.join(process.cwd(), "data");

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  salt: string;
  role: Role;
  permissions: Permission[];
  createdAt: string;
}

export interface AdminReview {
  id: string;
  name: string;
  city: string;
  state: string;
  courseSlug: string;
  courseTitle: string;
  rating: number;
  text: string;
  photo?: string;
  date: string;
  initials: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function readUsers(): Promise<AdminUser[]> {
  try {
    return JSON.parse(await readFile(path.join(DATA_DIR, "users.json"), "utf-8"));
  } catch {
    return [];
  }
}

export async function writeUsers(users: AdminUser[]): Promise<void> {
  await ensureDir();
  await writeFile(path.join(DATA_DIR, "users.json"), JSON.stringify(users, null, 2));
}

// Auto-seed the default admin from env vars if no users exist yet.
export async function seedAdminIfEmpty(): Promise<void> {
  const users = await readUsers();
  if (users.length > 0) return;

  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
  if (!initialPassword) return;

  const salt = createSalt();
  const adminUser: AdminUser = {
    id: "admin-1",
    username: "admin",
    passwordHash: hashPassword(initialPassword, salt),
    salt,
    role: "admin",
    permissions: ["read", "write"],
    createdAt: new Date().toISOString(),
  };
  await writeUsers([adminUser]);
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export async function readReviews(): Promise<AdminReview[]> {
  try {
    return JSON.parse(await readFile(path.join(DATA_DIR, "reviews.json"), "utf-8"));
  } catch {
    return [];
  }
}

export async function writeReviews(reviews: AdminReview[]): Promise<void> {
  await ensureDir();
  await writeFile(path.join(DATA_DIR, "reviews.json"), JSON.stringify(reviews, null, 2));
}
