"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export default function NewCruise() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    departureDate: "",
    returnDate: "",
    departurePort: "",
    destinations: "",
    maxCapacity: "",
  });

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("hm_token");
    const body = {
      ...form,
      destinations: form.destinations
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      maxCapacity: form.maxCapacity ? parseInt(form.maxCapacity) : undefined,
    };
    const res = await fetch(`${API}/admin/cruises`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setSaving(false);
    if (data.data?.id) {
      router.push(`/admin/cruises/${data.data.id}`);
    }
  };

  return (
    <>
      <div className="hm-admin-breadcrumb">
        <a href="/admin/cruises">Cruises</a>
        <span>/</span>
        <span>New Cruise</span>
      </div>

      <h1 className="hm-admin-heading">Create New Cruise</h1>

      <div className="hm-admin-card">
        <form onSubmit={submit} className="hm-admin-form">
          <div className="hm-admin-form-row">
            <div className="hm-admin-field">
              <label>Name *</label>
              <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. The Caribbean Wave" />
            </div>
            <div className="hm-admin-field">
              <label>Slug *</label>
              <input type="text" required value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="e.g. the-caribbean-wave" />
            </div>
          </div>
          <div className="hm-admin-field">
            <label>Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
          </div>
          <div className="hm-admin-form-row">
            <div className="hm-admin-field">
              <label>Departure Date *</label>
              <input type="date" required value={form.departureDate} onChange={(e) => update("departureDate", e.target.value)} />
            </div>
            <div className="hm-admin-field">
              <label>Return Date *</label>
              <input type="date" required value={form.returnDate} onChange={(e) => update("returnDate", e.target.value)} />
            </div>
          </div>
          <div className="hm-admin-form-row">
            <div className="hm-admin-field">
              <label>Departure Port</label>
              <input type="text" value={form.departurePort} onChange={(e) => update("departurePort", e.target.value)} placeholder="e.g. Miami, FL" />
            </div>
            <div className="hm-admin-field">
              <label>Destinations (comma-separated)</label>
              <input type="text" value={form.destinations} onChange={(e) => update("destinations", e.target.value)} placeholder="e.g. Nassau, CocoCay, Cozumel" />
            </div>
          </div>
          <div className="hm-admin-field" style={{ maxWidth: 200 }}>
            <label>Max Capacity</label>
            <input type="number" value={form.maxCapacity} onChange={(e) => update("maxCapacity", e.target.value)} placeholder="e.g. 500" />
          </div>
          <div className="hm-admin-actions">
            <button type="submit" className="hm-admin-btn primary" disabled={saving}>
              {saving ? "Creating..." : "Create Cruise"}
            </button>
            <button type="button" className="hm-admin-btn" onClick={() => router.back()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
