"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type Spec = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  isActive: boolean;
};

export default function SpecializationsAdminPage() {
  const [items, setItems] = useState<Spec[]>([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/specializations?all=true");
    const data = await res.json();
    if (res.ok) setItems(data.items || []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    const res = await fetch("/api/admin/specializations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Failed to create");
      return;
    }
    setForm({ title: "", slug: "", description: "" });
    setMessage("Interest area created.");
    await load();
  }

  async function toggle(item: Spec) {
    await fetch(`/api/admin/specializations/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !item.isActive }),
    });
    await load();
  }

  async function remove(item: Spec) {
    if (!confirm(`Delete interest "${item.title}"?`)) return;
    await fetch(`/api/admin/specializations/${item._id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Areas of interest
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Manage interest categories applicants can select. These are contribution
          areas — not exclusive seat assignments.
        </p>
      </div>

      <form
        onSubmit={onCreate}
        className="grid gap-3 border border-emerald/10 bg-white p-4"
      >
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <input
          required
          placeholder="slug-like-this"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <textarea
          required
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
          rows={3}
        />
        <Button type="submit" variant="secondary" className="w-fit">
          Create interest
        </Button>
      </form>

      {message ? <p className="text-sm text-emerald">{message}</p> : null}

      <ul className="divide-y divide-emerald/10 border border-emerald/10 bg-white">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-ink">{item.title}</p>
              <p className="text-xs text-ink/45">{item.slug}</p>
              <p className="mt-1 text-sm text-ink/65">{item.description}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <button
                type="button"
                onClick={() => toggle(item)}
                className="text-emerald hover:underline"
              >
                {item.isActive ? "Disable" : "Enable"}
              </button>
              <button
                type="button"
                onClick={() => remove(item)}
                className="text-red-700 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
