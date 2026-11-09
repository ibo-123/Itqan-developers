import { Suspense } from "react";
import { AdminLoginForm } from "@/components/dashboard/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-emerald-deep text-white">
          Loading…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
