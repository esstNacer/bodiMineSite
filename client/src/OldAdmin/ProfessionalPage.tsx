// src/pages/admin/ProfessionalPage.tsx
import React, {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { Link } from "react-router-dom";
import {
  FiChevronRight,
  FiTrash,
  FiEdit3,
  FiUserPlus,
} from "react-icons/fi";

import AdminSidebar from "./AdminSidebar";
import "./styles/ProfessionalPage.css"; // (optionnel : tu peux l’omettre si tu ré-emploies déjà tes classes globales)

/* ─────────────── types ─────────────── */
interface Professional {
  professional_id: number;
  full_name: string;
  clinic_name: string | null;
  city: string | null;
  country: string | null;
  email: string;
  phone_number: string | null;
  specialization: string | null;
  practice_tenure: number | null;
  practice_start_date: string | null; // YYYY-MM-DD
  type: string | null;
  is_premium: boolean;
}

/* ---------- types ---------- */
type FormState = {
  full_name: string;
  clinic_name: string;
  city: string;
  country: string;
  email: string;
  password: string;            // ← ajouté
  phone_number: string;
  specialization: string;
  practice_tenure: number;
  practice_start_date: string; // YYYY-MM-DD
  type: string;
  is_premium: boolean;
};



/* ─────────────── constantes API ─────────────── */
const API_BASE = "/api/professional"; // => à adapter si besoin

/* ─────────────── composant ─────────────── */
const ProfessionalPage: FC = () => {
  /* ------- state ------- */
  const [pros, setPros] = useState<Professional[]>([]);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  

/* ---------- blankForm ---------- */
const blankForm: FormState = {
  full_name: "",
  clinic_name: "",
  city: "",
  country: "",
  email: "",
  password: "",                // ← ajouté
  phone_number: "",
  specialization: "",
  practice_tenure: 0,
  practice_start_date: "",
  type: "",
  is_premium: false,
};

  const [form, setForm] = useState<FormState>(blankForm);
  

  /* ------- helpers ------- */
/* ---------- handleChange ---------- */
const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type, checked } = e.target as HTMLInputElement;
  setForm(prev => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? checked
        : type === "number"
        ? +value             // convertit en nombre pour practice_tenure
        : value,
  }));
};

  const resetForm = () => {
    setForm(blankForm);
    setEditingId(null);
  };

  /* ------- fetch list ------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API_BASE);
        const data = await res.json();
        setPros(data); // supposé [{...Professional}]
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  /* ------- submit (add or update) ------- */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const saved: Professional = await res.json();

      setPros((prev) =>
        editingId
          ? prev.map((p) =>
              p.professional_id === editingId ? saved : p
            )
          : [...prev, saved]
      );
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’enregistrement");
    } finally {
      setSaving(false);
    }
  };

  /* ------- delete ------- */
  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer ce professionnel ?")) return;
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setPros((prev) => prev.filter((p) => p.professional_id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  /* ------- edit ------- */
/* ---------- startEdit ---------- */
const startEdit = (pro: Professional) => {
  setEditingId(pro.professional_id);
  setForm({
    full_name: pro.full_name,
    clinic_name: pro.clinic_name ?? "",
    city: pro.city ?? "",
    country: pro.country ?? "",
    email: pro.email,
    password: "",                    // on laisse vide en édition
    phone_number: pro.phone_number ?? "",
    specialization: pro.specialization ?? "",
    practice_tenure: pro.practice_tenure ?? 0,
    practice_start_date: pro.practice_start_date ?? "",
    type: pro.type ?? "",
    is_premium: pro.is_premium,
  });
};


  /* ------- render ------- */
  return (
    <div className="admin-wrapper">
      <AdminSidebar active="professionals" />

      <main className="admin-main">
        {/* breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/admin">Dashboard</Link>
          <FiChevronRight />
          <span>Professionals</span>
        </nav>

        <h1 className="page-title">Professionals</h1>

        {/* ----- Add / Edit form ----- */}
        <form className="card add-banner-form" onSubmit={handleSubmit}>
          <h3>
            <FiUserPlus /> {editingId ? "Edit Professional" : "Add Professional"}
          </h3>

          {/* 1 colonne (pour garder un exemple compact) */}
          <label className="form-label">Full name*</label>
          <input
            className="form-input"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />

          <label className="form-label">Clinic name</label>
          <input
            className="form-input"
            name="clinic_name"
            value={form.clinic_name}
            onChange={handleChange}
          />

          <div className="two-cols">
            <div>
              <label className="form-label">City</label>
              <input
                className="form-input"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label"> Country</label>
                <select className="form-input" name="country" value={form.country} onChange={handleChange} >
                <option value="">Select Country</option>
                <option>Albania</option>
                <option>Andorra</option>
                <option>Armenia</option>
                <option>Austria</option>
                <option>Azerbaijan</option>
                <option>Belarus</option>
                <option>Belgium</option>
                <option>Bulgaria</option>
                <option>Croatia</option>
                <option>Cyprus</option>
                <option>Czech Republic</option>
                <option>Denmark</option>
                <option>Estonia</option>
                <option>Finland</option>
                <option>France</option>
                <option>Georgia</option>
                <option>Germany</option>
                <option>Greece</option>
                <option>Hungary</option>
                <option>Iceland</option>
                <option>Ireland</option>
                <option>Italy</option>
                <option>Lithuania</option>
                <option>Luxembourg</option>
                <option>Malta</option>
                <option>Moldova</option>
                <option>Monaco</option>
                <option>Montenegro</option>
                <option>North Macedonia</option>
                <option>Norway</option>
                <option>Poland</option>
                <option>Portugal</option>
                <option>Romania</option>
                <option>Serbia</option>
                <option>Turkey</option>
                </select>
            </div>
          </div>

          <label className="form-label">Email*</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="form-label">Password*</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={(form as any).password ?? ""}
            onChange={handleChange}
            required={!editingId} // pas obligatoire en édition
          />

          <label className="form-label">Phone number</label>
          <input
            className="form-input"
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
          />
<label className="form-label">Specialization</label>
          <select
            className="form-input"
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
          >
            <option value="">Select Specialization</option>
                  <option >Breast surgery</option>
                  <option >Facial surgery</option>
                  <option >Liposuction</option>
                  <option >Abdominoplasty</option>
                  <option >Dental care</option>
                  <option>Buttock surgery</option>
                  <option >Hair surgery</option>
                  <option>Hand Surgery</option>
                  <option>Ear surgery</option>
                  <option>Intimate surgery</option>
                  <option>Reconstructive surgery</option>
                  <option >Non surgical treatments</option>
          </select>
          <div className="two-cols">
            <div>
              <label className="form-label">Practice tenure (years)</label>
              <input
                className="form-input"
                type="number"
                min={0}
                name="practice_tenure"
                value={form.practice_tenure}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">Practice start date</label>
              <input
                className="form-input"
                type="date"
                name="practice_start_date"
                value={form.practice_start_date}
                onChange={handleChange}
              />
            </div>
          </div>

          <label className="form-label">Type</label>
          <select
            className="form-input"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="">— Select —</option>
            <option value="clinic">clinic</option>
            <option value="doctor">doctor</option>
          </select>

          <label className="form-label checkbox">
            <input
              type="checkbox"
              name="is_premium"
              checked={form.is_premium}
              onChange={handleChange}
            />
            Premium
          </label>

          {/* bouton save / cancel */}
          <div className="save-row">
            {editingId && (
              <button
                type="button"
                className="btn light"
                onClick={resetForm}
                disabled={saving}
              >
                Cancel
              </button>
            )}
            <button className="btn primary" disabled={saving}>
              {saving
                ? "Saving…"
                : editingId
                ? "Update"
                : "Save"}
            </button>
          </div>
        </form>

        {/* ----- list table ----- */}
        <div className="card banner-table">
          <table>
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th style={{ width: 160 }}>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Specialization</th>
                <th style={{ width: 120 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {pros.map((p, i) => (
                <tr key={p.professional_id}>
                  <td>{i + 1}</td>
                  <td>{p.full_name}</td>
                  <td>{p.email}</td>
                  <td>{p.city ?? "—"}</td>
                  <td>{p.specialization ?? "—"}</td>
                  <td>
                    <button
                      className="tbl-btn edit"
                      onClick={() => startEdit(p)}
                    >
                      <FiEdit3 />
                    </button>
                    <button
                      className="tbl-btn del"
                      onClick={() => handleDelete(p.professional_id)}
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {pros.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 24 }}>
                    No professionals yet.
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

export default ProfessionalPage;
