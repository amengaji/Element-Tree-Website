import bcrypt from "bcrypt";
import db from "@/lib/db"; // your DB instance

export async function GET() {
  const password = await bcrypt.hash("Admin@123", 10);

  const admin = await db.user.create({
    data: {
      email: "admin@elementtree.in",
      password: password,
      role: "admin",
      name: "Super Admin",
    },
  });

  return Response.json({ message: "Admin created", admin });
}
