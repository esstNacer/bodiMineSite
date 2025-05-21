// src/components/Header.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiMessageCircle, FiSearch } from "react-icons/fi";
import "../assets/Home.css";
import bodyMine from "../images/LogoBODYMINE.png";
import { useUser } from "./UserContext";          // ton contexte d'auth

/* -----------------------------------------------------------
   Types des props
----------------------------------------------------------- */
interface HeaderProps {
  className?: string;
  onProtectedNav?: (path: string) => void; // facultatif : hook externe
}

/* -----------------------------------------------------------
   Composant Header global
----------------------------------------------------------- */
export default function Header({
  className = "",
  onProtectedNav,
}: HeaderProps) {
  const navigate = useNavigate();
  const { user } = useUser();                // récupère l’utilisateur

  /** Navigation protégée :
   *  - si onProtectedNav est fourni, on délègue
   *  - sinon : connecté → path, non connecté → /login
   */
  const handleNav = (path: string) => {
    if (onProtectedNav) return onProtectedNav(path);

    if (user) navigate(path);
    else      navigate("/login");
  };
  const location = useLocation();     // ← chemin courant

  // petit helper
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`navbar ${className}`}>
      {/* ------- Logo + liens principaux ------- */}
       <div className="navbar-left">
      <div className="logo">
        <Link to="/">
          <img src={bodyMine} alt="BodyMine Cosmetic Surgery" />
        </Link>
      </div>

      <nav className="nav-links">
        <button
          type="button"
          className={`nav-btn ${isActive('/home') ? 'active' : ''}`}
          onClick={() => navigate('/home')}
        >
          <FiHome /> Home
        </button>

        <button
          type="button"
          className={`nav-btn ${isActive('/chat') ? 'active' : ''}`}
          onClick={() => navigate('/chat')}
        >
          <FiMessageCircle /> Chat
        </button>

        <button
          type="button"
          className={`nav-btn ${isActive('/search') ? 'active' : ''}`}
          onClick={() => navigate('/search')}
        >
          <FiSearch /> Search
        </button>
      </nav>
    </div>

      {/* ------- Zone droite : langue + profil / login ------- */}
      <div className="navbar-right">
        <span className="lang">EN ▾</span>

        {user ? (
          <Link to="/editProfile" className="profile">
            <img
              className="avatar"
              src={user.photo_url || "https://i.pravatar.cc/40"}
              alt="User Avatar"
            />
            <span className="name">
              {user.first_name} {user.last_name} <span className="status">●</span>
            </span>
          </Link>
        ) : (
          <Link to="/login" className="nav-btn login-desktop">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
