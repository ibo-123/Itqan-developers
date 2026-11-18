import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError, jsonOk } from "@/lib/api";
import { Application } from "@/models/Application";
import { Member } from "@/models/Member";
import { normalizeStatus } from "@/lib/recruitment";

export async function GET() {
  try {
    await requireSession(["super_admin", "admin", "reviewer"]);
    await connectToDatabase();

    const [
      totalApplications,
      submitted,
      underReview,
      practicalAssessment,
      interview,
      shortlisted,
      accepted,
      rejected,
      activeMembers,
      byPosition,
    ] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: { $in: ["submitted", "pending"] } }),
      Application.countDocuments({ status: "under_review" }),
      Application.countDocuments({
        status: { $in: ["practical_assessment", "assessment"] },
      }),
      Application.countDocuments({ status: "interview" }),
      Application.countDocuments({ status: "shortlisted" }),
      Application.countDocuments({ status: "accepted" }),
      Application.countDocuments({ status: "rejected" }),
      Member.countDocuments({ isActive: true }),
      Application.aggregate([
        {
          $group: {
            _id: {
              $ifNull: ["$preferredPosition", "$preferredSpecialization"],
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
    ]);

    return jsonOk({
      totalApplications,
      pending: submitted,
      submitted,
      underReview,
      practicalAssessment,
      interview,
      shortlisted,
      accepted,
      rejected,
      activeMembers,
      bySpecialization: byPosition.map((row) => ({
        specialization: row._id,
        count: row.count,
      })),
      byPosition: byPosition.map((row) => ({
        position: row._id,
        count: row.count,
      })),
      normalizedSample: normalizeStatus("pending"),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
