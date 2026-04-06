"use client";

import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export default function CruiseManager() {
  const [cruises, setCruises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hm_token");
    fetch(`${API}/admin/cruises`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setCruises(d.data || []))
      .catch(() => setCruises([]))
      .finally(() => setLoading(false));
  }, []);

  const deactivate = async (id) => {
    if (!confirm("Deactivate this cruise?")) return;
    const token = localStorage.getItem("hm_token");
    await fetch(`${API}/admin/cruises/${id}/deactivate`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    setCruises((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: false } : c)));
  };

  const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const fmtPrice = (cents) => `$${(cents / 100).toLocaleString()}`;

  if (loading) {
    return <div className="hm-admin-loading"><i className="fa-solid fa-spinner fa-spin fa-2x"></i></div>;
  }

  return (
    <>
      <div className="hm-admin-heading-row">
        <h1 className="hm-admin-heading">Cruises</h1>
        <a href="/admin/cruises/new" className="hm-admin-btn primary">
          <i className="fa-solid fa-plus"></i> New Cruise
        </a>
      </div>

      {cruises.length === 0 ? (
        <div className="hm-admin-card"><p className="hm-admin-empty">No cruises found.</p></div>
      ) : (
        <div className="hm-admin-card">
          <div className="hm-admin-table-wrap">
            <table className="hm-admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Dates</th>
                  <th>Packages</th>
                  <th>Starting Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cruises.map((cruise) => {
                  const minPrice = cruise.packages?.length
                    ? Math.min(...cruise.packages.map((p) => p.priceCents))
                    : 0;
                  return (
                    <tr key={cruise.id} style={{ opacity: cruise.isActive ? 1 : 0.5 }}>
                      <td>
                        <strong>{cruise.name}</strong>
                        <br />
                        <small style={{ color: "#888" }}>{cruise.slug}</small>
                      </td>
                      <td>{fmtDate(cruise.departureDate)} &ndash; {fmtDate(cruise.returnDate)}</td>
                      <td>{cruise.packages?.length || 0}</td>
                      <td>{minPrice > 0 ? fmtPrice(minPrice) : "—"}</td>
                      <td>
                        <span className={`hm-admin-status-badge ${cruise.isActive ? "confirmed" : "cancelled"}`}>
                          {cruise.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="hm-admin-btn-group">
                          <a href={`/admin/cruises/${cruise.id}`} className="hm-admin-btn-sm">Edit</a>
                          {cruise.isActive && (
                            <button className="hm-admin-btn-sm danger" onClick={() => deactivate(cruise.id)}>
                              Deactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
