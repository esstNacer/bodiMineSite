/*  Page “FAQ Professionnels” – calquée sur la page Support
    ─ hero identique
    ─ grille :  sidebar  |  carte FAQ (scrollable)
---------------------------------------------------------------- */
import TopbarPro   from "../components/TopbarPro";
import SidebarPro  from "../components/SidebarPro";

import heroPic     from "../images/help.png";
import logoBodyMine from "../images/logobodymine.png";

import "../assets/ProfessionalDashboard.css";   // variables + top/footer
import "../assets/ProfessionalSupport.css";     // hero + grid de base
import "../assets/ProfessionalFaq.css";         // ONLY faq overrides

/* — texte brut ------------------------------------------------ */
const faqText = `TERMES ET CONDITIONS – MÉDECINS ET ÉTABLISSEMENTS DE SANTÉ

Dernière mise à jour 01 Janvier 2025

1. PRÉSENTATION DE BODYMINE

BodyMine est une plateforme dédiée aux professionnels de santé (médecins, cliniques, hôpitaux) souhaitant partager leur expertise et offrir un accompagnement bienveillant aux utilisateurs.

L’objectif est de permettre aux patients d’accéder à des conseils fiables, délivrés par des professionnels qualifiés, dans un cadre éthique et respectueux des normes médicales.

L’inscription à BodyMine implique l’acceptation des présentes conditions, qui garantissent un environnement de confiance entre professionnels et utilisateurs.

2. ENGAGEMENTS DES PROFESSIONNELS DE SANTÉ

En rejoignant BodyMine, chaque professionnel de santé s’engage à :

Mettre son expertise au service des utilisateurs en leur apportant des conseils professionnels et bienveillants.

Respecter les principes fondamentaux de la médecine, notamment l’éthique, la bienveillance et l’intégrité.

Maintenir une relation de confiance avec les utilisateurs, en étant transparent et pédagogue dans ses réponses.

Ne jamais induire en erreur, exagérer un traitement ou faire des promesses médicales non justifiées.

Protéger la confidentialité et la dignité des patients, en respectant strictement les lois en vigueur.


3. SERVICES DISPONIBLES

Sur BodyMine, les professionnels de santé peuvent :

Créer un profil détaillé indiquant leur spécialité, leurs diplômes et leur expérience.

Publier du contenu éducatif (articles, vidéos, conseils) pour informer et sensibiliser les utilisateurs.

Répondre aux questions générales des utilisateurs, dans le respect des limites de la consultation en ligne.

Proposer des rendez-vous en cabinet, en téléconsultation ou à domicile, selon leur pratique et la réglementation.


4. RELATION AVEC LES UTILISATEURS : RESPECT ET ACCOMPAGNEMENT

Les professionnels de santé doivent adopter une approche respectueuse et bienveillante envers les utilisateurs. Cela implique :

D’être clairs, pédagogues et patients dans leurs réponses et explications.

De ne jamais porter de jugement sur un utilisateur ou sa situation.

D’apporter des informations fondées sur la science et les bonnes pratiques médicales.

De toujours privilégier l’intérêt du patient, en l’orientant vers une consultation en présentiel si nécessaire.


5. RESPONSABILITÉ DES PROFESSIONNELS DE SANTÉ

Chaque professionnel est entièrement responsable des informations qu’il publie sur BodyMine.

Aucun diagnostic médical ni prescription ne peut être délivré via la plateforme. BodyMine sert uniquement à informer et orienter.

Tout abus ou manquement à l’éthique sera sanctionné par la suspension ou la suppression du compte.


6. PROTECTION DES DONNÉES ET CONFIDENTIALITÉ

Les professionnels de santé doivent respecter la confidentialité des utilisateurs et ne jamais divulguer d’informations personnelles.

Les données des utilisateurs doivent être protégées conformément aux réglementations en vigueur (RGPD, HIPAA…).


7. CONDITIONS FINANCIÈRES

L’accès à BodyMine pour les professionnels est soumis à une adhésion annuelle.

Aucune commission n’est prélevée sur les services ou consultations réalisés hors de la plateforme.

Les tarifs d’adhésion peuvent être ajustés, avec notification préalable aux inscrits.


8. SANCTIONS ET RÉSILIATION

Tout comportement inapproprié ou non conforme aux valeurs de BodyMine pourra entraîner :

Un avertissement, une suspension ou une suppression de compte.

Une signalisation aux autorités compétentes en cas de faute grave.


9. MODIFICATIONS DES CONDITIONS

BodyMine peut modifier ces conditions à tout moment pour garantir un cadre toujours plus éthique et sécurisant.


---

L’objectif de BodyMine est de créer un espace où les utilisateurs peuvent trouver des conseils fiables et bienveillants, dans le respect des règles médicales et de la relation patient-professionnel.
`;

export default function ProfessionalCGU() {
  return (
    <div className="pro faq-page">
      {/* top-bar partagée */}
      <TopbarPro />

      {/* HERO (identique Support) */}
      
     <header className="support-header">
                 <div>
                   <h2>How can we help you&nbsp;?</h2>
                   <p>We’re here to support you anytime. Choose the best way to reach us.</p>
                 </div>
                 <img src={heroPic} alt="Support operator" className="support-img" />
               </header>

      {/* GRILLE */}
      <div className="faq-grid">
        <SidebarPro active="FAQ" />

        <section className="faq-card">
          <header className="faq-head">FAQ Professionnels&nbsp;– Bodymine</header>

          <article className="faq-body">
            {faqText.trim().split("\n").map((line, idx) =>
              line.trim() === "" ? <br key={idx} /> : <p key={idx}>{line}</p>
            )}
          </article>
        </section>
      </div>

      {/* footer réutilisé */}
      <footer className="site-footer">
        <img src={logoBodyMine} alt="BodyMine" />
        <p>
          Bodymine is the leading directory to help you find the perfect surgeon
          or clinic, anywhere in the world.
        </p>
        <div className="f-columns">
          <div><h6>Home</h6><ul><li>Menu</li><li>Chat</li></ul></div>
          <div><h6>Info</h6><ul><li>Terms &amp; Conditions</li><li>Privacy Policy</li><li>FAQs</li></ul></div>
          <div><h6>Contact Us</h6><p>info@bodymine.com</p></div>
        </div>
      </footer>
    </div>
  );
}
