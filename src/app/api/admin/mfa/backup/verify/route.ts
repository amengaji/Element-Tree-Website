import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import crypto from "crypto";

export async function POST(req: Request) {
  const { code } = await req.json();
  const db = await getDb();

  const hashed = crypto.createHash("sha256").update(code).digest("hex");

  const record = await db.collection("admin_backup_codes").findOne({
    codeHash: hashed,
    used: false,
  });

  if (!record) {
    return NextResponse.json(
      { success: false, error: "Invalid backup code." },
      { status: 401 }
    );
  }

  await db
    .collection("admin_backup_codes")
    .updateOne({ _id: record._id }, { $set: { used: true } });

  return NextResponse.json({ success: true });
}
