// src/app/api/admin/check-session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // cookies() is synchronous in App Router
    const cookieStore = cookies();

    // Read cookie
    const session = cookieStore.get("admin_session");

    // No cookie found → user NOT logged in
    if (!session || !session.value) {
      return NextResponse.json({ active: false });
    }

    // Validate value
    const isActive = session.value === "active";

    return NextResponse.json({
      active: isActive,
    });

  } catch (err) {
    console.error("check-session error:", err);
    return NextResponse.json({ active: false });
  }
}
