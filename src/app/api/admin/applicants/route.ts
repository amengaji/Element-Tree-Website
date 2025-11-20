// src/app/api/admin/applicants/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/db";
import ApplicantModel from "@/models/ApplicantModel";

export async function GET() {
  try {
    // cookies() is synchronous (NEVER async)
    const session = cookies().get("admin_session");

    if (!session || session.value !== "active") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const docs = await ApplicantModel.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: docs.map((a: any) => ({
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
      })),
    });
  } catch (error) {
    console.error("Admin Applications Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load applications" },
      { status: 500 }
    );
  }
}
