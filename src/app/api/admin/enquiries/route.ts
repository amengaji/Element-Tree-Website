// src/app/api/admin/enquiries/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("enquiries");

    const items = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    // Convert _id to string for the client
    const data = items.map((doc) => ({
      id: doc._id?.toString() ?? "",
      name: doc.name ?? "",
      email: doc.email ?? "",
      company: doc.company ?? "",
      country: doc.country ?? "",
      interest: doc.interest ?? "",
      message: doc.message ?? "",
      createdAt: doc.createdAt ?? null,
    }));

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
