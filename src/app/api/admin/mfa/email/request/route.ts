import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { getDb } from "@/lib/mongodb";

export async function POST() {
  const db = await getDb();

  const otp = (Math.floor(100000 + Math.random() * 900000)).toString();

  await db.collection("admin_email_otp").deleteMany({});
  await db.collection("admin_email_otp").insertOne({
    otpHash: crypto.createHash("sha256").update(otp).digest("hex"),
    expiresAt: new Date(Date.now() + 5 * 60000),
    used: false,
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    to: process.env.ADMIN_EMAIL,
    from: process.env.SMTP_FROM,
    subject: "Element Tree Admin Email OTP",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });

  return NextResponse.json({ success: true });
}
