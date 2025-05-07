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
import Header from '../components/Header';
import Footer from '../components/Footer';

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
            <Header className="navbar"/>
      
      <div className="support-header2">
            <div>
              <h2>How can we help you ?</h2>
              <p>We're here to support you anytime. Choose the best way to reach us.</p>
            </div>
            <div className='support-doctor-wrapper'>
            <img src={helpImage} className="support-hero2" alt="help" />
            </div>
          </div>

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
      <Footer />
    </div>
    </div>
  );
}
