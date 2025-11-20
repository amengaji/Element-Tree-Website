import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import crypto from "crypto";

export async function POST(req: Request) {
  const { code } = await req.json();
  const db = await getDb();

  const otpHash = crypto.createHash("sha256").update(code).digest("hex");

  const record = await db.collection("admin_email_otp").findOne({
    otpHash,
    used: false,
    expiresAt: { $gt: new Date() },
  });

  if (!record) {
    return NextResponse.json(
      { success: false, error: "Invalid or expired OTP." },
      { status: 401 }
    );
  }

  await db
    .collection("admin_email_otp")
    .updateOne({ _id: record._id }, { $set: { used: true } });

  return NextResponse.json({ success: true });
}
