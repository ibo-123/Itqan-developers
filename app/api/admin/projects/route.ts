import { NextRequest } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { Project } from "@/models/Project";
import { ProjectTeam } from "@/models/ProjectTeam";
import { sanitizeObject, sanitizeString } from "@/lib/sanitize";

const projectSchema = z.object({
  name: z.string().trim().min(2).max(150),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().trim().min(10).max(3000),
  status: z
    .enum(["planned", "in_progress", "completed", "archived"])
    .optional(),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  memberIds: z.array(z.string()).optional(),
});

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get("admin") === "true";

    if (admin) {
      await requireSession(["super_admin", "admin", "reviewer"]);
      const items = await Project.find().sort({ createdAt: -1 }).lean();
      return jsonOk({ items });
    }

    const items = await Project.find({ isPublic: true })
      .sort({ isFeatured: -1, createdAt: -1 })
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
    const parsed = projectSchema.parse(await request.json());
    const data = sanitizeObject(parsed);

    const exists = await Project.findOne({ slug: data.slug });
    if (exists) return jsonError("Project slug already exists", 409);

    const project = await Project.create({
      name: sanitizeString(data.name),
      slug: data.slug,
      description: sanitizeString(data.description),
      status: data.status || "planned",
      tags: data.tags || [],
      isFeatured: data.isFeatured ?? false,
      isPublic: data.isPublic ?? true,
    });

    if (data.memberIds?.length) {
      await ProjectTeam.insertMany(
        data.memberIds.map((memberId) => ({
          projectId: project._id,
          memberId,
          role: "Contributor",
        })),
      );
    }

    return jsonOk({ project }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
