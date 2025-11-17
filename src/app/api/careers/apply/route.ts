// src/app/api/careers/apply/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      departmentKey,
      roleKey,
      basicInfo,
      roleAnswers,
      stepVersion = "v2-react-wizard",
    } = body || {};

    if (!departmentKey || !roleKey || !basicInfo?.fullName || !basicInfo?.email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const collection = db.collection("career_applications");

    await collection.insertOne({
      stepVersion,
      departmentKey,
      roleKey,
      basicInfo,
      roleAnswers: roleAnswers || {},
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error saving career application:", error);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
