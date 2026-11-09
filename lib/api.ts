import { NextResponse } from "next/server";
import { AuthError } from "@/lib/auth";
import { ZodError } from "zod";

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(message: string, status = 400, extra?: object) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof AuthError) {
    return jsonError(error.message, error.status);
  }
  if (error instanceof ZodError) {
    return jsonError("Validation failed", 400, {
      issues: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }
  if (error instanceof Error && error.message.includes("MONGODB_URI")) {
    return jsonError("Database is not configured", 500);
  }
  console.error(error);
  return jsonError("Internal server error", 500);
}
