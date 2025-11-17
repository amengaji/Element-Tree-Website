// src/app/api/admin/careers/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import CareerOpening from "@/models/CareerOpening";

export async function GET() {
  const session = cookies().get("admin_session");
  if (!session || session.value !== "active") {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  await connectDB();
  const docs = await CareerOpening.find().sort({ createdAt: -1 });

  const data = docs.map((c) => ({
    id: c._id.toString(),
    title: c.title,
    department: c.department,
    description: c.description,
    location: c.location,
    status: c.status,
  }));

  return NextResponse.json({ success: true, careers: data });
}

export async function POST(req: Request) {
  const session = cookies().get("admin_session");
  if (!session || session.value !== "active") {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const body = await req.json();
  const { title, department, description, location } = body;

  if (!title || !department) {
    return NextResponse.json(
      { success: false, error: "Missing fields." },
      { status: 400 }
    );
  }

  await connectDB();
  await CareerOpening.create({
    title,
    department,
    description,
    location,
    status: "active",
  });

  return NextResponse.json({ success: true });
}
