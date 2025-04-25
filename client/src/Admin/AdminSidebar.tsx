// src/components/admin/AdminSidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiLock,
  FiUser,
  FiUsers,
  FiFileText,
  FiBookOpen,
  FiImage,
} from "react-icons/fi";

import "./styles/AdminSidebar.css";

/* ─────────── types ─────────── */
type Item = { to: string; label: string; icon: React.ReactNode };
type Section = { title: string; items: Item[] };

interface SidebarProps {
  /** string identifiant l’item actif (chemin ou libellé) */
  active?: string;
}

/* ─────────── data ─────────── */
const sections: Section[] = [
  {
    title: "Dashboard",
    items: [{ to: "/admin", label: "Dashboard", icon: <FiHome /> }],
  },
  {
    title: "Access Manage",
    items: [
      { to: "/admin/roles", label: "Roles", icon: <FiLock /> },
      { to: "/admin/staff", label: "Staff", icon: <FiUsers /> },
    ],
  },
  {
    title: "Basic Element",
    items: [
      { to: "/admin/specialization", label: "Specialization", icon: <FiBookOpen /> },
      { to: "/admin/article", label: "Article", icon: <FiFileText /> },
    ],
  },
  {
    title: "",
    items: [{ to: "/admin/blog", label: "Blog", icon: <FiFileText /> }],
  },
  {
    title: "Banner patient",
    items: [{ to: "/admin/banner/patient", label: "Banner Patient", icon: <FiImage /> },
        { to: "/admin/banner/pro", label: "Banner Pro", icon: <FiImage /> }
    ],
  },
  {
    title: "Users",
    items: [{ to: "/admin/users", label: "Users", icon: <FiUser /> }],
  },
];

/* ─────────── component ─────────── */
export default function AdminSidebar({ active }: SidebarProps) {
  /* normalise la prop pour comparaison */
  const activeKey = active?.toLowerCase().trim();

  return (
    <aside className="admin-sidebar">
      {/* logo + burger */}
      <header className="sidebar-header">
        <span className="logo">BodyMine</span>
        <FiMenu className="burger" />
      </header>

      {/* nav sections */}
      {sections.map(({ title, items }) => (
        <div key={title} className="sidebar-section">
          {title && <h4 className="section-title">{title}</h4>}

          <ul>
            {items.map(({ to, label, icon }) => {
              /* actif si NavLink l’est OU si la prop l’indique */
              const isPropActive =
                activeKey === to.toLowerCase() || activeKey === label.toLowerCase();

              return (
                <li key={label}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      isActive || isPropActive ? "nav-link active" : "nav-link"
                    }
                    /* si tu ne veux pas que NavLink change seul : replace className par
                       isPropActive ? "nav-link active" : "nav-link"                  */
                  >
                    {icon}
                    <span>{label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
