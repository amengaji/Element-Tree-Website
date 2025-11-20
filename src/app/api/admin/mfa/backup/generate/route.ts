import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import crypto from "crypto";

export async function POST() {
  const db = await getDb();

  // Generate 10 backup codes
  const codes = Array.from({ length: 10 }, () =>
    crypto.randomBytes(4).toString("hex").toUpperCase()
  );

  // Store hashed codes in DB
  await db.collection("admin_backup_codes").deleteMany({});
  await db.collection("admin_backup_codes").insertMany(
    codes.map((code) => ({
      codeHash: crypto.createHash("sha256").update(code).digest("hex"),
      used: false,
      createdAt: new Date(),
    }))
  );

  return NextResponse.json({
    success: true,
    codes, // Return plain-text codes to show admin ONCE
  });
}
