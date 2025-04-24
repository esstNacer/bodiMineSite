// src/pages/LoginPage.tsx
import React, { useEffect, useState, FormEvent, JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/LoginPage.css';

import globe      from '../images/globe.png';
import verifyImg  from '../images/verify.png';
import connectImg from '../images/connect.png';
import bodyMine   from '../images/logobodymine.png';
import { FiHome, FiSearch } from 'react-icons/fi';

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      // Stocker token
const storage = remember ? localStorage : sessionStorage;
storage.setItem('token', data.token);

// Stocker les infos utilisateur
console.log(data.user);
storage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <header className="navbar">
                    <div className="logo">
                      <img src={bodyMine} alt="BodyMine Cosmetic Surgery" />
                    </div>
            
                    <nav className="main-nav">
                      <a href="/">
                        <FiHome /> Home
                      </a>
                      <a href="/">
                        <FiSearch /> Chat
                      </a>
                      <a  href="/">
                        <FiSearch /> Search
                      </a>
                    </nav>
                  </header>

      <main className="content">
        <section className="carousel">
          <h3 className="slide-title">{current.title}</h3>
          <p className="slide-subtitle">{current.subtitle}</p>
          <img className="slide-img" src={current.src} alt={current.alt} />
          <div className="dots">
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
              <a href="#forgot">Forgot Password?</a>
            </div>

            <button type="submit" className="btn primary">Sign in</button>

            <p className="small">
              Don't have an account yet? <a href="/sign-up">Sign up</a>
            </p>

            <p className="divider">Or continue with</p>

            <div className="oauth">
              <button type="button" className="btn oauth google">
                <img src="https://unpkg.com/simple-icons@latest/icons/google.svg" alt="Google"/> Sign in with Google
              </button>
              <button type="button" className="btn oauth apple">
                <img src="https://unpkg.com/simple-icons@latest/icons/apple.svg" alt="Apple"/> Sign in with Apple
              </button>
            </div>

            <button type="button" className="btn secondary">
              Professional access
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
              <div className="footer-content">
                <div className="footer-block">
                  <img src={bodyMine} alt="BodyMine" className="footer-logo" />
                  <p>
                    Bodymine is the leading directory to help you find the perfect surgeon or clinic, anywhere in the world.
                  </p>
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
