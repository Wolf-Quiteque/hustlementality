"use client";

import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [newCaption, setNewCaption] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("hm_token");
    fetch(`${API}/admin/gallery`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        try {
          const parsed = JSON.parse(d.data?.value || "[]");
          setImages(parsed);
        } catch { setImages([]); }
      })
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  const saveGallery = async (updatedImages) => {
    setSaving(true);
    const token = localStorage.getItem("hm_token");
    await fetch(`${API}/admin/gallery`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ images: updatedImages }),
    });
    setSaving(false);
  };

  const addImage = () => {
    if (!newUrl) return;
    const updated = [...images, { url: newUrl, alt: newAlt, caption: newCaption, category: "general" }];
    setImages(updated);
    saveGallery(updated);
    setNewUrl("");
    setNewAlt("");
    setNewCaption("");
  };

  const removeImage = (idx) => {
    const updated = images.filter((_, i) => i !== idx);
    setImages(updated);
    saveGallery(updated);
  };

  const updateImage = (idx, field, val) => {
    const updated = [...images];
    updated[idx] = { ...updated[idx], [field]: val };
    setImages(updated);
  };

  const moveImage = (idx, direction) => {
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= images.length) return;
    const updated = [...images];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    setImages(updated);
    saveGallery(updated);
  };

  if (loading) {
    return <div className="hm-admin-loading"><i className="fa-solid fa-spinner fa-spin fa-2x"></i></div>;
  }

  return (
    <>
      <h1 className="hm-admin-heading">Gallery Manager</h1>

      {/* Add Image */}
      <div className="hm-admin-card" style={{ marginBottom: 24 }}>
        <h3 className="hm-admin-card-title">Add Image</h3>
        <div className="hm-admin-form-row">
          <div className="hm-admin-field">
            <label>Image URL</label>
            <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div className="hm-admin-field">
            <label>Alt Text</label>
            <input type="text" value={newAlt} onChange={(e) => setNewAlt(e.target.value)} placeholder="Description" />
          </div>
          <div className="hm-admin-field">
            <label>Caption</label>
            <input type="text" value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder="Overlay text" />
          </div>
        </div>
        <button className="hm-admin-btn primary" onClick={addImage} disabled={!newUrl}>
          <i className="fa-solid fa-plus"></i> Add to Gallery
        </button>
      </div>

      {/* Image Grid */}
      <div className="hm-admin-gallery-grid">
        {images.map((img, idx) => (
          <div key={idx} className="hm-admin-gallery-item">
            <div className="hm-admin-gallery-img">
              <img src={img.url} alt={img.alt || ""} />
              <div className="hm-admin-gallery-overlay">
                <button onClick={() => moveImage(idx, -1)} disabled={idx === 0} title="Move up">
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button onClick={() => moveImage(idx, 1)} disabled={idx === images.length - 1} title="Move down">
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
                <button className="danger" onClick={() => removeImage(idx)} title="Remove">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="hm-admin-gallery-meta">
              <input
                type="text"
                value={img.caption || ""}
                onChange={(e) => updateImage(idx, "caption", e.target.value)}
                onBlur={() => saveGallery(images)}
                placeholder="Caption"
              />
            </div>
          </div>
        ))}
      </div>

      {saving && <p style={{ textAlign: "center", color: "#888", marginTop: 16 }}>Saving...</p>}
    </>
  );
}
