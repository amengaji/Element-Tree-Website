// src/app/api/admin/verify-mfa/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const expected = process.env.ADMIN_MFA_CODE;

  if (!expected) {
    return NextResponse.json(
      { success: false, error: "MFA not configured." },
      { status: 500 }
    );
  }

  if (!code || code !== expected) {
    return NextResponse.json(
      { success: false, error: "Invalid code." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("et_admin_mfa", "1", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return res;
}
