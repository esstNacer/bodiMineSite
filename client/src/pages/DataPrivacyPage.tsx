// src/pages/FaqPage.tsx
import React from 'react';
import '../assets/FaqPage.css';
import bodyMineLogo from '../images/logobodymine.png';
import helpImage from '../images/help.png';
import { useUser } from '../components/UserContext';

export default function DataPrivacyPage() {
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
          <h2>Politique de Confidentialité de Bodymine</h2>
          <div className="faq-box-scrollable">
            <p><strong>Dernière mise à jour :</strong> 01 Janvier 2025</p>
            <p>Chez Bodymine, la protection de vos données personnelles est une priorité. Cette politique de confidentialité a pour objectif de vous informer de manière transparente sur la collecte, l'utilisation, la conservation et la sécurisation de vos données, conformément au Règlement Général sur la Protection des Données (RGPD) et à la législation applicable.</p>
            <hr />
            <p><strong>1. Responsable du traitement des données</strong><br />Le responsable du traitement est :<br />Bodymine<br />Ste FLAGCOM</p>
            <hr />
            <p><strong>2. Données personnelles collectées</strong><br />
            - Données d’identification : nom, prénom, adresse email<br />
            - Données liées au projet : type d’intervention, pays, attentes esthétiques<br />
            - Données de connexion : adresse IP, type de navigateur, temps de connexion<br />
            - Échanges via messagerie interne<br />
            - Avis, commentaires, documents partagés volontairement<br />
            Les fiches patients ne sont visibles que par leur propriétaire. Les professionnels n’y ont aucun accès.</p>
            <hr />
            <p><strong>3. Finalités du traitement</strong><br />
            - Création et gestion de compte<br />
            - Mise en relation<br />
            - Suivi de projet MyBodyProjet<br />
            - Fonctionnement de la messagerie<br />
            - Amélioration de la plateforme<br />
            - Notifications et emails si consentement</p>
            <hr />
            <p><strong>4. Bases légales du traitement</strong><br />
            - Consentement<br />
            - Exécution contractuelle<br />
            - Intérêt légitime</p>
            <hr />
            <p><strong>5. Destinataires des données</strong><br />
            - Traitement par Bodymine uniquement<br />
            - Aucun professionnel ne peut initier un contact sans action du patient<br />
            - Aucune vente ou cession des données sans consentement</p>
            <hr />
            <p><strong>6. Transfert hors Union Européenne</strong><br />
            - Mécanismes RGPD (clauses types, etc.)</p>
            <hr />
            <p><strong>7. Durée de conservation</strong><br />
            - Compte : 2 ans après dernière activité<br />
            - Projets : 12 mois après clôture<br />
            - Logs : 12 mois<br />
            - Marketing : 3 ans</p>
            <hr />
            <p><strong>8. Sécurité des données</strong><br />
            - SSL/TLS<br />
            - Hébergement certifié ISO/HDS<br />
            - Accès restreint<br />
            - Double authentification<br />
            - Journalisation des accès</p>
            <hr />
            <p><strong>9. Vos droits</strong><br />
            - Accès<br />
            - Rectification<br />
            - Suppression<br />
            - Portabilité<br />
            - Limitation<br />
            - Opposition<br />
            - Retrait du consentement<br />
            Pour exercer vos droits : support@bodymine.com</p>
            <hr />
            <p><strong>10. Cookies</strong><br />
            - Techniques<br />
            - Analytiques (avec anonymisation)<br />
            - Personnalisation/performance<br />
            Consentement via bandeau, modifiable à tout moment.</p>
            <hr />
            <p><strong>11. Modifications de la politique</strong><br />
            - Mise à jour possible à tout moment<br />
            - Notification en cas de changements majeurs</p>
            <hr />
            <p><strong>12. Contact</strong><br />
            Email : info@bodymine.com</p>
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
