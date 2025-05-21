import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import bodyMine from "../images/LogoBODYMINE.png";
import "../assets/Home.css";          // tes variables + .footer existants
import "./Footer.css";                // 10 lignes d’addons (ci-dessous)
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
  return (
    <footer className={`footer ${className}`}>
  <div className="footer-content">
    {/* ───── Bloc logo + réseaux + pitch ───── */}
    <div className="footer-block">
      <div className="footer-brand">
        <img src={bodyMine} alt="BodyMine" className="footer-logo" />

        <div className="socialfoot-icons">
          <Link to="https://facebook.com" target="_blank" aria-label="Facebook">
            <FaFacebookF />
          </Link>
          <Link
            to="https://www.instagram.com/bodymine.insta/"
            target="_blank"
            aria-label="Instagram"
          >
            <FaInstagram />
          </Link>
          <Link to="https://tiktok.com" target="_blank" aria-label="TikTok">
            <FaTiktok />
          </Link>
        </div>
      </div>

      <p>
        BodyMine is the leading directory to help you find the perfect
      </p>
      <p>surgeon or clinic, anywhere in the world.</p>
    </div>

    {/* ───── Colonnes de liens (wrapper .footer-links) ───── */}
    <div className="footer-links">
      {/* Home */}
      <div className="footer-block">
        <h4>Home</h4>
        <ul>
          <li>
            <Link to="/home">Menu</Link>
          </li>
          <li>
            <Link to="/chat" onClick={() => handleNav('/chat')}>
              Chat
            </Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </div>

      {/* Info */}
      <div className="footer-block">
        <h4>Info</h4>
        <ul>
          <li>
            <Link to="/terms">Terms&nbsp;&amp;&nbsp;Conditions</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/faq" onClick={handleFaq}>
              FAQs
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div className="footer-block">
        <h4>Contact&nbsp;Us</h4>
        <ul>
          <li>
            <a href="mailto:info@bodymine.com">info@bodymine.com</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>

  );
}
