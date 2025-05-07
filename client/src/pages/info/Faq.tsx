// src/pages/FaqPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiHome, FiSearch, FiUser, FiLock, FiFileText,
  FiBookOpen, FiLifeBuoy, FiTrash2, FiLogOut
} from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';

import '../../assets/MyBodyProjectPage.css';  // nav + sidebar + footer + banner
import '../../assets/FaqPage.css';            // zone scroll FAQ

import bodyMineLogo from '../../images/logobodymine.png';
import clinic1 from '../../images/clinic1.png';
import clinic2 from '../../images/clinic2.png';
import clinic3 from '../../images/clinic3.png';
import helpImage   from '../../images/help.png';
import { useUser } from '../../components/UserContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Faq() {
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
        <aside className="side-menu"></aside>
        {/* ---------- ZONE FAQ ---------- */}
        <section className="cgu-zone">
          {/* Entête contextuelle */}
        

          {/* Contenu FAQ défilant */}
          <article className="cgu-scroll">
  <h2>FAQ – Bodymine</h2>

  <p><strong>1. Qu’est-ce que Bodymine ?</strong><br />
    Bodymine est un annuaire international spécialisé en chirurgie esthétique. Il vous permet de rechercher, comparer et contacter des cliniques ou chirurgiens à travers le monde.
  </p>

  <p><strong>2. Comment créer mon compte sur Bodymine ?</strong><br />
    Vous pouvez créer un compte rapidement en vous inscrivant avec votre email. Une fois connecté(e), vous accédez à votre espace personnel pour créer votre fiche patient et utiliser nos services.
  </p>

  <p><strong>3. Qui a accès à ma fiche patient ?</strong><br />
    Personne. Les fiches patients sont strictement confidentielles. Aucun professionnel ni utilisateur n’y a accès, même après une mise en relation.
  </p>

  <p><strong>4. Le service Bodymine est-il gratuit ?</strong><br />
    Oui, la création de compte et l’utilisation de la plateforme sont entièrement gratuites pour les patients.
  </p>

  <p><strong>5. Qu’est-ce que MyBodyProjet ?</strong><br />
    C’est un service de mise en relation personnalisée. Vous remplissez une fiche projet (type d’intervention, localisation, attentes…), et nous identifions les professionnels adaptés. Ceux-ci reçoivent une notification et peuvent vous répondre via notre messagerie sécurisée.
  </p>

  <p><strong>6. Comment rechercher un chirurgien ou une clinique ?</strong><br />
    Utilisez notre moteur de recherche multicritères (localisation, spécialité, nom…). Vous accéderez à des profils vérifiés, détaillés, avec photos, avis et diplômes.
  </p>

  <p><strong>7. Puis-je discuter directement avec un professionnel ?</strong><br />
    Oui, dès qu’un professionnel vous contacte via MyBodyProjet ou que vous envoyez un message depuis un profil, vous pouvez échanger via le chat intégré.
  </p>

  <p><strong>8. Comment être sûr(e) de la fiabilité des professionnels ?</strong><br />
    Les professionnels sont validés à l’inscription sur présentation de leur licence. Nous encourageons les patients à laisser des avis pour renforcer la transparence et la confiance.
  </p>

  <p><strong>9. Puis-je modifier ou supprimer ma fiche projet ?</strong><br />
    Oui, vous gardez le contrôle total sur votre fiche, que vous pouvez modifier ou supprimer à tout moment depuis votre espace personnel.
  </p>

  <p><strong>10. J’ai une question ou un problème, que faire ?</strong><br />
    Vous pouvez nous contacter via le formulaire en ligne ou par email. Notre équipe vous répondra sous 24 à 48 h.
  </p>
</article>

        </section>
      </main>

      {/* ▬▬▬ FOOTER ▬▬▬ */}
      <Footer />
    </div>
    </div>
  );
}
