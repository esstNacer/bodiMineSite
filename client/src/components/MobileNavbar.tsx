// src/components/MobileNavbar.tsx
import { Link } from "react-router-dom";
import bodyMine from "../images/logobodymine.png";
import "../assets/Home.css";

interface MobileNavbarProps {
  /**  
   * Classe(s) supplémentaire(s) pour personnaliser le header  
   * (ex. "shadow-lg" ou "bg-white")  
   */
  className?: string;
  /**
   * Optionnel : slot à droite du logo (icône menu, cloche, etc.)
   */
  rightSlot?: React.ReactNode;
}

export default function MobileNavbar({
  className = "",
  rightSlot,
}: MobileNavbarProps) {
  return (
    <header className={`navbar-tel ${className}`}>
      <div className="logo-tel">
        <Link to="/">
          <img src={bodyMine} alt="BodyMine Cosmetic Surgery" />
        </Link>
      </div>

      {/* zone facultative pour icônes / actions */}
      {rightSlot && <div className="navbar-actions">{rightSlot}</div>}
    </header>
  );
}
