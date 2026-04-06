"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

function DetailsTab({ cruise, onChange, onSave, saving }) {
  return (
    <div className="hm-admin-form">
      <div className="hm-admin-form-row">
        <div className="hm-admin-field">
          <label>Name</label>
          <input type="text" value={cruise.name} onChange={(e) => onChange("name", e.target.value)} />
        </div>
        <div className="hm-admin-field">
          <label>Slug</label>
          <input type="text" value={cruise.slug} onChange={(e) => onChange("slug", e.target.value)} />
        </div>
      </div>
      <div className="hm-admin-field">
        <label>Description</label>
        <textarea rows={4} value={cruise.description || ""} onChange={(e) => onChange("description", e.target.value)} />
      </div>
      <div className="hm-admin-form-row">
        <div className="hm-admin-field">
          <label>Departure Date</label>
          <input type="date" value={cruise.departureDate} onChange={(e) => onChange("departureDate", e.target.value)} />
        </div>
        <div className="hm-admin-field">
          <label>Return Date</label>
          <input type="date" value={cruise.returnDate} onChange={(e) => onChange("returnDate", e.target.value)} />
        </div>
      </div>
      <div className="hm-admin-form-row">
        <div className="hm-admin-field">
          <label>Departure Port</label>
          <input type="text" value={cruise.departurePort || ""} onChange={(e) => onChange("departurePort", e.target.value)} />
        </div>
        <div className="hm-admin-field">
          <label>Max Capacity</label>
          <input type="number" value={cruise.maxCapacity || ""} onChange={(e) => onChange("maxCapacity", parseInt(e.target.value) || null)} />
        </div>
      </div>
      <div className="hm-admin-field">
        <label>Hero Image URL</label>
        <input type="text" value={cruise.heroImageKey || ""} onChange={(e) => onChange("heroImageKey", e.target.value)} />
      </div>
      <div className="hm-admin-actions">
        <button className="hm-admin-btn primary" onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function PackagesTab({ cruiseId }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hm_token");
    fetch(`${API}/admin/cruises/${cruiseId}/packages`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setPackages(d.data || []))
      .catch(() => setPackages([]))
      .finally(() => setLoading(false));
  }, [cruiseId]);

  const savePackage = async (pkg) => {
    const token = localStorage.getItem("hm_token");
    await fetch(`${API}/admin/packages/${pkg.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(pkg),
    });
    alert("Package saved!");
  };

  const updatePkg = (idx, field, val) => {
    const copy = [...packages];
    copy[idx] = { ...copy[idx], [field]: val };
    setPackages(copy);
  };

  if (loading) return <div className="hm-admin-loading"><i className="fa-solid fa-spinner fa-spin"></i></div>;

  return (
    <div className="hm-admin-packages-list">
      {packages.map((pkg, idx) => (
        <div key={pkg.id} className="hm-admin-card" style={{ marginBottom: 16 }}>
          <div className="hm-admin-form-row">
            <div className="hm-admin-field">
              <label>Name</label>
              <input type="text" value={pkg.name} onChange={(e) => updatePkg(idx, "name", e.target.value)} />
            </div>
            <div className="hm-admin-field">
              <label>Price (cents)</label>
              <input type="number" value={pkg.priceCents} onChange={(e) => updatePkg(idx, "priceCents", parseInt(e.target.value))} />
            </div>
            <div className="hm-admin-field">
              <label>Deposit (cents)</label>
              <input type="number" value={pkg.depositCents} onChange={(e) => updatePkg(idx, "depositCents", parseInt(e.target.value))} />
            </div>
          </div>
          <div className="hm-admin-field">
            <label>Description</label>
            <textarea rows={2} value={pkg.description || ""} onChange={(e) => updatePkg(idx, "description", e.target.value)} />
          </div>
          <div className="hm-admin-form-row">
            <div className="hm-admin-field">
              <label>Features (comma-separated)</label>
              <input
                type="text"
                value={(pkg.features || []).join(", ")}
                onChange={(e) => updatePkg(idx, "features", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
              />
            </div>
            <div className="hm-admin-field" style={{ maxWidth: 120 }}>
              <label>Popular</label>
              <select value={pkg.isPopular ? "yes" : "no"} onChange={(e) => updatePkg(idx, "isPopular", e.target.value === "yes")}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
          <button className="hm-admin-btn primary" onClick={() => savePackage(packages[idx])}>
            Save Package
          </button>
        </div>
      ))}
    </div>
  );
}

function ItineraryTab({ cruiseId }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hm_token");
    fetch(`${API}/admin/cruises/${cruiseId}/itinerary`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setEvents(d.data || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [cruiseId]);

  const saveEvent = async (ev) => {
    const token = localStorage.getItem("hm_token");
    await fetch(`${API}/admin/itinerary/${ev.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(ev),
    });
    alert("Event saved!");
  };

  const deleteEvent = async (id) => {
    if (!confirm("Delete this event?")) return;
    const token = localStorage.getItem("hm_token");
    await fetch(`${API}/admin/itinerary/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEv = (idx, field, val) => {
    const copy = [...events];
    copy[idx] = { ...copy[idx], [field]: val };
    setEvents(copy);
  };

  if (loading) return <div className="hm-admin-loading"><i className="fa-solid fa-spinner fa-spin"></i></div>;

  return (
    <div className="hm-admin-itinerary-list">
      {events.map((ev, idx) => (
        <div key={ev.id} className="hm-admin-card" style={{ marginBottom: 12 }}>
          <div className="hm-admin-form-row">
            <div className="hm-admin-field" style={{ maxWidth: 80 }}>
              <label>Day</label>
              <input type="number" value={ev.dayNumber} onChange={(e) => updateEv(idx, "dayNumber", parseInt(e.target.value))} />
            </div>
            <div className="hm-admin-field">
              <label>Title</label>
              <input type="text" value={ev.title} onChange={(e) => updateEv(idx, "title", e.target.value)} />
            </div>
            <div className="hm-admin-field">
              <label>Location</label>
              <input type="text" value={ev.location || ""} onChange={(e) => updateEv(idx, "location", e.target.value)} />
            </div>
          </div>
          <div className="hm-admin-field">
            <label>Description</label>
            <textarea rows={2} value={ev.description || ""} onChange={(e) => updateEv(idx, "description", e.target.value)} />
          </div>
          <div className="hm-admin-btn-group">
            <button className="hm-admin-btn-sm" onClick={() => saveEvent(events[idx])}>Save</button>
            <button className="hm-admin-btn-sm danger" onClick={() => deleteEvent(ev.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CruiseEditor({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [cruise, setCruise] = useState(null);
  const [tab, setTab] = useState("details");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hm_token");
    fetch(`${API}/admin/cruises`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        const found = (d.data || []).find((c) => c.id === id);
        setCruise(found || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const onChange = (field, value) => setCruise((prev) => ({ ...prev, [field]: value }));

  const saveCruise = async () => {
    setSaving(true);
    const token = localStorage.getItem("hm_token");
    const { packages, itinerary, bookings, ...data } = cruise;
    await fetch(`${API}/admin/cruises/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    alert("Cruise saved!");
  };

  if (loading) return <div className="hm-admin-loading"><i className="fa-solid fa-spinner fa-spin fa-2x"></i></div>;
  if (!cruise) return <div className="hm-admin-card"><p>Cruise not found.</p></div>;

  return (
    <>
      <div className="hm-admin-breadcrumb">
        <a href="/admin/cruises">Cruises</a>
        <span>/</span>
        <span>{cruise.name}</span>
      </div>

      <h1 className="hm-admin-heading">{cruise.name}</h1>

      <div className="hm-admin-tabs">
        {["details", "packages", "itinerary"].map((t) => (
          <button
            key={t}
            className={`hm-admin-tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "details" && <DetailsTab cruise={cruise} onChange={onChange} onSave={saveCruise} saving={saving} />}
      {tab === "packages" && <PackagesTab cruiseId={id} />}
      {tab === "itinerary" && <ItineraryTab cruiseId={id} />}
    </>
  );
}
