import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const RecruitmentSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    isOpen: { type: Boolean, default: true },
    announcement: {
      type: String,
      trim: true,
      default:
        "Applications are open. Beginners are welcome — there is no fixed membership cap.",
    },
    stages: {
      type: [String],
      default: [
        "Application Submission",
        "Application Review",
        "Practical Assessment (when applicable)",
        "Interview",
        "Final Selection",
        "Orientation and Community Onboarding",
      ],
    },
    statuses: {
      type: [String],
      default: [
        "pending",
        "under_review",
        "shortlisted",
        "assessment",
        "interview",
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
