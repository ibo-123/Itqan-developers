import { NextRequest } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { Project } from "@/models/Project";
import { ProjectTeam } from "@/models/ProjectTeam";
import { sanitizeObject } from "@/lib/sanitize";

const updateSchema = z.object({
  name: z.string().trim().min(2).max(150).optional(),
  description: z.string().trim().min(10).max(3000).optional(),
  status: z
    .enum(["planned", "in_progress", "completed", "archived"])
    .optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  memberIds: z.array(z.string()).optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await requireSession(["super_admin", "admin"]);
    await connectToDatabase();
    const { id } = await params;
    const data = sanitizeObject(updateSchema.parse(await request.json()));
    const { memberIds, ...projectData } = data;

    const project = await Project.findByIdAndUpdate(id, projectData, {
      new: true,
      runValidators: true,
    });
    if (!project) return jsonError("Project not found", 404);

    if (memberIds) {
      await ProjectTeam.deleteMany({ projectId: id });
      if (memberIds.length) {
        await ProjectTeam.insertMany(
          memberIds.map((memberId) => ({
            projectId: project._id,
            memberId,
            role: "Contributor",
          })),
        );
      }
    }

    return jsonOk({ project });
  } catch (error) {
    return handleApiError(error);
  }
}
