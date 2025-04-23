// src/pages/FaqPage.tsx
import React from 'react';
import '../assets/FaqPage.css';
import bodyMineLogo from '../images/logobodymine.png';
import helpImage from '../images/help.png';
import { useUser } from '../components/UserContext';

export default function FaqPage() {
  const { user } = useUser();

  return (
    <div className="page">
      <header className="navbar">
        <div className="nav-left">
          <div className="logo">
            <img src={bodyMineLogo} alt="BodyMine" />
          </div>
          <nav className="menu">
            <a href="/home">Home</a>
            <a href="/chat" className="active">Chat</a>
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

      {/* Hero Header with text and image */}
      <section className="faq-hero">
        <div className="faq-hero-text">
          <h2>How can we help you ?</h2>
          <p>We're here to support you anytime. Choose the best way to reach us.</p>
        </div>
        <img
          src={helpImage}
          alt="Support"
          className="faq-hero-img"
        />
      </section>

      <main className="main">
        <aside className="sidebar">
          <div className="sidebar-header">
            <img src="https://i.pravatar.cc/48" alt="Avatar" className="avatar-large" />
            <div>Hello<br /><strong>{user?.first_name} {user?.last_name}</strong></div>
          </div>
          <ul>
            <li><a href="/editProfile">Edit Profile</a></li>
            <li><a href="#">Change Password</a></li>
            <li><a href="#">My Body Project</a></li>
            <li><a href="/CGU">Terms & Conditions</a></li>
            <li><a href="#">News & Article</a></li>
            <li><a className="active" href="/support">Support</a></li>
          </ul>
          <button className="delete-account">Delete Account</button>
          <button className="logout">Logout</button>
        </aside>

        <section className="faq-content">
          <h2>FAQ – Bodymine</h2>
          <div className="faq-box-scrollable">
            <p><strong>1. Qu’est-ce que Bodymine ?</strong><br />
              Bodymine est un annuaire international spécialisé en chirurgie esthétique...
            </p>
            <p><strong>2. Comment créer mon compte sur Bodymine ?</strong><br />
              Vous pouvez créer un compte rapidement en vous inscrivant avec votre email...
            </p>
            <p><strong>3. Qui a accès à ma fiche patient ?</strong><br />
              Personne. Les fiches patients sont strictement confidentielles...
            </p>
            <p><strong>4. Le service Bodymine est-il gratuit ?</strong><br />
              Oui, la création de compte et l’utilisation de la plateforme sont gratuites...
            </p>
            <p><strong>5. Qu’est-ce que MyBodyProjet ?</strong><br />
              C’est un service de mise en relation personnalisée...
            </p>
            <p><strong>6. Comment rechercher un chirurgien ou une clinique ?</strong><br />
              Utilisez notre moteur de recherche multicritères...
            </p>
            <p><strong>7. Puis-je discuter directement avec un professionnel ?</strong><br />
              Oui, dès qu’un professionnel vous contacte...
            </p>
            <p><strong>8. Comment être sûr(e) de la fiabilité des professionnels ?</strong><br />
              Les professionnels sont validés à l’inscription sur présentation de leur licence...
            </p>
            <p><strong>9. Puis-je modifier ou supprimer ma fiche projet ?</strong><br />
              Oui, vous gardez le contrôle total...
            </p>
            <p><strong>10. J’ai une question ou un problème, que faire ?</strong><br />
              Vous pouvez nous contacter via le formulaire en ligne ou par email...
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-block">
            <img src={bodyMineLogo} alt="BodyMine" className="footer-logo" />
            <p>Bodymine is the leading directory to help you find the perfect surgeon or clinic, anywhere in the world.</p>
            <div className="social-icons">
              <span>🔵</span><span>🐦</span><span>▶️</span>
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
