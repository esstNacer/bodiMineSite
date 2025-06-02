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
  
  return (
    <footer className={`bg-[#96DCD7] py-8 px-4 md:px-12 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Logo + Social + Pitch */}
          <div className="md:max-w-xs">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-4">
                <img src={bodyMine} alt="BodyMine" className="h-12" />
                
                <div className="flex gap-3">
                  <Link to="https://facebook.com" target="_blank" aria-label="Facebook" className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-[#7ddbdc] hover:bg-opacity-30 hover:text-white transition duration-200">
                    <FaFacebookF />
                  </Link>
                  <Link to="https://www.instagram.com/bodymine.insta/" target="_blank" aria-label="Instagram" className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-[#7ddbdc] hover:bg-opacity-30 hover:text-white transition duration-200">
                    <FaInstagram />
                  </Link>
                  <Link to="https://tiktok.com" target="_blank" aria-label="TikTok" className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-[#7ddbdc] hover:bg-opacity-30 hover:text-white transition duration-200">
                    <FaTiktok />
                  </Link>
                </div>
              </div>
              
              <p className="text-center md:text-left text-gray-800 md:mt-2">
                BodyMine is the leading directory to help you find the perfect
                surgeon or clinic, anywhere in the world.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Home */}
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800">Home</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/home" className="text-gray-800 hover:underline">Menu</Link>
                </li>
                <li>
                  <Link to="/chat" onClick={() => handleNav('/chat')} className="text-gray-800 hover:underline">
                    Chat
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="text-gray-800 hover:underline">Search</Link>
                </li>
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800">Info</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="text-gray-800 hover:underline">Terms &amp; Conditions</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-800 hover:underline">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/faq" onClick={handleFaq} className="text-gray-800 hover:underline">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800">Contact Us</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:info@bodymine.com" className="text-gray-800 hover:underline">info@bodymine.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
