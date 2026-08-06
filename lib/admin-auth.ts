import crypto from "crypto";

export type Permission = "read" | "write";
export type Role = "admin" | "editor" | "viewer";

export interface SessionUser {
  id: string;
  username: string;
  role: Role;
  permissions: Permission[];
  exp: number;
}

function secret() {
  return process.env.SESSION_SECRET ?? "dev-secret-change-in-production";
}

export function createSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function hashPassword(plain: string, salt: string): string {
  return crypto.createHash("sha256").update(`${salt}:${plain}`).digest("hex");
}

export function signSession(user: Omit<SessionUser, "exp">): string {
  const payload = Buffer.from(
    JSON.stringify({ ...user, exp: Date.now() + 86_400_000 })
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySession(token: string): SessionUser | null {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  if (expected !== sig) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as SessionUser;
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function getSessionFromRequest(req: Request): SessionUser | null {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/admin_session=([^;]+)/);
  if (!match) return null;
  return verifySession(decodeURIComponent(match[1]));
}

export function requirePermission(
  session: SessionUser | null,
  perm: Permission
): boolean {
  if (!session) return false;
  return session.permissions.includes(perm);
}

export function requireAdmin(session: SessionUser | null): boolean {
  return session?.role === "admin";
}
