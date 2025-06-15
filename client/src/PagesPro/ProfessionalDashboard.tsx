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
    
    // Messages reçus par jour de la semaine (données simples et ordonnées)
    const messagesData = [
      { day: 'Lun', count: 5 },
      { day: 'Mar', count: 8 },
      { day: 'Mer', count: 12 },
      { day: 'Jeu', count: 15 },
      { day: 'Ven', count: 18 },
      { day: 'Sam', count: 10 },
      { day: 'Dim', count: 3 }
    ];
    
    // Vues de profil par jour (données simples et ordonnées)
    const profileViewsData = [
      { day: 'Lun', count: 25 },
      { day: 'Mar', count: 32 },
      { day: 'Mer', count: 28 },
      { day: 'Jeu', count: 35 },
      { day: 'Ven', count: 40 },
      { day: 'Sam', count: 22 },
      { day: 'Dim', count: 15 }
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
          <SidebarPro active="Dashboard" />          <div className="flex-1 flex flex-col gap-6 p-6">            {/* █ Top row: Notifications à gauche et Analytics à droite - 50/50 */}
            <div className="flex gap-6 h-80">
              {/* █ Notifications compact - À GAUCHE (50%) */}              <section className="flex-1 bg-white rounded-lg border border-gray-200 p-6 overflow-hidden flex flex-col">
                <header className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-semibold text-gray-900">
                    Notifications 
                    <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  </h5>
                  <a href="/pro/notifications" className="text-blue-600 hover:text-blue-800 text-base font-medium">
                    Voir tout
                  </a>                </header>
                <div className="flex-1 overflow-y-auto space-y-3">
                  {notifications.slice(0, 4).map(notification => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        notification.read ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'
                      }`}
                      onClick={() => window.location.href = "/pro/notifications"}
                    >
                      <img 
                        src={notification.patientPhoto} 
                        alt={notification.patientName} 
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-base font-medium text-gray-900 truncate">
                            {notification.patientName}
                          </h3>
                          <span className="text-sm text-gray-500 flex-shrink-0 ml-2">
                            {new Date(notification.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-base text-gray-600 truncate">
                            {notification.message.length > 25 
                              ? `${notification.message.substring(0, 25)}...` 
                              : notification.message
                            }
                          </p>
                          <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full flex-shrink-0 ml-2">
                            3
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* █ Dashboard Analytics - À DROITE (50%) */}              <section className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
                <header className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-semibold text-gray-900">Analytics</h5>
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                      onClick={() => setCurrentWeek(currentWeek - 1)}
                      title="Semaine précédente"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-base text-gray-600 min-w-[120px] text-center">
                      {currentWeek === 0 ? "Cette semaine" : 
                       currentWeek === -1 ? "Semaine dernière" : 
                       `Il y a ${Math.abs(currentWeek)} semaines`}
                    </span>
                    <button 
                      className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                      onClick={() => setCurrentWeek(currentWeek + 1)}
                      disabled={currentWeek >= 0}
                      title="Semaine suivante"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </header>
                
                {/* Légende des graphiques */}
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
                    <span className="text-base text-gray-600">Messages reçus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
                    <span className="text-base text-gray-600">Vues de profil</span>
                  </div>
                </div>                {/* Graphique en barres avec axes */}
                <div className="mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 relative">
                    {/* Zone de graphique avec axes */}
                    <div className="flex">
                      {/* Axe Y (ordonnées) */}
                      <div className="flex flex-col justify-between h-32 mr-3 text-sm text-gray-500">
                        {(() => {
                          const maxValue = Math.max(
                            ...currentWeekData.messagesData.map(d => d.count),
                            ...currentWeekData.profileViewsData.map(d => d.count)
                          );
                          const steps = 4;
                          const stepValue = Math.ceil(maxValue / steps);
                          return Array.from({ length: steps + 1 }, (_, i) => (
                            <div key={i} className="text-right">
                              {maxValue - (i * stepValue)}
                            </div>
                          ));
                        })()}
                      </div>
                      
                      {/* Zone des barres */}
                      <div className="flex-1 relative">
                        {/* Lignes de grille horizontales */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                          {Array.from({ length: 5 }, (_, i) => (
                            <div key={i} className="w-full border-t border-gray-300 opacity-30"></div>
                          ))}
                        </div>
                        
                        {/* Barres de données */}
                        <div className="h-32 flex items-end justify-between gap-2 relative">
                          {currentWeekData.messagesData.map((data, index) => {
                            const profileViews = currentWeekData.profileViewsData[index]?.count || 0;
                            const maxValue = Math.max(
                              ...currentWeekData.messagesData.map(d => d.count),
                              ...currentWeekData.profileViewsData.map(d => d.count)
                            );
                            const messageHeight = maxValue > 0 ? (data.count / maxValue) * 120 : 6;
                            const profileHeight = maxValue > 0 ? (profileViews / maxValue) * 120 : 6;
                            
                            return (
                              <div key={index} className="flex-1 flex justify-center">
                                {/* Barres côte à côte */}
                                <div className="flex items-end gap-1">
                                  {/* Barre Messages */}
                                  <div className="flex flex-col items-center">
                                    <div 
                                      className="w-5 bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-600"
                                      style={{ height: `${messageHeight}px`, minHeight: '6px' }}
                                      title={`Messages: ${data.count}`}
                                    ></div>
                                  </div>
                                  
                                  {/* Barre Vues */}
                                  <div className="flex flex-col items-center">
                                    <div 
                                      className="w-5 bg-green-500 rounded-t transition-all duration-500 hover:bg-green-600"
                                      style={{ height: `${profileHeight}px`, minHeight: '6px' }}
                                      title={`Vues: ${profileViews}`}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {/* Axe X (abscisses) */}
                    <div className="flex ml-6 mt-2">
                      {currentWeekData.messagesData.map((data, index) => (
                        <div key={index} className="flex-1 text-center">
                          <span className="text-xs text-gray-600 font-medium">
                            {data.day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>                </div>
              </section>
            </div> {/* Fin de top-widgets-row */}            {/* █ Bottom row: Messages et Chat côte à côte en Tailwind */}
            <div className="flex gap-6 h-[600px]">
              {/* █ Messages list - Colonne de gauche */}
              <div className="w-1/4 bg-white rounded-lg border border-gray-200 flex flex-col"><div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-semibold text-gray-900">
                      Messages 
                      <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {patients.filter(p => p.status === messageFilter).length}
                      </span>
                    </h5>                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button 
                        className={`px-4 py-2 text-base font-medium rounded-md transition-colors ${
                          messageFilter === "active" 
                            ? "bg-white text-blue-600 shadow-sm" 
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setMessageFilter("active")}
                      >
                        Active
                      </button>
                      <button 
                        className={`px-4 py-2 text-base font-medium rounded-md transition-colors ${
                          messageFilter === "ended" 
                            ? "bg-white text-blue-600 shadow-sm" 
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setMessageFilter("ended")}
                      >
                        Ended
                      </button>
                    </div>
                  </div>                  <input 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Rechercher…" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                  {patients
                    .filter(p => p.status === messageFilter)
                    .filter(p => {
                      if (!searchTerm.trim()) return true;
                      const fullName = `${p.first_name} ${p.last_name}`.toLowerCase();
                      return fullName.includes(searchTerm.toLowerCase());
                    })
                    .map((p) => (
                    <div
                      key={p.patient_id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                        current?.patient_id === p.patient_id 
                          ? "bg-blue-50 border border-blue-200" 
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setCurrent(p)}
                    >
                      <div className="relative">
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={p.photo_url || `https://i.pravatar.cc/40?u=${p.patient_id}`}
                          alt={`${p.first_name} ${p.last_name}`}
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          p.isOnline ? "bg-green-400" : "bg-gray-400"
                        }`}></div>
                      </div>                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-900 truncate">
                          {p.first_name} {p.last_name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium ${
                            p.status === "active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {p.status}
                          </span>
                          <p className="text-sm text-gray-500 truncate">
                            {p.favorite_specialization || "Patient"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* █ Chatbox - Colonne de droite */}
              <div className="flex-1 bg-white rounded-lg border border-gray-200 flex flex-col">
                {current ? (
                  <>
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={current.photo_url || `https://i.pravatar.cc/40?u=${current.patient_id}`}
                            alt={`${current.first_name} ${current.last_name}`}
                          />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            current.isOnline ? "bg-green-400" : "bg-gray-400"
                          }`}></div>
                        </div>                        <div>
                          <h5 className="text-base font-semibold text-gray-900">
                            {current.first_name} {current.last_name}
                          </h5>
                          <span className="text-sm text-gray-500">
                            {current.isOnline ? "En ligne" : "Hors ligne"} • {current.favorite_specialization || "Patient"}
                          </span>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700 transition-colors">
                        <Phone size={16} />
                        Appeler
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {msgs.map((m, i) => (
                        <div
                          key={i}
                          className={`flex ${m.sender === "pro" ? "justify-end" : "justify-start"}`}
                        >                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            m.sender === "pro" 
                              ? "bg-blue-600 text-white" 
                              : "bg-gray-100 text-gray-900"
                          }`}>
                            <p className="text-base">{m.message}</p>
                            <span className={`text-sm mt-1 block ${
                              m.sender === "pro" ? "text-blue-100" : "text-gray-500"
                            }`}>
                              {new Date(m.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t border-gray-200">                      <div className="flex gap-3">
                        <input
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          placeholder="Tapez votre message…"
                          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
                        />
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                          disabled={!draft.trim()}
                          onClick={send}
                        >
                          <MessageSquare size={18} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MessageSquare size={64} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-xl font-medium">Aucune conversation sélectionnée</p>
                      <p className="text-base">Choisissez une conversation pour commencer à discuter</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
