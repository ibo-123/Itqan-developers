"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { SITE } from "@/lib/constants";
import { BrandMark } from "@/components/ui/BrandMark";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      const next = searchParams.get("next") || "/admin/dashboard";
      router.push(next);
      router.refresh();
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-emerald-deep px-4 py-16">
      <GeometricPattern className="text-gold" opacity={0.08} />
      <div className="relative w-full max-w-md border border-white/10 bg-white px-6 py-8 shadow-xl sm:px-8">
        <div className="flex items-center gap-3">
          <BrandMark size="md" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
              Admin portal
            </p>
            <h1 className="font-display text-xl font-semibold text-ink">
              {SITE.name}
            </h1>
          </div>
        </div>
        <Ornament className="mt-5 justify-start" tone="emerald" />
        <p className="mt-4 text-sm text-ink/60">
          Sign in with an authorized administrator account.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-emerald/15 bg-soft/70 px-3 py-2.5 text-sm outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/15"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">
              Password
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-emerald/15 bg-soft/70 px-3 py-2.5 text-sm outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/15"
            />
          </label>

          {error ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            variant="secondary"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
