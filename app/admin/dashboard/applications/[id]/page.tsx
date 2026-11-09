"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { APPLICATION_STATUSES } from "@/lib/validations/application";
import { Button } from "@/components/ui/Button";

type Application = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  universityId?: string;
  department: string;
  yearOfStudy: string;
  preferredSpecialization: string;
  additionalSpecializations?: string[];
  programmingLanguages?: string;
  frameworks?: string;
  experienceLevel: string;
  previousProjects?: string;
  portfolioUrl?: string;
  whyJoin: string;
  contribution: string;
  learningGoals: string;
  timeCommitment: string;
  willingToCollaborate: boolean;
  status: string;
  internalNotes?: string;
};

type Evaluation = {
  technicalKnowledge: number;
  commitment: number;
  analyticalSkills: number;
  teamwork: number;
  communication: number;
  learningAbility: number;
  creativity: number;
  totalScore: number;
  comments?: string;
};

const scoreFields = [
  { key: "technicalKnowledge", label: "Technical & role knowledge", max: 25 },
  { key: "commitment", label: "Commitment & availability", max: 20 },
  { key: "analyticalSkills", label: "Analytical & problem-solving", max: 15 },
  { key: "teamwork", label: "Teamwork & collaboration", max: 15 },
  { key: "communication", label: "Communication", max: 10 },
  { key: "learningAbility", label: "Learning ability", max: 10 },
  { key: "creativity", label: "Creativity & innovation", max: 5 },
] as const;

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({
    technicalKnowledge: 0,
    commitment: 0,
    analyticalSkills: 0,
    teamwork: 0,
    communication: 0,
    learningAbility: 0,
    creativity: 0,
  });
  const [comments, setComments] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/applications/${params.id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setApplication(data.application);
        setStatus(data.application.status);
        setNotes(data.application.internalNotes || "");
        if (data.evaluation) {
          setEvaluation(data.evaluation);
          setScores({
            technicalKnowledge: data.evaluation.technicalKnowledge,
            commitment: data.evaluation.commitment,
            analyticalSkills: data.evaluation.analyticalSkills,
            teamwork: data.evaluation.teamwork,
            communication: data.evaluation.communication,
            learningAbility: data.evaluation.learningAbility,
            creativity: data.evaluation.creativity,
          });
          setComments(data.evaluation.comments || "");
        }
      })
      .catch((err: Error) => setError(err.message));
  }, [params.id]);

  async function saveStatus() {
    setMessage(null);
    const res = await fetch(`/api/applications/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, internalNotes: notes }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Update failed");
      return;
    }
    setApplication(data.application);
    setMessage("Application updated.");
    if (status === "accepted") router.refresh();
  }

  async function saveEvaluation() {
    setMessage(null);
    const res = await fetch("/api/admin/evaluations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationId: params.id,
        ...scores,
        comments,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Evaluation failed");
      return;
    }
    setEvaluation(data.evaluation);
    setMessage("Evaluation saved.");
  }

  if (error && !application) {
    return <p className="text-sm text-red-700">{error}</p>;
  }

  if (!application) {
    return <p className="text-sm text-ink/55">Loading applicant profile…</p>;
  }

  const total = Object.values(scores).reduce((sum, n) => sum + Number(n || 0), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">
          {application.fullName}
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          {application.email} · {application.phone}
        </p>
      </div>

      {message ? (
        <p className="border border-emerald/20 bg-emerald/5 px-4 py-3 text-sm text-emerald">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 border border-emerald/10 bg-white p-5 text-sm">
          <Info label="University ID" value={application.universityId || "—"} />
          <Info label="Department" value={application.department} />
          <Info label="Year" value={application.yearOfStudy} />
          <Info
            label="Preferred specialization"
            value={application.preferredSpecialization}
          />
          <Info
            label="Additional"
            value={(application.additionalSpecializations || []).join(", ") || "—"}
          />
          <Info label="Experience" value={application.experienceLevel} />
          <Info
            label="Languages"
            value={application.programmingLanguages || "—"}
          />
          <Info label="Frameworks" value={application.frameworks || "—"} />
          <Info label="Availability" value={application.timeCommitment} />
          <Info
            label="Portfolio"
            value={application.portfolioUrl || "—"}
          />
        </div>

        <div className="space-y-4 border border-emerald/10 bg-white p-5 text-sm">
          <Block title="Why join" body={application.whyJoin} />
          <Block title="Contribution" body={application.contribution} />
          <Block title="Learning goals" body={application.learningGoals} />
          <Block
            title="Previous projects"
            body={application.previousProjects || "—"}
          />
        </div>
      </section>

      <section className="border border-emerald/10 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-ink">
          Status & notes
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_2fr]">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
          >
            {APPLICATION_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Internal notes (not visible to applicants)"
            className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          className="mt-4"
          onClick={saveStatus}
        >
          Save status
        </Button>
      </section>

      <section className="border border-emerald/10 bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-ink">
            Evaluation (100 pts)
          </h2>
          <p className="text-sm font-medium text-emerald">
            Total: {evaluation?.totalScore ?? total} / 100
          </p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {scoreFields.map((field) => (
            <label key={field.key} className="text-sm">
              <span className="mb-1 block text-ink/70">
                {field.label} (max {field.max})
              </span>
              <input
                type="number"
                min={0}
                max={field.max}
                value={scores[field.key]}
                onChange={(e) =>
                  setScores((prev) => ({
                    ...prev,
                    [field.key]: Number(e.target.value),
                  }))
                }
                className="w-full rounded-md border border-emerald/15 px-3 py-2"
              />
            </label>
          ))}
        </div>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={3}
          placeholder="Evaluation comments"
          className="mt-4 w-full rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <Button
          type="button"
          variant="secondary"
          className="mt-4"
          onClick={saveEvaluation}
        >
          Save evaluation
        </Button>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-ink/45">{label}</p>
      <p className="mt-0.5 text-ink">{value}</p>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-ink/45">{title}</p>
      <p className="mt-1 whitespace-pre-wrap text-ink/80">{body}</p>
    </div>
  );
}
