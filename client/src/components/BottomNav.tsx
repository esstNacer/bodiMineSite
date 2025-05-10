// src/components/BottomNav.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiSearch,
  FiMessageCircle,
  FiMenu
} from "react-icons/fi";
import "./BottomNav.css";
import { useUser } from "./UserContext";

export default function BottomNav() {
    const { user, updateUser, setToken } = useUser();  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isActive = (path: string) => pathname.startsWith(path);

  const handleProtectedNavigation = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bottom-nav">
    {/* Dashboard */}
    <button
      type="button"
      className={isActive("/home") || pathname === "/" ? "navbot-btn active" : "navbot-btn"}
      onClick={() => navigate("/home")}
    >
      <FiGrid className="icon" />
      <span className="label">Dashboard</span>
    </button>

    {/* Search */}
    <button
      type="button"
      className={isActive("/search") ? "navbot-btn active" : "navbot-btn"}
      onClick={() => navigate("/search")}
    >
      <FiSearch className="icon" />
      <span className="label">Search</span>
    </button>

    {/* Chat */}
    <button
      type="button"
      className={isActive("/chat") ? "navbot-btn active" : "navbot-btn"}
      onClick={() => handleProtectedNavigation("/chat")}
    >
      <FiMessageCircle className="icon" />
      <span className="label">Chat</span>
    </button>

    {/* More / Menu */}
    <button
      type="button"
      className={isActive("/menu") ? "navbot-btn active" : "navbot-btn"}
      onClick={() => handleProtectedNavigation("/menu")}
    >
      <FiMenu className="icon" />
      <span className="label">Profile</span>
    </button>
  </nav>
  );
}
