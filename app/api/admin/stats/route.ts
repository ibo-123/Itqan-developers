import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError, jsonOk } from "@/lib/api";
import { Application } from "@/models/Application";
import { Member } from "@/models/Member";

export async function GET() {
  try {
    await requireSession(["super_admin", "admin", "reviewer"]);
    await connectToDatabase();

    const [
      totalApplications,
      pending,
      underReview,
      shortlisted,
      accepted,
      rejected,
      activeMembers,
      bySpecialization,
    ] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: "pending" }),
      Application.countDocuments({ status: "under_review" }),
      Application.countDocuments({ status: "shortlisted" }),
      Application.countDocuments({ status: "accepted" }),
      Application.countDocuments({ status: "rejected" }),
      Member.countDocuments({ isActive: true }),
      Application.aggregate([
        {
          $group: {
            _id: "$preferredSpecialization",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
    ]);

    return jsonOk({
      totalApplications,
      pending,
      underReview,
      shortlisted,
      accepted,
      rejected,
      activeMembers,
      bySpecialization: bySpecialization.map((row) => ({
        specialization: row._id,
        count: row.count,
      })),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
