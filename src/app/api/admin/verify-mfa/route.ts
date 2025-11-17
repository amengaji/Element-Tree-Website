// src/app/api/admin/verify-mfa/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { code } = await req.json();
  const expected = process.env.ADMIN_MFA_CODE;

  if (!code || code !== expected) {
    return NextResponse.json(
      { success: false, error: "Invalid code" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_mfa", "verified", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 30,
    path: "/",
  });

  return res;
}
