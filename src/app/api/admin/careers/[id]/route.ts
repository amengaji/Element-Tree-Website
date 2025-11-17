// src/app/api/admin/careers/[id]/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import CareerOpening from "@/models/CareerOpening";

export async function PUT(req: Request, { params }: any) {
  const session = cookies().get("admin_session");
  if (!session || session.value !== "active") {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const { id } = params;
  const body = await req.json();
  const { status, title, department, description, location } = body;

  await connectDB();

  await CareerOpening.findByIdAndUpdate(id, {
    status,
    title,
    department,
    description,
    location,
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: any) {
  const session = cookies().get("admin_session");
  if (!session || session.value !== "active") {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const { id } = params;

  await connectDB();
  await CareerOpening.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
