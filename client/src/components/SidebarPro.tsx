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
// Tailwind CSS uniquement - plus besoin d'importer la feuille de style

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
    { id: "Dashboard", label: "Dashboard",          icon: <Menu size={20}/>,       to: "/pro/dashboard"         },
    { id: "Edit",      label: "Edit Profile",       icon: <User size={20}/>,       to: "/pro/edit"              },
    { id: "Plan",      label: "Your Plan",          icon: <Star size={20}/>,       to: "/pro/plan"              },
    {id: "DoctorEst", label: "Doctor list",        icon: <Notebook size={20}/>,   to: "/pro/doctor-est"        },
    { id: "Purchase",  label: "Purchase Services",  icon: <FaMoneyBill size={20}/>,to: "/pro/purchase-services" },
    { id: "Password",  label: "Change Password",    icon: <Lock size={20}/>,       to: "/pro/password"          },
    { id: "Terms",     label: "Terms & Conditions", icon: <Paperclip size={20}/>,  to: "/pro/CGU"               },
    { id: "Support",   label: "Support",            icon: <Headphones size={20}/>, to: "/pro/support"           },
  ];
  return (    <aside className={`bg-white border border-[#dfe6f2] rounded-[10px] p-[22px] flex flex-col gap-[26px] w-[240px] max-w-[240px] overflow-hidden ${cls}`}>
      {/* Profile Card */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={profileUrl || defaultAvatar}
            alt="avatar"
            className="w-[48px] h-[48px] rounded-full block flex-shrink-0"
          />
          <div className="flex flex-col flex-1 min-w-0">
            <h4 className="text-base font-semibold truncate">{professional?.full_name}</h4>
            <span className="text-[#11c24d] font-semibold text-sm">Online</span>
          </div>
        </div>
        <div className="flex-shrink-0 ml-2">
          <Link
            to="/pro/notifications"
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors border ${hasUnread ? "bg-[#e74c3c] text-white border-[#e74c3c]" : "bg-gray-50 text-[#6e7e95] border-gray-200"} hover:!bg-[#379dd1] hover:!text-white hover:!border-[#379dd1]`}
            title="Notifications"
          >
            <Bell size={16} />
          </Link>
        </div>
      </div>

      {/* Side Links */}      <ul className="flex flex-col gap-1 w-full mb-5">        {items.map(it => (          <li 
            key={it.id} 
            className={`w-full mb-[2px]`}
          >            <Link 
              to={it.to} 
              className={`flex items-center gap-3 p-[10px_12px] rounded-[10px] text-base cursor-pointer w-full no-underline whitespace-nowrap
                ${active === it.id 
                  ? 'bg-[#379dd1] text-white font-semibold' 
                  : 'text-[#6e7e95]'} hover:!bg-[#379dd1] hover:!text-white`}
            >
              <span className="flex-shrink-0 block min-w-[20px]">{it.icon}</span> {it.label}
            </Link>
          </li>
        ))}
      </ul>
      
      {/* Buttons */}
      <button 
        className="mt-auto mb-[10px] text-white border-none rounded-[10px] py-[0.7rem] px-[1.2rem] cursor-pointer flex items-center justify-start gap-3 text-base text-left w-full bg-[#f44336]" 
        onClick={proLogout}
      >
        <LogOut size={20}/> Logout
      </button>
      <button 
        className="mt-[10px] text-white border-none rounded-[10px] py-[0.7rem] px-[1.2rem] cursor-pointer flex items-center justify-start gap-3 text-base text-left w-full bg-[#e91e63]" 
        onClick={handleDeleteAccount}
      >
        <Delete size={20}/> Delete Account
      </button>
    </aside>
  );
}
