// src/app/api/admin/careers/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const db = await getDb();
  const _id = new ObjectId(params.id);

  const update: any = {
    updatedAt: new Date(),
  };
  if (body.title) update.title = String(body.title);
  if (body.location !== undefined) update.location = String(body.location);
  if (body.type !== undefined) update.type = String(body.type);
  if (body.summary !== undefined) update.summary = String(body.summary);
  if (body.isActive !== undefined) update.isActive = Boolean(body.isActive);

  await db.collection("careerOpenings").updateOne({ _id }, { $set: update });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const db = await getDb();
  const _id = new ObjectId(params.id);
  await db.collection("careerOpenings").deleteOne({ _id });

  return NextResponse.json({ success: true });
}
