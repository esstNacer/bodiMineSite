// src/components/SidebarPro.tsx
import { Link } from "react-router-dom";
import {
  Menu, User, Star, Notebook, Lock,
  Paperclip, Headphones, LogOut
} from "lucide-react";
import { FaMoneyBill } from "react-icons/fa";
import { usePro } from "./ProContext";

import avatar from "../images/doctor-small.png";
import "../assets/ProfessionalDashboard.css";

interface SidebarProps {
  active?: string;             // entrée mise en surbrillance
  classNameOverride?: string;  // classe CSS substitutive (ex.: "sidebar")
}

export default function SidebarPro({
  active = "Dashboard",
  classNameOverride
}: SidebarProps) {
  const { professional, proLogout } = usePro();
  const cls = classNameOverride ?? "sidebar";

  const items = [
    { id:"Dashboard" , label:"Dashboard"         , icon:<Menu size={16}/>       , to:"/pro/dashboard"         },
    { id:"Edit"      , label:"Edit Profile"      , icon:<User size={16}/>       , to:"/pro/profile/edit"      },
    { id:"Plan"      , label:"Your Plan"         , icon:<Star size={16}/>       , to:"/pro/plan"              },
    { id:"DoctorEst" , label:"Doctor Est"        , icon:<Notebook size={16}/>   , to:"/pro/doctor-est"        },
    { id:"Purchase"  , label:"Purchase Services" , icon:<FaMoneyBill size={16}/>, to:"/pro/purchase-services" },
    { id:"Password"  , label:"Change Password"   , icon:<Lock size={16}/>       , to:"/pro/password"          },
    { id:"Terms"     , label:"Terms & Conditions", icon:<Paperclip size={16}/>  , to:"/pro/terms"             },
    { id:"Support"   , label:"Support"           , icon:<Headphones size={16}/> , to:"/pro/support"           },
  ];

  return (
    <aside className={cls}>
      <div className="profile-card">
        <img src={avatar} alt="avatar" />
        <div>
          <h4>{professional?.full_name}</h4>
          <span className="online">Online</span>
        </div>
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
    </aside>
  );
}
