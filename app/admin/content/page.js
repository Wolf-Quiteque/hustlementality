"use client";

import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
const PAGES = ["home", "about", "faq", "gallery", "contact", "packages", "trip", "global"];

export default function ContentManager() {
  const [content, setContent] = useState([]);
  const [activePage, setActivePage] = useState("home");
  const [loading, setLoading] = useState(true);

  const fetchContent = (page) => {
    const token = localStorage.getItem("hm_token");
    setLoading(true);
    fetch(`${API}/admin/content?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setContent(d.data || []))
      .catch(() => setContent([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchContent(activePage); }, [activePage]);

  const typeBadge = (type) => {
    const colors = { text: "#1B6B93", html: "#6f42c1", json: "#F2C744", image: "#28a745" };
    return (
      <span className="hm-admin-badge-sm" style={{ background: colors[type] || "#666" }}>
        {type}
      </span>
    );
  };

  const preview = (item) => {
    if (item.contentType === "image") return item.value.substring(0, 60) + "...";
    if (item.contentType === "json") {
      try {
        const parsed = JSON.parse(item.value);
        return Array.isArray(parsed) ? `[${parsed.length} items]` : "{...}";
      } catch { return item.value.substring(0, 60); }
    }
    return item.value.length > 80 ? item.value.substring(0, 80) + "..." : item.value;
  };

  return (
    <>
      <h1 className="hm-admin-heading">Content Manager</h1>

      {/* Page Tabs */}
      <div className="hm-admin-tabs">
        {PAGES.map((p) => (
          <button
            key={p}
            className={`hm-admin-tab ${activePage === p ? "active" : ""}`}
            onClick={() => setActivePage(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Content List */}
      {loading ? (
        <div className="hm-admin-loading"><i className="fa-solid fa-spinner fa-spin fa-2x"></i></div>
      ) : content.length === 0 ? (
        <div className="hm-admin-card"><p className="hm-admin-empty">No content blocks for this page yet.</p></div>
      ) : (
        <div className="hm-admin-card">
          <div className="hm-admin-table-wrap">
            <table className="hm-admin-table">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Key</th>
                  <th>Type</th>
                  <th>Preview</th>
                  <th>Active</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {content.map((item) => (
                  <tr key={item.key} style={{ opacity: item.isActive ? 1 : 0.5 }}>
                    <td><strong>{item.label}</strong></td>
                    <td><code>{item.key}</code></td>
                    <td>{typeBadge(item.contentType)}</td>
                    <td className="hm-admin-preview">{preview(item)}</td>
                    <td>{item.isActive ? "Yes" : "No"}</td>
                    <td>
                      <a href={`/admin/content/${item.key}`} className="hm-admin-btn-sm">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
