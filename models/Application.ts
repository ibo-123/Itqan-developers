import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { APPLICATION_STATUSES } from "@/lib/validations/application";

const StatusHistorySchema = new Schema(
  {
    status: { type: String, required: true },
    note: { type: String, trim: true, default: "" },
    changedBy: { type: Schema.Types.ObjectId, ref: "Admin", default: null },
    changedByName: { type: String, trim: true, default: "System" },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const ApplicationSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    universityId: { type: String, required: true, trim: true, maxlength: 50 },
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
    academicBackground: { type: String, trim: true, default: "" },
    areasOfInterest: [{ type: String, trim: true }],
    // Legacy fields retained for older records
    preferredPosition: { type: String, trim: true, default: "", index: true },
    secondaryPosition: { type: String, trim: true, default: "" },
    preferredSpecialization: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },
    additionalSpecializations: [{ type: String, trim: true }],
    programmingLanguages: { type: String, trim: true, default: "" },
    frameworks: { type: String, trim: true, default: "" },
    developmentInterestsText: { type: String, trim: true, default: "" },
    databaseExperience: { type: String, trim: true, default: "" },
    gitExperience: { type: String, trim: true, default: "" },
    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
      required: true,
      index: true,
    },
    previousProjects: { type: String, trim: true, default: "" },
    githubUrl: { type: String, trim: true, default: "" },
    portfolioUrl: { type: String, trim: true, default: "" },
    whyJoin: { type: String, required: true, trim: true, maxlength: 2000 },
    whyAstuMsj: { type: String, trim: true, default: "" },
    contribution: { type: String, required: true, trim: true, maxlength: 2000 },
    learningGoals: { type: String, required: true, trim: true, maxlength: 2000 },
    collaborativeExperience: { type: String, trim: true, default: "" },
    timeCommitment: { type: String, required: true, trim: true },
    willingToParticipate: { type: Boolean, required: true },
    willingToParticipateAllPhases: { type: Boolean, default: true },
    willingToCollaborate: { type: Boolean, default: true },
    agreeToConduct: { type: Boolean, required: true },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: "submitted",
      index: true,
    },
    statusHistory: { type: [StatusHistorySchema], default: [] },
    trackingCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    internalNotes: { type: String, trim: true, default: "" },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "Admin", default: null },
  },
  { timestamps: true },
);

ApplicationSchema.index({ department: 1, yearOfStudy: 1 });
ApplicationSchema.index({ status: 1, createdAt: -1 });
ApplicationSchema.index({ areasOfInterest: 1 });

export type ApplicationDocument = InferSchemaType<typeof ApplicationSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Application: Model<ApplicationDocument> =
  mongoose.models.Application ||
  mongoose.model<ApplicationDocument>("Application", ApplicationSchema);
