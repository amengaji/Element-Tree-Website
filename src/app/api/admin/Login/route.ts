// src/app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const email = body?.email?.toString() ?? "";
  const password = body?.password?.toString() ?? "";
  const mfaCode = body?.mfaCode?.toString() ?? "";

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
  const ADMIN_MFA_CODE = process.env.ADMIN_MFA_CODE ?? "";

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_MFA_CODE) {
    return NextResponse.json(
      { error: "Admin credentials not configured on server." },
      { status: 500 },
    );
  }

  if (
    email !== ADMIN_EMAIL ||
    password !== ADMIN_PASSWORD ||
    mfaCode !== ADMIN_MFA_CODE
  ) {
    return NextResponse.json(
      { error: "Invalid email, password or MFA code." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_session", "active", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return res;
}
