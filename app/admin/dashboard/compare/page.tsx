"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type AppRow = {
  _id: string;
  fullName: string;
  preferredPosition?: string;
  preferredSpecialization?: string;
  status: string;
};

type CompareItem = {
  id: string;
  fullName: string;
  department: string;
  yearOfStudy: string;
  preferredPosition: string;
  experienceLevel: string;
  timeCommitment: string;
  status: string;
  evaluation: {
    totalScore: number;
    technicalKnowledge: number;
    commitment: number;
  } | null;
};

export default function ComparePage() {
  const [pool, setPool] = useState<AppRow[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [items, setItems] = useState<CompareItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/applications?status=shortlisted&limit=50")
      .then((res) => res.json())
      .then((data) => setPool(data.items || []))
      .catch(() => setPool([]));
  }, []);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((value) => value !== id)
        : prev.length >= 6
          ? prev
          : [...prev, id],
    );
  }

  async function compare() {
    setError(null);
    const res = await fetch(`/api/admin/compare?ids=${selected.join(",")}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Compare failed");
      return;
    }
    setItems(data.items || []);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Compare applicants
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Select 2–6 shortlisted applicants to compare scores and availability.
        </p>
      </div>

      <div className="border border-emerald/10 bg-white p-4">
        <ul className="space-y-2">
          {pool.map((app) => (
            <li key={app._id}>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={selected.includes(app._id)}
                  onChange={() => toggle(app._id)}
                />
                <span className="font-medium text-ink">{app.fullName}</span>
                <span className="text-ink/50">
                  {app.preferredPosition || app.preferredSpecialization}
                </span>
              </label>
            </li>
          ))}
        </ul>
        {pool.length === 0 ? (
          <p className="text-sm text-ink/50">No shortlisted applicants yet.</p>
        ) : null}
        <Button
          type="button"
          variant="secondary"
          className="mt-4"
          onClick={compare}
          disabled={selected.length < 2}
        >
          Compare selected
        </Button>
      </div>

      {error ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      {items.length > 0 ? (
        <div className="overflow-x-auto border border-emerald/10 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-soft text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Interest</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Availability</th>
                <th className="px-4 py-3">Total score</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-emerald/10">
                  <td className="px-4 py-3 font-medium">{item.fullName}</td>
                  <td className="px-4 py-3">{item.preferredPosition}</td>
                  <td className="px-4 py-3">{item.experienceLevel}</td>
                  <td className="px-4 py-3">{item.timeCommitment}</td>
                  <td className="px-4 py-3 font-semibold text-emerald">
                    {item.evaluation?.totalScore ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
