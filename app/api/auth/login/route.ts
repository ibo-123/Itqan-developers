import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { loginSchema } from "@/lib/validations/auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  createSessionToken,
  setSessionCookie,
} from "@/lib/auth";
import { handleApiError, jsonError } from "@/lib/api";
import { Admin } from "@/models/Admin";

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(`login:${ip}`, 8, 60_000);
    if (!limited.ok) {
      return jsonError("Too many login attempts. Try again later.", 429);
    }

    const body = loginSchema.parse(await request.json());
    await connectToDatabase();

    const admin = await Admin.findOne({ email: body.email });
    if (!admin || !admin.isActive) {
      return jsonError("Invalid email or password", 401);
    }

    const valid = await bcrypt.compare(body.password, admin.passwordHash);
    if (!valid) {
      return jsonError("Invalid email or password", 401);
    }

    const token = await createSessionToken({
      sub: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role as "super_admin" | "admin" | "reviewer",
    });

    const response = NextResponse.json({
      admin: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
