import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authenticator } from "otplib";

export async function POST(req: Request) {
  try {
    const { email, password, mfaCode } = await req.json();

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
    }

    // NEW — TOTP verification
    const isValidOtp = authenticator.verify({
      token: mfaCode,
      secret: process.env.ADMIN_TOTP_SECRET!
    });

    if (!isValidOtp) {
      return NextResponse.json({ success: false, error: "Invalid MFA code" }, { status: 401 });
    }

    const cookieStore = await cookies();

    cookieStore.set("admin_session", "active", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 12,
      path: "/",
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}
