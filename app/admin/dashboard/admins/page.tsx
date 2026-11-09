"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type Admin = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
};

export default function AdminsPage() {
  const [items, setItems] = useState<Admin[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  async function load() {
    const res = await fetch("/api/admin/admins");
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Unable to load admins");
      return;
    }
    setItems(data.items || []);
    setError(null);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to create admin");
      return;
    }
    setForm({ name: "", email: "", password: "", role: "admin" });
    await load();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Administrators
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Super admins can create additional authorized administrators.
        </p>
      </div>

      {error ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <form
        onSubmit={onCreate}
        className="grid gap-3 border border-emerald/10 bg-white p-4 sm:grid-cols-2"
      >
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        >
          <option value="super_admin">super_admin</option>
          <option value="admin">admin</option>
          <option value="reviewer">reviewer</option>
        </select>
        <Button type="submit" variant="secondary" className="sm:col-span-2 sm:w-fit">
          Create admin
        </Button>
      </form>

      <ul className="divide-y divide-emerald/10 border border-emerald/10 bg-white">
        {items.map((admin) => (
          <li key={admin._id} className="flex items-center justify-between px-4 py-3 text-sm">
            <div>
              <p className="font-medium text-ink">{admin.name}</p>
              <p className="text-xs text-ink/50">{admin.email}</p>
            </div>
            <span className="text-xs uppercase tracking-wide text-emerald">
              {admin.role}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
