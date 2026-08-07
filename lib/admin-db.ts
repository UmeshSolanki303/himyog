import { getDb } from "./mongodb";
import { createSalt, hashPassword, type Role, type Permission } from "./admin-auth";

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
  city?: string;
  state: string;
  country: string;
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

// We key Mongo's own `_id` off our string `id` field (instead of ObjectId) so
// every document already has a unique index for free, and callers/UI never
// need to know Mongo is involved — reads always project `_id` back out.
type WithMongoId<T> = T & { _id: string };
const NO_ID = { projection: { _id: 0 } } as const;

// Splits a partial patch into Mongo $set / $unset — a plain `$set` would
// silently skip keys whose value is `undefined` (the driver drops them),
// so "clear this optional field" would never actually take effect.
function toUpdateOps<T extends object>(patch: Partial<T>) {
  const set: Record<string, unknown> = {};
  const unset: Record<string, ""> = {};
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) unset[key] = "";
    else set[key] = value;
  }
  const ops: Record<string, unknown> = {};
  if (Object.keys(set).length) ops.$set = set;
  if (Object.keys(unset).length) ops.$unset = unset;
  return ops;
}

async function usersCollection() {
  const db = await getDb();
  return db.collection<WithMongoId<AdminUser>>("users");
}

async function reviewsCollection() {
  const db = await getDb();
  return db.collection<WithMongoId<AdminReview>>("reviews");
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function listUsers(): Promise<AdminUser[]> {
  const col = await usersCollection();
  return col.find({}, NO_ID).toArray() as unknown as AdminUser[];
}

export async function findUserByUsername(username: string): Promise<AdminUser | null> {
  const col = await usersCollection();
  return col.findOne({ username }, NO_ID) as unknown as AdminUser | null;
}

export async function findUserById(id: string): Promise<AdminUser | null> {
  const col = await usersCollection();
  return col.findOne({ _id: id }, NO_ID) as unknown as AdminUser | null;
}

export async function isUsernameTaken(username: string, excludeId?: string): Promise<boolean> {
  const col = await usersCollection();
  const query: Record<string, unknown> = { username };
  if (excludeId) query._id = { $ne: excludeId };
  return (await col.countDocuments(query)) > 0;
}

export async function insertUser(user: AdminUser): Promise<AdminUser> {
  const col = await usersCollection();
  await col.insertOne({ ...user, _id: user.id });
  return user;
}

export async function updateUser(id: string, patch: Partial<AdminUser>): Promise<AdminUser | null> {
  const col = await usersCollection();
  const doc = await col.findOneAndUpdate({ _id: id }, toUpdateOps(patch), {
    returnDocument: "after",
    projection: { _id: 0 },
  });
  return doc as AdminUser | null;
}

export async function deleteUser(id: string): Promise<boolean> {
  const col = await usersCollection();
  const result = await col.deleteOne({ _id: id });
  return result.deletedCount > 0;
}

// Auto-seed the default admin from env vars if no users exist yet.
export async function seedAdminIfEmpty(): Promise<void> {
  const col = await usersCollection();
  const count = await col.estimatedDocumentCount();
  if (count > 0) return;

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
  await insertUser(adminUser);
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export async function listReviews(filter?: {
  status?: string;
  courseSlug?: string;
}): Promise<AdminReview[]> {
  const col = await reviewsCollection();
  const query: Record<string, unknown> = {};
  if (filter?.status) query.status = filter.status;
  if (filter?.courseSlug) query.courseSlug = filter.courseSlug;
  return col
    .find(query, NO_ID)
    .sort({ submittedAt: -1 })
    .toArray() as unknown as AdminReview[];
}

export async function listApprovedReviews(): Promise<AdminReview[]> {
  return listReviews({ status: "approved" });
}

export async function findReviewById(id: string): Promise<AdminReview | null> {
  const col = await reviewsCollection();
  return col.findOne({ _id: id }, NO_ID) as unknown as AdminReview | null;
}

export async function insertReview(review: AdminReview): Promise<AdminReview> {
  const col = await reviewsCollection();
  await col.insertOne({ ...review, _id: review.id });
  return review;
}

export async function updateReview(
  id: string,
  patch: Partial<AdminReview>,
): Promise<AdminReview | null> {
  const col = await reviewsCollection();
  const doc = await col.findOneAndUpdate({ _id: id }, toUpdateOps(patch), {
    returnDocument: "after",
    projection: { _id: 0 },
  });
  return doc as AdminReview | null;
}

export async function deleteReview(id: string): Promise<boolean> {
  const col = await reviewsCollection();
  const result = await col.deleteOne({ _id: id });
  return result.deletedCount > 0;
}
