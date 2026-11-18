import { NextRequest } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError, jsonOk } from "@/lib/api";
import { RecruitmentSettings } from "@/models/RecruitmentSettings";
import { sanitizeObject } from "@/lib/sanitize";
import { assertRecruitmentOpen } from "@/lib/recruitment";

const updateSchema = z.object({
  title: z.string().trim().max(200).optional(),
  description: z.string().trim().max(2000).optional(),
  isOpen: z.boolean().optional(),
  announcement: z.string().trim().max(1000).optional(),
  opensAt: z.string().datetime().nullable().optional(),
  deadline: z.string().datetime().nullable().optional(),
  maxSelectedApplicants: z.number().int().min(1).max(50).optional(),
  stages: z.array(z.string().trim().min(1)).optional(),
  statuses: z.array(z.string().trim().min(1)).optional(),
});

export async function GET() {
  try {
    await connectToDatabase();
    const gate = await assertRecruitmentOpen();
    return jsonOk({
      settings: gate.settings,
      acceptance: {
        allowed: gate.allowed,
        reason: gate.reason || null,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireSession(["super_admin", "admin"]);
    await connectToDatabase();
    const raw = updateSchema.parse(await request.json());
    const data = sanitizeObject({
      ...raw,
      opensAt:
        raw.opensAt === null
          ? null
          : raw.opensAt
            ? new Date(raw.opensAt)
            : undefined,
      deadline:
        raw.deadline === null
          ? null
          : raw.deadline
            ? new Date(raw.deadline)
            : undefined,
    });

    const settings = await RecruitmentSettings.findOneAndUpdate(
      { key: "default" },
      { $set: data },
      { upsert: true, returnDocument: "after" },
    );
    return jsonOk({ settings });
  } catch (error) {
    return handleApiError(error);
  }
}
