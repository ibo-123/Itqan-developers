import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const EvaluationSchema = new Schema(
  {
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      unique: true,
      index: true,
    },
    evaluatorId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    technicalKnowledge: { type: Number, required: true, min: 0, max: 25 },
    commitment: { type: Number, required: true, min: 0, max: 20 },
    analyticalSkills: { type: Number, required: true, min: 0, max: 15 },
    teamwork: { type: Number, required: true, min: 0, max: 15 },
    communication: { type: Number, required: true, min: 0, max: 10 },
    learningAbility: { type: Number, required: true, min: 0, max: 10 },
    creativity: { type: Number, required: true, min: 0, max: 5 },
    totalScore: { type: Number, required: true, min: 0, max: 100 },
    comments: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

export type EvaluationDocument = InferSchemaType<typeof EvaluationSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Evaluation: Model<EvaluationDocument> =
  mongoose.models.Evaluation ||
  mongoose.model<EvaluationDocument>("Evaluation", EvaluationSchema);
