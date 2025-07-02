// src/pages/ChangePasswordPage.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import useBreakpoint from '../hooks/useBreakpoint';
import { Link } from 'react-router-dom';
import { FiUser, FiLock, FiFileText, FiBookOpen, FiLifeBuoy, FiTrash2, FiLogOut, FiArrowLeft } from 'react-icons/fi';
import '../assets/MyBodyProjectPage.css';
import '../assets/EditProfile.css';
import '../assets/ChangePasswordPage.css';

// Import des images pour le carrousel
import clinic1 from '../images/clinic1.png';
import clinic2 from '../images/clinic2.png';
import clinic3 from '../images/clinic3.png';

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) || ({ user: null } as any);
  const isMobile = useBreakpoint();
  
  const [slide, setSlide] = useState(0);
  const banners = [clinic1, clinic2, clinic3];
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  // Auto-rotation du carrousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de changement de mot de passe réussi
    setSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    // Retour au profil après 2 secondes
    setTimeout(() => {
      navigate('/editProfile');
    }, 2000);
  };
  return (
    <>
    {!isMobile && (
    <div className="home-wrapper">
      <div className="mybody-page">
        {/* ▬▬▬ NAVBAR ▬▬▬ */}
        <Header className="navbar"/>
        
        {/* ▬▬▬ CARROUSEL ▬▬▬ */}
        <section className="home carousel">
          <div className="home carousel-inner">
            {banners.map((item, i) => (
              <img key={i} src={item} alt={`Clinic ${i + 1}`} className={i === slide ? "active" : ""} />
            ))}
          </div>
        </section>

        {/* ▬▬▬ GRILLE ▬▬▬ */}
        <main className="content-grid">
          {/* ——— SIDEBAR ——— */}
          <aside className="side-menu">
            <div className="hello-card">
              <img src={user?.photo_url || "https://i.pravatar.cc/64?img=12"} className="hello-avatar" alt="avatar" />
              <div>
                Hello <br />
                <strong>{user?.first_name} {user?.last_name}</strong>
              </div>
            </div>

            <ul className="menu-links">
              <li>
                <Link to="/editProfile">
                  <FiUser /> Edit Profile
                </Link>
              </li>              <li className="active">
                <Link to="/changePassword">
                  <FiLock /> Change Password
                </Link>
              </li>
              <li>
                <Link to="/myBodyProject">
                  <FiFileText /> My Body Project
                </Link>
              </li>
              <li>
                <Link to="/CGU">
                  <FiFileText /> Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/news">
                  <FiBookOpen /> News &amp; Article
                </Link>
              </li>
              <li>
                <Link to="/support">
                  <FiLifeBuoy /> Support
                </Link>
              </li>
            </ul>
            
            <button className="danger-btn">
              <FiTrash2 /> Delete Account
            </button>
            <button className="logout-btn">
              <FiLogOut /> Logout
            </button>
          </aside>

          {/* ——— CONTENU PRINCIPAL ——— */}
          <div className="main-content">
            <div className="edit-header">
              <button className="back-btn" onClick={() => navigate('/editProfile')}>
                <FiArrowLeft /> Back to Profile
              </button>
              <h1>🔒 Change Password</h1>
              <p>Update your account password to keep your profile secure</p>
            </div>

            {success && (
              <div className="success-banner">
                ✅ Password changed successfully! Redirecting...
              </div>
            )}

            <div className="edit-form">
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <small>Password must be at least 6 characters long</small>
                  </div>

                  <div className="form-group full-width">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => navigate('/editProfile')}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
    )}    {/* VERSION MOBILE */}
    {isMobile && (
      <div className="change-password-mobile-page">
        {/* Header mobile personnalisé */}
        <header className="change-password-mobile-header">
          <button className="back-btn" onClick={() => navigate('/editProfile')}>
            <FiArrowLeft />
          </button>
          <div>
            <h1>Change Password</h1>
            <p>Update your account password</p>
          </div>
        </header>
        
        <div className="mobile-content">
          {success && (
            <div className="success-banner">
              ✅ Password changed successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="mobile-form">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
              <small>Password must be at least 6 characters long</small>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="mobile-actions">
              <button type="button" className="btn-secondary" onClick={() => navigate('/editProfile')}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Change Password
              </button>
            </div>
          </form>
        </div>
        
        <BottomNav />
      </div>
    )}
    </>
  );
}
