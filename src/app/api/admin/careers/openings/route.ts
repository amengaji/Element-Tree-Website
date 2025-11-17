// src/app/api/admin/careers/openings/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("career_openings");

    const items = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const data = items.map((doc) => ({
      id: doc._id?.toString() ?? "",
      departmentKey: doc.departmentKey ?? "",
      roleKey: doc.roleKey ?? "",
      title: doc.title ?? "",
      location: doc.location ?? "",
      type: doc.type ?? "",
      summary: doc.summary ?? "",
      active: doc.active ?? true,
      createdAt: doc.createdAt ?? null,
    }));

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("Error fetching career openings:", error);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { departmentKey, roleKey, title, location, type, summary } = body || {};

    if (!departmentKey || !roleKey || !title) {
      return NextResponse.json(
        { ok: false, error: "departmentKey, roleKey and title are required" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const collection = db.collection("career_openings");

    const doc = {
      departmentKey,
      roleKey,
      title,
      location: location || "",
      type: type || "",
      summary: summary || "",
      active: true,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(doc);

    return NextResponse.json({
      ok: true,
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Error creating career opening:", error);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
