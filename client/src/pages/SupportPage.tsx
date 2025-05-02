// src/pages/SupportPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  FiMail,
  FiPaperclip,
} from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';

import '../assets/MyBodyProjectPage.css';   // même grille / sidebar / bannière
import '../assets/SupportPage.css';         // (juste quelques règles pour le formulaire)

import bodyMineLogo from '../images/logobodymine.png';
import clinic1 from '../images/clinic1.png';
import clinic2 from '../images/clinic2.png';
import clinic3 from '../images/clinic3.png';
import helpImage   from '../images/help.png';
import { useUser } from '../components/UserContext';

export default function SupportPage() {
  const { user } = useUser();
  const { logout } = useUser();
  /* ---------- carrousel ---------- */
  const banners = [clinic1, clinic2, clinic3];
  const [slide, setSlide] = useState(0);

  return (
    <div className="home-wrapper">

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

      {/* ▬▬▬ BANNIÈRE ▬▬▬ */}

      {/* ▬▬▬ CONTENU ▬▬▬ */}
      <main className="content-grid">
        {/* -------- SIDEBAR -------- */}
        <aside className="side-menu">
          <div className="hello-card">
            <img src="https://i.pravatar.cc/64?img=12" className="hello-avatar" alt="avatar" />
            <div>
              Hello <br />
              <strong>{user?.first_name} {user?.last_name}</strong>
            </div>
          </div>

          <ul className="menu-links">
            <li>
              <Link to="/editProfile"><FiUser /> Edit Profile</Link>
            </li>
            <li>
              <Link to="/changePassword"><FiLock /> Change Password</Link>
            </li>
            <li>
              <Link to="/myBodyProject"><FiFileText /> My Body Project</Link>
            </li>
            <li>
              <Link to="/CGU"><FiFileText /> Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to="/news"><FiBookOpen /> News &amp; Article</Link>
            </li>
            <li className="active">
              <Link to="/support"><FiLifeBuoy /> Support</Link>
            </li>
          </ul>

          <button className="danger-btn"><FiTrash2 /> Delete Account</button>
          <button className="logout-btn" onClick={logout}><FiLogOut /> Logout</button>
        </aside>

        {/* -------- ZONE SUPPORT -------- */}
        <section className="support-zone">
          {/* entête */}
          <div className="support-header">
            <div>
              <h2>How can we help you ?</h2>
              <p>We're here to support you anytime. Choose the best way to reach us.</p>
            </div>
            <img src={helpImage} className="support-hero" alt="help" />
          </div>

          {/* grille 2 colonnes */}
          <div className="support-grid">
            {/* ----- colonne gauche ----- */}
            <div className="left-col">
              <div className="support-form">
                <h3><FiMail /> Send a Message</h3>
                <form>
                  <input type="text" placeholder="Your name" />
                  <input type="text" placeholder="Subject" />
                  <textarea placeholder="Your message" rows={5}></textarea>

                  <label className="attach">
                    <FiPaperclip /> Attach file
                    <input type="file" hidden />
                  </label>

                  <button className="btn primary">Send Message</button>
                </form>
              </div>

              <div className="email-box">
                <h3><FiMail /> Email Us</h3>
                <input type="text" value="support@bodymine.com" readOnly />
              </div>
            </div>

            {/* ----- FAQ ----- */}
            <aside className="faq-box">
              <h3>Frequently Asked Questions</h3>
              <details>
                <summary>FAQ</summary>
                <Link to="/faq"><p>Answers to common questions.</p></Link>
              </details>
              <details>
                <summary>Data Privacy</summary>
                <Link to="/dataPrivacy"><p>We care about your data. Here's how we protect it.</p></Link>
              </details>
              <details>
                <summary>Terms &amp; Conditions</summary>
                <Link to="/CGU"><p>Please read our T&amp;C before using our service.</p></Link>
              </details>
            </aside>
          </div>
        </section>
      </main>

      {/* ▬▬▬ FOOTER ▬▬▬ */}
      <footer className="footer">
        <div className="footer-wrap">
          <div className="footer-brand">
            <img src={bodyMineLogo} alt="BodyMine" />
            <p>Bodymine is the leading directory to help you find the perfect surgeon or clinic, anywhere in the world.</p>
          </div>

          <div className="footer-col">
            <h4>Home</h4>
            <ul><li>Menu</li><li>Chat</li><li>Search</li></ul>
          </div>

          <div className="footer-col">
            <h4>Info</h4>
            <ul><li>Terms &amp; Conditions</li><li>Privacy Policy</li><li>FAQs</li></ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <p>info@bodymine.com</p>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
}
