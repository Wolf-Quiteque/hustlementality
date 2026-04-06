"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

function JsonEditor({ value, onChange }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try { setItems(JSON.parse(value)); } catch { setItems([]); }
  }, [value]);

  const update = (idx, field, val) => {
    const copy = [...items];
    copy[idx] = { ...copy[idx], [field]: val };
    setItems(copy);
    onChange(JSON.stringify(copy, null, 2));
  };

  const addItem = () => {
    const keys = items.length > 0 ? Object.keys(items[0]) : ["title", "text"];
    const blank = {};
    keys.forEach((k) => (blank[k] = ""));
    const next = [...items, blank];
    setItems(next);
    onChange(JSON.stringify(next, null, 2));
  };

  const removeItem = (idx) => {
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    onChange(JSON.stringify(next, null, 2));
  };

  if (!Array.isArray(items)) {
    return (
      <textarea
        className="hm-admin-textarea"
        rows={12}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <div className="hm-admin-json-editor">
      {items.map((item, idx) => (
        <div key={idx} className="hm-admin-json-item">
          <div className="hm-admin-json-item-header">
            <span>Item {idx + 1}</span>
            <button className="hm-admin-btn-danger-sm" onClick={() => removeItem(idx)}>Remove</button>
          </div>
          {Object.keys(item).map((field) => (
            <div key={field} className="hm-admin-field">
              <label>{field}</label>
              {String(item[field]).length > 100 ? (
                <textarea
                  rows={3}
                  value={item[field] ?? ""}
                  onChange={(e) => update(idx, field, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  value={item[field] ?? ""}
                  onChange={(e) => update(idx, field, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button className="hm-admin-btn" onClick={addItem}>
        <i className="fa-solid fa-plus"></i> Add Item
      </button>
    </div>
  );
}

export default function ContentEditor({ params }) {
  const { key } = use(params);
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hm_token");
    fetch(`${API}/admin/content/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        setContent(d.data);
        setValue(d.data.value);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [key]);

  const save = async () => {
    setSaving(true);
    const token = localStorage.getItem("hm_token");
    await fetch(`${API}/admin/content/${key}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contentType: content.contentType,
        value,
        page: content.page,
        section: content.section,
        label: content.label,
      }),
    });
    setSaving(false);
    alert("Saved!");
  };

  if (loading) {
    return <div className="hm-admin-loading"><i className="fa-solid fa-spinner fa-spin fa-2x"></i></div>;
  }

  if (!content) {
    return <div className="hm-admin-card"><p>Content block not found.</p></div>;
  }

  return (
    <>
      <div className="hm-admin-breadcrumb">
        <a href="/admin/content">Content</a>
        <span>/</span>
        <span>{content.label}</span>
      </div>

      <h1 className="hm-admin-heading">{content.label}</h1>

      <div className="hm-admin-card">
        <div className="hm-admin-meta">
          <span><strong>Key:</strong> <code>{content.key}</code></span>
          <span><strong>Page:</strong> {content.page}</span>
          <span><strong>Type:</strong> {content.contentType}</span>
        </div>

        <div className="hm-admin-editor" style={{ marginTop: 20 }}>
          {content.contentType === "json" ? (
            <JsonEditor value={value} onChange={setValue} />
          ) : content.contentType === "image" ? (
            <div className="hm-admin-image-editor">
              {value && (
                <div className="hm-admin-image-preview">
                  <img src={value} alt="Preview" style={{ maxWidth: 400, borderRadius: 8 }} />
                </div>
              )}
              <div className="hm-admin-field" style={{ marginTop: 12 }}>
                <label>Image URL</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="https://... or R2 object key"
                />
              </div>
            </div>
          ) : (
            <textarea
              className="hm-admin-textarea"
              rows={content.contentType === "html" ? 15 : 6}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </div>

        <div className="hm-admin-actions" style={{ marginTop: 20 }}>
          <button className="hm-admin-btn primary" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button className="hm-admin-btn" onClick={() => router.back()}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
