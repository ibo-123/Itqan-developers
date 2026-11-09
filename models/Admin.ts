import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const AdminSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["super_admin", "admin", "reviewer"],
      default: "admin",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type AdminDocument = InferSchemaType<typeof AdminSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Admin: Model<AdminDocument> =
  mongoose.models.Admin || mongoose.model<AdminDocument>("Admin", AdminSchema);
