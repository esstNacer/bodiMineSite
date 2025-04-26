// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom';          // or remove if you don’t use React-Router
import logoBodyMine from '../images/logobodymine.png';  // adjust relative path if needed
import '../assets/Footer.css';                            // optional global / module CSS

const Footer: React.FC = () => (
  <footer className="site-footer">
    <img src={logoBodyMine} alt="BodyMine logo" />

    <p className="tagline">
      BodyMine is the leading directory to help you find the perfect surgeon
      or clinic, anywhere in the world.
    </p>

    <div className="f-columns">
      {/* column 1 */}
      <div>
        <h6>Home</h6>
        <ul>
          <li><Link to="/">Menu</Link></li>
          <li><Link to="/chat">Chat</Link></li>
        </ul>
      </div>

      {/* column 2 */}
      <div>
        <h6>Info</h6>
        <ul>
          <li><Link to="/terms">Terms &amp; Conditions</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/faq">FAQs</Link></li>
        </ul>
      </div>

      {/* column 3 */}
      <div>
        <h6>Contact Us</h6>
        <p><a href="mailto:info@bodymine.com">info@bodymine.com</a></p>
      </div>
    </div>
  </footer>
);

export default Footer;