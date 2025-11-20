import { NextResponse } from "next/server";
import { authenticator } from "otplib";
import QRCode from "qrcode";

export async function GET() {
  const secret = process.env.ADMIN_TOTP_SECRET!;
  const otpauth = authenticator.keyuri("ElementTree Admin", "ElementTree", secret);

  const qr = await QRCode.toDataURL(otpauth);

  return NextResponse.json({
    success: true,
    qr, // Base64 QR image
    secret
  });
}
