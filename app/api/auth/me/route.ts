import { getSession } from "@/lib/auth";
import { jsonOk } from "@/lib/api";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return jsonOk({ admin: null });
  }
  return jsonOk({
    admin: {
      id: session.sub,
      name: session.name,
      email: session.email,
      role: session.role,
    },
  });
}
