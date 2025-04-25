// src/pages/ProfessionalLoginPage.tsx
import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/ProfessionalLoginPage.css';

/* --- visuels --- */
import logo       from '../images/logobodymine.png';
import heroDoctor from '../images/doctor-hero.png';
import strip1     from '../images/strip1.png';
import strip2     from '../images/strip2.png';
import strip3     from '../images/strip3.png';
import { usePro } from '../components/ProContext';
export default function ProfessionalLoginPage() {
    const navigate = useNavigate();
    const { setProToken, updateProfessional } = usePro();    
    const [email,       setEmail]       = useState('');
    const [password,    setPassword]    = useState('');
    const [remember,    setRemember]    = useState(true);        // checkbox
    const [error,       setError]       = useState('');

  /* ---------- soumission du formulaire ---------- */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    try {
      const res  = await fetch('/api/professional/login', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      /* ─── stocker JWT + pro ─── */
      setProToken(data.token, remember);
      updateProfessional(data.professional, remember);

      navigate('/pro/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  }

  /* ================================================= */
  return (
    <div className="pro-login">
      {/* ░░ HEADER ░░ */}
      <header className="pro-nav">
        <Link to="/">
          <img src={logo} alt="BodyMine" className="nav-logo" />
        </Link>

        <div className="nav-right">
          <span className="lang">EN ▾</span>

          <Link to="/" className="btn outline small">
            PATIENT ACCESS
          </Link>
        </div>
      </header>

      {/* ░░ HERO ░░ */}
      <section className="hero">
        {/* — Colonne gauche — */}
        <div className="hero-copy">
          <h1>
            Grow your patient base <br />
            with <span>Bodymine</span>
          </h1>

          <p className="lead">
            Bodymine is the leading platform for aesthetic surgery professionals looking to
            enhance their visibility and attract new patients. By joining our directory, you
            provide your practice or clinic with an optimised presence to a targeted audience
            seeking quality care.
          </p>

          <div className="cta-row">
            <Link to="/loginPro"   className="btn primary">Log in</Link>
            <Link to="/professional/sign-up" className="btn outline">New profil</Link>
          </div>
        </div>

        {/* — Colonne droite — */}
        <div className="hero-aside">
          <div className="hero-visual">
            <img src={heroDoctor} alt="Aesthetic surgeon" />
          </div>

          <h4 className="how-title">How BodyMine Works</h4>

          <ul className="how-works">
            <li>Add your profile, showcase your expertise</li>
            <li>Interact directly with potential patients</li>
            <li>Growth your patient base</li>
          </ul>
        </div>
      </section>

      {/* ░░ PITCH + LOGIN ░░ */}
      <section className="double">
        {/* — Pitch — */}
        <article className="pitch">
          <h2>
            <span>Boost</span> Your Aesthetic <br />
            Surgery Practice with <br />
            <span>Bodymine</span>
          </h2>

          <p>
            Join our exclusive directory to connect with a highly targeted audience actively
            searching for trusted aesthetic experts. Showcase your skills, share verified patient
            reviews and engage directly with potential clients in a community focused on quality care.
          </p>

          <p>
            Bodymine helps you build credibility, grow your patient base and stand out in a
            competitive market.
          </p>
        </article>

        {/* — Carte login — */}
        <aside className="login-card" id="login">
          <h3>Welcome Back</h3>

          <button className="btn oauth google">Log in with Google</button>
          <div className="divider">OR</div>

          <form onSubmit={handleSubmit}>
            {error && <p className="form-error">{error}</p>}

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <div className="row remember">
              <label><input type="checkbox" /> Remember Me</label>
              <Link to="/forgot">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn primary full">
              Log in
            </button>
          </form>

          <p className="small">
            Not registered yet? <Link to="/professional/sign-up">Create an account</Link>
          </p>

          <div className="divider">OR</div>

          <Link to="/" className="btn primary full">
            patient access
          </Link>
        </aside>
      </section>

      {/* ░░ Partenaires ░░ */}
      <section className="partner-strip">
        <img src={strip1} alt="Partner 1" />
        <img src={strip2} alt="Partner 2" />
        <img src={strip3} alt="Partner 3" />
      </section>

      {/* ░░ FOOTER ░░ */}
      <footer className="footer">
        <img src={logo} alt="BodyMine" className="footer-logo" />

        <p className="baseline">
          Bodymine is the leading directory to help you find the perfect surgeon or clinic,
          anywhere in the world.
        </p>

        <div className="footer-cols">
          <div>
            <h4>Home</h4>
            <ul><li>Menu</li><li>Chat</li><li>Search</li></ul>
          </div>
          <div>
            <h4>Info</h4>
            <ul><li>Terms &amp; Conditions</li><li>Privacy Policy</li><li>FAQs</li></ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <p>info@bodymine.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
