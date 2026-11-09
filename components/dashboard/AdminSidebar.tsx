"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  Tags,
  Users,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { BrandMark } from "@/components/ui/BrandMark";

const LINKS = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/admin/dashboard/applications",
    label: "Applications",
    icon: FileText,
  },
  { href: "/admin/dashboard/members", label: "Members", icon: Users },
  {
    href: "/admin/dashboard/specializations",
    label: "Specializations",
    icon: Tags,
  },
  { href: "/admin/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/dashboard/admins", label: "Admins", icon: Shield },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({
  adminName,
  role,
}: {
  adminName: string;
  role: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-emerald/10 bg-emerald-deep text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-center gap-3">
          <BrandMark size="sm" />
          <div>
            <p className="font-display text-sm font-semibold tracking-wide text-gold">
              {SITE.name}
            </p>
            <p className="mt-0.5 text-xs text-white/55">Admin Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {LINKS.map((link) => {
          const active =
            link.href === "/admin/dashboard"
              ? pathname === link.href
              : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-white/10 text-gold"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <p className="truncate text-sm font-medium">{adminName}</p>
        <p className="text-xs uppercase tracking-wide text-white/45">{role}</p>
        <button
          type="button"
          onClick={logout}
          className="mt-3 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-gold"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
