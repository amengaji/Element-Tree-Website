// src/app/api/careers/apply/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Applicant from "@/models/ApplicantModel";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      departmentKey,
      roleKey,
      basicInfo,
      roleAnswers,
      stepVersion
    } = body;

    const newApplicant = new Applicant({
      fullName: basicInfo.fullName,
      email: basicInfo.email,
      phone: basicInfo.phone,
      portfolio: basicInfo.portfolio ?? "",
      linkedin: basicInfo.linkedin ?? "",
      resumeUrl: "",
      coverLetter: "",
      department: departmentKey,
      role: roleKey,
      experience: basicInfo.totalExp ?? "",
      country: basicInfo.city ?? "",
      status: "New",
      stepVersion,
      roleAnswers,
    });

    await newApplicant.save();

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("Career Apply Error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
