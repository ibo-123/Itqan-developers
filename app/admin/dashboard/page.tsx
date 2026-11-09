"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatCard } from "@/components/dashboard/StatCard";

type Stats = {
  totalApplications: number;
  pending: number;
  underReview: number;
  shortlisted: number;
  accepted: number;
  rejected: number;
  activeMembers: number;
  bySpecialization: { specialization: string; count: number }[];
};

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load stats");
        setStats(data);
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Overview
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Live recruitment and membership metrics from the database.
        </p>
      </div>

      {error ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      {!stats && !error ? (
        <p className="text-sm text-ink/55">Loading dashboard data…</p>
      ) : null}

      {stats ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total applications" value={stats.totalApplications} />
            <StatCard label="Pending" value={stats.pending} />
            <StatCard label="Under review" value={stats.underReview} />
            <StatCard label="Shortlisted" value={stats.shortlisted} />
            <StatCard label="Accepted" value={stats.accepted} />
            <StatCard label="Rejected" value={stats.rejected} />
            <StatCard label="Active members" value={stats.activeMembers} />
          </div>

          <section className="border border-emerald/10 bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold text-ink">
                Applications by specialization
              </h2>
              <Link
                href="/admin/dashboard/applications"
                className="text-sm text-emerald hover:underline"
              >
                Manage applications
              </Link>
            </div>
            {stats.bySpecialization.length === 0 ? (
              <p className="text-sm text-ink/55">No applications yet.</p>
            ) : (
              <ul className="divide-y divide-emerald/10">
                {stats.bySpecialization.map((row) => (
                  <li
                    key={row.specialization}
                    className="flex items-center justify-between py-3 text-sm"
                  >
                    <span className="text-ink">{row.specialization}</span>
                    <span className="font-medium text-emerald">{row.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}
