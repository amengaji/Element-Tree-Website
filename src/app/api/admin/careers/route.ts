// src/app/api/admin/careers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const db = await getDb();
  const careers = await db
    .collection("careerOpenings")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ careers });
}

export async function POST(req: NextRequest) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const doc = {
    title: body.title?.toString() ?? "",
    departmentKey: body.departmentKey?.toString() ?? "",
    departmentName: body.departmentName?.toString() ?? "",
    location: body.location?.toString() ?? "",
    type: body.type?.toString() ?? "",
    summary: body.summary?.toString() ?? "",
    isActive: Boolean(body.isActive),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (!doc.title || !doc.departmentKey) {
    return NextResponse.json(
      { error: "Title and department are required." },
      { status: 400 },
    );
  }

  const db = await getDb();
  const result = await db.collection("careerOpenings").insertOne(doc);

  return NextResponse.json({ id: result.insertedId.toString() });
}
