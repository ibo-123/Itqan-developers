import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const RecruitmentSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    title: {
      type: String,
      trim: true,
      default: "ITQAN DEVELOPERS Community Recruitment",
    },
    description: {
      type: String,
      trim: true,
      default:
        "ITQAN DEVELOPERS is recruiting motivated ASTU students to join a technology community focused on learning, collaboration, and building meaningful digital solutions.",
    },
    isOpen: { type: Boolean, default: true },
    opensAt: { type: Date, default: null },
    deadline: { type: Date, default: null },
    maxSelectedApplicants: { type: Number, default: 50, min: 1 },
    announcement: {
      type: String,
      trim: true,
      default:
        "Applications are open to join ITQAN DEVELOPERS. Beginners are welcome.",
    },
    stages: {
      type: [String],
      default: [
        "Application and Registration",
        "Application Review",
        "Practical Assessment (if applicable)",
        "Interview",
        "Final Selection",
        "Orientation and Team Onboarding",
      ],
    },
    statuses: {
      type: [String],
      default: [
        "submitted",
        "under_review",
        "practical_assessment",
        "interview",
        "shortlisted",
        "accepted",
        "rejected",
      ],
    },
  },
  { timestamps: true },
);

export type RecruitmentSettingsDocument = InferSchemaType<
  typeof RecruitmentSettingsSchema
> & {
  _id: mongoose.Types.ObjectId;
};

export const RecruitmentSettings: Model<RecruitmentSettingsDocument> =
  mongoose.models.RecruitmentSettings ||
  mongoose.model<RecruitmentSettingsDocument>(
    "RecruitmentSettings",
    RecruitmentSettingsSchema,
  );
