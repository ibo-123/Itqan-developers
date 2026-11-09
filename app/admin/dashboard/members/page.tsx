"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type Member = {
  _id: string;
  fullName: string;
  email: string;
  department?: string;
  specializations?: string[];
  roleTitle?: string;
  isActive: boolean;
};

export default function MembersPage() {
  const [items, setItems] = useState<Member[]>([]);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    department: "",
    specializations: "",
    roleTitle: "Member",
  });
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    const res = await fetch(`/api/admin/members?${params}`);
    const data = await res.json();
    if (res.ok) setItems(data.items || []);
  }

  useEffect(() => {
    void load();
  }, [q]);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    const res = await fetch("/api/admin/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        specializations: form.specializations
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Failed to create member");
      return;
    }
    setForm({
      fullName: "",
      email: "",
      department: "",
      specializations: "",
      roleTitle: "Member",
    });
    setMessage("Member added.");
    await load();
  }

  async function toggleActive(member: Member) {
    await fetch(`/api/admin/members/${member._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !member.isActive }),
    });
    await load();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Members
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Unlimited membership — activate, deactivate, and assign specializations.
        </p>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search members"
        className="w-full max-w-md rounded-md border border-emerald/15 bg-white px-3 py-2 text-sm"
      />

      <form
        onSubmit={onCreate}
        className="grid gap-3 border border-emerald/10 bg-white p-4 sm:grid-cols-2"
      >
        <h2 className="font-display text-lg font-semibold text-ink sm:col-span-2">
          Add member
        </h2>
        <input
          required
          placeholder="Full name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
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
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <input
          placeholder="Specializations (comma-separated slugs)"
          value={form.specializations}
          onChange={(e) =>
            setForm({ ...form, specializations: e.target.value })
          }
          className="rounded-md border border-emerald/15 px-3 py-2 text-sm"
        />
        <Button type="submit" variant="secondary" className="sm:col-span-2 sm:w-fit">
          Add member
        </Button>
      </form>

      {message ? <p className="text-sm text-emerald">{message}</p> : null}

      <div className="overflow-x-auto border border-emerald/10 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-emerald/10 bg-soft text-xs uppercase tracking-wide text-ink/50">
            <tr>
              <th className="px-4 py-3">Member</th>
              <th className="px-4 py-3">Specializations</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((member) => (
              <tr key={member._id} className="border-b border-emerald/5">
                <td className="px-4 py-3">
                  <p className="font-medium">{member.fullName}</p>
                  <p className="text-xs text-ink/50">{member.email}</p>
                </td>
                <td className="px-4 py-3 text-ink/70">
                  {(member.specializations || []).join(", ") || "—"}
                </td>
                <td className="px-4 py-3">
                  {member.isActive ? "Active" : "Inactive"}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => toggleActive(member)}
                    className="text-sm text-emerald hover:underline"
                  >
                    {member.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-ink/50">
            No members yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
