import { NextRequest } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { Specialization } from "@/models/Specialization";
import { sanitizeObject } from "@/lib/sanitize";

const updateSchema = z.object({
  title: z.string().trim().min(2).max(150).optional(),
  description: z.string().trim().min(5).max(500).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await requireSession(["super_admin", "admin"]);
    await connectToDatabase();
    const { id } = await params;
    const data = sanitizeObject(updateSchema.parse(await request.json()));
    const item = await Specialization.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!item) return jsonError("Specialization not found", 404);
    return jsonOk({ item });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    await requireSession(["super_admin", "admin"]);
    await connectToDatabase();
    const { id } = await params;
    const item = await Specialization.findByIdAndDelete(id);
    if (!item) return jsonError("Specialization not found", 404);
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
