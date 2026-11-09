import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { APPLICATION_STATUSES } from "@/lib/validations/application";
import { Application } from "@/models/Application";
import { Evaluation } from "@/models/Evaluation";
import { Member } from "@/models/Member";
import { sanitizeString } from "@/lib/sanitize";

const updateSchema = z.object({
  status: z.enum(APPLICATION_STATUSES).optional(),
  internalNotes: z.string().max(5000).optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    await requireSession(["super_admin", "admin", "reviewer"]);
    await connectToDatabase();
    const { id } = await params;

    const application = await Application.findById(id).lean();
    if (!application) return jsonError("Application not found", 404);

    const evaluation = await Evaluation.findOne({ applicationId: id }).lean();
    return jsonOk({ application, evaluation });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const session = await requireSession(["super_admin", "admin", "reviewer"]);
    await connectToDatabase();
    const { id } = await params;

    const body = updateSchema.parse(await request.json());
    const application = await Application.findById(id);
    if (!application) return jsonError("Application not found", 404);

    if (body.status) {
      application.status = body.status;
      application.reviewedBy = new mongoose.Types.ObjectId(
        session.sub,
      ) as typeof application.reviewedBy;
    }
    if (typeof body.internalNotes === "string") {
      application.internalNotes = sanitizeString(body.internalNotes);
    }

    await application.save();

    if (body.status === "accepted") {
      const existingMember = await Member.findOne({ email: application.email });
      if (!existingMember) {
        await Member.create({
          fullName: application.fullName,
          email: application.email,
          phone: application.phone,
          department: application.department,
          yearOfStudy: application.yearOfStudy,
          specializations: [
            application.preferredSpecialization,
            ...(application.additionalSpecializations || []),
          ],
          roleTitle: "Member",
          isActive: true,
          applicationId: application._id,
        });
      }
    }

    return jsonOk({ application });
  } catch (error) {
    return handleApiError(error);
  }
}
