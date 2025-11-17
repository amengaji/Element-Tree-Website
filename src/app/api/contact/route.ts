// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn("RECAPTCHA_SECRET_KEY is not set; skipping verification");
    return true;
  }

  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: "POST" }
  );
  const data = await res.json();
  return data.success === true && data.score >= 0.4;
}

import nodemailer from "nodemailer";

async function sendNotificationEmail(payload: {
  fullName: string;
  email: string;
  company: string;
  country: string;
  interest: string;
  message: string;
}) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    SMTP_TO,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !SMTP_TO) {
    console.warn("SMTP env vars not fully set; skipping email sending.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const subject = `New enquiry from ${payload.fullName} – ${payload.interest || "General"}`;
  const textBody = `
New enquiry from Element Tree website:

Name: ${payload.fullName}
Email: ${payload.email}
Company: ${payload.company}
Country: ${payload.country}
Interest: ${payload.interest}

Message:
${payload.message}
`.trim();

  await transporter.sendMail({
    from: SMTP_FROM,
    to: SMTP_TO,
    subject,
    text: textBody,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      company,
      country,
      interest,
      message,
      recaptchaToken,
    } = body;

    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, error: "Missing reCAPTCHA token." },
        { status: 400 }
      );
    }

    const recaptchaOk = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaOk) {
      return NextResponse.json(
        { success: false, error: "reCAPTCHA verification failed." },
        { status: 400 }
      );
    }

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Required fields missing." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection("enquiries");

    const doc = {
      fullName,
      email,
      company: company || "",
      country: country || "",
      interest: interest || "",
      message,
      createdAt: new Date(),
      status: "new", // new, read, archived
    };

    await collection.insertOne(doc);

    await sendNotificationEmail(doc);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
