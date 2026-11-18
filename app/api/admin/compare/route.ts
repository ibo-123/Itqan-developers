import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { Application } from "@/models/Application";
import { Evaluation } from "@/models/Evaluation";

export async function GET(request: NextRequest) {
  try {
    await requireSession(["super_admin", "admin", "reviewer"]);
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const ids = (searchParams.get("ids") || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
      .slice(0, 6);

    if (ids.length < 2) {
      return jsonError("Provide at least two application ids to compare.", 400);
    }

    const applications = await Application.find({ _id: { $in: ids } }).lean();
    const evaluations = await Evaluation.find({
      applicationId: { $in: ids },
    }).lean();

    const evalMap = new Map(
      evaluations.map((item) => [String(item.applicationId), item]),
    );

    return jsonOk({
      items: applications.map((app) => ({
        id: String(app._id),
        fullName: app.fullName,
        department: app.department,
        yearOfStudy: app.yearOfStudy,
        preferredPosition:
          app.preferredPosition || app.preferredSpecialization,
        experienceLevel: app.experienceLevel,
        timeCommitment: app.timeCommitment,
        status: app.status,
        evaluation: evalMap.get(String(app._id)) || null,
      })),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
