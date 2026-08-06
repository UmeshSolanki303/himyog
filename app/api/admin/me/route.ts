import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    id: session.id,
    username: session.username,
    role: session.role,
    permissions: session.permissions,
  });
}
