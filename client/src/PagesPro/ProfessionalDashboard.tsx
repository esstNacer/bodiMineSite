/*  src/pages/ProfessionalDashboard.tsx
    Tableau de bord du professionnel – branché sur ProContext
    + affichage des patients conforme à la structure SQL
----------------------------------------------------------------- */
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Bell,
  LogOut,
  User,
  Menu,
  Phone,
  MessageSquare,
  Star,
  Notebook,
  Lock,
  Paperclip,
  Headphones,
} from "lucide-react";
import { usePro } from "../components/ProContext";
import "../assets/ProfessionalDashboard.css";

import logoBodyMine from "../images/LogoBODYMINE.png";
import strip1 from "../images/strip1.png";
import strip2 from "../images/strip2.png";
import strip3 from "../images/strip3.png";
import avatarPro from "../images/doctor-small.png";
import { FaMoneyBill, FaPepperHot } from "react-icons/fa";
import SidebarPro from "../components/SidebarPro";
import TopbarPro from "../components/TopbarPro";

/* ───────── BANNIÈRE HERO ───────── */
const carousel = [
  { src: strip1, alt: "Partner banner" },
  { src: strip2, alt: "Clinic banner" },
  { src: strip3, alt: "Silicone banner" },
];

/* ════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════ */
export default function ProfessionalDashboard() {
  /* 1) Contexte */
  const { professional, proToken, proLogout } = usePro();
  const proId = professional?.professional_id;

  /* 2) Axios : ajoute / retire le bearer */
  useEffect(() => {
    axios.defaults.headers.common.Authorization = proToken
      ? `Bearer ${proToken}`
      : "";
  }, [proToken]);

  /* 3) State */
  const [slide, setSlide] = useState(0);
  const [patients, setPatients] = useState<any[]>([]);
  const [current, setCurrent] = useState<any | null>(null);
  const [msgs, setMsgs] = useState<any[]>([]);
  const [draft, setDraft] = useState("");

  /* 4) Récupère la liste de tous les patients ayant déjà
        discuté avec ce pro -> retourne directement les colonnes
        de la table `patients` (id, first_name, last_name, photo_url,
        favorite_specialization…)                                        */
  useEffect(() => {
    if (!proId) return;
    axios
      .get(`/api/chats/conversations/pro/${proId}`)
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Error conversations:", err));
  }, [proId]);

  /* 5) Récupère l’historique pour le patient sélectionné */
  useEffect(() => {
    if (!proId || !current) return;
    axios
      .get(`/api/chats?patientId=${current.patient_id}&professionalId=${proId}`)
      .then((res) => setMsgs(res.data))
      .catch((err) => console.error("Error messages:", err));
  }, [current, proId]);

  /* 6) Envoie message */
  const send = async () => {
    if (!draft.trim() || !current || !proId) return;
    const payload = {
      professional_id: proId,
      patient_id: current.patient_id,
      sender: "pro",
      message: draft.trim(),
    };
    try {
      await axios.post("/api/chats", payload);
      setMsgs((m) => [
        ...m,
        { ...payload, timestamp: new Date().toISOString() },
      ]);
      setDraft("");
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  /* 7) Carousel */
  const next = () => setSlide((s) => (s + 1) % carousel.length);
  const prev = () => setSlide((s) => (s ? s - 1 : carousel.length - 1));

  /* 8) UI */
  return (
    <div className="pro">
      <div className="pro-dash">
        {/* ░░ Top-bar ░░ */}
        <TopbarPro/>
<br />
        {/* ░░ Carousel ░░ */}
        <section className="partner-strip">
                  <img src={strip1} alt="Partner 1" />
                  <img src={strip2} alt="Partner 2" />
                  <img src={strip3} alt="Partner 3" />
                </section>

        {/* ░░ Layout ░░ */}
        <main className="grid">
          {/* █ Sidebar */}
          <SidebarPro active="Dashboard" />

          {/* █ Patients list */}
          <section className="widget messages">
            <header>
              <h5>
                Patients <span className="count">{patients.length}</span>
              </h5>
              <input placeholder="Search…" />
            </header>

            <ul className="msg-list">
              {patients.map((p) => (
                <li
                  key={p.patient_id}
                  className={
                    current?.patient_id === p.patient_id ? "active" : ""
                  }
                  onClick={() => setCurrent(p)}
                >
                  <img
                    src={
                      p.photo_url ||
                      `https://i.pravatar.cc/36?u=${p.patient_id}`
                    }
                  />
                  <div>
                    <h3>
                      {p.first_name} {p.last_name}
                    </h3>
                    <p>{p.favorite_specialization || "Patient"}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* █ Chatbox */}
          {current && (
        <section className="chat-box">
              <header className="chat-head">
                <div>
                  <h5>
                    {current.first_name} {current.last_name}
                  </h5>
                  <span className="spec">
                    {current.favorite_specialization || "Patient"}
                  </span>
                </div>
                <button className="btn tiny">
                  <Phone size={14} /> Call
                </button>
              </header>

              <div className="chat-body">
                {msgs.map((m, i) => (
                  <div
                    key={i}
                    className={m.sender === "pro" ? "msg mine" : "msg"}
                  >
                    <p>{m.message}</p>
                    <span>
                      {new Date(m.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>

              <footer className="chat-foot">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Send a message…"
                />
                <button
                  className="btn tiny send"
                  disabled={!draft.trim()}
                  onClick={send}
                >
                  <MessageSquare size={14} />
                </button>
              </footer>
            </section>
          )}
        </main>

        {/* ░░ Footer ░░ */}
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
    </div>
  );
}
