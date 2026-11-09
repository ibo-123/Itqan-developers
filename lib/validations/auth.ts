import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const adminCreateSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(8).max(128),
  role: z.enum(["super_admin", "admin", "reviewer"]),
});

export const evaluationSchema = z.object({
  applicationId: z.string().min(1),
  technicalKnowledge: z.number().min(0).max(25),
  commitment: z.number().min(0).max(20),
  analyticalSkills: z.number().min(0).max(15),
  teamwork: z.number().min(0).max(15),
  communication: z.number().min(0).max(10),
  learningAbility: z.number().min(0).max(10),
  creativity: z.number().min(0).max(5),
  comments: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type EvaluationInput = z.infer<typeof evaluationSchema>;
