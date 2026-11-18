"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatCard } from "@/components/dashboard/StatCard";

type Stats = {
  totalApplications: number;
  submitted: number;
  underReview: number;
  practicalAssessment: number;
  interview: number;
  shortlisted: number;
  accepted: number;
  rejected: number;
  activeMembers: number;
  byPosition: { position: string; count: number }[];
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
          Recruitment overview
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Live ITQAN DEVELOPERS applicant funnel from the database.
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
            <StatCard label="Submitted / new" value={stats.submitted} />
            <StatCard label="Under review" value={stats.underReview} />
            <StatCard label="Practical assessment" value={stats.practicalAssessment} />
            <StatCard label="Interview" value={stats.interview} />
            <StatCard label="Shortlisted" value={stats.shortlisted} />
            <StatCard label="Accepted" value={stats.accepted} />
            <StatCard label="Rejected" value={stats.rejected} />
            <StatCard label="Active members" value={stats.activeMembers} />
          </div>

          <section className="border border-emerald/10 bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold text-ink">
                Applications by interest
              </h2>
              <div className="flex gap-3 text-sm">
                <Link
                  href="/admin/dashboard/applications"
                  className="text-emerald hover:underline"
                >
                  Manage applications
                </Link>
                <Link
                  href="/admin/dashboard/compare"
                  className="text-emerald hover:underline"
                >
                  Compare applicants
                </Link>
              </div>
            </div>
            {stats.byPosition?.length === 0 ? (
              <p className="text-sm text-ink/55">No applications yet.</p>
            ) : (
              <ul className="divide-y divide-emerald/10">
                {(stats.byPosition || []).map((row) => (
                  <li
                    key={row.position}
                    className="flex items-center justify-between py-3 text-sm"
                  >
                    <span className="text-ink">{row.position}</span>
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
