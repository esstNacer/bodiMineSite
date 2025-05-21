// src/pages/admin/AdminDashboard.tsx
// -----------------------------------------------------------------------------
// Admin dashboard displaying key metrics and latest records.
// -----------------------------------------------------------------------------
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiChevronRight,
  FiUsers,
  FiUserPlus,
  FiMonitor,
  FiBell,
  FiTrendingUp,
  FiUserCheck,
} from "react-icons/fi";
import AdminSidebar from "./AdminSidebar";
import "./styles/AdminDashboard.css";

/* ————————————————————————————————————————————————
  Types & Interfaces
———————————————————————————————————————————————— */
interface DashboardStats {
  patients: number;
  professionals: number;
  professionalsPremium: number;
  projects: number;
  activeSubscriptions: number;
  activePromotions: number;
  unreadNotifications: number;
}

/* ————————————————————————————————————————————————
  Helper components
———————————————————————————————————————————————— */
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="stat-card card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  </div>
);

interface RecentTableProps {
  title: string;
  api: string;
  to: string;
}

const RecentTable: React.FC<RecentTableProps> = ({ title, api, to }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(api);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRows(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [api]);

  return (
    <section className="recent-table card">
      <div className="table-header">
        <h2>{title}</h2>
        <Link to={to} className="see-all">
          See all
        </Link>
      </div>

      {loading ? (
        <p className="muted">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="muted">No data found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              {Object.keys(rows[0])
                .slice(0, 4)
                .map((k) => (
                  <th key={k}>{k.replace(/_/g, " ")}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {Object.values(row)
                  .slice(0, 4)
                  .map((v, idx) => (
                    <td key={idx}>{String(v)}</td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

/* ————————————————————————————————————————————————
  Main component
———————————————————————————————————————————————— */
export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/summary");
        if (!res.ok) throw new Error("Unable to load summary");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="admin-wrapper">
      <AdminSidebar active="/admin" />

      <main className="admin-main">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <span>Dashboard</span>
          <FiChevronRight />
          <span>Overview</span>
        </nav>

        <h1 className="page-title">Admin Overview</h1>

        {loading || !stats ? (
          <p className="muted">Loading dashboard…</p>
        ) : (
          <>
            {/* ===== Stats grid ===== */}
            <section className="stats-grid">
              <StatCard
                icon={<FiUsers size={28} />}
                label="Patients"
                value={stats.patients}
              />
              <StatCard
                icon={<FiUserPlus size={28} />}
                label="Professionals"
                value={stats.professionals}
              />
              <StatCard
                icon={<FiUserCheck size={28} />}
                label="Premium Professionals"
                value={stats.professionalsPremium}
              />
              <StatCard
                icon={<FiMonitor size={28} />}
                label="Projects"
                value={stats.projects}
              />
              <StatCard
                icon={<FiTrendingUp size={28} />}
                label="Active Subs"
                value={stats.activeSubscriptions}
              />
              <StatCard
                icon={<FiTrendingUp size={28} />}
                label="Promotions"
                value={stats.activePromotions}
              />
              <StatCard
                icon={<FiBell size={28} />}
                label="Unread Notifs"
                value={stats.unreadNotifications}
              />
            </section>

            {/* ===== Latest records ===== */}
            <div className="two-col">
              <RecentTable
                title="Latest Patients"
                api="/api/admin/patients?limit=5"
                to=""
              />
              <RecentTable
                title="Latest Professionals"
                api="/api/admin/professionals?limit=5"
                to="/admin/professionals"
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ————————————————————————————————————————————————
  Quick styling hints (Add to styles/AdminDashboard.css)
———————————————————————————————————————————————— */
/*
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px;
}

.stat-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  border-radius: 50%;
}

.stat-info h3 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
}

.recent-table {
  margin-bottom: 32px;
  overflow-x: auto;
}

.recent-table table {
  width: 100%;
  border-collapse: collapse;
}

.recent-table th,
.recent-table td {
  padding: 10px 14px;
  border-bottom: 1px solid #e9ecef;
  text-align: left;
  white-space: nowrap;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.see-all {
  font-size: 0.9rem;
  color: var(--primary-color);
}

.two-col {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
*/
