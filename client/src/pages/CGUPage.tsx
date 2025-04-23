// src/pages/FaqPage.tsx
import React from 'react';
import '../assets/FaqPage.css';
import bodyMineLogo from '../images/logobodymine.png';
import helpImage from '../images/help.png';
import { useUser } from '../components/UserContext';

export default function CGUPage() {
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
            <li><a className="active" href="/CGU">Terms & Conditions</a></li>
            <li><a href="#">News & Article</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
          <button className="delete-account">Delete Account</button>
          <button className="logout">Logout</button>
        </aside>

        <section className="faq-content">
          <h2>Conditions Générales d'Utilisation (CGU) de BodyMine</h2>
          <div className="faq-box-scrollable">
            <p><strong>Dernière mise à jour :</strong> 01 Janvier 2025</p>
            <p>Bienvenue sur BodyMine, un annuaire en ligne dédié à la mise en relation des utilisateurs avec des professionnels de la santé esthétique. En utilisant notre plateforme, vous acceptez pleinement et sans réserve les présentes Conditions Générales d’Utilisation (CGU).</p>
            <hr />
            <p><strong>1. Acceptation des CGU</strong><br />L’accès et l’utilisation de BodyMine sont soumis aux présentes CGU. Tout utilisateur naviguant sur notre site est réputé les avoir acceptées. Si vous n’acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.</p>
            <hr />
            <p><strong>2. Objet du service</strong><br />BodyMine est un annuaire en ligne répertoriant des professionnels de la santé esthétique. Nous ne sommes ni une clinique, ni un prestataire de soins médicaux, ni un service de conseil médical. Notre rôle est strictement informatif. Nous ne garantissons pas la qualité, la compétence ou la fiabilité des professionnels listés. Il appartient à l’utilisateur de vérifier les qualifications, la réputation et la conformité des professionnels avant de prendre une décision.</p>
            <hr />
            <p><strong>3. Accès et utilisation du service</strong><br /><strong>3.1 Conditions d’accès :</strong> L’utilisation de BodyMine est réservée aux personnes majeures (18 ans et plus). L’utilisateur s’engage à fournir des informations exactes et à jour lors de son inscription (si applicable).<br /><strong>3.2 Utilisation responsable :</strong> L’utilisateur s’engage à utiliser BodyMine de manière licite et conforme aux présentes CGU. Toute tentative de publication de contenus faux, diffamatoires ou trompeurs est interdite.</p>
            <hr />
            <p><strong>4. Responsabilité et limitations</strong><br /><strong>4.1 Responsabilité de BodyMine :</strong> BodyMine décline toute responsabilité quant aux prestations des professionnels listés. Nous ne garantissons pas l’exactitude des informations affichées. Nous n’intervenons pas dans la relation entre l’utilisateur et les professionnels et ne pouvons être tenus responsables d’un éventuel litige.<br /><strong>4.2 Responsabilité de l’utilisateur :</strong> Il appartient à l’utilisateur de mener ses propres recherches. L’utilisateur reconnaît qu’il prend sa décision sous sa propre responsabilité et dégage BodyMine de toute responsabilité liée à une prestation médicale insatisfaisante ou à un dommage subi.</p>
            <hr />
            <p><strong>5. Données personnelles et confidentialité</strong><br />BodyMine respecte la réglementation en vigueur. Certaines informations peuvent être collectées. Nous ne revendons pas les données personnelles. L’utilisateur peut demander la suppression de ses données.</p>
            <hr />
            <p><strong>6. Service de Matching</strong><br /><strong>6.1 Description du service :</strong> Le service de Matching permet aux utilisateurs ayant rempli leur fiche MyBody et ayant coché la case "Matching Service" de recevoir des suggestions. Ce service constitue un moyen de mise en relation, sans engagement.<br /><strong>6.2 Confidentialité :</strong> Les fiches MyBody et profils utilisateurs restent strictement confidentiels. Seules les informations nécessaires sont partagées avec les cliniques.<br /><strong>6.3 Responsabilité :</strong> BodyMine agit comme intermédiaire. L’utilisateur demeure seul responsable du choix de la clinique.</p>
            <hr />
            <p><strong>7. Modification des CGU</strong><br />BodyMine se réserve le droit de modifier ces CGU à tout moment. Les utilisateurs seront informés des mises à jour.</p>
            <hr />
            <p><strong>8. Contact et réclamations</strong><br />Pour toute question ou réclamation, contactez-nous à [adresse email/contact].</p>
            <hr />
            <p>En utilisant BodyMine, vous acceptez ces conditions et reconnaissez notre rôle strictement informatif. Il vous appartient de faire les vérifications nécessaires avant de choisir un professionnel. Merci d’utiliser BodyMine !</p>
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
