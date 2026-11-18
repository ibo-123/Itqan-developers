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
import { AuditLog } from "@/models/AuditLog";
import { sanitizeString } from "@/lib/sanitize";
import { normalizeStatus } from "@/lib/recruitment";
import { queueNotification } from "@/lib/notifications";
import { STATUS_LABELS } from "@/lib/constants";

const updateSchema = z.object({
  status: z.enum(APPLICATION_STATUSES).optional(),
  internalNotes: z.string().max(5000).optional(),
  statusNote: z.string().max(1000).optional(),
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

    const previousStatus = application.status;

    if (body.status) {
      const nextStatus = normalizeStatus(body.status);
      application.status = nextStatus as typeof application.status;
      application.reviewedBy = new mongoose.Types.ObjectId(
        session.sub,
      ) as typeof application.reviewedBy;
      application.statusHistory = [
        ...(application.statusHistory || []),
        {
          status: nextStatus,
          note: sanitizeString(body.statusNote || ""),
          changedBy: new mongoose.Types.ObjectId(session.sub),
          changedByName: session.name || session.email,
          createdAt: new Date(),
        },
      ] as typeof application.statusHistory;
    }

    if (typeof body.internalNotes === "string") {
      application.internalNotes = sanitizeString(body.internalNotes);
    }

    await application.save();

    await AuditLog.create({
      actorId: session.sub,
      actorEmail: session.email,
      action: body.status ? "application.status_update" : "application.notes_update",
      entityType: "Application",
      entityId: application._id.toString(),
      metadata: {
        previousStatus,
        nextStatus: application.status,
      },
    });

    if (body.status === "accepted") {
      const existingMember = await Member.findOne({ email: application.email });
      if (!existingMember) {
        await Member.create({
          fullName: application.fullName,
          email: application.email,
          phone: application.phone,
          department: application.department,
          yearOfStudy: application.yearOfStudy,
          specializations:
            application.areasOfInterest?.length
              ? application.areasOfInterest
              : [
                  application.preferredPosition ||
                    application.preferredSpecialization,
                  application.secondaryPosition,
                ].filter(Boolean),
          roleTitle: "Member",
          isActive: true,
          applicationId: application._id,
        });
      }
    }

    if (body.status && normalizeStatus(body.status) !== normalizeStatus(String(previousStatus))) {
      const label =
        STATUS_LABELS[normalizeStatus(body.status)] || body.status;
      await queueNotification({
        type: "status_update",
        recipientEmail: application.email,
        applicationId: application._id.toString(),
        subject: `ITQAN DEVELOPERS — Application status update`,
        body: [
          `Dear ${application.fullName},`,
          "",
          `Your ITQAN DEVELOPERS application status is now: ${label}.`,
          "Sign in to the Track Application page with your email and tracking code for details.",
          "",
          "— ITQAN DEVELOPERS Recruitment Committee",
        ].join("\n"),
      });
    }

    return jsonOk({ application });
  } catch (error) {
    return handleApiError(error);
  }
}
