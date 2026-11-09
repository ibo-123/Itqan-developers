"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  applicationSchema,
  experienceLevelLabels,
  type ApplicationInput,
} from "@/lib/validations/application";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Spec = { slug: string; title: string };

const timeOptions = [
  "1–3 hours / week",
  "4–6 hours / week",
  "7–10 hours / week",
  "10+ hours / week",
];

export function ApplicationForm() {
  const [specializations, setSpecializations] = useState<Spec[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loadingSpecs, setLoadingSpecs] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      additionalSpecializations: [],
      experienceLevel: "beginner",
      willingToCollaborate: false,
      universityId: "",
      programmingLanguages: "",
      frameworks: "",
      previousProjects: "",
      portfolioUrl: "",
    },
  });

  const preferred = watch("preferredSpecialization");
  const additional = watch("additionalSpecializations") || [];

  useEffect(() => {
    fetch("/api/admin/specializations")
      .then((res) => res.json())
      .then((data) => {
        setSpecializations(
          (data.items || []).map(
            (item: { slug: string; title: string }) => ({
              slug: item.slug,
              title: item.title,
            }),
          ),
        );
      })
      .catch(() => setSpecializations([]))
      .finally(() => setLoadingSpecs(false));
  }, []);

  function toggleAdditional(slug: string) {
    const next = additional.includes(slug)
      ? additional.filter((s) => s !== slug)
      : [...additional, slug];
    setValue("additionalSpecializations", next, { shouldValidate: true });
  }

  async function onSubmit(values: ApplicationInput) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Submission failed. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setSubmitError("Network error. Please check your connection.");
    }
  }

  if (success) {
    return (
      <div className="border border-emerald/15 bg-white px-6 py-12 text-center sm:px-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
          Application received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">
          Thank you for applying to ITQAN DEVELOPERS. Our team will review your
          application and follow up by email.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 border border-emerald/15 bg-white px-5 py-8 sm:px-8"
      noValidate
    >
      <Section
        title="Applicant information"
        description="Tell us who you are. University ID is optional."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" error={errors.fullName?.message}>
            <input className={inputClass} {...register("fullName")} />
          </Field>
          <Field label="University ID (optional)" error={errors.universityId?.message}>
            <input className={inputClass} {...register("universityId")} />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input type="email" className={inputClass} {...register("email")} />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input className={inputClass} {...register("phone")} />
          </Field>
          <Field label="Department" error={errors.department?.message}>
            <input className={inputClass} {...register("department")} />
          </Field>
          <Field label="Year of study" error={errors.yearOfStudy?.message}>
            <input
              className={inputClass}
              placeholder="e.g. 2nd Year"
              {...register("yearOfStudy")}
            />
          </Field>
        </div>
      </Section>

      <Section
        title="Technical information"
        description="Beginners are welcome — experience is helpful but not required."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Preferred specialization"
            error={errors.preferredSpecialization?.message}
            className="sm:col-span-2"
          >
            <select
              className={inputClass}
              disabled={loadingSpecs}
              {...register("preferredSpecialization")}
            >
              <option value="">Select specialization</option>
              {specializations.map((spec) => (
                <option key={spec.slug} value={spec.slug}>
                  {spec.title}
                </option>
              ))}
            </select>
          </Field>

          <div className="sm:col-span-2">
            <p className="mb-2 text-sm font-medium text-ink">
              Additional specialization interests
            </p>
            <div className="flex flex-wrap gap-2">
              {specializations
                .filter((s) => s.slug !== preferred)
                .map((spec) => {
                  const active = additional.includes(spec.slug);
                  return (
                    <button
                      key={spec.slug}
                      type="button"
                      onClick={() => toggleAdditional(spec.slug)}
                      className={cn(
                        "border px-3 py-1.5 text-xs transition-colors",
                        active
                          ? "border-emerald bg-emerald/10 text-emerald"
                          : "border-emerald/15 text-ink/70 hover:border-emerald/40",
                      )}
                    >
                      {spec.title}
                    </button>
                  );
                })}
            </div>
          </div>

          <Field
            label="Programming languages known"
            error={errors.programmingLanguages?.message}
          >
            <input
              className={inputClass}
              placeholder="e.g. JavaScript, Python"
              {...register("programmingLanguages")}
            />
          </Field>
          <Field
            label="Frameworks & technologies"
            error={errors.frameworks?.message}
          >
            <input
              className={inputClass}
              placeholder="e.g. React, Node.js"
              {...register("frameworks")}
            />
          </Field>
          <Field label="Experience level" error={errors.experienceLevel?.message}>
            <select className={inputClass} {...register("experienceLevel")}>
              {Object.entries(experienceLevelLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label="Portfolio / GitHub URL (optional)"
            error={errors.portfolioUrl?.message}
          >
            <input
              type="url"
              className={inputClass}
              placeholder="https://"
              {...register("portfolioUrl")}
            />
          </Field>
          <Field
            label="Previous projects"
            error={errors.previousProjects?.message}
            className="sm:col-span-2"
          >
            <textarea
              rows={3}
              className={inputClass}
              placeholder="Optional — describe any projects you have worked on"
              {...register("previousProjects")}
            />
          </Field>
        </div>
      </Section>

      <Section
        title="Motivation"
        description="Help us understand why you want to join and how you hope to grow."
      >
        <div className="grid gap-4">
          <Field
            label="Why do you want to join ITQAN DEVELOPERS?"
            error={errors.whyJoin?.message}
          >
            <textarea rows={4} className={inputClass} {...register("whyJoin")} />
          </Field>
          <Field
            label="What can you contribute to the community?"
            error={errors.contribution?.message}
          >
            <textarea
              rows={4}
              className={inputClass}
              {...register("contribution")}
            />
          </Field>
          <Field
            label="What are your learning goals?"
            error={errors.learningGoals?.message}
          >
            <textarea
              rows={3}
              className={inputClass}
              {...register("learningGoals")}
            />
          </Field>
          <Field
            label="How much time can you dedicate?"
            error={errors.timeCommitment?.message}
          >
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
              {...register("willingToCollaborate")}
            />
            <span>
              I am willing to collaborate across different project phases.
            </span>
          </label>
          {errors.willingToCollaborate ? (
            <p className="text-sm text-red-700">
              {errors.willingToCollaborate.message}
            </p>
          ) : null}
        </div>
      </Section>

      {submitError ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          "Submit application"
        )}
      </Button>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-emerald/15 bg-soft/60 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/15";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-1 text-sm text-ink/60">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

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
