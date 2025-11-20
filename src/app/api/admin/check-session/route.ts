import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies(); // NEXT.JS 16 = ASYNC

    const session = cookieStore.get("admin_session");

    if (!session || session.value !== "active") {
      return NextResponse.json({ active: false });
    }

    return NextResponse.json({ active: true });

  } catch (err) {
    console.error("check-session error:", err);
    return NextResponse.json({ active: false });
  }
}
