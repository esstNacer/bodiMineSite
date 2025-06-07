// src/pages/admin/BannerPage.tsx
import React, {
    useState,
    useEffect,
    ChangeEvent,
    FormEvent,
    FC,
  } from "react";
  import { Link } from "react-router-dom";
  import {
    FiChevronRight,
    FiUploadCloud,
    FiTrash,
    FiEdit3,
  } from "react-icons/fi";
  
  import AdminSidebar from "./AdminSidebar";
  import "./styles/BannerPage.css"; // (ré-utilise tes classes card, form-input, etc.)
  
  /* ─────────────── types & helpers ─────────────── */
  interface Banner {
    id: number;
    url: string;
    imageUrl: string;
  }
  
  type Variant = "patient" | "pro";
  
  interface Props {
    variant: Variant;
  }
  
  const API_BASE: Record<Variant, string> = {
    patient: "/api/admin/banners/patient",
    pro: "/api/admin/banners/pro",
  };
  
  const TABLE_NAME: Record<Variant, string> = {
    patient: "banner_patient",
    pro: "banner_pro",
  };
  
  /* ─────────────── composant ─────────────── */
  const BannerPage: FC<Props> = ({ variant }) => {
    /* ------- state ------- */
    const [banners, setBanners] = useState<Banner[]>([]);
    const [url, setUrl] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
  
    /* ------- data fetch ------- */
    useEffect(() => {
      (async () => {
        try {
          const res = await fetch(`${API_BASE[variant]}`);
          const data = await res.json();
          setBanners(data); // supposé [{id,url,imageUrl}]
        } catch (err) {
          console.error(err);
        }
      })();
    }, [variant]);
  
    /* ------- handlers ------- */
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      setFile(f);
      setPreview(URL.createObjectURL(f));
    };
  
    const resetForm = () => {
      setUrl("");
      setFile(null);
      setPreview(null);
    };
  
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!file) return alert("Choose an image first");
      setSaving(true);
  
      try {
        const fd = new FormData();
        fd.append("url", url);
        fd.append("image", file);
  
        const res = await fetch(`${API_BASE[variant]}`, {
          method: "POST",
          body: fd,
        });
        const newBanner: Banner = await res.json();
        setBanners((prev) => [...prev, newBanner]);
        resetForm();
      } catch (err) {
        console.error(err);
        alert("Unable to save");
      } finally {
        setSaving(false);
      }
    };
  
    const handleDelete = async (id: number) => {
      if (!window.confirm("Delete banner?")) return;
      try {
        await fetch(`${API_BASE[variant]}/${id}`, { method: "DELETE" });
        setBanners((prev) => prev.filter((b) => b.id !== id));
      } catch (err) {
        console.error(err);
      }
    };
  
    /* ------- render ------- */
    return (
      <div className="admin-wrapper">
        <AdminSidebar active={`banner ${variant}`} />
  
        <main className="admin-main">
          {/* breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/admin">Dashboard</Link>
            <FiChevronRight />
            <span>Banner</span>
          </nav>
  
          <h1 className="page-title">Banner {variant === "patient" ? "Patient" : "Pro"}</h1>
  
          {/* ----- Add Banner card ----- */}
          <form className="card add-banner-form" onSubmit={handleSubmit}>
            <h3>Add Banner</h3>
  
            {/* URL */}
            <label className="form-label">URL</label>
            <input
              className="form-input"
              type="url"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
  
            {/* uploader */}
            <label className="form-label">Image<span className="req">*</span></label>
            <div className="thumb-uploader">
              {preview ? (
                <img src={preview} className="thumb-preview" />
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
                onChange={handleFile}
                className="file-hidden"
                required
              />
            </div>
  
            {/* bouton save */}
            <div className="save-row">
              <button className="btn primary" disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
  
          {/* ----- list table ----- */}
          <div className="card banner-table">
            <table>
              <thead>
                <tr>
                  <th style={{ width: 60 }}>#</th>
                  <th style={{ width: 80 }}>Image</th>
                  <th>URL</th>
                  <th style={{ width: 120 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((b, i) => (
                  <tr key={b.id}>
                    <td>{i + 1}</td>
                    <td>
                      <img src={b.imageUrl} alt="" style={{ width: 60 }} />
                    </td>
                    <td>{b.url}</td>
                    <td>
                      <button
                        className="tbl-btn del"
                        onClick={() => handleDelete(b.id)}
                      >
                        <FiTrash />
                      </button>
                      {/* TODO : bouton edit */}
                      <button className="tbl-btn edit">
                        <FiEdit3 />
                      </button>
                    </td>
                  </tr>
                ))}
                {banners.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "24px" }}>
                      No banner yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  };
  
  export default BannerPage;
  