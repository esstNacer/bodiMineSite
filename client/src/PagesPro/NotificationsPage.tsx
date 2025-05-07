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

import "../assets/NotificationsPage.css"

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

  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (!professionalId) return

    // 1) Fetch
    fetch(`/api/notifications/pro/${professionalId}`)
      .then(res => res.json())
      .then((data: Notification[]) => {
        setNotifications(data)
        // 2) Mark all as read
        return fetch(
          `/api/notifications/pro/${professionalId}/mark-read`,
          { method: "PUT" }
        )
      })
      .then(() => {
        // update local state
        setNotifications(nots => nots.map(n => ({ ...n, read: 1 })))
      })
      .catch(console.error)
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
                      </section>

      <main className="grid">
        <SidebarPro active="Notifications" />

        <div className="content">
          <div className="notifications-card">
            <div className="notifications-header">
              <h2>Notifications</h2>
              <p>You have {todayNotifs.length} notifications today</p>
            </div>

            {todayNotifs.length > 0 && (
              <div className="notification-section">
                <h3>Today</h3>
                {todayNotifs.map(n => (
                  <div
                    key={n.notification_id}
                    className={`notification-item${n.read === 0 ? " unread" : ""}`}
                    onClick={() => navigate(`/pro/projects/${n.project_id}`)}
                  >
                    <img
                      src={n.photo_url || "/images/default-avatar.png"}
                      alt={`${n.first_name} ${n.last_name}`}
                      className="notification-avatar"
                    />
                    <div className="notification-details">
                      <span className="notification-title">
                        {n.first_name} {n.last_name}
                      </span>
                      <span className="notification-message">{n.message}</span>
                    </div>
                    <span className="notification-time">
                      {timeSince(n.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {yesterdayNotifs.length > 0 && (
              <div className="notification-section">
                <h3>Yesterday</h3>
                {yesterdayNotifs.map(n => (
                  <div
                    key={n.notification_id}
                    className={`notification-item${n.read === 0 ? " unread" : ""}`}
                    onClick={() => navigate(`/pro/projects/${n.project_id}`)}
                  >
                    <img
                      src={n.photo_url || "/images/default-avatar.png"}
                      alt={`${n.first_name} ${n.last_name}`}
                      className="notification-avatar"
                    />
                    <div className="notification-details">
                      <span className="notification-title">
                        {n.first_name} {n.last_name}
                      </span>
                      <span className="notification-message">{n.message}</span>
                    </div>
                    <span className="notification-time">
                      {timeSince(n.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {todayNotifs.length === 0 && yesterdayNotifs.length === 0 && (
              <p style={{ padding: "24px", textAlign: "center", color: "#666" }}>
                No notifications.
              </p>
            )}
          </div>
        </div>
      </main>

      <FooterPro />
    </div>
    </div>
  )
}
