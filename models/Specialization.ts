import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const SpecializationSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    isActive: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type SpecializationDocument = InferSchemaType<
  typeof SpecializationSchema
> & {
  _id: mongoose.Types.ObjectId;
};

export const Specialization: Model<SpecializationDocument> =
  mongoose.models.Specialization ||
  mongoose.model<SpecializationDocument>(
    "Specialization",
    SpecializationSchema,
  );
