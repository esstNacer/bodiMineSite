/*  Page “FAQ Professionnels” – calquée sur la page Support
    ─ hero identique
    ─ grille :  sidebar  |  carte FAQ (scrollable)
---------------------------------------------------------------- */
import TopbarPro   from "../components/TopbarPro";
import SidebarPro  from "../components/SidebarPro";

import heroPic     from "../images/help.png";
import logoBodyMine from "../images/LogoBODYMINE.png";

import "../assets/ProfessionalDashboard.css";   // variables + top/footer
import "../assets/ProfessionalSupport.css";     // hero + grid de base
import "../assets/ProfessionalFaq.css";         // ONLY faq overrides

/* — texte brut ------------------------------------------------ */
const faqText = `Politique de Confidentialité de Bodymine

Dernière mise à jour : 01 Janvier 2025

Chez Bodymine, la protection de vos données personnelles est une priorité. Cette politique de confidentialité a pour objectif de vous informer de manière transparente sur la collecte, l'utilisation, la conservation et la sécurisation de vos données, conformément au Règlement Général sur la Protection des Données (RGPD) et à la législation applicable.

---

1. Responsable du traitement des données
Le responsable du traitement est :
Bodymine
Ste FLAGCOM

---

2. Données personnelles collectées
Nous collectons uniquement les données nécessaires à la bonne utilisation de notre service :
Données d’identification : nom, prénom, adresse email
Données liées au projet : type d’intervention, pays, attentes esthétiques
Données de connexion : adresse IP, type de navigateur, temps de connexion
Échanges via messagerie interne
Avis, commentaires, documents partagés volontairement
Les fiches patients ne sontvisible par personne d’autre aue sont propriétaire. Les profesionnels n’ont aucun acces aux fiches profils

---

3. Finalités du traitement
Les traitements de vos données ont pour but :

La création et gestion de votre compte utilisateur
La mise en relation avec des professionnels
La gestion de vos projets via le service MyBodyProjet
Le fonctionnement de la messagerie interne
L’amélioration continue de la plateforme (expérience utilisateur, sécurité, performances)
L’envoi de notifications et d'e-mails (si vous y avez consenti)

---

4. Bases légales du traitement
Nous traitons vos données sur les bases suivantes :

Consentement (inscription, envoi d'emails, cookies non essentiels)
Exécution contractuelle (services proposés via le site)
Intérêt légitime (sécurité, amélioration du service)

---

5. Destinataires des données
Vos données sont strictement confidentielles. Elles sont traitées uniquement par Bodymine et ses prestataires techniques (hébergement, sécurité, maintenance).
Aucun professionnel de santé ne peut entrer en contact avec un patient sans votre action explicite.
Aucune donnée n'est vendue ni transmise à des tiers sans votre consentement.

---

6. Transfert de données hors Union Européenne
Si certaines données sont transférées hors UE (ex : prestataires techniques), ces transferts sont encadrés par des mécanismes conformes au RGPD, tels que les clauses contractuelles types de la Commission Européenne.

---

7. Durée de conservation des données

Compte utilisateur : jusqu'à 2 ans après la dernière activité ou sur demande de suppression

Projets MyBodyProjet : 12 mois maximum après clôture

Logs de connexion : 12 mois

Données marketing (email, consentement) : 3 ans après inactivité

---

8. Sécurité des données
Nous appliquons des mesures techniques et organisationnelles avancées :

Chiffrement SSL/TLS des données en transit
Hébergement sécurisé sur des serveurs certifiés (ISO 27001 / HDS)
Accès restreint aux données sensibles
Double authentification pour les professionnels
Journalisation des accès

---

9. Vos droits
Conformément au RGPD, vous pouvez :
Accéder à vos données
Corriger des données inexactes
Demander la suppression de votre compte et de vos données
Demander la portabilité de vos données
Limiter certains traitements
Retirer votre consentement à tout moment
Vous opposer à certains traitements automatiques (profilage marketing, par exemple)


Pour exercer vos droits : support@bodymine.com
Nous répondrons sous 30 jours conformément à la réglementation.

---

10. Cookies
Nous utilisons différents types de cookies :

Cookies techniques nécessaires au fonctionnement du site
Cookies analytiques (Google Analytics ou équivalent, avec anonymisation IP)
Cookies de personnalisation et de performance

Lors de votre première visite, un bandeau de consentement vous permet de choisir les cookies que vous acceptez. Vous pouvez modifier vos préférences à tout moment via les paramètres de votre navigateur.

---

11. Modifications de la politique de confidentialité
Nous nous réservons le droit de modifier cette politique à tout moment.
La version à jour est toujours disponible sur notre site, avec la date de dernière mise à jour. En cas de modification majeure, nous vous en informerons directement.

---

12. Contact
Pour toute question concernant la gestion de vos données personnelles ou pour exercer vos droits :
Email : info@bodymine.com



`;

export default function ProfessionalDataPrivicy() {
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
