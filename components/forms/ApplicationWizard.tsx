"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  applicationSchema,
  experienceLevelLabels,
  type ApplicationInput,
} from "@/lib/validations/application";
import { INTERESTS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "personal",
    title: "Personal",
    fields: [
      "fullName",
      "email",
      "phone",
      "universityId",
      "department",
      "yearOfStudy",
    ],
  },
  {
    id: "technical",
    title: "Technical",
    fields: [
      "programmingLanguages",
      "frameworks",
      "developmentInterestsText",
      "experienceLevel",
      "previousProjects",
      "githubUrl",
      "portfolioUrl",
    ],
  },
  {
    id: "interests",
    title: "Interests",
    fields: ["areasOfInterest"],
  },
  {
    id: "motivation",
    title: "Motivation",
    fields: [
      "whyJoin",
      "learningGoals",
      "contribution",
      "collaborativeExperience",
      "timeCommitment",
      "willingToParticipate",
      "agreeToConduct",
    ],
  },
  { id: "review", title: "Review", fields: [] },
] as const;

const timeOptions = [
  "1–3 hours / week",
  "4–6 hours / week",
  "7–10 hours / week",
  "10+ hours / week",
];

type Gate = {
  allowed: boolean;
  reason?: string | null;
  settings?: { announcement?: string };
};

