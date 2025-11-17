// src/app/api/admin/careers/applications/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roleKey = searchParams.get("roleKey") || undefined;

    const db = await getDb();
    const collection = db.collection("career_applications");

    const query: Record<string, unknown> = {};
    if (roleKey) {
      query.roleKey = roleKey;
    }

    const items = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();

    const data = items.map((doc) => ({
      id: doc._id?.toString() ?? "",
      departmentKey: doc.departmentKey ?? "",
      roleKey: doc.roleKey ?? "",
      basicInfo: doc.basicInfo ?? {},
      roleAnswers: doc.roleAnswers ?? {},
      createdAt: doc.createdAt ?? null,
    }));

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("Error fetching career applications:", error);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
