import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const MemberSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: { type: String, trim: true, default: "" },
    department: { type: String, trim: true, default: "" },
    yearOfStudy: { type: String, trim: true, default: "" },
    specializations: [{ type: String, trim: true }],
    roleTitle: { type: String, trim: true, default: "Member" },
    isActive: { type: Boolean, default: true, index: true },
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      default: null,
    },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

MemberSchema.index({ fullName: "text", email: "text" });

export type MemberDocument = InferSchemaType<typeof MemberSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Member: Model<MemberDocument> =
  mongoose.models.Member ||
  mongoose.model<MemberDocument>("Member", MemberSchema);
