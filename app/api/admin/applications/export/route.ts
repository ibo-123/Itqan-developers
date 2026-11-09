import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireSession } from "@/lib/auth";
import { handleApiError } from "@/lib/api";
import { Application } from "@/models/Application";

function csvEscape(value: unknown): string {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: NextRequest) {
  try {
    await requireSession(["super_admin", "admin"]);
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "";
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;

    const items = await Application.find(filter).sort({ createdAt: -1 }).lean();

    const headers = [
      "fullName",
      "email",
      "phone",
      "universityId",
      "department",
      "yearOfStudy",
      "preferredSpecialization",
      "experienceLevel",
      "status",
      "timeCommitment",
      "createdAt",
    ];

    const rows = [
      headers.join(","),
      ...items.map((item) =>
        headers
          .map((key) =>
            csvEscape((item as Record<string, unknown>)[key]),
          )
          .join(","),
      ),
    ];

    return new Response(rows.join("\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="itqan-applications.csv"',
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
