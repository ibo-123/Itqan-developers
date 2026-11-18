import assert from "node:assert/strict";
import { applicationSchema } from "../lib/validations/application";

const base = {
  fullName: "Test Applicant",
  universityId: "ASTU/1234/15",
  email: "test@astu.edu.et",
  phone: "0912345678",
  department: "Computer Science",
  yearOfStudy: "3rd Year",
  areasOfInterest: ["frontend", "backend"],
  experienceLevel: "intermediate" as const,
  whyJoin: "I want to grow with a serious development community and contribute.",
  learningGoals: "I want to strengthen full-stack skills through collaboration.",
  contribution: "I can contribute frontend skills and reliable collaboration.",
  timeCommitment: "4–6 hours / week",
  willingToParticipate: true,
  agreeToConduct: true,
};

assert.doesNotThrow(() => applicationSchema.parse(base));

assert.throws(() =>
  applicationSchema.parse({
    ...base,
    areasOfInterest: [],
  }),
);

assert.throws(() =>
  applicationSchema.parse({
    ...base,
    agreeToConduct: false,
  }),
);

console.log("application-schema.test.ts passed");
