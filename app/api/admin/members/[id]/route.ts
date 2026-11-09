import { NextRequest } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { Member } from "@/models/Member";
import { sanitizeObject } from "@/lib/sanitize";

const updateSchema = z.object({
  fullName: z.string().trim().min(2).max(100).optional(),
  phone: z.string().trim().max(20).optional(),
  department: z.string().trim().max(100).optional(),
  yearOfStudy: z.string().trim().max(30).optional(),
  specializations: z.array(z.string()).optional(),
  roleTitle: z.string().trim().max(100).optional(),
  isActive: z.boolean().optional(),
  notes: z.string().trim().max(2000).optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await requireSession(["super_admin", "admin"]);
    await connectToDatabase();
    const { id } = await params;

    const data = sanitizeObject(updateSchema.parse(await request.json()));
    const member = await Member.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!member) return jsonError("Member not found", 404);
    return jsonOk({ member });
  } catch (error) {
    return handleApiError(error);
  }
}
