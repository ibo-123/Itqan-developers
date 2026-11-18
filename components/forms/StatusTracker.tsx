"use client";

import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

type TrackedApplication = {
  fullName: string;
  email: string;
  department: string;
  yearOfStudy: string;
  preferredPosition: string;
  secondaryPosition: string;
  status: string;
  statusLabel: string;
  submittedAt: string;
  statusHistory: { statusLabel: string; createdAt: string }[];
};

export function StatusTracker() {
  const [email, setEmail] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<TrackedApplication | null>(
    null,
  );

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setApplication(null);
    try {
      const res = await fetch("/api/applications/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, trackingCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to find application");
        setLoading(false);
        return;
      }
      setApplication(data.application);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={onSubmit}
        className="space-y-4 border border-emerald/15 bg-white px-5 py-6 sm:px-6"
      >
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border border-emerald/15 bg-soft/60 px-3 py-2.5 outline-none focus:border-emerald"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">
            Tracking code
          </span>
          <input
            required
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
            placeholder="ITQ-XXXXXX-XXXXXX"
            className="w-full rounded-sm border border-emerald/15 bg-soft/60 px-3 py-2.5 font-mono uppercase outline-none focus:border-emerald"
          />
        </label>
        {error ? (
          <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="secondary" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking…
            </>
          ) : (
            "View status"
          )}
        </Button>
      </form>

      {application ? (
        <div className="border border-emerald/15 bg-white px-5 py-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
            Current status
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
            {application.statusLabel}
          </h2>
          <dl className="mt-5 space-y-3 text-sm">
            <Row label="Applicant" value={application.fullName} />
            <Row label="Areas of interest" value={application.preferredPosition} />
            <Row
              label="Department"
              value={`${application.department} · ${application.yearOfStudy}`}
            />
            <Row
              label="Submitted"
              value={new Date(application.submittedAt).toLocaleString()}
            />
          </dl>

          <div className="mt-6 border-t border-emerald/10 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
              Timeline
            </p>
            <ol className="mt-3 space-y-2">
              {application.statusHistory.map((entry, index) => (
                <li key={`${entry.statusLabel}-${index}`} className="text-sm text-ink/70">
                  <span className="font-medium text-ink">{entry.statusLabel}</span>
                  <span className="mx-2 text-ink/30">·</span>
                  {new Date(entry.createdAt).toLocaleString()}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
      <dt className="text-ink/45">{label}</dt>
      <dd className="font-medium text-ink sm:text-right">{value}</dd>
    </div>
  );
}
