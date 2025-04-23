// src/pages/EditProfilePage.tsx
import React, { useState, useContext } from 'react';
import '../assets/EditProfile.css';
import { FiCalendar } from 'react-icons/fi';
import bodyMineLogo from '../images/logobodymine.png';
import { UserContext } from "../components/UserContext";

export default function EditProfilePage() {
    const { user, updateUser } = useContext(UserContext) || { user: null, updateUser: () => {} };
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
    weight_kg: user?.weight_kg || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  try {
    if (!user?.patient_id) throw new Error("User ID not found");

    const res = await fetch(`/api/patients/${user.patient_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Erreur lors de la mise à jour');
    }

    const updatedUser = await res.json();
updateUser(updatedUser); // met à jour le contexte + localStorage


    alert("Profil mis à jour avec succès !");
  } catch (err: any) {
    alert(err.message);
  }
};
  

  return (
    <div className="page">
      <header className="navbar">
        <div className="nav-left">
          <div className="logo">
            <img src={bodyMineLogo} alt="BodyMine" />
          </div>
          <nav className="menu">
            <a className="active" href="/home">Home</a>
            <a href="/chat">Chat</a>
            <a href="/search">Search</a>
          </nav>
        </div>
        <div className="nav-right">
          <span className="lang">EN ▾</span>
          <div className="profile">
            <img src="https://i.pravatar.cc/32?img=12" alt="avatar" className="avatar" />
            <div>
              <span className="name">{user?.first_name} {user?.last_name}</span><br />
              <span className="status">Online</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <aside className="sidebar">
          <div className="sidebar-header">
            <img src="https://i.pravatar.cc/48" alt="Avatar" className="avatar-large" />
            <div>
              Hello<br />
              <strong>{user?.first_name} {user?.last_name}</strong>
            </div>
          </div>
          <ul>
            <li><a className="active">Edit Profile</a></li>
            <li><a>Change Password</a></li>
            <li><a>My Body Project</a></li>
            <li><a href='/CGU'>Terms & Conditions</a></li>
            <li><a>News & Article</a></li>
            <li><a href='/support'>Support</a></li>
          </ul>
          <button className="delete-account">Delete Account</button>
          <button className="logout">Logout</button>
        </aside>

        <section className="profile-editor">
          <h2>Edit Profile</h2>

          <div className="tabs">
            <div className={`tab ${tab === 'personal' ? 'active' : ''}`} onClick={() => setTab('personal')}>Personal</div>
            <div className={`tab ${tab === 'bmi' ? 'active' : ''}`} onClick={() => setTab('bmi')}>BMI</div>
          </div>

          <form className="form-grid">
            {tab === 'personal' && (
              <>
                <label>
                  First Name
                  <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Enter Value" />
                </label>
                <label>
                  Surname
                  <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Enter Value" />
                </label>
                <label>
                  Address
                  <input name="address" value={form.address} onChange={handleChange} placeholder="Enter address" />
                </label>
                <label>
                  Email
                  <input name="email" value={form.email} onChange={handleChange} placeholder="Enter Value" />
                </label>
                <label>
                  Date of birth
                  <div style={{ position: 'relative' }}>
                  <input
  type="date"
  name="birth_date"
    value={form.birth_date instanceof Date ? form.birth_date.toISOString().split('T')[0] : form.birth_date}
  onChange={handleChange}
/>

                    <FiCalendar className="icon" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  </div>
                </label>
                <label>
                  Phone Number
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ background: '#eee', padding: '10px', border: '1px solid #ccc', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>+213</span>
                    <input
                      name="phone_number"
                      value={form.phone_number}
                      onChange={handleChange}
                      placeholder="912000000"
                      style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    />
                  </div>
                </label>
                <label>
                  Country
                  <select name="country" value={form.country} onChange={handleChange}>
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
                  <input name="blood_group" value={form.blood_group} onChange={handleChange} placeholder="e.g. A+, O-" />
                </label>
                <label>
                  Height (cm)
                  <input name="height_cm" value={form.height_cm} onChange={handleChange} type="number" placeholder="180" />
                </label>
                <label>
                  Weight (kg)
                  <input name="weight_kg" value={form.weight_kg} onChange={handleChange} type="number" placeholder="75" />
                </label>
              </>
            )}
          </form>

          <button className="save-btn" onClick={handleSave}>Save</button>
          </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-block">
            <img src={bodyMineLogo} alt="BodyMine" className="footer-logo" />
            <p>
              Bodymine is the leading directory to help you find the perfect surgeon or clinic, anywhere in the world.
            </p>
            <div className="social-icons">
              <span>🔵</span>
              <span>🔦</span>
              <span>▶️</span>
            </div>
          </div>
          <div className="footer-block">
            <h4>Home</h4>
            <ul>
              <li>Menu</li>
              <li>Chat</li>
              <li>Search</li>
            </ul>
          </div>
          <div className="footer-block">
            <h4>Info</h4>
            <ul>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="footer-block">
            <h4>Contact Us</h4>
            <p>info@bodymine.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
