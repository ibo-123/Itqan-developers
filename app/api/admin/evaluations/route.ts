import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { evaluationSchema } from "@/lib/validations/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { Application } from "@/models/Application";
import { Evaluation } from "@/models/Evaluation";
import { sanitizeString } from "@/lib/sanitize";

export async function POST(request: NextRequest) {
  try {
    const session = await requireSession(["super_admin", "admin", "reviewer"]);
    await connectToDatabase();

    const data = evaluationSchema.parse(await request.json());
    const application = await Application.findById(data.applicationId);
    if (!application) return jsonError("Application not found", 404);

    const totalScore =
      data.technicalKnowledge +
      data.commitment +
      data.analyticalSkills +
      data.teamwork +
      data.communication +
      data.learningAbility +
      data.creativity;

    const evaluation = await Evaluation.findOneAndUpdate(
      { applicationId: data.applicationId },
      {
        applicationId: data.applicationId,
        evaluatorId: session.sub,
        technicalKnowledge: data.technicalKnowledge,
        commitment: data.commitment,
        analyticalSkills: data.analyticalSkills,
        teamwork: data.teamwork,
        communication: data.communication,
        learningAbility: data.learningAbility,
        creativity: data.creativity,
        totalScore,
        comments: sanitizeString(data.comments || ""),
      },
      { upsert: true, new: true },
    );

    if (application.status === "pending") {
      application.status = "under_review";
      await application.save();
    }

    return jsonOk({ evaluation });
  } catch (error) {
    return handleApiError(error);
  }
}
