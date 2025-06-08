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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePro } from "../components/ProContext";
import "../assets/ProfessionalDashboard.css";
import "../assets/notifications-style.css";

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
  const [patients, setPatients] = useState<any[]>([]);  const [current, setCurrent] = useState<any | null>(null);
  const [msgs, setMsgs] = useState<any[]>([]);
  const [draft, setDraft] = useState("");  const [messageFilter, setMessageFilter] = useState<"active" | "ended">("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentWeek, setCurrentWeek] = useState(0); // 0 = semaine actuelle, -1 = semaine précédente, etc.
  
  // Données factices pour le dashboard
  const getWeekData = (weekOffset: number) => {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (weekOffset * 7));
    
    // Messages reçus par jour de la semaine (factices)
    const messagesData = [
      { day: 'Lun', count: Math.floor(Math.random() * 15) + 5 },
      { day: 'Mar', count: Math.floor(Math.random() * 18) + 3 },
      { day: 'Mer', count: Math.floor(Math.random() * 20) + 8 },
      { day: 'Jeu', count: Math.floor(Math.random() * 16) + 6 },
      { day: 'Ven', count: Math.floor(Math.random() * 22) + 10 },
      { day: 'Sam', count: Math.floor(Math.random() * 12) + 2 },
      { day: 'Dim', count: Math.floor(Math.random() * 8) + 1 }
    ];
    
    // Vues de profil par jour (factices)
    const profileViewsData = [
      { day: 'Lun', count: Math.floor(Math.random() * 50) + 20 },
      { day: 'Mar', count: Math.floor(Math.random() * 60) + 25 },
      { day: 'Mer', count: Math.floor(Math.random() * 70) + 30 },
      { day: 'Jeu', count: Math.floor(Math.random() * 65) + 28 },
      { day: 'Ven', count: Math.floor(Math.random() * 80) + 35 },
      { day: 'Sam', count: Math.floor(Math.random() * 45) + 15 },
      { day: 'Dim', count: Math.floor(Math.random() * 40) + 10 }
    ];
    
    return { messagesData, profileViewsData, weekStart: baseDate };
  };
  
  const currentWeekData = getWeekData(currentWeek);
  
  // Fausses notifications pour affichage
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      patientId: 101,
      patientName: "Sophie Martin",
      patientPhoto: "https://i.pravatar.cc/36?u=101",
      message: "Je souhaiterais prendre rendez-vous pour une consultation la semaine prochaine.",
      timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      read: false
    },
    {
      id: 2,
      patientId: 102,
      patientName: "Thomas Dubois",
      patientPhoto: "https://i.pravatar.cc/36?u=102",
      message: "Merci pour votre dernier conseil, j'ai vu une grande amélioration!",
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      read: false
    },    {
      id: 3,
      patientId: 103,
      patientName: "Emma Laurent",
      patientPhoto: "https://i.pravatar.cc/36?u=103",
      message: "J'ai une question concernant le traitement que vous m'avez prescrit.",
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      read: false
    },
    {
      id: 4,
      patientId: 104,
      patientName: "Lucas Bernard",
      patientPhoto: "https://i.pravatar.cc/36?u=104",
      message: "Pourriez-vous me recommander un spécialiste pour mon problème spécifique?",
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      read: false
    },
    {
      id: 5,
      patientId: 105,
      patientName: "Chloé Petit",
      patientPhoto: "https://i.pravatar.cc/36?u=105",
      message: "Je vous confirme ma présence à mon rendez-vous de demain à 14h.",
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      read: false
    }
  ]);
  /* 4) Récupère la liste de tous les patients ayant déjà
        discuté avec ce pro -> retourne directement les colonnes
        de la table `patients` (id, first_name, last_name, photo_url,
        favorite_specialization…)                                        */
  useEffect(() => {
    if (!proId) return;
    axios
      .get(`/api/chats/conversations/pro/${proId}`)
      .then((res) => {
        // Simuler un statut "active" ou "ended" pour chaque conversation
        const patientsWithStatus = res.data.map((patient: any, index: number) => ({
          ...patient,
          status: index % 3 === 0 ? "ended" : "active", // 1/3 des conversations "ended", 2/3 "active"
          isOnline: index % 2 === 0 // Alterner online/offline
        }));
        setPatients(patientsWithStatus);
      })
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
                </section>        {/* ░░ Layout ░░ */}
        <main className="flex w-full">
          {/* █ Sidebar - Collée à gauche */}
          <SidebarPro active="Dashboard" />

          <div className="flex-1 flex flex-col gap-6 p-6">
            {/* █ Top row: Notifications et Analytics côte à côte */}
            <div className="top-widgets-row">
              {/* █ Notifications compact */}
              <section className="widget notification-compact">
                <header>
                  <h5>
                    Notifications <span className="count">{notifications.filter(n => !n.read).length}</span>
                  </h5>
                  <a href="/pro/notifications" className="view-all">Voir tout</a>
                </header>
                <div className="notification-compact-list">
                {notifications.slice(0, 3).map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                    onClick={() => window.location.href = "/pro/notifications"}
                  >
                    <img 
                      src={notification.patientPhoto} 
                      alt={notification.patientName} 
                      className="notification-avatar"
                    />
                    <div className="notification-content">
                      <div className="notification-header">
                        <h3>{notification.patientName}</h3>
                        <span className="notification-time">
                          {new Date(notification.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </span>
                      </div>
                      <div className="notification-footer">
                        <p className="notification-preview">
                          {notification.message.length > 30 
                            ? `${notification.message.substring(0, 30)}...` 
                            : notification.message
                          }
                        </p>
                        <span className="message-count">3</span>
                      </div>
                    </div>
                  </div>                ))}
              </div>
            </section>

            {/* █ Dashboard Analytics */}
            <section className="widget dashboard-analytics">
              <header>
                <h5>Analytics</h5>
                <div className="week-navigation">
                  <button 
                    className="week-nav-btn"
                    onClick={() => setCurrentWeek(currentWeek - 1)}
                    title="Semaine précédente"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="week-info">
                    {currentWeek === 0 ? "Cette semaine" : 
                     currentWeek === -1 ? "Semaine dernière" : 
                     `Il y a ${Math.abs(currentWeek)} semaines`}
                  </span>
                  <button 
                    className="week-nav-btn"
                    onClick={() => setCurrentWeek(currentWeek + 1)}
                    disabled={currentWeek >= 0}
                    title="Semaine suivante"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </header>
                <div className="analytics-content">
                {/* Graphique unifié */}
                <div className="chart-section unified-chart">
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color messages-color"></span>
                      <span>Messages reçus</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color profile-views-color"></span>
                      <span>Vues de profil</span>
                    </div>
                  </div>
                    <div className="chart-container unified-chart-container">
                    {/* Axe Y avec échelle */}
                    <div className="y-axis">
                      {[100, 80, 60, 40, 20, 0].map((value) => (
                        <div key={value} className="y-axis-tick">
                          <span className="y-axis-label">{value}</span>
                          <div className="y-axis-line"></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Zone des barres */}
                    <div className="chart-bars-area">
                      {currentWeekData.messagesData.map((_, index) => {
                        const messageCount = currentWeekData.messagesData[index].count;
                        const profileCount = currentWeekData.profileViewsData[index].count;
                        const day = currentWeekData.messagesData[index].day;
                        
                        const maxMessages = Math.max(...currentWeekData.messagesData.map(d => d.count));
                        const maxProfiles = Math.max(...currentWeekData.profileViewsData.map(d => d.count));
                        
                        const messageHeight = Math.max((messageCount / maxMessages) * 100, 5);
                        const profileHeight = Math.max((profileCount / maxProfiles) * 80, 5); // Légèrement plus petit
                        
                        return (
                          <div key={index} className="chart-day-container">
                            <div className="chart-bars-group">
                              <div 
                                className="chart-bar messages-bar"
                                style={{ height: `${messageHeight}%` }}
                                title={`${day}: ${messageCount} messages`}
                              ></div>
                              <div 
                                className="chart-bar profile-views-bar"
                                style={{ height: `${profileHeight}%` }}
                                title={`${day}: ${profileCount} vues`}
                              ></div>
                            </div>
                            <span className="chart-label">{day}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="chart-totals">
                    <div className="total-item">
                      <span className="total-label">Total Messages:</span>
                      <span className="total-value">{currentWeekData.messagesData.reduce((sum, d) => sum + d.count, 0)}</span>
                    </div>
                    <div className="total-item">
                      <span className="total-label">Total Vues:</span>
                      <span className="total-value">{currentWeekData.profileViewsData.reduce((sum, d) => sum + d.count, 0)}</span>
                    </div>
                  </div>                </div>
              </div>            </section>
            </div> {/* Fin de top-widgets-row */}

            {/* █ Bottom row: Messages et Chat côte à côte */}
            <div className="bottom-widgets-row">
              {/* █ Messages list */}
              <section className="widget messages">
                <header>
                  <div className="messages-header-top">
                    <h5>
                      Messages <span className="count">
                        {patients.filter(p => p.status === messageFilter).length}
                      </span>
                    </h5>
                    <div className="message-filter-switch">
                      <button 
                        className={`filter-btn ${messageFilter === "active" ? "active" : ""}`}
                        onClick={() => setMessageFilter("active")}
                      >
                        Active
                      </button>
                      <button 
                        className={`filter-btn ${messageFilter === "ended" ? "active" : ""}`}
                        onClick={() => setMessageFilter("ended")}
                      >
                        Ended
                      </button>
                    </div>
                  </div>
                  <input 
                    placeholder="Rechercher…" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </header>

                <ul className="msg-list">
                  {patients
                    .filter(p => {
                      // Filtrage par type de message
                      return p.status === messageFilter;
                    })
                    .filter(p => {
                      // Filtrage par terme de recherche
                      if (!searchTerm.trim()) return true;
                      const fullName = `${p.first_name} ${p.last_name}`.toLowerCase();
                      return fullName.includes(searchTerm.toLowerCase());
                    })
                    .map((p) => (
                    <li
                      key={p.patient_id}
                      className={`
                        ${current?.patient_id === p.patient_id ? "active" : ""}
                        ${p.status === "ended" ? "ended-message" : "active-message"}
                      `}
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
                        <div className="message-meta">
                          <span className={`status-indicator ${p.status}`}>{p.status}</span>
                          <p>{p.favorite_specialization || "Patient"}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* █ Chatbox */}
              {current && (
                <section className="chat-box"><header className="chat-head">
                <div className="chat-head-left">
                  <div className="profile-container">
                    <img
                      src={current.photo_url || `https://i.pravatar.cc/40?u=${current.patient_id}`}
                      alt={`${current.first_name} ${current.last_name}`}
                      className="chat-profile-pic"
                    />
                    <div className="status-container-bottom">
                      <span className={`status-dot ${current.isOnline ? "online" : "offline"}`}></span>
                    </div>
                  </div>
                  <div className="user-info">
                    <h5>
                      {current.first_name} {current.last_name}
                    </h5>
                    <span className="status-text">{current.isOnline ? "Online" : "Offline"}</span>
                  </div>
                </div>
                <div className="chat-head-right">
                  <span className="role">
                    {current.favorite_specialization || "Patient"}
                  </span>
                  <button className="btn call-btn">
                    <Phone size={14} /> Call
                  </button>
                </div>
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
                </button>              </footer>
                </section>
              )}
            </div> {/* Fin de bottom-widgets-row */}
          </div> {/* Fin de right-column */}
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
