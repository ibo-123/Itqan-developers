import { NextRequest } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { Member } from "@/models/Member";
import { sanitizeObject } from "@/lib/sanitize";

const memberSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().toLowerCase(),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  department: z.string().trim().max(100).optional().or(z.literal("")),
  yearOfStudy: z.string().trim().max(30).optional().or(z.literal("")),
  specializations: z.array(z.string()).default([]),
  roleTitle: z.string().trim().max(100).optional().or(z.literal("")),
  isActive: z.boolean().optional(),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export async function GET(request: NextRequest) {
  try {
    await requireSession(["super_admin", "admin", "reviewer"]);
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() || "";
    const active = searchParams.get("active");
    const specialization = searchParams.get("specialization") || "";

    const filter: Record<string, unknown> = {};
    if (active === "true") filter.isActive = true;
    if (active === "false") filter.isActive = false;
    if (specialization) filter.specializations = specialization;
    if (q) {
      filter.$or = [
        { fullName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ];
    }

    const items = await Member.find(filter).sort({ createdAt: -1 }).lean();
    return jsonOk({ items });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireSession(["super_admin", "admin"]);
    await connectToDatabase();

    const data = sanitizeObject(memberSchema.parse(await request.json()));
    const exists = await Member.findOne({ email: data.email });
    if (exists) return jsonError("Member with this email already exists", 409);

    const member = await Member.create({
      ...data,
      phone: data.phone || "",
      department: data.department || "",
      yearOfStudy: data.yearOfStudy || "",
      roleTitle: data.roleTitle || "Member",
      notes: data.notes || "",
      isActive: data.isActive ?? true,
    });

    return jsonOk({ member }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
