import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const started = Date.now();
  let db: "ok" | "error" = "error";

  try {
    await connectToDatabase();
    db = mongoose.connection.readyState === 1 ? "ok" : "error";
  } catch {
    db = "error";
  }

  const status = db === "ok" ? 200 : 503;
  return NextResponse.json(
    {
      status: db === "ok" ? "healthy" : "degraded",
      service: "itqan-developers",
      db,
      uptimeSeconds: Math.round(process.uptime()),
      responseMs: Date.now() - started,
      timestamp: new Date().toISOString(),
    },
    { status },
  );
}
