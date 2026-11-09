import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { applicationSchema } from "@/lib/validations/application";
import { sanitizeObject } from "@/lib/sanitize";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { Application } from "@/models/Application";
import { RecruitmentSettings } from "@/models/RecruitmentSettings";
import { requireSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(`apply:${ip}`, 5, 60_000);
    if (!limited.ok) {
      return jsonError("Too many applications. Please try again later.", 429);
    }

    await connectToDatabase();

    const settings = await RecruitmentSettings.findOne({ key: "default" });
    if (settings && !settings.isOpen) {
      return jsonError("Applications are currently closed.", 403);
    }

    const body = await request.json();
    const parsed = applicationSchema.parse(body);
    const data = sanitizeObject(parsed);

    const existing = await Application.findOne({ email: data.email });
    if (existing) {
      return jsonError(
        "An application with this email already exists.",
        409,
      );
    }

    const application = await Application.create({
      ...data,
      universityId: data.universityId || "",
      programmingLanguages: data.programmingLanguages || "",
      frameworks: data.frameworks || "",
      previousProjects: data.previousProjects || "",
      portfolioUrl: data.portfolioUrl || "",
      additionalSpecializations: data.additionalSpecializations || [],
      status: "pending",
    });

    return jsonOk(
      {
        message: "Application submitted successfully.",
        id: application._id.toString(),
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
    const specialization = searchParams.get("specialization") || "";
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 20)));

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (department) filter.department = department;
    if (year) filter.yearOfStudy = year;
    if (specialization) filter.preferredSpecialization = specialization;
    if (q) {
      filter.$or = [
        { fullName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { universityId: { $regex: q, $options: "i" } },
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
