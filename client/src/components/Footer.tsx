import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import bodyMine from "../images/LogoBODYMINE.png";
import { useUser } from "./UserContext";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const navigate = useNavigate();
  const { user } = useUser();  
  const handleNav = (path: string) => {
    if (user) navigate(path);
    else      navigate("/login");
  };

  const handleFaq = () => {
    if (user) navigate("/faq");
    else      navigate("/faqInfo");
  };
    const linkClass =
    "text-white/90 hover:text-white transition-colors duration-150";
  
  return (
    <footer className={`bg-[#96DCD7] py-10 md:py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* --- Grille principale : logo/slogan + 3 colonnes de liens --- */}
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          {/* ===== Colonne : Logo  +  Réseaux  +  Pitch ===== */}
          <div className="md:max-w-sm flex flex-col items-center md:items-start gap-6">
            {/* Logo + icônes réseaux */}
            <div className="flex items-center gap-6">
              <img
                src={bodyMine}
                alt="BodyMine"
                className="h-16 w-auto select-none"
              />

              <div className="flex gap-3">
                {[
                  {
                    href: "https://facebook.com",
                    label: "Facebook",
                    Icon: FaFacebookF
                  },
                  {
                    href: "https://www.instagram.com/bodymine.insta/",
                    label: "Instagram",
                    Icon: FaInstagram
                  },
                  { href: "https://tiktok.com", label: "TikTok", Icon: FaTiktok }
                ].map(({ href, label, Icon }) => (
                  <Link
                    key={label}
                    to={href}
                    target="_blank"
                    aria-label={label}
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-white text-[#7ddbdc] hover:bg-white/30 hover:text-white transition-colors duration-150"
                  >
                    <Icon className="text-base" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Pitch */}
            <p className="text-center md:text-left text-white leading-relaxed">
              Bodymine is the leading directory to help you find&nbsp;the
              perfect surgeon or clinic, anywhere in the world.
            </p>
          </div>

          {/* ===== Grille de navigation (3 × col) ===== */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-8 py-2">
            {/* --- Home --- */}
            <nav>
              <h4 className="text-lg font-semibold mb-3 text-white">Home</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/home" className={linkClass}>
                    Menu
                  </Link>
                </li>
                <li>
                  <Link to="/chat" className={linkClass}>
                    Chat
                  </Link>
                </li>
                <li>
                  <Link to="/search" className={linkClass}>
                    Search
                  </Link>
                </li>
              </ul>
            </nav>

            {/* --- Info --- */}
            <nav>
              <h4 className="text-lg font-semibold mb-3 text-white">Info</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className={linkClass}>
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className={linkClass}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className={linkClass}>
                    FAQs
                  </Link>
                </li>
              </ul>
            </nav>

            {/* --- Contact --- */}
            <nav>
              <h4 className="text-lg font-semibold mb-3 text-white">Contact&nbsp;Us</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:info@bodymine.com" className={linkClass}>
                    info@Bodymine.com
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
