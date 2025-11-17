// src/app/api/admin/applications/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Applicant from "@/models/Applicant";

export async function GET() {
  const session = cookies().get("admin_session");
  if (!session || session.value !== "active") {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectDB();
    const docs = await Applicant.find().sort({ createdAt: -1 });

    const data = docs.map((a) => ({
      id: a._id.toString(),
      fullName: a.fullName,
      email: a.email,
      phone: a.phone,
      portfolio: a.portfolio,
      linkedin: a.linkedin,
      resumeUrl: a.resumeUrl,
      coverLetter: a.coverLetter,
      department: a.department,
      role: a.role,
      experience: a.experience,
      country: a.country,
      status: a.status,
      createdAt: a.createdAt,
    }));

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Admin Applications Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load applications." },
      { status: 500 }
    );
  }
}
