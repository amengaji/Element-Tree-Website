// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Enquiry from "@/models/Enquiry";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      company,
      country,
      interest,
      message,
      recaptchaToken,
    } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA v3
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY!;
    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: recaptchaToken,
        }),
      }
    );

    const recaptchaData = await verifyRes.json();
    if (!recaptchaData.success) {
      return NextResponse.json(
        { success: false, error: "Failed reCAPTCHA verification." },
        { status: 400 }
      );
    }

    // Save to MongoDB
    await connectDB();
    await Enquiry.create({
      fullName: name,
      email,
      phone,
      company,
      country,
      interest,
      message,
      status: "new",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API Error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
