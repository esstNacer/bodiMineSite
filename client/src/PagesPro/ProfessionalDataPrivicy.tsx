/*  Page "Data Privacy Professionnels" – calquée sur la page Support
    ─ hero identique avec bannière support-header
    ─ sidebar + carte contenu (scrollable)
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
Données d'identification : nom, prénom, adresse email
Données liées au projet : type d'intervention, pays, attentes esthétiques
Données de connexion : adresse IP, type de navigateur, temps de connexion
Échanges via messagerie interne
Avis, commentaires, documents partagés volontairement
Les fiches patients ne sont visibles par personne d'autre que leur propriétaire. Les professionnels n'ont aucun accès aux fiches profils

---

3. Base légale du traitement
Nos traitements reposent sur les bases légales suivantes :
Consentement éclairé : pour l'envoi de newsletters, alertes, recommandations
Exécution d'un contrat : pour la mise en relation patients/professionnels
Intérêts légitimes : pour l'amélioration de nos services et la sécurité
Obligation légale : conservation des logs de connexion, lutte contre la fraude

---

4. Finalités du traitement
Vos données sont utilisées exclusivement pour :
Faciliter la mise en relation entre patients et professionnels
Assurer le bon fonctionnement de la messagerie sécurisée
Améliorer l'expérience utilisateur (suggestions, personnalisation)
Respecter nos obligations légales et de sécurité
Vous informer des nouveautés (avec votre consentement)

---

5. Destinataires des données
Vos données ne sont jamais vendues ni transmises à des tiers à des fins commerciales.
Les seuls destinataires sont :
L'équipe technique Bodymine (développeurs, support client)
Hébergeurs et prestataires techniques (sous contrat de confidentialité strict)
Autorités compétentes (en cas d'obligation légale uniquement)

Importante distinction :
Les professionnels inscrits n'ont accès qu'aux informations que vous choisissez de partager lors d'un échange initié par vos soins.
Vos données de profil restent privées et ne sont jamais consultables librement.

---

6. Transferts de données hors UE
Bodymine s'engage à héberger vos données exclusivement en Europe.
En cas d'évolution technique nécessitant un transfert hors UE, vous en serez informé et des garanties appropriées seront mises en place (clauses contractuelles types, décision d'adéquation).

---

7. Durée de conservation
Données de profil actif : tant que votre compte reste actif
Données de profil inactif : suppression après 3 ans d'inactivité totale
Échanges et projets : conservation 2 ans après la dernière activité
Logs de connexion : 12 mois
Données marketing (email, consentement) : 3 ans après inactivité

---

8. Sécurité des données
Nous appliquons des mesures techniques et organisationnelles avancées :
Chiffrement SSL/TLS des données en transit
Hébergement sécurisé sur des serveurs certifiés (ISO 27001 / HDS)
Contrôles d'accès stricts et authentification multi-facteurs
Sauvegardes régulières et redondantes
Tests de sécurité et audits périodiques
Formation continue des équipes à la cybersécurité

---

9. Vos droits RGPD
Vous disposez des droits suivants :
Droit d'accès : obtenez une copie de toutes vos données
Droit de rectification : corrigez des informations erronées
Droit à l'effacement : supprimez vos données (sous conditions)
Droit de limitation : restreignez temporairement l'usage de vos données
Droit à la portabilité : récupérez vos données dans un format structuré
Droit d'opposition : refusez certains traitements (marketing, etc.)
Droit de retrait du consentement : à tout moment et sans justification

Pour exercer ces droits : info@bodymine.com
Délai de réponse : 1 mois maximum (extensible à 3 mois si complexe)

---

10. Réclamations et contact
Délégué à la Protection des Données : dpo@bodymine.com
Questions générales : info@bodymine.com

En cas de désaccord persistant, vous pouvez saisir l'autorité de contrôle compétente :
France : CNIL (cnil.fr)
Autres pays UE : autorité locale de protection des données

---

11. Modifications de cette politique
Toute modification sera communiquée par email et/ou notification sur la plateforme.
Date d'entrée en vigueur : 30 jours après notification.
Historique des versions disponible sur demande.

---

Cette politique de confidentialité reflète notre engagement envers la transparence et la protection de votre vie privée. N'hésitez pas à nous contacter pour toute question ou précision.`;

export default function ProfessionalDataPrivicy() {
  return (
    <div className="pro faq-page">
      {/* top-bar partagée */}
      <TopbarPro />

      {/* Support header - bannière pleine largeur avec Tailwind */}
      <header className="w-full max-w-none mx-0 bg-[#ecfafa] rounded-xl p-8 text-left flex justify-between items-center mb-6 px-4">
        <div>
          <h2 className="text-3xl font-bold">How can we help you?</h2>
          <p className="text-gray-600 mt-1.5 text-[15px]">We're here to support you anytime. Choose the best way to reach us.</p>
        </div>
        <img src={heroPic} alt="Support operator" className="h-[170px] mr-8" />
      </header>
      
      {/* GRILLE : flex layout avec sidebar collée à gauche */}
      <main className="flex w-full">
        <SidebarPro active="Data Privacy" />
        <div className="flex-1 flex flex-col gap-6 p-6">
          <section className="faq-card">
            <header className="faq-head">Politique de Confidentialité – Bodymine</header>

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
