import React from 'react';
import '../assets/SupportPage.css';
import { FiMail, FiPaperclip } from 'react-icons/fi';
import bodyMineLogo from '../images/logobodymine.png';
import helpImage from '../images/help.png';
import { useUser } from '../components/UserContext';

export default function SupportPage() {
  const { user } = useUser();

  return (
    <div className="page">
      <header className="navbar">
        <div className="nav-left">
          <div className="logo">
            <img src={bodyMineLogo} alt="BodyMine" />
          </div>
          <nav className="menu">
            <a href="/home">Home</a>
            <a href="/chat" className="active">Chat</a>
            <a href="/search">Search</a>
          </nav>
        </div>
        <div className="nav-right">
          <span className="lang">EN ▾</span>
          <div className="profile">
            <img src="https://i.pravatar.cc/32?img=12" alt="avatar" className="avatar" />
            <div>
              <span className="name">{user?.first_name} {user?.last_name}</span><br />
              <span className="status">Online</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <img src="https://i.pravatar.cc/48" alt="Avatar" className="avatar-large" />
            <div>
              Hello<br />
              <strong>{user?.first_name} {user?.last_name}</strong>
            </div>
          </div>
          <ul>
            <li><a href="/editProfile">Edit Profile</a></li>
            <li><a href="#">Change Password</a></li>
            <li><a href="#">My Body Project</a></li>
            <li><a href="/CGU">Terms & Conditions</a></li>
            <li><a href="#">News & Article</a></li>
            <li><a className="active" href="/support">Support</a></li>
          </ul>
          <button className="delete-account">Delete Account</button>
          <button className="logout">Logout</button>
        </aside>

        {/* Content + FAQ */}
        <div className="support-layout">
          {/* Top header */}
          <div className="support-header">
            <div>
              <h2>How can we help you ?</h2>
              <p>We're here to support you anytime. Choose the best way to reach us.</p>
            </div>
            <img src={helpImage} alt="support" className="support-img" />
          </div>

          {/* Main support section */}
          <div className="support-content">
            {/* Left: Form + Email */}
            <div>
              <div className="support-form-box">
                <h3><FiMail /> Send a Message</h3>
                <form>
                  <input type="text" placeholder="Your name" />
                  <input type="text" placeholder="Subject" />
                  <textarea placeholder="Your message"></textarea>
                  <div className="attach-file">
                    <FiPaperclip className="icon" /> Attach File
                  </div>
                  <button type="submit" className="btn primary">Send Message</button>
                </form>
              </div>

              <div className="support-email-box">
                <h3><FiMail /> Email Us</h3>
                <input type="text" value="support@bodymine.com" readOnly />
              </div>
            </div>

            {/* Right: FAQ */}
            <aside className="faq-box">
              <h3>Frequently Asked Questions</h3>
              <details>
                <summary>Faq</summary>
                <a href="/faq"><p>Answers to common questions.</p></a>
              </details>
              <details>
                <summary>Data Privacy</summary>
                <a href="/dataPrivacy"><p>We care about your data. Here's how we protect it.</p></a>
              </details>
              <details>
                <summary>Terms & Conditions</summary>
                <a href="/CGU"><p>Please read our T&C before using our service.</p></a>
              </details>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-block">
            <img src={bodyMineLogo} alt="BodyMine" className="footer-logo" />
            <p>Bodymine is the leading directory to help you find the perfect surgeon or clinic, anywhere in the world.</p>
            <div className="social-icons">
              <span>🔵</span><span>🐦</span><span>▶️</span>
            </div>
          </div>
          <div className="footer-block">
            <h4>Home</h4>
            <ul>
              <li>Menu</li>
              <li>Chat</li>
              <li>Search</li>
            </ul>
          </div>
          <div className="footer-block">
            <h4>Info</h4>
            <ul>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="footer-block">
            <h4>Contact Us</h4>
            <p>info@bodymine.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
