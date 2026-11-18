import { Notification } from "@/models/Notification";

type SendNotificationInput = {
  type:
    | "application_received"
    | "status_update"
    | "assessment"
    | "interview"
    | "decision"
    | "announcement";
  recipientEmail: string;
  subject: string;
  body: string;
  applicationId?: string;
};

/**
 * Queues a notification and attempts email delivery when RESEND_API_KEY is set.
 * Never includes sensitive evaluation notes or internal admin comments.
 */
export async function queueNotification(input: SendNotificationInput) {
  const doc = await Notification.create({
    type: input.type,
    recipientEmail: input.recipientEmail.toLowerCase(),
    subject: input.subject,
    body: input.body,
    applicationId: input.applicationId || null,
    channel: "email",
    status: "queued",
  });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "ITQAN DEVELOPERS <onboarding@resend.dev>";

  if (!apiKey) {
    doc.status = "skipped";
    doc.error = "RESEND_API_KEY not configured; notification queued only.";
    await doc.save();
    return doc;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [input.recipientEmail],
        subject: input.subject,
        text: input.body,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      doc.status = "failed";
      doc.error = text.slice(0, 500);
      await doc.save();
      return doc;
    }

    doc.status = "sent";
    doc.sentAt = new Date();
    await doc.save();
    return doc;
  } catch (error) {
    doc.status = "failed";
    doc.error = error instanceof Error ? error.message : "Email send failed";
    await doc.save();
    return doc;
  }
}
