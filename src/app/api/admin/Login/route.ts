// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authenticator } from "otplib";
import nodemailer from "nodemailer";

async function sendLoginAlertEmail(ip: string | null, ua: string | null) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: "Element Tree Admin login detected",
      text: `A login to the Element Tree Admin panel was detected.\n\nIP: ${ip || "unknown"}\nUser-Agent: ${ua || "unknown"}\nTime: ${new Date().toISOString()}\n\nIf this was not you, please reset your password immediately.`,
    });
  } catch (err) {
    console.error("Failed to send login alert email:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, mfaCode, rememberDevice } = body as {
      email: string;
      password: string;
      mfaCode?: string;
      rememberDevice?: boolean;
    };

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const ADMIN_TOTP_SECRET = process.env.ADMIN_TOTP_SECRET;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_TOTP_SECRET) {
      return NextResponse.json(
        { success: false, error: "Server MFA is not configured." },
        { status: 500 }
      );
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();

    // ---- Trust-this-device: skip MFA if still valid ----
    const trustedUntil = cookieStore.get("admin_trusted_until")?.value;
    const now = Date.now();
    const isDeviceTrusted =
      trustedUntil && Number(trustedUntil) > 0 && Number(trustedUntil) > now;

    if (!isDeviceTrusted) {
      // MFA required
      if (!mfaCode || mfaCode.trim().length === 0) {
        return NextResponse.json(
          { success: false, error: "MFA code is required." },
          { status: 401 }
        );
      }

      const isValidOtp = authenticator.verify({
        token: mfaCode.trim(),
        secret: ADMIN_TOTP_SECRET,
      });

      if (!isValidOtp) {
        return NextResponse.json(
          { success: false, error: "Invalid MFA code." },
          { status: 401 }
        );
      }
    }

    // If MFA just passed and user checked "trust this device"
    const res = NextResponse.json({ success: true });

    // Main session cookie
    cookieStore.set("admin_session", "active", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 12,
      path: "/",
    });

    // Trust this device for 24 hours
    if (!isDeviceTrusted && rememberDevice) {
      const oneDayMs = 24 * 60 * 60 * 1000;
      const trustedUntilTs = Date.now() + oneDayMs;

      res.cookies.set("admin_trusted_until", String(trustedUntilTs), {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: oneDayMs / 1000,
        path: "/",
      });
    }

    // Login alert email (fire & forget)
    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || null;
    const ua = req.headers.get("user-agent");
    void sendLoginAlertEmail(ip, ua);

    return res;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
