import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ProjectTeamSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
      index: true,
    },
    role: { type: String, trim: true, default: "Contributor" },
  },
  { timestamps: true },
);

ProjectTeamSchema.index({ projectId: 1, memberId: 1 }, { unique: true });

export type ProjectTeamDocument = InferSchemaType<typeof ProjectTeamSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ProjectTeam: Model<ProjectTeamDocument> =
  mongoose.models.ProjectTeam ||
  mongoose.model<ProjectTeamDocument>("ProjectTeam", ProjectTeamSchema);
