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
    <header className="navbar w-full bg-[#93dad6] flex items-center justify-between px-6 md:px-16 py-6 md:py-1 min-h-[100px] md:min-h-[130px]">
      {/* Logo à gauche */}
      <div className="flex items-center min-w-0">
        <Link to="/">
          <img src={bodyMine} alt="BodyMine Cosmetic Surgery" className="max-h-16 md:max-h-19 w-auto object-contain" />
        </Link>
      </div>

      {/* Navigation centrée */}
      <nav className="flex-1 flex justify-start items-center gap-6 md:gap-12">
       <button
  type="button"
  className={`ml-32 nav-btn${isActive('/home') ? ' active' : ''} text-lg md:text-xl font-semibold flex items-center px-4 md:px-3 py-1 md:py-1 rounded-md transition`}
  onClick={() => navigate('/home')}
>
  <FiHome className="text-2x2 md:text-3x3 mr-2" /> Home
</button>

        <button
          type="button"
          className={`nav-btn${isActive('/chat') ? ' active' : ''} text-lg md:text-xl font-semibold flex items-center px-4 md:px-3 py-1 md:py-1 rounded-md transition`}
          onClick={() => navigate('/chat')}
        >
          <FiMessageCircle className="text-2x2 md:text-3x3 mr-2" /> Chat
        </button>
        <button
          type="button"
          className={`nav-btn${isActive('/search') ? ' active' : ''} text-lg md:text-xl font-semibold flex items-center px-4 md:px-3 py-1 md:py-1 rounded-md transition`}
          onClick={() => navigate('/search')}
        >
          <FiSearch className="text-2x2 md:text-3x3 mr-2" /> Search
        </button>
        <Link to="/login" className="nav-btn login-mobile text-lg md:text-xl font-semibold px-4 md:px-8 py-2 md:py-3 rounded-md transition">
          Login
        </Link>
      </nav>

    <div className="flex items-center gap-4 md:gap-10 min-w-0">
  <span className="lang text-base md:text-lg font-semibold flex items-center gap-1">
<img
  src="https://flagcdn.com/gb.svg"
  alt="UK flag"
  className="w-6 h-6 md:w-5 md:h-5 rounded-full object-cover "
/>    <span className="ang text-base md:text-lg  text-black font-normal">EN</span>
    <span className="ml-1 text-black">▾</span>
  </span>

        {user ? (
          <Link to="/editProfile" className="profile flex items-center gap-2 md:gap-3 min-w-5">
            <div className="relative">
             <img
  className="avatar w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white"
  src={user.photo_url || 'https://i.pravatar.cc/40'}
  alt="User Avatar"
/>
              <span className="absolute bottom-0 right-0 block w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white bg-green-500"></span>
            </div>
         
<span className="name text-lg md:text-xl font-semibold truncate max-w-[160px] md:max-w-[220px] flex flex-col items-start">
  <span>{user.first_name} {user.last_name}</span>
  <span className="text-sm md:text-base ml-0 text-green-600">Online</span>
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
