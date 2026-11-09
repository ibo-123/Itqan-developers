import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: { type: String, required: true, trim: true, maxlength: 3000 },
    status: {
      type: String,
      enum: ["planned", "in_progress", "completed", "archived"],
      default: "planned",
      index: true,
    },
    tags: [{ type: String, trim: true }],
    isFeatured: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: true },
    coverImage: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

export type ProjectDocument = InferSchemaType<typeof ProjectSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Project: Model<ProjectDocument> =
  mongoose.models.Project ||
  mongoose.model<ProjectDocument>("Project", ProjectSchema);
