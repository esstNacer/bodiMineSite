// src/pages/NotificationsPage.tsx
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import TopbarPro from "../components/TopbarPro"
import SidebarPro from "../components/SidebarPro"
import FooterPro from "../components/FooterPro"
import Carousel, { CarouselItem } from "../components/Carousel"
import { usePro } from "../components/ProContext"

import strip1 from "../images/strip1.png"
import strip2 from "../images/strip2.png"
import strip3 from "../images/strip3.png"

interface Notification {
  notification_id: number
  professional_id: number
  project_id: number
  message: string
  read: number       // 0 = unread, 1 = read
  created_at: string
  patient_id: number
  first_name: string
  last_name: string
  photo_url: string | null
}

// Hero carousel items
const heroItems: CarouselItem[] = [
  { src: strip1, alt: "Partner banner" },
  { src: strip2, alt: "Clinic banner" },
  { src: strip3, alt: "Silicone industry banner" },
]

// “time ago” helper
function timeSince(dateString: string) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? "s" : ""} ago`
}

export default function NotificationsPage() {
  const { professional } = usePro()
  const professionalId = professional?.professional_id
  const navigate = useNavigate()

  // Fausses notifications pour démonstration (similaires au dashboard)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      notification_id: 1,
      professional_id: professionalId || 1,
      project_id: 101,
      patient_id: 101,
      first_name: "Sophie",
      last_name: "Martin",
      photo_url: "https://i.pravatar.cc/48?u=101",
      message: "Je souhaiterais prendre rendez-vous pour une consultation la semaine prochaine. Pourriez-vous me confirmer vos disponibilités ?",
      read: 0,
      created_at: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    },
    {
      notification_id: 2,
      professional_id: professionalId || 1,
      project_id: 102,
      patient_id: 102,
      first_name: "Thomas",
      last_name: "Dubois",
      photo_url: "https://i.pravatar.cc/48?u=102",
      message: "Merci pour votre dernier conseil, j'ai vu une grande amélioration! Je voudrais programmer un suivi.",
      read: 0,
      created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
    {
      notification_id: 3,
      professional_id: professionalId || 1,
      project_id: 103,
      patient_id: 103,
      first_name: "Emma",
      last_name: "Laurent",
      photo_url: "https://i.pravatar.cc/48?u=103",
      message: "J'ai une question concernant le traitement que vous m'avez prescrit. Est-ce normal d'avoir ces effets ?",
      read: 1,
      created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    },
    {
      notification_id: 4,
      professional_id: professionalId || 1,
      project_id: 104,
      patient_id: 104,
      first_name: "Lucas",
      last_name: "Moreau",
      photo_url: "https://i.pravatar.cc/48?u=104",
      message: "Bonjour docteur, je souhaiterais modifier mon rendez-vous de demain si possible.",
      read: 1,
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      notification_id: 5,
      professional_id: professionalId || 1,
      project_id: 105,
      patient_id: 105,
      first_name: "Camille",
      last_name: "Bernard",
      photo_url: "https://i.pravatar.cc/48?u=105",
      message: "Suite à notre consultation, j'aimerais avoir des précisions sur les exercices recommandés.",
      read: 1,
      created_at: new Date(Date.now() - 86400000 - 3600000).toISOString(), // 1 day and 1 hour ago
    },
    {
      notification_id: 6,
      professional_id: professionalId || 1,
      project_id: 106,
      patient_id: 106,
      first_name: "Antoine",
      last_name: "Rousseau",
      photo_url: "https://i.pravatar.cc/48?u=106",
      message: "Merci pour la consultation d'hier. Les résultats sont-ils déjà disponibles ?",
      read: 0,
      created_at: new Date(Date.now() - 86400000 - 7200000).toISOString(), // 1 day and 2 hours ago
    }
  ])

  // Mark all as read when page loads (simulation)
  useEffect(() => {
    if (professionalId) {
      // Simulate marking notifications as read after 1 second
      const timer = setTimeout(() => {
        setNotifications(prevNotifs => 
          prevNotifs.map(n => ({ ...n, read: 1 }))
        )
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [professionalId])

  // split today / yesterday
  const todayDate = new Date().toDateString()
  const yesterdayDate = new Date(Date.now() - 86400000).toDateString()

  const todayNotifs = notifications.filter(
    n => new Date(n.created_at).toDateString() === todayDate
  )
  const yesterdayNotifs = notifications.filter(
    n => new Date(n.created_at).toDateString() === yesterdayDate
  )

  return (
    <div className="pro">
    <div className="pure">
      <TopbarPro />

      {/* Hero carousel */}
      <br />
              {/* ░░ Carousel ░░ */}
              <section className="partner-strip">
                        <img src={strip1} alt="Partner 1" />
                        <img src={strip2} alt="Partner 2" />
                        <img src={strip3} alt="Partner 3" />
                      </section>      <main className="grid">
        <SidebarPro active="Notifications" />
        <div className="content" style={{ marginLeft: '364px' }}>
          <div className="notifications-card"><div className="notifications-header bg-white p-8 border-b border-gray-200">
              <div className="header-top mb-8">                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  Notifications <span className="count">{notifications.filter(n => n.read === 0).length}</span>
                </h2>
                
                <div className="notification-stats flex gap-12 mb-8">
                  <span className="stat-item bg-blue-100 text-blue-800 px-6 py-4 rounded-xl font-bold text-lg shadow-md">
                    <strong className="text-2xl mr-3">{todayNotifs.length}</strong>
                    <span>aujourd'hui</span>
                  </span>
                  <span className="stat-item bg-red-100 text-red-800 px-6 py-4 rounded-xl font-bold text-lg shadow-md">
                    <strong className="text-2xl mr-3">{notifications.filter(n => n.read === 0).length}</strong>
                    <span>non lues</span>
                  </span>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 mt-4">Gérez vos notifications et restez informé des dernières activités</p>
            </div>

            <div className="notifications-list">
              {todayNotifs.length > 0 && (
                <div className="notification-section mb-8">                <h3 className="text-lg font-semibold text-gray-700 mb-4 px-3">Aujourd'hui</h3>
                  <div className="notification-group space-y-2">
                    {todayNotifs.map(n => (
                      <div
                        key={n.notification_id}
                        className="p-3 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-all duration-200 border border-blue-200 rounded-lg mx-3 flex items-start gap-3 shadow-sm border-l-4 border-blue-500"
                        onClick={() => navigate(`/pro/projects/${n.project_id}`)}
                      >
                        <div className="relative">
                          <img
                            src={n.photo_url || `https://i.pravatar.cc/48?u=${n.patient_id}`}
                            alt={`${n.first_name} ${n.last_name}`}
                            className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-blue-300"
                          />
                          {n.read === 0 && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-sm text-blue-900">
                              {n.first_name} {n.last_name}                            </h4>
                            <span className="text-xs text-blue-600 bg-white px-2 py-1 rounded-full shadow-sm ml-2">
                              {timeSince(n.created_at)}
                            </span>
                          </div>
                          <div className="flex justify-between items-end">
                            <p className="text-sm leading-relaxed text-blue-800 font-medium">
                              {n.message}
                            </p>
                            {n.read === 0 && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0 font-medium">
                                Nouveau
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {yesterdayNotifs.length > 0 && (
                <div className="notification-section">                  <h3>Hier</h3>
                  <div className="notification-group">
                    {yesterdayNotifs.map(n => (
                      <div
                        key={n.notification_id}
                        className={`p-4 hover:bg-blue-50 cursor-pointer transition-all duration-200 border-b border-gray-100 flex items-start gap-4 ${
                          n.read === 0 ? "bg-blue-50 border-l-4 border-blue-500" : "bg-white"
                        }`}
                        onClick={() => navigate(`/pro/projects/${n.project_id}`)}
                      >
                        <div className="relative">
                          <img
                            src={n.photo_url || `https://i.pravatar.cc/48?u=${n.patient_id}`}
                            alt={`${n.first_name} ${n.last_name}`}
                            className="w-12 h-12 rounded-full object-cover shadow-lg ring-2 ring-white"
                          />
                          {n.read === 0 && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-semibold text-sm ${n.read === 0 ? "text-gray-900" : "text-gray-700"}`}>
                              {n.first_name} {n.last_name}
                            </h4>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {timeSince(n.created_at)}
                            </span>
                          </div>
                          <div className="flex justify-between items-end">
                            <p className={`text-sm leading-relaxed ${n.read === 0 ? "text-gray-800 font-medium" : "text-gray-600"}`}>
                              {n.message}
                            </p>
                            {n.read === 0 && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0">
                                Nouveau
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {todayNotifs.length === 0 && yesterdayNotifs.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <h3>Aucune notification</h3>
                  <p>Vous n'avez aucune notification pour le moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <FooterPro />
    </div>
    </div>
  )
}
