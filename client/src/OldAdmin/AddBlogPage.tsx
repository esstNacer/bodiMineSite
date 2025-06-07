// src/pages/admin/AddBlogPage.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiUploadCloud } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./styles/AddBlogPage.css";
import AdminSidebar from "./AdminSidebar";   // ← chemin réel

interface ThumbnailPreview {
  file: File;
  url: string;
}

export default function AddBlogPage() {
  /* ----- state ----- */
  const [title, setTitle]     = useState("");
  const [status, setStatus]   = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
  const [content, setContent] = useState("");
  const [thumb, setThumb]     = useState<ThumbnailPreview | null>(null);
  const [saving, setSaving]   = useState(false);

  /* ----- handlers ----- */
  const handleThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumb({ file, url: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("status", status);
      form.append("content", content);
      if (thumb?.file) form.append("thumbnail", thumb.file);

      // await fetch("/api/admin/blogs", { method: "POST", body: form });
      alert("Blog saved!");
      setTitle("");
      setStatus("PUBLISHED");
      setContent("");
      setThumb(null);
    } finally {
      setSaving(false);
    }
  };

  /* ----- render ----- */
  return (
    <div className="admin-wrapper">
<AdminSidebar active="/admin/blog" />
      <main className="admin-main">
        {/* breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/admin">Dashboard</Link>
          <FiChevronRight />
          <span>Blog</span>
        </nav>

        <h1 className="page-title">Add Blog</h1>

        <form className="card add-blog-form" onSubmit={handleSubmit}>
          {/* Title */}
          <label className="form-label" htmlFor="title">
            Title <span className="req">*</span>
          </label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Status */}
          <label className="form-label">
            Status <span className="req">*</span>
          </label>
          <div className="status-toggle">
            {["PUBLISHED", "DRAFT"].map((s) => (
              <label key={s} className={status === s ? "active" : ""}>
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={status === s}
                  onChange={() => setStatus(s as "PUBLISHED" | "DRAFT")}
                />
                {s === "PUBLISHED" ? "Published" : "Un-Published"}
              </label>
            ))}
          </div>

          {/* Thumbnail */}
          <label className="form-label">Thumbnail Image</label>
          <div className="thumb-uploader">
            {thumb ? (
              <img src={thumb.url} alt="Preview" className="thumb-preview" />
            ) : (
              <>
                <FiUploadCloud size={32} />
                <span>Upload File</span>
                <small>Maximum size 2 MB.</small>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnail}
              className="file-hidden"
            />
          </div>

          {/* Content */}
          <label className="form-label">
            Content <span className="req">*</span>
          </label>
          {/*<ReactQuill
            className="editor"
            value={content}
            onChange={setContent}
            placeholder="Start writing here…"
          />*/}

          {/* Submit */}
          <button type="submit" className="btn primary" disabled={saving}>
            {saving ? "Saving…" : "Save Blog"}
          </button>
        </form>
      </main>
    </div>
  );
}
