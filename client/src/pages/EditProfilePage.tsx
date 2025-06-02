// src/pages/EditProfilePage.tsx
import React, { useState, useContext,  useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/MyBodyProjectPage.css';          // on réutilise les styles
import '../assets/EditProfile.css';                // (ta grille du formulaire)
import ConfirmationModal from '../components/ConfirmationModal';

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
import { allCountries } from 'country-telephone-data'; 

export default function EditProfilePage() {
  const { user, updateUser , token} =
    useContext(UserContext) || ({ user: null, updateUser: () => {} } as any); const navigate = useNavigate();
    const { logout } = useUser();
  
  // États pour les modales de confirmation
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
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
      const europeanCountries = [
    'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan',
    'Belarus', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus',
    'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France',
    'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland',
    'Ireland', 'Italy', 'Lithuania', 'Luxembourg', 'Malta',
    'Moldova', 'Monaco', 'Montenegro', 'North Macedonia',
    'Norway', 'Poland', 'Portugal', 'Romania', 'Serbia',
    'Turkey'
  ]
    const isMobile = useBreakpoint();
  const countryCodes = allCountries.map((c: any) => `+${c.dialCode}`);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSave = async () => {
  try {
    if (!user?.patient_id) throw new Error('User ID not found');

    const authHeader: HeadersInit = {};
    if (token) authHeader['Authorization'] = `Bearer ${token}`;

    /* ---------------- 1)  Upload de la photo (si modifiée) ------------- */
    if (avatarFile) {
      const fd = new FormData();
      fd.append('photo', avatarFile);

      const photoRes = await fetch('/api/patients/photo', {
        method: 'POST',
        headers: authHeader,
        body: fd,
      });
      const updatedPhoto = await photoRes.json();
      form.photo_url=updatedPhoto.photo_url;
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

    /* ---------------- 3)  Re-fetch complet du profil ------------------ */
    const finalRes = await fetch(`/api/patients/${user.patient_id}`, {
      headers: authHeader,
    });

    if (!finalRes.ok) throw new Error('Failed to fetch updated profile');

    const fullUpdatedUser = await finalRes.json();
    console.log(fullUpdatedUser)
    updateUser(fullUpdatedUser); // ✅ mise à jour complète du contexte

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

  setAvatarFile(file);                         // tu l'enverras dans handleSave
  setPhotoPreview(URL.createObjectURL(file));  // preview immédiat
}

// Fonction pour supprimer le compte utilisateur
const handleDeleteAccount = async () => {
  try {
    if (!user?.patient_id) throw new Error('User ID not found');

    const authHeader: HeadersInit = {};
    if (token) authHeader['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`/api/patients/${user.patient_id}`, {
      method: 'DELETE',
      headers: authHeader
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || 'Delete account error');
    }

    // Déconnexion après suppression réussie
    logout();
  } catch (err: any) {
    alert(err.message);
  }
};

// Fonction pour gérer la déconnexion avec confirmation
const handleLogoutConfirm = () => {
  setShowLogoutModal(false);
  logout();
};

console.log(user?.photo_url)

  /* ===================================================================== */
  return (

    <>
    {/* Modaux de confirmation */}
    <ConfirmationModal
      isOpen={showLogoutModal}
      type="logout"
      onConfirm={handleLogoutConfirm}
      onCancel={() => setShowLogoutModal(false)}
    />

    <ConfirmationModal
      isOpen={showDeleteModal}
      type="delete"
      onConfirm={handleDeleteAccount}
      onCancel={() => setShowDeleteModal(false)}
    />
    
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
              src={user?.photo_url}
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
          </ul>          <button className="danger-btn" onClick={() => setShowDeleteModal(true)}>
            <FiTrash2 /> Delete Account
          </button>
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            <FiLogOut /> Logout
          </button>
        </aside>

        {/* ——— FORMULAIRE ——— */}
        <section className="profile-editor">
          <h1>Edit Profile</h1>
    {/* ────── Photo + bouton caméra ────── */}
   <div className="profile-photo-row">
  {/* Avatar + bouton photo */}
  <div className="photo-upload-wrapper">
    <div className="profile-photo">
      <img src={photoPreview} alt="Profile" />
      <label htmlFor="photo-upload" className="photo-upload-btn" title="Change photo">
        <FiCamera />
      </label>
    </div>
    <input
      id="photo-upload"
      type="file"
      accept="image/*"
      hidden
      onChange={handlePhotoChange}
    />
  </div>

  {/* Onglets */}
  <div className="tabs-container">
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
  </div>
</div>

         <form className="form-grid">
  {tab === 'personal' && (
    <>
      {/* ── Colonne de gauche ── */}
      <div className="column personal-column">
        <h3>Personal</h3>

        {/* First Name + Surname côte-à-côte */}
        <div className="two-inputs">
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
        </div>

        {/* Address plein largeur */}
        <label>
          Address
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </label>

        {/* Date of birth plein largeur */}
        <label>
          Date of birth
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
      </div>

      {/* ── Colonne de droite ── */}
      <div className="column contact-column">
        <h3>Contact</h3>

        {/* Email plein largeur */}
        <label>
          Email
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter value"
          />
        </label>

        {/* Code pays + numéro côte-à-côte */}
      <label>
              Phone Number
              <div className="phone-group">
                <select
                  name="phone_code"
                  
                  onChange={handleChange}
                  className="phone-code"
                >
                  {countryCodes.map((code: any) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <input
                  name="phone_number"
                  className="phone-input"
                  value={form.phone_number}
                  onChange={handleChange}
                  placeholder="912000000"
                />
              </div>
            </label>

        {/* Country plein largeur */}
            <label>
              Country
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {europeanCountries.map(name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
      </div>
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
          src={photoPreview || 'https://i.pravatar.cc/96?u=patient'}
          className="avatar"
          alt="avatar"
        />
        <button className="photo-btn" onClick={handlePhotoChange  }>
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
