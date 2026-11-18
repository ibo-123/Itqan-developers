"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const [deadline, setDeadline] = useState("");
  const [opensAt, setOpensAt] = useState("");
  const [maxSelected, setMaxSelected] = useState(7);
  const [stages, setStages] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/recruitment")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setTitle(data.settings.title || "");
          setDescription(data.settings.description || "");
          setIsOpen(Boolean(data.settings.isOpen));
          setAnnouncement(data.settings.announcement || "");
          setMaxSelected(data.settings.maxSelectedApplicants || 7);
          setStages((data.settings.stages || []).join("\n"));
          setDeadline(
            data.settings.deadline
              ? new Date(data.settings.deadline).toISOString().slice(0, 16)
              : "",
          );
          setOpensAt(
            data.settings.opensAt
              ? new Date(data.settings.opensAt).toISOString().slice(0, 16)
              : "",
          );
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
        title,
        description,
        isOpen,
        announcement,
        maxSelectedApplicants: maxSelected,
        stages: stages
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        opensAt: opensAt ? new Date(opensAt).toISOString() : null,
        deadline: deadline ? new Date(deadline).toISOString() : null,
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
          Configure title, deadline, capacity, and public announcement without
          code changes.
        </p>
      </div>

      <form
        onSubmit={onSave}
        className="max-w-2xl space-y-4 border border-emerald/10 bg-white p-5"
      >
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-sm border border-emerald/15 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-sm border border-emerald/15 px-3 py-2"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={(e) => setIsOpen(e.target.checked)}
            className="h-4 w-4 accent-[var(--emerald)]"
          />
          Applications are open
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-ink">Opens at</span>
            <input
              type="datetime-local"
              value={opensAt}
              onChange={(e) => setOpensAt(e.target.value)}
              className="w-full rounded-sm border border-emerald/15 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-ink">Deadline</span>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-sm border border-emerald/15 px-3 py-2"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">
            Max selected applicants
          </span>
          <input
            type="number"
            min={1}
            max={50}
            value={maxSelected}
            onChange={(e) => setMaxSelected(Number(e.target.value))}
            className="w-full rounded-sm border border-emerald/15 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Announcement</span>
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            rows={3}
            className="w-full rounded-sm border border-emerald/15 px-3 py-2"
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
            className="w-full rounded-sm border border-emerald/15 px-3 py-2"
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
