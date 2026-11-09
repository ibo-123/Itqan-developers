"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type Project = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
  isPublic: boolean;
  isFeatured: boolean;
};

export default function ProjectsAdminPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    status: "planned",
    tags: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/projects?admin=true");
    const data = await res.json();
    if (res.ok) setItems(data.items || []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        isPublic: true,
        isFeatured: false,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Failed to create project");
      return;
    }
    setForm({
      name: "",
      slug: "",
      description: "",
      status: "planned",
      tags: "",
    });
    setMessage("Project created.");
    await load();
  }

  async function updateStatus(project: Project, status: string) {
    await fetch(`/api/admin/projects/${project._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Projects
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Manage community projects shown on the public site.
        </p>
      </div>

      <form
        onSubmit={onCreate}
        className="grid gap-3 border border-emerald/10 bg-white p-4"
      >
        <input
          required
          placeholder="Project name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <input
          required
          placeholder="slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <textarea
          required
          placeholder="Description"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <input
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        >
          <option value="planned">planned</option>
          <option value="in_progress">in_progress</option>
          <option value="completed">completed</option>
          <option value="archived">archived</option>
        </select>
        <Button type="submit" variant="secondary" className="w-fit">
          Add project
        </Button>
      </form>

      {message ? <p className="text-sm text-emerald">{message}</p> : null}

      <ul className="space-y-3">
        {items.map((project) => (
          <li
            key={project._id}
            className="border border-emerald/10 bg-white px-4 py-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">
                  {project.name}
                </h2>
                <p className="text-xs text-ink/45">{project.slug}</p>
                <p className="mt-2 text-sm text-ink/70">{project.description}</p>
              </div>
              <select
                value={project.status}
                onChange={(e) => updateStatus(project, e.target.value)}
                className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
              >
                <option value="planned">planned</option>
                <option value="in_progress">in_progress</option>
                <option value="completed">completed</option>
                <option value="archived">archived</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
