// src/pages/MyBodyProjectPage.tsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/MyBodyProjectPage.css';

import bodyMineLogo from '../images/logobodymine.png';
import clinic1 from '../images/clinic1.png';
import clinic2 from '../images/clinic2.png';
import clinic3 from '../images/clinic3.png';

import {
  FiHome,
  FiLock,
  FiFileText,
  FiBookOpen,
  FiLifeBuoy,
  FiUser,
  FiLogOut,
  FiTrash2,
  FiEdit2,
  FiPlus,
  FiSearch,
} from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import { UserContext, useUser } from '../components/UserContext';

export default function MyBodyProjectPage() {
    const { user } = useContext(UserContext) || { user: null };
    const { logout } = useUser();
  /* --- données factices – remplace par tes requêtes plus tard --- */
  const projects = [
    {
      id: 1,
      title: 'My New Tooth for 2025',
      type: 'Dental Implant',
      desc: 'Dental implant procedure scheduled with Dr. Smith at Dental Excellence Center.',
      dateLabel: 'Scheduled',
      date: 'April 25, 2025',
      iconColor: '#27A8FF',
    },
    {
      id: 2,
      title: 'New Hair',
      type: 'Hair Implant',
      desc: 'FUE hair transplant procedure with Dr. Johnson at Hair Restoration Clinic.',
      dateLabel: 'Started',
      date: 'January 10, 2025',
      iconColor: '#14C38E',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [clinic1, clinic2, clinic3];

  return (
    <div className="mybody-page">
      {/* ▬▬▬▬▬▬▬▬▬▬▬  NAVBAR  ▬▬▬▬▬▬▬▬▬▬▬ */}
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
          <a  href="/search">
            <FiSearch /> Search
          </a>
        </nav>

        <div className="profile-mini">
          <span className="lang">EN ▾</span>
          <img
            className="profile-avatar"
            src="https://i.pravatar.cc/40?img=12"
            alt="Parth Ramani"
          />
          <span className="profile-name">
            {user?.first_name} {user?.last_name} <span className="status-dot">●</span>
          </span>
        </div>
      </header>

      {/* ▬▬▬▬▬▬▬▬▬▬▬  CAROUSEL  ▬▬▬▬▬▬▬▬▬▬▬ */}
      <div className="banner-carousel">
        <img src={banners[currentSlide]} alt="" />
        <div className="dots">
          {banners.map((_, i) => (
            <BsDot
              key={i}
              size={18}
              className={currentSlide === i ? 'active' : ''}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </div>

      {/* ▬▬▬▬▬▬▬▬▬▬▬  CONTENU  ▬▬▬▬▬▬▬▬▬▬▬ */}
      <main className="content-grid">
        {/* ───── Sidebar ───── */}
        <aside className="side-menu">
          {/* petit “Hello” */}
          <div className="hello-card">
            <img
              src="https://i.pravatar.cc/64?img=12"
              alt="avatar"
              className="hello-avatar"
            />
            <div>
              <p className="hello-hi">Hello</p>
              <p className="hello-name">{user?.first_name} {user?.last_name}</p>
            </div>
          </div>

          {/* menu links */}
          <ul className="menu-links">
            <li>
              <Link to="/editProfile">
                <FiUser /> Edit Profile
              </Link>
            </li>
            <li>
              <Link to="/changePassword">
                <FiLock /> Change Password
              </Link>
            </li>
            <li className="active">
              <Link to="/myBodyProject">
                <FiFileText /> My Body Project
              </Link>
            </li>
            <li>
              <Link to="/CGU">
                <FiFileText /> Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/news">
                <FiBookOpen /> News & Article
              </Link>
            </li>
            <li>
              <Link to="/support">
                <FiLifeBuoy /> Support
              </Link>
            </li>
          </ul>

          {/* actions bas */}
          <button className="danger-btn">
            <FiTrash2 /> Delete Account
          </button>
          <button className="logout-btn" onClick={logout}>
            <FiLogOut /> Logout
          </button>
        </aside>

        {/* ───── Zone principale ───── */}
        <section className="projects-area">
          <div className="projects-header">
            <h1>My Body Project</h1>
            <button className="add-btn">
              <FiPlus /> Add new project
            </button>
          </div>

          <div className="greeting">
            <img
              src="https://i.pravatar.cc/48?img=33"
              alt="patient"
              className="greet-avatar"
            />
            <span>
              Hi,&nbsp;<strong>{user?.first_name} {user?.last_name}</strong>
            </span>
          </div>

          {/* cartes projets */}
          {projects.map((p) => (
            <div className="project-card" key={p.id}>
              <div
                className="project-icon"
                style={{ backgroundColor: p.iconColor }}
              >
                🦷
              </div>

              <div className="project-info">
                <h4>{p.title}</h4>
                <span className="proj-type">{p.type}</span>
                <p className="proj-desc">{p.desc}</p>
                <p className="proj-date">
                  {p.dateLabel} : {p.date}
                </p>
              </div>

              <div className="project-actions">
                <FiEdit2 className="act act-edit" />
                <FiTrash2 className="act act-del" />
                <Link to={`/mybody/${p.id}`} className="view-link">
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* ▬▬▬▬▬▬▬▬▬▬▬  FOOTER  ▬▬▬▬▬▬▬▬▬▬▬ */}
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
