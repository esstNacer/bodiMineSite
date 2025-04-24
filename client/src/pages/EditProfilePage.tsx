// src/pages/EditProfilePage.tsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
} from 'react-icons/fi';

import bodyMineLogo from '../images/logobodymine.png';
import clinic1 from '../images/clinic1.png';
import clinic2 from '../images/clinic2.png';
import clinic3 from '../images/clinic3.png';

import { UserContext, useUser } from '../components/UserContext';
import { BsDot } from 'react-icons/bs';

export default function EditProfilePage() {
  const { user, updateUser } =
    useContext(UserContext) || ({ user: null, updateUser: () => {} } as any);
    const { logout } = useUser();
  /* ------- carrousel ------- */
  const [slide, setSlide] = useState(0);
  const banners = [clinic1, clinic2, clinic3];

  /* ------- formulaire ------- */
  const [tab, setTab] = useState<'personal' | 'bmi'>('personal');
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    address: user?.address || '',
    phone_number: user?.phone_number || '',
    birth_date: user?.birth_date || '',
    country: user?.country || '',
    blood_group: user?.blood_group || '',
    height_cm: user?.height_cm || '',
    weight_kg: user?.weight_kg || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      if (!user?.patient_id) throw new Error('User ID not found');

      const res = await fetch(`/api/patients/${user.patient_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Update error');

      const updated = await res.json();
      updateUser(updated);
      alert('Profile updated ✔️');
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* ===================================================================== */
  return (
    <div className="mybody-page">
      {/* ▬▬▬ NAVBAR ▬▬▬ */}
      <header className="navbar">
        <div className="logo">
          <img src={bodyMineLogo} alt="BodyMine Cosmetic Surgery" />
        </div>

        <nav className="main-nav">
          <a href="/home">
            <FiHome /> Home
          </a>
          <a href="/chat">
            <FiSearch /> Chat
          </a>
          <a href="/search">
            <FiSearch /> Search
          </a>
        </nav>

        <div className="profile-mini">
          <span className="lang">EN ▾</span>
          <Link to="/editProfile" style={{ display: 'flex', gap: 8 }}>
            <img
              className="profile-avatar"
              src="https://i.pravatar.cc/40?img=12"
              alt="avatar"
            />
            <span className="profile-name">
              {user?.first_name} {user?.last_name} <span className="status-dot">●</span>
            </span>
          </Link>
        </div>
      </header>

      {/* ▬▬▬ CARROUSEL ▬▬▬ */}
      <div className="banner-carousel">
        <img src={banners[slide]} alt="" />
        <div className="dots">
          {banners.map((_, i) => (
            <BsDot
              key={i}
              size={18}
              className={slide === i ? 'active' : ''}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>

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
      <footer className="footer">
        <div className="footer-wrap">
          <div className="footer-brand">
            <img src={bodyMineLogo} alt="BodyMine" />
            <p>
              Bodymine is the leading directory to help you find the perfect
              surgeon or clinic, anywhere in the world.
            </p>
          </div>

          <div className="footer-col">
            <h4>Home</h4>
            <ul>
              <li>Menu</li>
              <li>Chat</li>
              <li>Search</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Info</h4>
            <ul>
              <li>Terms &amp; Conditions</li>
              <li>Privacy Policy</li>
              <li>FAQs</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <p>info@bodymine.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
