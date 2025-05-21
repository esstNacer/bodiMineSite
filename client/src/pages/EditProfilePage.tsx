// src/pages/EditProfilePage.tsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/MyBodyProjectPage.css';          // on réutilise les styles
import '../assets/EditProfile.css';                // (ta grille du formulaire)

import {
  FiHome,
  FiSearch,
  FiUser,
  FiLock,
  FiFileText,
  FiBookOpen,
  FiLifeBuoy,
  FiTrash2,
  FiLogOut,
  FiCalendar,
  FiArrowLeft,
  FiCamera,
  FiChevronDown,
} from 'react-icons/fi';

import bodyMineLogo from '../images/LogoBODYMINE.png';
import clinic1 from '../images/clinic1.png';
import clinic2 from '../images/clinic2.png';
import clinic3 from '../images/clinic3.png';

import { UserContext, useUser } from '../components/UserContext';
import { BsDot } from 'react-icons/bs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import useBreakpoint from '../hooks/useBreakpoint';

export default function EditProfilePage() {
  const { user, updateUser , token} =
    useContext(UserContext) || ({ user: null, updateUser: () => {} } as any); const navigate = useNavigate();
    const { logout } = useUser();
  /* ------- carrousel ------- */
  const [slide, setSlide] = useState(0);
  const banners = [clinic1, clinic2, clinic3];
    const carousel = [
      { src: clinic1, alt: "New Clinic Dental Care" },
      { src: clinic2, alt: "Cosmetic Surgery" },
      { src: clinic3, alt: "New Cosmetic Surgery Website" },
    ];

  /* ------- formulaire ------- */
  const [tab, setTab] = useState<'personal'|'bmi'>('personal'); 
    const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    address: user?.address || '',
    phone_number: user?.phone_number || '',
    photo_url: user?.photo_url || '',
    gender: user?.gender || '',
    birth_date: user?.birth_date || '',
    country: user?.country || '',
    blood_group: user?.blood_group || '',
    height_cm: user?.height_cm || '',
    weight_kg: user?.weight_kg || '',
    favorite_specialization: user?.favorite_specialization || '',
    });
    const isMobile = useBreakpoint();
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSave = async () => {
  try {
    if (!user?.patient_id) throw new Error('User ID not found');

    /* ---------------- Token pour les requêtes protégées ---------------- */
const authHeader: HeadersInit = {};
console.log(token);
if (token) authHeader['Authorization'] = `Bearer ${token}`;

    /* ---------------- 1)  Upload de la photo (si modifiée) ------------- */
    if (avatarFile) {
      const fd = new FormData();
      fd.append('photo', avatarFile);

      const photoRes = await fetch('/api/patients/photo', {
        method: 'POST',
        headers: authHeader,      // NE PAS fixer Content-Type → FormData gère tout
        body: fd,
      });

      if (!photoRes.ok) {
        const { error } = await photoRes.json();
        throw new Error(error || 'Photo upload error');
      }
    }

    /* ---------------- 2)  Mise à jour des autres champs ---------------- */
    const infoRes = await fetch(`/api/patients/${user.patient_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      body: JSON.stringify(form),
    });

    if (!infoRes.ok) {
      const { error } = await infoRes.json();
      throw new Error(error || 'Update error');
    }

    /* ---------------- 3)  Contexte utilisateur à jour ------------------ */
    const updated = await infoRes.json();
    updateUser(updated);          // contexte / Redux / Zustand, etc.
    alert('Profile updated ✔️');
  } catch (err: any) {
    alert(err.message);
  }
};



  const [photoPreview, setPhotoPreview] = useState(form.photo_url);
const [avatarFile, setAvatarFile] = useState(null);

function handlePhotoChange(e:any) {
  const file = e.target.files[0];
  if (!file) return;

  setAvatarFile(file);                         // tu l’enverras dans handleSave
  setPhotoPreview(URL.createObjectURL(file));  // preview immédiat
}

  /* ===================================================================== */
  return (

    <>
    {!isMobile && (
    <div className="home-wrapper">

    <div className="mybody-page">
      {/* ▬▬▬ NAVBAR ▬▬▬ */}
            <Header className="navbar"/>
      

      {/* ▬▬▬ CARROUSEL ▬▬▬ */}
      <section className="home carousel">
        <div className="home carousel-inner">
          {carousel.map((item, i) => (
            <img key={i} src={item.src} alt={item.alt} className={i === slide ? "active" : ""} />
          ))}
        </div>
      </section>

      {/* ▬▬▬ GRILLE ▬▬▬ */}
      <main className="content-grid">
        {/* ——— SIDEBAR ——— */}
        <aside className="side-menu">
          <div className="hello-card">
            <img
              src="https://i.pravatar.cc/64?img=12"
              className="hello-avatar"
              alt="avatar"
            />
            <div>
              Hello <br />
              <strong>{user?.first_name} {user?.last_name}</strong>
            </div>
          </div>

          <ul className="menu-links">
            <li className="active">
              <Link to="/editProfile">
                <FiUser /> Edit Profile
              </Link>
            </li>
            <li>
              <Link to="/changePassword">
                <FiLock /> Change Password
              </Link>
            </li>
            <li>
              <Link to="/myBodyProject">
                <FiFileText /> My Body Project
              </Link>
            </li>
            <li>
              <Link to="/CGU">
                <FiFileText /> Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link to="/news">
                <FiBookOpen /> News &amp; Article
              </Link>
            </li>
            <li>
              <Link to="/support">
                <FiLifeBuoy /> Support
              </Link>
            </li>
          </ul>

          <button className="danger-btn">
            <FiTrash2 /> Delete Account
          </button>
          <button className="logout-btn" onClick={logout}>
            <FiLogOut /> Logout
          </button>
        </aside>

        {/* ——— FORMULAIRE ——— */}
        <section className="profile-editor">
          <h1>Edit Profile</h1>
    {/* ────── Photo + bouton caméra ────── */}
    <div className="profile-photo-row">
      <div className="profile-photo">
        <img src={photoPreview} alt="Profile" />
      </div>

      {/* input file caché + icône clickable */}
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        hidden
        onChange={handlePhotoChange}
      />
      <label htmlFor="photo-upload" className="photo-upload-btn" title="Change photo">
        <FiCamera />
      </label>
    </div>
          <div className="tabs">
            <div
              className={tab === 'personal' ? 'tab active' : 'tab'}
              onClick={() => setTab('personal')}
            >
              Personal
            </div>
            <div
              className={tab === 'bmi' ? 'tab active' : 'tab'}
              onClick={() => setTab('bmi')}
            >
              BMI
            </div>
          </div>

          <form className="form-grid">
            {tab === 'personal' && (
              <>
                <label>
                  First Name
                  <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="Enter value"
                  />
                </label>
                <label>
                  Surname
                  <input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Enter value"
                  />
                </label>
                <label>
                  Address
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter value"
                  />
                </label>
                <label>
                  Date of birth
                  <div className="with-icon">
                    <input
                      type="date"
                      name="birth_date"
                      value={
                        form.birth_date instanceof Date
                          ? form.birth_date.toISOString().split('T')[0]
                          : form.birth_date
                      }
                      onChange={handleChange}
                    />
                    <FiCalendar className="icon" />
                  </div>
                </label>
                <label>
                  Phone Number
                  <div className="phone-field">
                    <span>+213</span>
                    <input
                      name="phone_number"
                      value={form.phone_number}
                      onChange={handleChange}
                      placeholder="912000000"
                    />
                  </div>
                </label>
                <label>
                  Country
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="USA">USA</option>
                  </select>
                </label>
              </>
            )}

            {tab === 'bmi' && (
              <>
                <label>
                  Blood Group
                  <input
                    name="blood_group"
                    value={form.blood_group}
                    onChange={handleChange}
                    placeholder="e.g. A+"
                  />
                </label>
                <label>
                  Height (cm)
                  <input
                    name="height_cm"
                    type="number"
                    value={form.height_cm}
                    onChange={handleChange}
                    placeholder="180"
                  />
                </label>
                <label>
                  Weight (kg)
                  <input
                    name="weight_kg"
                    type="number"
                    value={form.weight_kg}
                    onChange={handleChange}
                    placeholder="75"
                  />
                </label>
              </>
            )}
          </form>

          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </section>
      </main>

      {/* ▬▬▬ FOOTER (identique) ▬▬▬ */}
      <Footer />
    </div>
    </div>
     )}
    {isMobile && (
  <div className="edit-profile-mobile">

    {/* ───── header ───── */}
    <header className="ep-header">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft />
      </button>

      <div>
        <h1>Account Settings</h1>
        <p className="hint">
          *Your profile is confidential. No one except you, can see your profile.
        </p>
      </div>
    </header>

    {/* ───── tabs ───── */}
    <div className="ep-tabs">
      <button
        className={tab === 'personal' ? 'tab active' : 'tab'}
        onClick={() => setTab('personal')}
      >
        Personal
      </button>
      <button
        className={tab === 'bmi' ? 'tab active' : 'tab'}
        onClick={() => setTab('bmi')}
      >
        BMI
      </button>
    </div>

    {/* ───── avatar + bouton photo ───── */}
    {tab === 'personal' && (
      <div className="avatar-block">
        <img
          src={/*form.photo_url ||*/ 'https://i.pravatar.cc/96?u=patient'}
          className="avatar"
          alt="avatar"
        />
        <button className="photo-btn" /*onClick={handleChangePhoto /* à toi }*/>
          <FiCamera />  Change Profile Picture
        </button>
      </div>
    )}

    {/* ───── formulaire ───── */}
    <form className="ep-form">
      {tab === 'personal' ? (
        <>
          <label className="ep-field">
            <span className="ep-legend">First Name</span>
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
          </label>

          <label className="ep-field">
            <span className="ep-legend">Last Name</span>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
          </label>

          <label className="ep-field">
            <span className="ep-legend">Email</span>
            <input
              name="email"
              value={form.email}
              disabled
            />
          </label>

          {/* phone avec indicatif */}
          {<label className="phone-field">
            <span className="ep-legend">Phone Number</span>
            <input
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              placeholder="81313782626"
            />
          </label>}

          <label className="ep-field">
            <span className="ep-legend">Address</span>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </label>

          <label className="ep-field">
            <span className="ep-legend">Country</span>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
            />
          </label>

          <label className="ep-field">
            <span className="ep-legend">Birth Date</span>
            <input
              type="date"
              name="birth_date"
              value={
                form.birth_date instanceof Date
                  ? form.birth_date.toISOString().split('T')[0]
                  : form.birth_date
              }
              onChange={handleChange}
            />
          </label>
        </>
      ) : (
        /* ==== BMI TAB ==== */
        <>
         

          <label className="ep-field">
            <span className="ep-legend">Blood Group</span>
            <input
              name="blood_group"
              value={form.blood_group}
              onChange={handleChange}
            />
          </label>

          <label className="ep-field">
            <span className="ep-legend">Height (in cm)</span>
            <input
              type="number"
              name="height_cm"
              value={form.height_cm}
              onChange={handleChange}
            />
          </label>

          <label className="ep-field">
            <span className="ep-legend">Weight (in kg)</span>
            <input
              type="number"
              name="weight_kg"
              value={form.weight_kg}
              onChange={handleChange}
            />
          </label>

          <label className="ep-field">
            <span className="ep-legend">Gender</span>
            <input
              name="gender"
              value={form.gender}
              onChange={handleChange}
            />
          </label>

          <label className="ep-field">
            <span className="ep-legend">Favorite Specialization</span>
            <select
              name="favorite_specialization"
              value={form.favorite_specialization}
              onChange={handleChange}
            >
              <option value="Dentist">Dentist</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Cardiology">Cardiology</option>
            </select>
          </label>
        </>
      )}
    </form>

    <button className="save-btn" onClick={handleSave}>
      Save Changes
    </button>

  </div>
)}
             </>
  );
}
