import { NextRequest } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { Specialization } from "@/models/Specialization";
import { sanitizeObject, sanitizeString } from "@/lib/sanitize";

const schema = z.object({
  title: z.string().trim().min(2).max(150),
  description: z.string().trim().min(5).max(500),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, hyphens"),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    if (all) {
      await requireSession(["super_admin", "admin", "reviewer"]);
      const items = await Specialization.find().sort({ sortOrder: 1 }).lean();
      return jsonOk({ items });
    }

    const items = await Specialization.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .lean();
    return jsonOk({ items });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireSession(["super_admin", "admin"]);
    await connectToDatabase();
    const data = sanitizeObject(schema.parse(await request.json()));
    const exists = await Specialization.findOne({ slug: data.slug });
    if (exists) return jsonError("Specialization slug already exists", 409);

    const item = await Specialization.create({
      ...data,
      title: sanitizeString(data.title),
      description: sanitizeString(data.description),
      isActive: data.isActive ?? true,
      sortOrder: data.sortOrder ?? 99,
    });
    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
