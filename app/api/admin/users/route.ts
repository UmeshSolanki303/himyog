import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, requireAdmin, createSalt, hashPassword } from "@/lib/admin-auth";
import { readUsers, writeUsers, type AdminUser } from "@/lib/admin-db";
import crypto from "crypto";

// GET — list all users (admin only)
export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requireAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await readUsers();
  return NextResponse.json(
    users.map(({ passwordHash: _, salt: __, ...u }) => u) // strip secrets
  );
}

// POST — create a new user (admin only)
export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requireAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { username, password, role, permissions } = await request.json();

  if (!username || !password || !role) {
    return NextResponse.json({ error: "username, password and role are required" }, { status: 400 });
  }

  const users = await readUsers();
  if (users.some((u) => u.username === username)) {
    return NextResponse.json({ error: "Username already exists" }, { status: 409 });
  }

  const salt = createSalt();
  const newUser: AdminUser = {
    id: crypto.randomUUID(),
    username,
    passwordHash: hashPassword(password, salt),
    salt,
    role,
    permissions: permissions ?? (role === "admin" ? ["read", "write"] : ["read"]),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);

  const { passwordHash: _, salt: __, ...safe } = newUser;
  return NextResponse.json(safe, { status: 201 });
}

// PUT — update a user (admin only)
export async function PUT(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requireAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id, username, password, role, permissions } = await request.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (username && username !== users[idx].username) {
    if (users.some((u) => u.username === username)) {
      return NextResponse.json({ error: "Username taken" }, { status: 409 });
    }
    users[idx].username = username;
  }
  if (password) {
    const salt = createSalt();
    users[idx].salt = salt;
    users[idx].passwordHash = hashPassword(password, salt);
  }
  if (role) users[idx].role = role;
  if (permissions) users[idx].permissions = permissions;

  await writeUsers(users);
  const { passwordHash: _, salt: __, ...safe } = users[idx];
  return NextResponse.json(safe);
}

// DELETE — remove a user (admin only, cannot delete self)
export async function DELETE(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requireAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  if (id === session?.id) return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });

  const users = await readUsers();
  const next = users.filter((u) => u.id !== id);
  if (next.length === users.length) return NextResponse.json({ error: "User not found" }, { status: 404 });

  await writeUsers(next);
  return NextResponse.json({ success: true });
}
