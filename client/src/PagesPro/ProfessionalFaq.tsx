/*  Page "FAQ Professionnels" – calquée sur la page Support
    ─ hero identique avec bannière support-header
    ─ sidebar + carte FAQ (scrollable)
---------------------------------------------------------------- */
import TopbarPro   from "../components/TopbarPro";
import SidebarPro  from "../components/SidebarPro";

import heroPic     from "../images/help.png";
import logoBodyMine from "../images/LogoBODYMINE.png";

import "../assets/ProfessionalDashboard.css";   // variables + top/footer
import "../assets/ProfessionalSupport.css";     // hero + grid de base
import "../assets/ProfessionalFaq.css";         // ONLY faq overrides

/* — texte brut ------------------------------------------------ */
const faqText = `FAQ Professionnels – Bodymine

1. Qu'est-ce que Bodymine ?

Bodymine est une plateforme de mise en relation entre patients et professionnels
de la chirurgie esthétique. Elle permet aux praticiens de développer leur
visibilité et de recevoir des demandes qualifiées.

2. Comment créer un compte professionnel ?

Vous pouvez vous inscrire depuis la page dédiée, compléter votre profil avec
vos spécialités, photos, diplômes, et soumettre votre licence pour validation.

3. Mon profil est-il publié immédiatement ?

Non, chaque profil est vérifié manuellement par notre équipe avant publication,
pour garantir la qualité et la sécurité de la plateforme.

4. Ai-je accès aux fiches des patients ?

Non. Pour des raisons de confidentialité, les fiches patients sont strictement
privées. Vous ne pouvez être mis en relation que via MyBodyProjet ou si un
patient vous contacte directement.

5. Puis-je contacter des patients librement ?

Vous pouvez échanger avec un patient uniquement après avoir reçu une notification
via MyBodyProjet ou lorsqu'il prend l'initiative de vous contacter.

6. Qu'est-ce que le service MyBodyProjet ?

C'est un service de mise en relation intelligente. Nous recevons des projets de
patients et notifions les professionnels correspondant au besoin. Vous pouvez
ensuite engager la conversation avec le patient.

7. Y a-t-il un coût pour être référencé sur Bodymine ?

La création de profil est gratuite. Des options de visibilité et services
supplémentaires peuvent être proposées ultérieurement.

8. Comment prouver ma légitimité sur Bodymine ?

Lors de votre inscription, vous devez fournir votre licence ou équivalent selon
votre pays. Pour aller plus loin, nous recommandons d'encourager les avis
patients et de tenir un profil régulièrement mis à jour.

9. Puis-je échanger avec les patients depuis la plateforme ?

Oui, la messagerie sécurisée Bodymine vous permet de répondre aux demandes et
d'échanger librement, tout en respectant la confidentialité des échanges.

10. Comment augmenter mes chances de recevoir des demandes ?

Voici quelques conseils :
• Complétez votre profil à 100 % (bio, diplômes, langues parlées…)
• Ajoutez des photos avant/après (avec consentement)
• Soyez réactif aux messages
• Collectez des avis patients
• Restez régulièrement en ligne : cela améliore votre visibilité dans les
  résultats de recherche.
`;

export default function ProfessionalFaq() {
  return (
    <div className="pro faq-page">
      {/* top-bar partagée */}
      <TopbarPro />      {/* Support header - bannière unifiée */}
      <div className="support-header2">
        <div>
          <h2>How can we help you?</h2>
          <p>We're here to support you anytime. Choose the best way to reach us.</p>
        </div>
        <div className='support-doctor-wrapper'>
          <img src={heroPic} className="support-hero2" alt="help" />
        </div>
      </div>{/* GRILLE */}
      <main className="flex w-full">
        <SidebarPro active="FAQ" />
        <div className="flex-1 flex flex-col gap-6 p-6">
          <section className="faq-card">
            <header className="faq-head">FAQ Professionnels&nbsp;– Bodymine</header>

            <article className="faq-body">
              {faqText.trim().split("\n").map((line, idx) =>
                line.trim() === "" ? <br key={idx} /> : <p key={idx}>{line}</p>
              )}
            </article>
          </section>
        </div>
      </main>

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
