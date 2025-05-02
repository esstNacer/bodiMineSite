// src/components/SidebarPro.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu, User, Star, Notebook, Lock,
  Paperclip, Headphones, LogOut, Bell, Delete
} from "lucide-react";
import { FaMoneyBill } from "react-icons/fa";
import { usePro } from "./ProContext";

import defaultAvatar from "../images/doctor-small.png";
import "../assets/ProfessionalDashboard.css";

interface SidebarProps {
  active?: string;
  classNameOverride?: string;
}

interface Notification {
  notification_id: number;
  read: number; // 0 = unread
}

interface Photo {
  photo_id: number;
  professional_id: number;
  photo_url: string;
  type: string;
  created_at: string;
}

export default function SidebarPro({
  active = "Dashboard",
  classNameOverride
}: SidebarProps) {
  const { professional, proToken, proLogout } = usePro();
  const cls = classNameOverride ?? "sidebar";

  const [hasUnread, setHasUnread] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  // 1) Notifications non lues
  useEffect(() => {
    if (!professional?.professional_id || !proToken) return;

    fetch(`/api/notifications/pro/${professional.professional_id}`, {
      headers: { Authorization: `Bearer ${proToken}` }
    })
      .then(res => res.json())
      .then((data: Notification[] | { error: string }) => {
        if (Array.isArray(data)) {
          setHasUnread(data.some(n => n.read === 0));
        }
      })
      .catch(console.error);
  }, [professional, proToken]);

  // 2) Photos de profil
  useEffect(() => {
    if (!professional?.professional_id || !proToken) return;

    fetch(`/api/photos/pro/${professional.professional_id}`, {
      headers: { Authorization: `Bearer ${proToken}` }
    })
      .then(res => res.json())
      .then((data: Photo[] | { error: string }) => {
        if (Array.isArray(data)) {
          const profiles = data
            .filter(p => p.type === "profile")
            .sort((a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          if (profiles.length) {
            setProfileUrl(profiles[0].photo_url);
          }
        }
      })
      .catch(console.error);
  }, [professional, proToken]);
  const handleDeleteAccount = async () => {
    if (!professional?.professional_id || !proToken) return;
  
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`/api/professional/${professional.professional_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${proToken}`
        }
      });
  
      if (response.ok) {
        alert("Account deleted successfully.");
        proLogout(); // Déconnecte l'utilisateur après suppression
      } else {
        const errorData = await response.json();
        alert("Error deleting account: " + (errorData.error || response.statusText));
      }
    } catch (error) {
      console.error("Deletion error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  

  const items = [
    { id: "Dashboard", label: "Dashboard",          icon: <Menu size={16}/>,       to: "/pro/dashboard"         },
    { id: "Edit",      label: "Edit Profile",       icon: <User size={16}/>,       to: "/pro/edit"              },
    { id: "Plan",      label: "Your Plan",          icon: <Star size={16}/>,       to: "/pro/plan"              },
    { id: "DoctorEst", label: "Doctor list",        icon: <Notebook size={16}/>,   to: "/pro/doctor-est"        },
    { id: "Purchase",  label: "Purchase Services",  icon: <FaMoneyBill size={16}/>,to: "/pro/purchase-services" },
    { id: "Password",  label: "Change Password",    icon: <Lock size={16}/>,       to: "/pro/password"          },
    { id: "Terms",     label: "Terms & Conditions", icon: <Paperclip size={16}/>,  to: "/pro/CGU"               },
    { id: "Support",   label: "Support",            icon: <Headphones size={16}/>, to: "/pro/support"           },
  ];

  return (
    <aside className={cls}>
      <div className="profile-card">
        <img
          src={profileUrl || defaultAvatar}
          alt="avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h4>{professional?.full_name}</h4>
          <span className="online">Online</span>
        </div>
        <Link
          to="/pro/notifications"
          className={`notif-btn${hasUnread ? " unread" : ""}`}
          title="Notifications"
        >
          <Bell size={20} />
        </Link>
      </div>

      <ul className="side-links">
        {items.map(it => (
          <li key={it.id} className={active === it.id ? "active" : ""}>
            <Link to={it.to}>
              {it.icon} {it.label}
            </Link>
          </li>
        ))}
      </ul>

      <button className="btn logout" onClick={proLogout}>
        <LogOut size={16}/> Logout
      </button>
      <button className="btn delete" onClick={handleDeleteAccount}>
        <Delete size={16}/> Delete Account
      </button>
    </aside>
  );
}
