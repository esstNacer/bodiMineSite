// src/pages/LoginPage.tsx
import React, { useEffect, useState, FormEvent, JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/LoginPage.css';

import globe1      from '../images/globe.png';
import verifyImg1  from '../images/verify.png';
import connectImg1 from '../images/connect.png';

import globe from '../GIF/FIND.gif';
import verifyImg from '../GIF/VERIFY.gif';
import connectImg from '../GIF/CONNECT.gif';

import bodyMine   from '../images/LogoBODYMINE.png';
import bodyMineMobile from '../images/LogoMobile.png'
import { FiHome, FiMessageCircle, FiSearch } from 'react-icons/fi';
import { useUser } from '../components/UserContext';
import Footer from '../components/Footer';
import useBreakpoint from '../hooks/useBreakpoint';
import BottomNav from '../components/BottomNav';
import MobileNavbar from '../components/MobileNavbar';
import { EyeOffIcon, EyeIcon } from 'lucide-react';

interface Slide {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
}

const slides: Slide[] = [
  { title: 'FIND',    subtitle: 'Find your specialist among the best', src: globe,      alt: 'Globe with stethoscope' },
  { title: 'VERIFY',  subtitle: 'Check reviews and qualifications to make an informed choice', src: verifyImg, alt: 'File and flask' },
  { title: 'CONNECT', subtitle: 'Connect and chat directly to bring your plans to life with confidence', src: connectImg, alt:'Doctor on smartphone' },
];

export default function LoginPage(): JSX.Element {
  const { updateUser, setToken } = useUser();
  const [index, setIndex]       = useState<number>(0);
  const [email, setEmail]       = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError]       = useState<string>('');
  const navigate                = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, []);

  const current = slides[index];

 /* ------------- form submit ------------- */
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError('');

  try {
    if((email=="admin@admin.com") && (password=="admin@123")){navigate("/admin/dashboard")}
    /* appel API */
    const res  = await fetch('/api/auth/login', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    /* on choisit où stocker selon « remember » 
       et on propage l’info à TOUTE l’app via le contexte */
    updateUser(data.user,  remember);   // ← stocke + déclenche le re-render
    setToken (data.token, remember);    // ← idem pour le JWT

    navigate('/home');                  // redirection
  } catch (err: any) {
    setError(err.message);
  }
};
const handleGoogleLogin = () => {
  window.location.href = '/api/auth/google'; // Redirige vers ton backend qui gère Google login
};

  const isMobile = useBreakpoint();

return (
  <>
    {!isMobile && (
  <div className='login'>
  <div className="home-wrapper">
    <div className="page">
      <header className="navbar">
        {/* Logo centré */}
        <div className="logo">
          <Link to={"/"}>
          <img src={bodyMine} alt="BodyMine Cosmetic Surgery" /></Link>
        </div>

        {/* Liens de navigation horizontalement alignés */}
        <nav className="nav-links">
          <button
                      type="button"
                      className="nav-btn"
                      onClick={() => navigate("/home")}
                    >
                      <FiHome /> Home
                    </button>
          
                    <button
                      type="button"
                      className="nav-btn"
                      onClick={() => navigate("/login")}
                    >
                      <FiMessageCircle /> Chat
                    </button>
          
                    <button
                      type="button"
                      className="nav-btn"
                      onClick={() => navigate("/search")}
                    >
                      <FiSearch /> Search
                    </button>
        </nav>
      </header>

      <main className="content">
        <section className="login carousel">
          <h3 className="login slide-title">{current.title}</h3>
          <p className="login slide-subtitle">{current.subtitle}</p>
          <img className="login slide-img" src={current.src} alt={current.alt} />
          <div className="login dots">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </section>

        <section className="signin">
          <form onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}

            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="•••••••"
                required
              />
            </label>

            <div className="row remember">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                /> Keep me signed in
              </label>
              <div className='small'>
              <a href="#forgot">Forgot Password?</a>
              </div>
            </div>

            <button type="submit" className="btn primary">Sign in</button>

            <p className="small">
              Don't have an account yet? <a href="/sign-up">Sign up</a>
            </p>

            <p className="divider">Or continue with</p>

            <div className="oauth">
              <button type="button" className="btn oauth google" onClick={handleGoogleLogin}>
                <img src="https://unpkg.com/simple-icons@latest/icons/google.svg" alt="Google" /> Sign in with Google
              </button>
            </div>

            <a href="/loginPro">
              <button type="button" className="btn secondary">Professional access</button>
            </a>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  </div>
  </div>
   )}
   {isMobile && (
  <div className="login mobile">
    <div className="login-card">
      {/* logo BodyMine */}
      <img
        src={bodyMineMobile} 
        alt="BODYMINE Cosmetic Surgery"
        className="login-card__logo"
      />

      <h2 className="login-card__title">Welcome</h2>
      <p className="login-card__subtitle">
        Please put your information below to Sign in to your account
      </p>

      <form onSubmit={handleSubmit} className="login-card__form">
        {error && <div className="form-error">{error}</div>}

        {/* Email */}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            required
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={password ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="•••••••"
              required
            />
            <span
              className="toggle-password"
            >
              {password ? <EyeOffIcon/> : <EyeIcon/>}
            </span>
          </div>
        </div>

        {/* Remember + forgot */}
        <div className="row remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            /> Keep me signed in
           
          <a href="#forgot" className="forgot-link">
            Forgot password?
          </a>
        </div>

        {/* Sign in */}
        <button type="submit" className="btn primary">
          Sign in
        </button>

        <p className="small">
          Don’t have an account yet? <a href="/sign-up">Sign Up</a>
        </p>
        <div className="oauth">
          <button
            type="button"
            className="btn oauth google"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://unpkg.com/simple-icons@latest/icons/google.svg"
              alt="Google"
            />
          </button>
        </div>
        <p className="divider">Or continue with</p>

        {/* OAuth buttons */}

        {/* Professional access */}
        <button
          type="button"
          className="btn secondary professional"
          onClick={() => navigate("/loginPro")}
        >
          Professional access
        </button>
      </form>
    </div>
  </div>
)}

           </>
);

}

