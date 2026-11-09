"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";

export function AdminMobileNav({
  adminName,
  role,
}: {
  adminName: string;
  role: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-emerald/10 bg-white lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/admin/dashboard" className="font-display text-sm font-semibold text-emerald">
          ITQAN Admin
        </Link>
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-ink"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="h-[70vh] border-t border-emerald/10">
          <AdminSidebar adminName={adminName} role={role} />
        </div>
      ) : null}
    </div>
  );
}
