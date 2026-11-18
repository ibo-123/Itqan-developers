import { redirect } from "next/navigation";

/** Legacy route — recruitment now uses /apply. */
export default function MembershipPage() {
  redirect("/apply");
}