export function ApplicationWizard() {
  const [step, setStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ trackingCode: string } | null>(null);
  const [gate, setGate] = useState<Gate | null>(null);

  const form = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      universityId: "",
      email: "",
      phone: "",
      department: "",
      yearOfStudy: "",
      programmingLanguages: "",
      frameworks: "",
      developmentInterestsText: "",
      experienceLevel: "beginner",
      previousProjects: "",
      githubUrl: "",
      portfolioUrl: "",
      areasOfInterest: [],
      whyJoin: "",
      learningGoals: "",
      contribution: "",
      collaborativeExperience: "",
      timeCommitment: "",
      willingToParticipate: false,
      agreeToConduct: false,
    },
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const values = watch();
  const selectedInterests = values.areasOfInterest || [];

  useEffect(() => {
    fetch("/api/admin/recruitment")
      .then((res) => res.json())
      .then((data) =>
        setGate({
          allowed: Boolean(data.acceptance?.allowed),
          reason: data.acceptance?.reason,
          settings: data.settings,
        }),
      )
      .catch(() => setGate({ allowed: true }));
  }, []);

  const progress = useMemo(
    () => Math.round(((step + 1) / STEPS.length) * 100),
    [step],
  );

  function toggleInterest(id: string) {
    const next = selectedInterests.includes(id)
      ? selectedInterests.filter((item) => item !== id)
      : [...selectedInterests, id];
    setValue("areasOfInterest", next, { shouldValidate: true });
  }

  async function nextStep() {
    const fields = [...STEPS[step].fields] as (keyof ApplicationInput)[];
    if (fields.length) {
      const ok = await trigger(fields);
      if (!ok) return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function onSubmit(data: ApplicationInput) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json();
      if (!res.ok) {
        setSubmitError(payload.error || "Submission failed. Please try again.");
        return;
      }
      setSuccess({ trackingCode: payload.trackingCode });
    } catch {
      setSubmitError("Network error. Please check your connection.");
    }
  }

  if (gate && !gate.allowed) {
    return (
      <div className="border border-emerald/15 bg-white px-6 py-10 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Applications closed
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">
          {gate.reason || "Recruitment is currently closed."}
        </p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="border border-emerald/15 bg-white px-6 py-12 text-center sm:px-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
          Application submitted
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">
          Welcome to the ITQAN DEVELOPERS recruitment process. Save your tracking
          code to check your status later.
        </p>
        <p className="mt-6 inline-block border border-gold/40 bg-soft px-4 py-3 font-mono text-lg tracking-wider text-emerald">
          {success.trackingCode}
        </p>
        <div className="mt-8">
          <Button href="/status" variant="secondary">
            Track application status
          </Button>
        </div>
      </div>
    );
  }

  const interestTitle = (id: string) =>
    INTERESTS.find((item) => item.id === id)?.title || id;

  return (
    <div className="border border-emerald/15 bg-white">
      <div className="border-b border-emerald/10 px-5 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
              Step {step + 1} of {STEPS.length}
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-ink">
              {STEPS[step].title}
            </h2>
          </div>
          <p className="text-sm text-ink/50">{progress}%</p>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-soft">
          <div
            className="h-full rounded-full bg-emerald transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        {gate?.settings?.announcement ? (
          <p className="mt-4 text-sm text-ink/60">{gate.settings.announcement}</p>
        ) : null}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 px-5 py-6 sm:px-8"
        noValidate
      >
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name *" error={errors.fullName?.message}>
              <input className={inputClass} {...register("fullName")} />
            </Field>
            <Field label="ASTU student ID *" error={errors.universityId?.message}>
              <input className={inputClass} {...register("universityId")} />
            </Field>
            <Field label="Email *" error={errors.email?.message}>
              <input type="email" className={inputClass} {...register("email")} />
            </Field>
            <Field label="Phone *" error={errors.phone?.message}>
              <input className={inputClass} {...register("phone")} />
            </Field>
            <Field label="Department *" error={errors.department?.message}>
              <input className={inputClass} {...register("department")} />
            </Field>
            <Field label="Current academic year *" error={errors.yearOfStudy?.message}>
              <input
                className={inputClass}
                placeholder="e.g. 2nd Year"
                {...register("yearOfStudy")}
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Programming languages" error={errors.programmingLanguages?.message}>
              <input className={inputClass} {...register("programmingLanguages")} />
            </Field>
            <Field label="Frameworks & technologies" error={errors.frameworks?.message}>
              <input className={inputClass} {...register("frameworks")} />
            </Field>
            <Field
              label="Development interests"
              error={errors.developmentInterestsText?.message}
              className="sm:col-span-2"
            >
              <input
                className={inputClass}
                placeholder="Optional short note about what you enjoy building"
                {...register("developmentInterestsText")}
              />
            </Field>
            <Field label="Technical experience level *" error={errors.experienceLevel?.message}>
              <select className={inputClass} {...register("experienceLevel")}>
                {Object.entries(experienceLevelLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="GitHub profile" error={errors.githubUrl?.message}>
              <input type="url" className={inputClass} placeholder="https://" {...register("githubUrl")} />
            </Field>
            <Field label="Portfolio URL" error={errors.portfolioUrl?.message} className="sm:col-span-2">
              <input type="url" className={inputClass} placeholder="https://" {...register("portfolioUrl")} />
            </Field>
            <Field label="Previous projects" error={errors.previousProjects?.message} className="sm:col-span-2">
              <textarea rows={4} className={inputClass} {...register("previousProjects")} />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="mb-3 text-sm text-ink/65">
              Select one or more areas of interest. These guide placement
              conversations — they are not guaranteed role assignments.
            </p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((item) => {
                const active = selectedInterests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={cn(
                      "border px-3 py-2 text-left text-sm transition",
                      active
                        ? "border-emerald bg-emerald/10 text-emerald"
                        : "border-emerald/15 text-ink/70 hover:border-emerald/40",
                    )}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
            {errors.areasOfInterest ? (
              <p className="mt-3 text-sm text-red-700">
                {errors.areasOfInterest.message}
              </p>
            ) : null}
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4">
            <Field label="Why do you want to join ITQAN DEVELOPERS? *" error={errors.whyJoin?.message}>
              <textarea rows={4} className={inputClass} {...register("whyJoin")} />
            </Field>
            <Field label="What do you hope to learn? *" error={errors.learningGoals?.message}>
              <textarea rows={3} className={inputClass} {...register("learningGoals")} />
            </Field>
            <Field label="What can you contribute to the team? *" error={errors.contribution?.message}>
              <textarea rows={4} className={inputClass} {...register("contribution")} />
            </Field>
            <Field
              label="Have you worked on collaborative projects before?"
              error={errors.collaborativeExperience?.message}
            >
              <textarea rows={3} className={inputClass} {...register("collaborativeExperience")} />
            </Field>
            <Field label="Weekly time commitment *" error={errors.timeCommitment?.message}>
              <select className={inputClass} {...register("timeCommitment")}>
                <option value="">Select availability</option>
                {timeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <label className="flex items-start gap-3 text-sm text-ink/80">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[var(--emerald)]"
                {...register("willingToParticipate")}
              />
              <span>
                I am willing to participate in learning, development, and
                collaborative activities. *
              </span>
            </label>
            {errors.willingToParticipate ? (
              <p className="text-sm text-red-700">
                {errors.willingToParticipate.message}
              </p>
            ) : null}
            <label className="flex items-start gap-3 text-sm text-ink/80">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[var(--emerald)]"
                {...register("agreeToConduct")}
              />
              <span>
                I agree to ITQAN DEVELOPERS participation and conduct expectations. *
              </span>
            </label>
            {errors.agreeToConduct ? (
              <p className="text-sm text-red-700">{errors.agreeToConduct.message}</p>
            ) : null}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3 text-sm text-ink/80">
            <ReviewRow label="Name" value={values.fullName} />
            <ReviewRow label="Student ID" value={values.universityId} />
            <ReviewRow label="Email" value={values.email} />
            <ReviewRow label="Department / Year" value={`${values.department} · ${values.yearOfStudy}`} />
            <ReviewRow
              label="Interests"
              value={selectedInterests.map(interestTitle).join(", ") || "—"}
            />
            <ReviewRow label="Experience" value={values.experienceLevel} />
            <ReviewRow label="Availability" value={values.timeCommitment} />
            <p className="border border-emerald/10 bg-soft px-4 py-3 text-ink/65">
              Confirm your details. Applicant information is private and visible
              only to authorized committee members.
            </p>
          </div>
        )}

        {submitError ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {submitError}
          </p>
        ) : null}

        <div className="flex flex-col-reverse gap-3 border-t border-emerald/10 pt-5 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || isSubmitting}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" variant="secondary" onClick={nextStep}>
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" variant="secondary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit application"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-sm border border-emerald/15 bg-soft/60 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/15";

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-700">{error}</span> : null}
    </label>
  );
}

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-emerald/10 py-2 sm:flex-row sm:justify-between">
      <span className="text-ink/45">{label}</span>
      <span className="font-medium text-ink sm:max-w-md sm:text-right">
        {value || "—"}
      </span>
    </div>
  );
}
