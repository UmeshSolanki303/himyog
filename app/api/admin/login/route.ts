import { NextRequest, NextResponse } from "next/server";
import { hashPassword, signSession } from "@/lib/admin-auth";
import { findUserByUsername, seedAdminIfEmpty } from "@/lib/admin-db";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    // Seed default admin from env if no users exist yet
    await seedAdminIfEmpty();

    const user = await findUserByUsername(username);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const hash = hashPassword(password, user.salt);
    if (hash !== user.passwordHash) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signSession({
      id: user.id,
      username: user.username,
      role: user.role,
      permissions: user.permissions,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username, role: user.role, permissions: user.permissions },
    });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 24 h
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
