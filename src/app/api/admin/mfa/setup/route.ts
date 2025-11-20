// src/app/api/admin/mfa/setup/route.ts
import { NextResponse } from "next/server";
import { authenticator } from "otplib";
import QRCode from "qrcode";

export async function GET() {
  const secret = process.env.ADMIN_TOTP_SECRET;

  if (!secret) {
    return NextResponse.json(
      { success: false, error: "ADMIN_TOTP_SECRET is not configured." },
      { status: 500 }
    );
  }

  // Label inside authenticator app
  const label = "Element Tree Admin";
  const issuer = "Element Tree";

  const otpauth = authenticator.keyuri(label, issuer, secret);
  const qr = await QRCode.toDataURL(otpauth);

  return NextResponse.json({
    success: true,
    qr,        // data:image/png;base64,....
    otpauth,   // raw otpauth URL (optional)
  });
}
