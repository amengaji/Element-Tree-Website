// src/lib/admin-auth.ts
import { NextRequest, NextResponse } from "next/server";

export function checkAdminAuth(req: NextRequest): NextResponse | null {
  const session = req.cookies.get("admin_session")?.value;
  if (session !== "active") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
