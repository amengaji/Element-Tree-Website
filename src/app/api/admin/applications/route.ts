// src/app/api/admin/applications/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const db = await getDb();
  const applications = await db
    .collection("careerApplications")
    .find({})
    .sort({ createdAt: -1 })
    .limit(300)
    .toArray();

  return NextResponse.json({ applications });
}
