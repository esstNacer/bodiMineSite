/*  src/pages/ProfessionalSupport.tsx  – version finale  */
import { useState } from "react";
import { ChevronDown, ChevronUp, Paperclip } from "lucide-react";

import TopbarPro   from "../components/TopbarPro";
import SidebarPro  from "../components/SidebarPro";

import heroPic from "../images/help.png";
import logoBodyMine from "../images/logobodymine.png";

import "../assets/ProfessionalDashboard.css";   // styles communs
import "../assets/ProfessionalFaq.css";                // styles spécifiques « contenu »

/* FAQ -----------------------------------------------------------------*/


export default function ProfessionalFaq () {
  const [openId, setOpenId] = useState<null | number>(null);
  const faq = [
    { q: "Faq",              a: "Here you can place a short answer to the most common question.",to:"/pro/faq"  },
    { q: "Data privacy",     a: "BodyMine is fully GDPR-compliant and never shares your data."  },
    { q: "Terms & conditions",a: "Find the complete document in Settings → Legal."              },
  ];

  return (
    <div className="pro page">                   {/* même préfixe “pro …” */}
      {/* ─── TOP-BAR IDENTIQUE ─── */}
      <TopbarPro />                              {/* ↩︎ rend <nav class="topbar"> */}

      {/* ─── MISE EN PAGE ─── */}
      <div className="main">
        {/* barre latérale identique */}
        <SidebarPro active="Support" />

        {/* contenu support */}
        <div className="support-layout">
          {/* bandeau héro */}
          <header className="support-header">
            <div>
              <h2>How can we help you ?</h2>
              <p>We’re here to support you anytime. Choose the best way to reach us.</p>
            </div>
            <img src={heroPic} alt="Support operator" className="support-img"/>
          </header>

          {/* grille formulaire + FAQ */}
          <article className="cgu-scroll">
          <h2>FAQ – Bodymine</h2>
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
          </article>

        </div>
      </div>

      {/* ─── FOOTER IDENTIQUE ─── */}
      <footer className="site-footer">
                <img src={logoBodyMine} alt="BodyMine" />
                <p>
                  Bodymine is the leading directory to help you find the perfect surgeon
                  or clinic, anywhere in the world.
                </p>
      
                <div className="f-columns">
                  <div>
                    <h6>Home</h6>
                    <ul><li>Menu</li><li>Chat</li></ul>
                  </div>
                  <div>
                    <h6>Info</h6>
                    <ul>
                      <li>Terms & Conditions</li>
                      <li>Privacy Policy</li>
                      <li>FAQs</li>
                    </ul>
                  </div>
                  <div>
                    <h6>Contact Us</h6>
                    <p>info@bodymine.com</p>
                  </div>
                </div>
              </footer>
    </div>
  );
}
