// src/components/TopbarPro.tsx
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { usePro } from "./ProContext";

import logo   from "../images/logobodymine.png";
import avatar from "../images/doctor-small.png";
import "../assets/ProfessionalDashboard.css";   // ou la feuille où se trouve .topbar /.navbar

/* props -----------------------------------------------------------------*/
interface TopbarProps {
  /** classe CSS à utiliser à la place de "topbar" (optionnel) */
  classNameOverride?: string;
}

export default function TopbarPro({ classNameOverride }: TopbarProps) {
  const { professional, proLogout } = usePro();

  /* si aucune classe passée → on garde "topbar" */
  const cls = classNameOverride ?? "topbar";

  return (
    <nav className={cls}>
      <Link to="/pro/dashboard">
        <img src={logo} alt="BodyMine" className="logo" />
      </Link>

      <div className="topbar-right">
        <span className="lang">EN ▾</span>

        <img src={avatar} alt="avatar" className="avatar-sm" />

        <div className="doc-info">
          <strong>{professional?.full_name ?? "Doctor"}</strong>
          <span className="online">Online</span>
        </div>

        <button className="btn tiny" onClick={proLogout}>
          <LogOut size={14}/> Logout
        </button>
      </div>
    </nav>
  );
}
