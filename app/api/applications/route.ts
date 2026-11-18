import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { applicationSchema } from "@/lib/validations/application";
import { sanitizeObject } from "@/lib/sanitize";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { Application } from "@/models/Application";
import { requireSession } from "@/lib/auth";
import {
  assertRecruitmentOpen,
  generateTrackingCode,
  normalizeStatus,
} from "@/lib/recruitment";
import { queueNotification } from "@/lib/notifications";
import { INTERESTS } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(`apply:${ip}`, 5, 60_000);
    if (!limited.ok) {
      return jsonError("Too many applications. Please try again later.", 429);
    }

    await connectToDatabase();

    const gate = await assertRecruitmentOpen();
    if (!gate.allowed) {
      return jsonError(gate.reason || "Applications are closed.", 403);
    }

    const body = await request.json();
    const parsed = applicationSchema.parse({
      ...body,
      areasOfInterest:
        body.areasOfInterest ||
        [
          body.preferredPosition || body.preferredSpecialization,
          ...(body.additionalSpecializations || []),
        ].filter(Boolean),
      willingToParticipate:
        body.willingToParticipate ??
        body.willingToParticipateAllPhases ??
        body.willingToCollaborate ??
        false,
      agreeToConduct: body.agreeToConduct ?? false,
      learningGoals: body.learningGoals || body.whyAstuMsj || "",
    });
    const data = sanitizeObject(parsed);

    const validIds = new Set<string>(INTERESTS.map((item) => item.id));
    if (!data.areasOfInterest.every((id) => validIds.has(id))) {
      return jsonError("Invalid area of interest selected.", 400);
    }

    const existing = await Application.findOne({ email: data.email });
    if (existing) {
      return jsonError("An application with this email already exists.", 409);
    }

    const trackingCode = generateTrackingCode();
    const primaryInterest = data.areasOfInterest[0] || "";

    const application = await Application.create({
      fullName: data.fullName,
      universityId: data.universityId,
      email: data.email,
      phone: data.phone,
      department: data.department,
      yearOfStudy: data.yearOfStudy,
      areasOfInterest: data.areasOfInterest,
      preferredPosition: primaryInterest,
      preferredSpecialization: primaryInterest,
      additionalSpecializations: data.areasOfInterest.slice(1),
      programmingLanguages: data.programmingLanguages || "",
      frameworks: data.frameworks || "",
      developmentInterestsText: data.developmentInterestsText || "",
      experienceLevel: data.experienceLevel,
      previousProjects: data.previousProjects || "",
      githubUrl: data.githubUrl || "",
      portfolioUrl: data.portfolioUrl || "",
      whyJoin: data.whyJoin,
      learningGoals: data.learningGoals,
      contribution: data.contribution,
      collaborativeExperience: data.collaborativeExperience || "",
      timeCommitment: data.timeCommitment,
      willingToParticipate: data.willingToParticipate,
      willingToParticipateAllPhases: data.willingToParticipate,
      willingToCollaborate: data.willingToParticipate,
      agreeToConduct: data.agreeToConduct,
      status: "submitted",
      trackingCode,
      statusHistory: [
        {
          status: "submitted",
          note: "Application submitted by applicant",
          changedByName: "Applicant",
          createdAt: new Date(),
        },
      ],
    });

    await queueNotification({
      type: "application_received",
      recipientEmail: application.email,
      applicationId: application._id.toString(),
      subject: "ITQAN DEVELOPERS — Application received",
      body: [
        `Dear ${application.fullName},`,
        "",
        "Your application to join ITQAN DEVELOPERS has been received.",
        `Tracking code: ${trackingCode}`,
        "",
        "Use the Track Application page with your email and tracking code to view your status.",
        "Do not share your tracking code publicly.",
        "",
        "— ITQAN DEVELOPERS Recruitment Committee",
      ].join("\n"),
    });

    return jsonOk(
      {
        message: "Application submitted successfully.",
        id: application._id.toString(),
        trackingCode,
      },
      201,
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireSession(["super_admin", "admin", "reviewer"]);
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() || "";
    const status = searchParams.get("status") || "";
    const department = searchParams.get("department") || "";
    const year = searchParams.get("year") || "";
    const interest =
      searchParams.get("interest") ||
      searchParams.get("specialization") ||
      searchParams.get("position") ||
      "";
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit") || 20)),
    );

    const filter: Record<string, unknown> = {};
    if (status) {
      const normalized = normalizeStatus(status);
      if (normalized === "submitted") {
        filter.status = { $in: ["submitted", "pending"] };
      } else if (normalized === "practical_assessment") {
        filter.status = { $in: ["practical_assessment", "assessment"] };
      } else {
        filter.status = status;
      }
    }
    if (department) filter.department = department;
    if (year) filter.yearOfStudy = year;
    if (interest) {
      filter.$or = [
        { areasOfInterest: interest },
        { preferredPosition: interest },
        { preferredSpecialization: interest },
      ];
    }
    if (q) {
      filter.$and = [
        ...((filter.$and as object[] | undefined) || []),
        {
          $or: [
            { fullName: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
            { universityId: { $regex: q, $options: "i" } },
          ],
        },
      ];
    }

    const [items, total] = await Promise.all([
      Application.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Application.countDocuments(filter),
    ]);

    return jsonOk({
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
