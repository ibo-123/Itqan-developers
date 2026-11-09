import { NextRequest } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError, jsonOk } from "@/lib/api";
import { RecruitmentSettings } from "@/models/RecruitmentSettings";
import { sanitizeObject } from "@/lib/sanitize";

const updateSchema = z.object({
  isOpen: z.boolean().optional(),
  announcement: z.string().trim().max(1000).optional(),
  stages: z.array(z.string().trim().min(1)).optional(),
  statuses: z.array(z.string().trim().min(1)).optional(),
});

export async function GET() {
  try {
    await connectToDatabase();
    const settings =
      (await RecruitmentSettings.findOne({ key: "default" }).lean()) || {
        key: "default",
        isOpen: true,
        announcement:
          "Applications are open. Beginners are welcome — there is no fixed membership cap.",
        stages: [],
        statuses: [],
      };
    return jsonOk({ settings });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireSession(["super_admin", "admin"]);
    await connectToDatabase();
    const data = sanitizeObject(updateSchema.parse(await request.json()));
    const settings = await RecruitmentSettings.findOneAndUpdate(
      { key: "default" },
      { $set: data },
      { upsert: true, new: true },
    );
    return jsonOk({ settings });
  } catch (error) {
    return handleApiError(error);
  }
}
