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
console.log(user?.photo_url);
  return (
    <header className="navbar w-full bg-[#93dad6] flex items-center justify-between px-6 md:px-16 py-6 md:py-10 min-h-[100px] md:min-h-[130px]">
      {/* Logo à gauche */}
      <div className="flex items-center min-w-0">
        <Link to="/">
          <img src={bodyMine} alt="BodyMine Cosmetic Surgery" className="max-h-16 md:max-h-20 w-auto object-contain" />
        </Link>
      </div>

      {/* Navigation centrée */}
      <nav className="flex-1 flex justify-center items-center gap-6 md:gap-12">
        <button
          type="button"
          className={`nav-btn${isActive('/home') ? ' active' : ''} text-lg md:text-xl font-semibold flex items-center px-4 md:px-8 py-2 md:py-3 rounded-md transition`}
          onClick={() => navigate('/home')}
        >
          <FiHome className="text-2xl md:text-3xl mr-2" /> Home
        </button>
        <button
          type="button"
          className={`nav-btn${isActive('/chat') ? ' active' : ''} text-lg md:text-xl font-semibold flex items-center px-4 md:px-8 py-2 md:py-3 rounded-md transition`}
          onClick={() => navigate('/chat')}
        >
          <FiMessageCircle className="text-2xl md:text-3xl mr-2" /> Chat
        </button>
        <button
          type="button"
          className={`nav-btn${isActive('/search') ? ' active' : ''} text-lg md:text-xl font-semibold flex items-center px-4 md:px-8 py-2 md:py-3 rounded-md transition`}
          onClick={() => navigate('/search')}
        >
          <FiSearch className="text-2xl md:text-3xl mr-2" /> Search
        </button>
        <Link to="/login" className="nav-btn login-mobile text-lg md:text-xl font-semibold px-4 md:px-8 py-2 md:py-3 rounded-md transition">
          Login
        </Link>
      </nav>

      <div className="flex items-center gap-4 md:gap-7 min-w-0">
        <span className="lang text-base md:text-lg font-semibold flex items-center gap-1">
          <span className="fi fi-gb mr-1" />EN <span className="ml-1">▾</span>
        </span>
        {user ? (
          <Link to="/editProfile" className="profile flex items-center gap-2 md:gap-3 min-w-0">
            <div className="relative">
              <img
                className="avatar w-9 h-9 md:w-12 md:h-12 rounded-full object-cover border-2 border-white"
                src={user.photo_url || 'https://i.pravatar.cc/40'}
                alt="User Avatar"
              />
              <span className="absolute bottom-0 right-0 block w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white bg-green-500"></span>
            </div>
            <span className="name text-base md:text-lg font-semibold truncate max-w-[120px] md:max-w-[180px] flex flex-col items-start">
              <span>{user.first_name} {user.last_name}</span>
              <span className="text-xs md:text-sm ml-0 text-green-600">Online</span>
            </span>
          </Link>
        ) : (
          <Link to="/login" className="nav-btn login-desktop text-lg md:text-xl font-semibold px-4 md:px-8 py-2 md:py-3 rounded-md transition">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
