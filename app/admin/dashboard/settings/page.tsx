"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const [stages, setStages] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/recruitment")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setIsOpen(Boolean(data.settings.isOpen));
          setAnnouncement(data.settings.announcement || "");
          setStages((data.settings.stages || []).join("\n"));
        }
      });
  }, []);

  async function onSave(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    const res = await fetch("/api/admin/recruitment", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isOpen,
        announcement,
        stages: stages
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Save failed");
      return;
    }
    setMessage("Recruitment settings updated.");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Recruitment settings
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Configure application availability and recruitment stages.
        </p>
      </div>

      <form
        onSubmit={onSave}
        className="max-w-2xl space-y-4 border border-emerald/10 bg-white p-5"
      >
        <label className="flex items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={(e) => setIsOpen(e.target.checked)}
            className="h-4 w-4 accent-[var(--emerald)]"
          />
          Applications are open
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Announcement</span>
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-emerald/15 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">
            Stages (one per line)
          </span>
          <textarea
            value={stages}
            onChange={(e) => setStages(e.target.value)}
            rows={6}
            className="w-full rounded-md border border-emerald/15 px-3 py-2"
          />
        </label>
        <Button type="submit" variant="secondary">
          Save settings
        </Button>
      </form>

      {message ? <p className="text-sm text-emerald">{message}</p> : null}
    </div>
  );
}
