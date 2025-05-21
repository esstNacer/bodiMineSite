// src/pages/DataPrivacyPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiHome, FiSearch, FiUser, FiLock, FiFileText,
  FiBookOpen, FiLifeBuoy, FiTrash2, FiLogOut
} from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';

import '../assets/MyBodyProjectPage.css';   // nav + sidebar + footer + banner
import '../assets/FaqPage.css';             // scroll interne

import bodyMineLogo from '../images/LogoBODYMINE.png';
import clinic1 from '../images/clinic1.png';
import clinic2 from '../images/clinic2.png';
import clinic3 from '../images/clinic3.png';
import helpImage   from '../images/help.png';
import { useUser } from '../components/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DataPrivacyPage() {
  const { user } = useUser();
  const { logout } = useUser();
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

      {/* ▬▬▬ CAROUSEL ▬▬▬ */}

      {/* ▬▬▬ LAYOUT ▬▬▬ */}
      <main className="content-grid">
        {/* ---------- SIDEBAR ---------- */}
        <aside className="side-menu">
          <div className="hello-card">
            <img src="https://i.pravatar.cc/64?img=12" alt="avatar" className="hello-avatar" />
            <div>Hello<br/><strong>{user?.first_name} {user?.last_name}</strong></div>
          </div>

          <ul className="menu-links">
            <li><Link to="/editProfile"><FiUser /> Edit Profile</Link></li>
            <li><Link to="/changePassword"><FiLock /> Change Password</Link></li>
            <li><Link to="/mybody"><FiFileText /> My Body Project</Link></li>
            <li><Link to="/terms"><FiFileText /> Terms &amp; Conditions</Link></li>
            <li><Link to="/news"><FiBookOpen /> News &amp; Article</Link></li>
            <li className="active"><Link to="/support"><FiLifeBuoy /> Support</Link></li>
          </ul>

          <button className="danger-btn"><FiTrash2 /> Delete Account</button>
          <button className="logout-btn" onClick={logout}><FiLogOut /> Logout</button>
        </aside>

        {/* ---------- CONTENU POLITIQUE ---------- */}
        <section className="cgu-zone">
          {/* En-tête */}

          {/* Texte défilant */}
          <article className="cgu-scroll">
          <h2>Politique de Confidentialité de Bodymine</h2>
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
          </article>
        </section>
      </main>

      {/* ▬▬▬ FOOTER ▬▬▬ */}
      <Footer />
    </div>
    </div>
  );
}
