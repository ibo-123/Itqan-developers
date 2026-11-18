import { RecruitmentSettings } from "@/models/RecruitmentSettings";

export type RecruitmentGate = {
  allowed: boolean;
  reason?: string;
  settings: {
    title: string;
    description: string;
    isOpen: boolean;
    announcement: string;
    opensAt: Date | null;
    deadline: Date | null;
    maxSelectedApplicants: number;
    stages: string[];
  };
};

export async function getRecruitmentSettings() {
  const settings =
    (await RecruitmentSettings.findOne({ key: "default" })) ||
    (await RecruitmentSettings.create({ key: "default" }));
  return settings;
}

export async function assertRecruitmentOpen(): Promise<RecruitmentGate> {
  const settings = await getRecruitmentSettings();
  const now = new Date();

  const payload = {
    title: settings.title,
    description: settings.description,
    isOpen: settings.isOpen,
    announcement: settings.announcement,
    opensAt: settings.opensAt ?? null,
    deadline: settings.deadline ?? null,
    maxSelectedApplicants: settings.maxSelectedApplicants ?? 7,
    stages: settings.stages || [],
  };

  if (!settings.isOpen) {
    return {
      allowed: false,
      reason: "Applications are currently closed by the recruitment committee.",
      settings: payload,
    };
  }

  if (settings.opensAt && now < settings.opensAt) {
    return {
      allowed: false,
      reason: "Applications have not opened yet.",
      settings: payload,
    };
  }

  if (settings.deadline && now > settings.deadline) {
    return {
      allowed: false,
      reason: "The application deadline has passed.",
      settings: payload,
    };
  }

  return { allowed: true, settings: payload };
}

export function generateTrackingCode(): string {
  const part = () => Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ITQ-${part()}-${part()}`;
}

export function normalizeStatus(status: string): string {
  if (status === "pending") return "submitted";
  if (status === "assessment") return "practical_assessment";
  return status;
}
