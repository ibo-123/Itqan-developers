import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const NotificationSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "application_received",
        "status_update",
        "assessment",
        "interview",
        "decision",
        "announcement",
      ],
      required: true,
      index: true,
    },
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      default: null,
      index: true,
    },
    recipientEmail: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    channel: {
      type: String,
      enum: ["email", "in_app"],
      default: "email",
    },
    status: {
      type: String,
      enum: ["queued", "sent", "failed", "skipped"],
      default: "queued",
      index: true,
    },
    error: { type: String, default: "" },
    sentAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export type NotificationDocument = InferSchemaType<typeof NotificationSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Notification: Model<NotificationDocument> =
  mongoose.models.Notification ||
  mongoose.model<NotificationDocument>("Notification", NotificationSchema);
