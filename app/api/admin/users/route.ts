import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, requireAdmin, createSalt, hashPassword } from "@/lib/admin-auth";
import { listUsers, insertUser, updateUser, deleteUser, findUserById, isUsernameTaken, type AdminUser } from "@/lib/admin-db";
import crypto from "crypto";

// GET — list all users (admin only)
export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!requireAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await listUsers();
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

  if (await isUsernameTaken(username)) {
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

  await insertUser(newUser);

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

  const existing = await findUserById(id);
  if (!existing) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const patch: Partial<AdminUser> = {};
  if (username && username !== existing.username) {
    if (await isUsernameTaken(username, id)) {
      return NextResponse.json({ error: "Username taken" }, { status: 409 });
    }
    patch.username = username;
  }
  if (password) {
    const salt = createSalt();
    patch.salt = salt;
    patch.passwordHash = hashPassword(password, salt);
  }
  if (role) patch.role = role;
  if (permissions) patch.permissions = permissions;

  const updated = await updateUser(id, patch);
  const { passwordHash: _, salt: __, ...safe } = updated!;
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

  const deleted = await deleteUser(id);
  if (!deleted) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
