// src/app/api/admin/enquiries/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Enquiry from "@/models/Enquiry";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "active") {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  await connectDB();
  const docs = await Enquiry.find().sort({ createdAt: -1 });

  const data = docs.map((x) => ({
    id: x._id.toString(),
    fullName: x.fullName,
    email: x.email,
    phone: x.phone,
    company: x.company,
    country: x.country,
    interest: x.interest,
    message: x.message,
    status: x.status,
    createdAt: x.createdAt,
  }));

  return NextResponse.json({ success: true, data });
}
