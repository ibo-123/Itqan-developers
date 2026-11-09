import { z } from "zod";

const experienceLevels = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;

export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  universityId: z
    .string()
    .trim()
    .max(50, "University ID is too long")
    .optional()
    .or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address").toLowerCase(),
  phone: z
    .string()
    .trim()
    .min(9, "Enter a valid phone number")
    .max(20, "Phone number is too long"),
  department: z
    .string()
    .trim()
    .min(2, "Department is required")
    .max(100),
  yearOfStudy: z
    .string()
    .trim()
    .min(1, "Year of study is required")
    .max(30),
  preferredSpecialization: z
    .string()
    .trim()
    .min(1, "Select a preferred specialization"),
  additionalSpecializations: z.array(z.string()),
  programmingLanguages: z
    .string()
    .trim()
    .max(500)
    .optional()
    .or(z.literal("")),
  frameworks: z.string().trim().max(500).optional().or(z.literal("")),
  experienceLevel: z.enum(experienceLevels, {
    message: "Select an experience level",
  }),
  previousProjects: z.string().trim().max(2000).optional().or(z.literal("")),
  portfolioUrl: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  whyJoin: z
    .string()
    .trim()
    .min(20, "Please share at least 20 characters")
    .max(2000),
  contribution: z
    .string()
    .trim()
    .min(20, "Please share at least 20 characters")
    .max(2000),
  learningGoals: z
    .string()
    .trim()
    .min(10, "Please share your learning goals")
    .max(2000),
  timeCommitment: z
    .string()
    .trim()
    .min(1, "Select your availability")
    .max(100),
  willingToCollaborate: z.boolean().refine((v) => v === true, {
    message: "Collaboration across project phases is required",
  }),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const APPLICATION_STATUSES = [
  "pending",
  "under_review",
  "shortlisted",
  "assessment",
  "interview",
  "accepted",
  "rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const experienceLevelLabels: Record<
  (typeof experienceLevels)[number],
  string
> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};
