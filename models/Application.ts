import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { APPLICATION_STATUSES } from "@/lib/validations/application";

const ApplicationSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    universityId: { type: String, trim: true, maxlength: 50, default: "" },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    department: { type: String, required: true, trim: true, maxlength: 100 },
    yearOfStudy: { type: String, required: true, trim: true, maxlength: 30 },
    preferredSpecialization: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    additionalSpecializations: [{ type: String, trim: true }],
    programmingLanguages: { type: String, trim: true, default: "" },
    frameworks: { type: String, trim: true, default: "" },
    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
      required: true,
      index: true,
    },
    previousProjects: { type: String, trim: true, default: "" },
    portfolioUrl: { type: String, trim: true, default: "" },
    whyJoin: { type: String, required: true, trim: true, maxlength: 2000 },
    contribution: { type: String, required: true, trim: true, maxlength: 2000 },
    learningGoals: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    timeCommitment: { type: String, required: true, trim: true },
    willingToCollaborate: { type: Boolean, required: true },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: "pending",
      index: true,
    },
    internalNotes: { type: String, trim: true, default: "" },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "Admin", default: null },
  },
  { timestamps: true },
);

ApplicationSchema.index({ department: 1, yearOfStudy: 1 });
ApplicationSchema.index({ status: 1, preferredSpecialization: 1 });
ApplicationSchema.index({ createdAt: -1 });

export type ApplicationDocument = InferSchemaType<typeof ApplicationSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Application: Model<ApplicationDocument> =
  mongoose.models.Application ||
  mongoose.model<ApplicationDocument>("Application", ApplicationSchema);
