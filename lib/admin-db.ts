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

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown
  coverImage?: string;
  author: string;
  tags: string[];
  status: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string; // main search phrase the post targets
  seoKeywords?: string[]; // extra keywords for <meta keywords> / JSON-LD
  publishedAt?: string; // set the first time status becomes "published"
  createdAt: string;
  updatedAt: string;
}

export interface CourseGalleryImage {
  id: string;
  courseSlug: string;
  url: string;
  blobPath?: string; // Vercel Blob pathname, so we can delete the stored file too
  alt: string;
  caption?: string;
  order: number;
  uploadedAt: string;
}

// A single named image "slot" (see lib/site-images.ts for the canonical
// list) — one current image per slot, upload replaces whatever was there.
export interface SiteImage {
  slotKey: string;
  url: string;
  blobPath?: string;
  alt?: string;
  uploadedAt: string;
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

async function blogPostsCollection() {
  const db = await getDb();
  return db.collection<WithMongoId<AdminBlogPost>>("blog_posts");
}

async function courseGalleryCollection() {
  const db = await getDb();
  return db.collection<WithMongoId<CourseGalleryImage>>("course_gallery_images");
}

async function siteImagesCollection() {
  const db = await getDb();
  return db.collection<WithMongoId<SiteImage>>("site_images");
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

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function listBlogPosts(filter?: {
  status?: string;
  tag?: string;
}): Promise<AdminBlogPost[]> {
  const col = await blogPostsCollection();
  const query: Record<string, unknown> = {};
  if (filter?.status) query.status = filter.status;
  if (filter?.tag) query.tags = filter.tag;
  return col
    .find(query, NO_ID)
    .sort({ createdAt: -1 })
    .toArray() as unknown as AdminBlogPost[];
}

export async function listPublishedBlogPosts(tag?: string): Promise<AdminBlogPost[]> {
  const posts = await listBlogPosts({ status: "published", tag });
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt ?? b.createdAt).getTime() -
      new Date(a.publishedAt ?? a.createdAt).getTime(),
  );
}

export async function findBlogPostById(id: string): Promise<AdminBlogPost | null> {
  const col = await blogPostsCollection();
  return col.findOne({ _id: id }, NO_ID) as unknown as AdminBlogPost | null;
}

export async function findBlogPostBySlug(slug: string): Promise<AdminBlogPost | null> {
  const col = await blogPostsCollection();
  return col.findOne({ slug }, NO_ID) as unknown as AdminBlogPost | null;
}

export async function isBlogSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const col = await blogPostsCollection();
  const query: Record<string, unknown> = { slug };
  if (excludeId) query._id = { $ne: excludeId };
  return (await col.countDocuments(query)) > 0;
}

// Appends -2, -3, … to `base` until it no longer collides, so authors never
// have to hand-resolve a slug clash themselves.
export async function generateUniqueBlogSlug(base: string, excludeId?: string): Promise<string> {
  const root = base || "post";
  let candidate = root;
  let suffix = 2;
  while (await isBlogSlugTaken(candidate, excludeId)) {
    candidate = `${root}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export async function insertBlogPost(post: AdminBlogPost): Promise<AdminBlogPost> {
  const col = await blogPostsCollection();
  await col.insertOne({ ...post, _id: post.id });
  return post;
}

export async function updateBlogPost(
  id: string,
  patch: Partial<AdminBlogPost>,
): Promise<AdminBlogPost | null> {
  const col = await blogPostsCollection();
  const doc = await col.findOneAndUpdate({ _id: id }, toUpdateOps(patch), {
    returnDocument: "after",
    projection: { _id: 0 },
  });
  return doc as AdminBlogPost | null;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const col = await blogPostsCollection();
  const result = await col.deleteOne({ _id: id });
  return result.deletedCount > 0;
}

// ─── Course gallery ───────────────────────────────────────────────────────────

export async function listCourseGalleryImages(courseSlug?: string): Promise<CourseGalleryImage[]> {
  const col = await courseGalleryCollection();
  const query: Record<string, unknown> = {};
  if (courseSlug) query.courseSlug = courseSlug;
  return col
    .find(query, NO_ID)
    .sort({ courseSlug: 1, order: 1, uploadedAt: 1 })
    .toArray() as unknown as CourseGalleryImage[];
}

export async function findCourseGalleryImageById(id: string): Promise<CourseGalleryImage | null> {
  const col = await courseGalleryCollection();
  return col.findOne({ _id: id }, NO_ID) as unknown as CourseGalleryImage | null;
}

export async function insertCourseGalleryImage(image: CourseGalleryImage): Promise<CourseGalleryImage> {
  const col = await courseGalleryCollection();
  await col.insertOne({ ...image, _id: image.id });
  return image;
}

export async function deleteCourseGalleryImage(id: string): Promise<boolean> {
  const col = await courseGalleryCollection();
  const result = await col.deleteOne({ _id: id });
  return result.deletedCount > 0;
}

// ─── Site images (single-image slots) ──────────────────────────────────────────

export async function getSiteImage(slotKey: string): Promise<SiteImage | null> {
  const col = await siteImagesCollection();
  return col.findOne({ _id: slotKey }, NO_ID) as unknown as SiteImage | null;
}

// Fetches every slot in one query — used by pages that need several (About
// page's founder + 3 specialty photos, the course grid's 7 preview images).
export async function listSiteImages(): Promise<Record<string, SiteImage>> {
  const col = await siteImagesCollection();
  const docs = (await col.find({}, NO_ID).toArray()) as unknown as SiteImage[];
  const map: Record<string, SiteImage> = {};
  for (const doc of docs) map[doc.slotKey] = doc;
  return map;
}

export async function setSiteImage(image: SiteImage): Promise<SiteImage> {
  const col = await siteImagesCollection();
  await col.findOneAndUpdate(
    { _id: image.slotKey },
    { $set: image },
    { upsert: true },
  );
  return image;
}

export async function deleteSiteImage(slotKey: string): Promise<boolean> {
  const col = await siteImagesCollection();
  const result = await col.deleteOne({ _id: slotKey });
  return result.deletedCount > 0;
}
