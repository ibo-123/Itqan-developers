import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { AdminMobileNav } from "@/components/dashboard/AdminMobileNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 hidden h-screen shrink-0 lg:block">
        <AdminSidebar adminName={session.name} role={session.role} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminMobileNav adminName={session.name} role={session.role} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
