import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { TRACK_APPLICATION_SCHEMA } from "@/lib/validations/application";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { Application } from "@/models/Application";
import { normalizeStatus } from "@/lib/recruitment";
import { INTERESTS, STATUS_LABELS } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(`track:${ip}`, 10, 60_000);
    if (!limited.ok) {
      return jsonError("Too many requests. Please try again later.", 429);
    }

    await connectToDatabase();
    const body = TRACK_APPLICATION_SCHEMA.parse(await request.json());

    const application = await Application.findOne({
      email: body.email,
      trackingCode: body.trackingCode.toUpperCase(),
    }).lean();

    if (!application) {
      return jsonError(
        "No application found for that email and tracking code.",
        404,
      );
    }

    const interests = (
      application.areasOfInterest?.length
        ? application.areasOfInterest
        : [
            application.preferredPosition ||
              application.preferredSpecialization,
          ]
    )
      .filter(Boolean)
      .map(
        (id) =>
          INTERESTS.find((item) => item.id === id)?.title || String(id),
      );

    const status = normalizeStatus(application.status);

    return jsonOk({
      application: {
        fullName: application.fullName,
        email: application.email,
        department: application.department,
        yearOfStudy: application.yearOfStudy,
        preferredPosition: interests.join(", ") || "—",
        secondaryPosition: "",
        status,
        statusLabel: STATUS_LABELS[status] || status,
        submittedAt: application.createdAt,
        statusHistory: (application.statusHistory || []).map((entry) => ({
          status: normalizeStatus(entry.status),
          statusLabel:
            STATUS_LABELS[normalizeStatus(entry.status)] || entry.status,
          createdAt: entry.createdAt,
        })),
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
