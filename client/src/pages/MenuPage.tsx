import { useNavigate } from 'react-router-dom';
import {
  FiChevronRight,
  FiExternalLink,
  FiSettings,
  FiLock,
  FiStar,
  FiFileText,
  FiFile,
  FiHelpCircle,
  FiTrash2,
} from 'react-icons/fi';
import BottomNav from '../components/BottomNav';
import { JSX, useContext, useState } from 'react';
import "../assets/MenuPage.css"
import { UserContext, useUser } from '../components/UserContext';
import ConfirmationModal from '../components/ConfirmationModal';

interface MenuItem {
    id: string;
    label: string;
    icon: JSX.Element;
    route: string;      // ← devient obligatoire
    external?: boolean; // ← juste un flag
  }

const MenuPageMobile = () => {
  const navigate = useNavigate();
  
  const { user, updateUser } =
    useContext(UserContext) || ({ user: null, updateUser: () => {} } as any);
  const { logout } = useUser();
  
  // États pour les modals de confirmation
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  /* items internes  (→ chevron) */
  const internal: MenuItem[] = [
    { id: 'edit', label: 'Edit Profile',        icon: <FiSettings />, route: '/editProfile' },
    { id: 'pwd',  label: 'Change Password',     icon: <FiLock />,     route: '/change-password' },
    { id: 'proj', label: 'My body project',     icon: <FiStar />,     route: '/myBodyProject' },
  ];

  /* items externes  (→ flèche sortie) */
  const external: MenuItem[] = [
    { id: 'terms',   label: 'Terms & Conditions Patients', icon: <FiFileText />,  route: '/CGU',   external: true },
    { id: 'news',    label: 'News & Article',              icon: <FiFile />,      route: '/news',    external: true },
    { id: 'support', label: 'Support',                     icon: <FiHelpCircle />,route: '/support', external: true },
    { id: 'delete',  label: 'Delete Account',              icon: <FiTrash2 />,    route: '/delete',  external: true },
  ];

  const handleClick = (item: MenuItem) => {
    if (item.external) {
      // ⇢ Ouvre l’URL externe (ou un path public) dans un nouvel onglet
      window.open(item.route, '_blank', 'noopener,noreferrer');
    } else {
      // ⇢ Navigation interne React Router
      navigate(item.route);
    }
  };

  return (
    <div className="menu-mobile">
      <h1 className="page-title">Menu</h1>

      {/* avatar + nom */}
      <div className="user-block">
        <img
          src="https://i.pravatar.cc/96?u=patient"
          alt="avatar"
          className="avatar"
        />
        <span className="username">{user?.first_name} {user?.last_name}</span>
      </div>

      {/* liste 1 */}
      <ul className="menu-list">
        {internal.map(item => (
          <li key={item.id} onClick={() => handleClick(item)}>
            <span className="icon-square">{item.icon}</span>
            <span className="label">{item.label}</span>
            <FiChevronRight className="arrow" />
          </li>
        ))}
      </ul>

      <hr className="divider" />

      {/* liste 2 */}
      <ul className="menu-list">
        {external.map(item => (
          <li key={item.id} onClick={() => handleClick(item)}>
            <span className="icon-square">{item.icon}</span>
            <span className="label">{item.label}</span>
            <FiExternalLink className="arrow" />
          </li>
        ))}
      </ul>

      {/* logout */}
      <button className="logout-btn" /* onClick={logout} */>
        Logout
      </button>

      {/* nav fixe */}
      <BottomNav />
    </div>
  );
};

export default MenuPageMobile;
