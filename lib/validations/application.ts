import { z } from "zod";
import { INTERESTS } from "@/lib/constants";

const experienceLevels = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;

const interestIds = INTERESTS.map((item) => item.id) as [string, ...string[]];

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => !value || /^https?:\/\//i.test(value),
    "Enter a valid URL starting with http:// or https://",
  );

export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100),
  universityId: z
    .string()
    .trim()
    .min(3, "ASTU student ID is required")
    .max(50),
  email: z.string().trim().email("Enter a valid email address").toLowerCase(),
  phone: z.string().trim().min(9, "Enter a valid phone number").max(20),
  department: z.string().trim().min(2, "Department is required").max(100),
  yearOfStudy: z.string().trim().min(1, "Year of study is required").max(30),
  programmingLanguages: z.string().trim().max(500).optional().or(z.literal("")),
  frameworks: z.string().trim().max(500).optional().or(z.literal("")),
  developmentInterestsText: z
    .string()
    .trim()
    .max(500)
    .optional()
    .or(z.literal("")),
  experienceLevel: z.enum(experienceLevels, {
    message: "Select an experience level",
  }),
  previousProjects: z.string().trim().max(2000).optional().or(z.literal("")),
  githubUrl: optionalUrl,
  portfolioUrl: optionalUrl,
  areasOfInterest: z
    .array(z.string())
    .min(1, "Select at least one area of interest")
    .refine(
      (values) => values.every((value) => interestIds.includes(value)),
      "Select valid areas of interest",
    ),
  whyJoin: z
    .string()
    .trim()
    .min(20, "Please share at least 20 characters")
    .max(2000),
  learningGoals: z
    .string()
    .trim()
    .min(10, "Please share what you hope to learn")
    .max(2000),
  contribution: z
    .string()
    .trim()
    .min(20, "Please share at least 20 characters")
    .max(2000),
  collaborativeExperience: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .or(z.literal("")),
  timeCommitment: z
    .string()
    .trim()
    .min(1, "Select your availability")
    .max(100),
  willingToParticipate: z.boolean().refine((v) => v === true, {
    message: "Agreement to participate in community activities is required",
  }),
  agreeToConduct: z.boolean().refine((v) => v === true, {
    message: "You must agree to participation and conduct expectations",
  }),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const APPLICATION_STATUSES = [
  "submitted",
  "pending",
  "under_review",
  "practical_assessment",
  "assessment",
  "interview",
  "shortlisted",
  "accepted",
  "rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const ACTIVE_STATUSES = [
  "submitted",
  "under_review",
  "practical_assessment",
  "interview",
  "shortlisted",
  "accepted",
  "rejected",
] as const;

export const experienceLevelLabels: Record<
  (typeof experienceLevels)[number],
  string
> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

export const TRACK_APPLICATION_SCHEMA = z.object({
  email: z.string().trim().email().toLowerCase(),
  trackingCode: z.string().trim().min(8).max(64),
});
