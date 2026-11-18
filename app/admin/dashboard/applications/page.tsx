"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ACTIVE_STATUSES } from "@/lib/validations/application";
import { STATUS_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

type ApplicationRow = {
  _id: string;
  fullName: string;
  email: string;
  department: string;
  yearOfStudy: string;
  preferredPosition?: string;
  preferredSpecialization?: string;
  status: string;
  experienceLevel: string;
  createdAt: string;
};

export default function ApplicationsPage() {
  const [items, setItems] = useState<ApplicationRow[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    if (department) params.set("department", department);
    params.set("limit", "50");
    return params.toString();
  }, [q, status, department]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/applications?${query}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setItems(data.items || []);
        setTotal(data.total || 0);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Applications
          </h1>
          <p className="mt-1 text-sm text-ink/60">{total} total records</p>
        </div>
        <a
          href={`/api/admin/applications/export${status ? `?status=${status}` : ""}`}
          className="inline-flex items-center justify-center rounded-md bg-emerald px-4 py-2 text-sm font-medium text-white"
        >
          Export CSV
        </a>
      </div>

      <div className="grid gap-3 border border-emerald/10 bg-white p-4 sm:grid-cols-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, ID"
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {ACTIVE_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s] || s}
            </option>
          ))}
        </select>
        <input
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Filter department"
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
      </div>

      {error ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-ink/55">Loading applications…</p>
      ) : items.length === 0 ? (
        <p className="border border-dashed border-emerald/20 bg-white px-4 py-10 text-center text-sm text-ink/55">
          No applications match your filters.
        </p>
      ) : (
        <div className="overflow-x-auto border border-emerald/10 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-emerald/10 bg-soft text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Specialization</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-emerald/5">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{item.fullName}</p>
                    <p className="text-xs text-ink/50">{item.email}</p>
                  </td>
                  <td className="px-4 py-3 text-ink/70">
                    {item.department}
                    <span className="block text-xs text-ink/45">
                      {item.yearOfStudy}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink/70">
                    {item.preferredPosition || item.preferredSpecialization}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-soft px-2 py-1 text-xs text-emerald">
                      {STATUS_LABELS[item.status] || item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/dashboard/applications/${item._id}`}
                      className="text-sm text-emerald hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Button href="/admin/dashboard" variant="outline" size="sm">
        Back to overview
      </Button>
    </div>
  );
}
