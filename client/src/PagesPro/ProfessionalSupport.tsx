/*  src/pages/ProfessionalSupport.tsx  */
import { useState } from "react";
import { ChevronDown, ChevronUp, Paperclip } from "lucide-react";
import { Link } from "react-router-dom";

import TopbarPro   from "../components/TopbarPro";
import SidebarPro  from "../components/SidebarPro";

import heroPic      from "../images/help.png";
import logoBodyMine from "../images/logobodymine.png";

import "../assets/ProfessionalDashboard.css";   /* styles communs (top-bar/foot) */
import "../assets/ProfessionalSupport.css";     /* styles spécifiques Support   */

/* ─────────────────────────── FAQ ─────────────────────────── */
const faq = [
  { q: "Faq",               a: "All the most frequent questions in a single place.", to: "/pro/faq" },
  { q: "Data privacy",      a: "BodyMine is fully GDPR-compliant and never shares your data.", to: "/pro/dataPrivicy"},
  { q: "Terms & conditions",a: "Find the complete document in Settings → Legal.", to: "/pro/CGU"    },
];

export default function ProfessionalSupport() {
  const [openId, setOpenId] = useState<null | number>(null);

  return (
    <div className="pro page">
      {/* --- barre de navigation réutilisable --- */}
      <TopbarPro />

      <div className="main">
        {/* --- sidebar commune --- */}
        <SidebarPro active="Support" />

        {/* --- contenu Support --- */}
        <div className="support-layout">
          {/* ── hero ── */}
          <header className="support-header">
            <div>
              <h2>How can we help you&nbsp;?</h2>
              <p>We’re here to support you anytime. Choose the best way to reach us.</p>
            </div>
            <img src={heroPic} alt="Support operator" className="support-img" />
          </header>

          {/* ── form + faq ── */}
          <div className="support-content">
            {/* formulaire de contact */}
            <section className="support-form-box">
              <h3>✉️ Send a Message</h3>

              <form /* onSubmit={handleSend} */>
                <input name="name"    placeholder="Your name"    required />
                <input name="subject" placeholder="Subject"      required />
                <textarea name="msg"  placeholder="Your message" rows={4} required />

                <label className="attach-file">
                  <Paperclip size={14} /> Attach File
                  <input type="file" hidden />
                </label>

                <button className="btn primary">Send Message</button>
              </form>
            </section>

            {/* bloc FAQ */}
            <aside className="faq-box">
              <h3>Frequently Asked<br />Questions</h3>

              {faq.map((item, i) =>
                item.to ? (
                  /* →  lien direct si une clé `to` est fournie  */
                  <div key={i} className="faq-link">
                    <Link to={item.to}>{item.q}</Link>
                  </div>
                ) : (
                  /* →  sinon accordéon ouvrable  */
                  <details
                    key={i}
                    open={openId === i}
                    onToggle={() => setOpenId(openId === i ? null : i)}
                  >
                    <summary>
                      {item.q}&nbsp;
                      {openId === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </summary>
                    <p>{item.a}</p>
                  </details>
                )
              )}
            </aside>
          </div>

          {/* adresse email rapide */}
          <section className="support-email-box">
            <h3>📧 Email Us</h3>
            <input readOnly value="support@bodymine.com" />
          </section>
        </div>
      </div>

      {/* --- footer réutilisable --- */}
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
