import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { adminCreateSchema } from "@/lib/validations/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { Admin } from "@/models/Admin";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET() {
  try {
    await requireSession(["super_admin"]);
    await connectToDatabase();
    const items = await Admin.find()
      .select("-passwordHash")
      .sort({ createdAt: -1 })
      .lean();
    return jsonOk({ items });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireSession(["super_admin"]);
    await connectToDatabase();
    const data = sanitizeObject(adminCreateSchema.parse(await request.json()));

    const exists = await Admin.findOne({ email: data.email });
    if (exists) return jsonError("Admin email already exists", 409);

    const admin = await Admin.create({
      name: data.name,
      email: data.email,
      passwordHash: await bcrypt.hash(data.password, 12),
      role: data.role,
      isActive: true,
    });

    return jsonOk(
      {
        admin: {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          role: admin.role,
          isActive: admin.isActive,
        },
      },
      201,
    );
  } catch (error) {
    return handleApiError(error);
  }
}
