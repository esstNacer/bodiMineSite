// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/SignUpPage.css';

import connectImg from '../images/connect.png';
import bodyMine  from '../images/logobodymine.png';

export default function SignUpPage() {
  const navigate = useNavigate();

  // États pour chaque champ patients
  const [firstName,     setFirstName]     = useState('');
  const [lastName,      setLastName]      = useState('');
  const [email,         setEmail]         = useState('');
  const [password,      setPassword]      = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photoUrl,      setPhotoUrl]      = useState('');
  const [birthDate,     setBirthDate]     = useState('');
  const [address,       setAddress]       = useState('');
  const [city,          setCity]          = useState('');
  const [country,       setCountry]       = useState('');
  const [phoneNumber,   setPhoneNumber]   = useState('');
  const [allergies,     setAllergies]     = useState('');
  const [bloodGroup,    setBloodGroup]    = useState('');
  const [heightCm,      setHeightCm]      = useState('');
  const [weightKg,      setWeightKg]      = useState('');
  const [gender,        setGender]        = useState('');
  const [favoriteSpec,  setFavoriteSpec]  = useState('');
  const [agree,         setAgree]         = useState(false);
  const [error,         setError]         = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!agree) {
      setError('Vous devez accepter les conditions.');
      return;
    }

    const payload = {
      first_name: firstName,
      last_name:  lastName,
      email,
      password,
      photo_url:               photoUrl,
      birth_date:              birthDate,
      address,
      city,
      country,
      phone_number:            phoneNumber,
      allergies_to_medicine:   allergies,
      blood_group:             bloodGroup,
      height_cm:               Number(heightCm),
      weight_kg:               Number(weightKg),
      gender,
      favorite_specialization: favoriteSpec
    };

    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg || 'Erreur serveur');
      }
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
     <header className="navbar">
                   <div className="logo">
                     <img src={bodyMineLogo} alt="BodyMine Cosmetic Surgery" />
                   </div>
           
                   <nav className="main-nav">
                     <a href="/home">
                       <FiHome /> Home
                     </a>
                     <a href="/chat">
                       <FiSearch /> Chat
                     </a>
                     <a  href="/search">
                       <FiSearch /> Search
                     </a>
                   </nav>
                 </header>

      <main className="content">
        <section className="carousel">
          <h3 className="slide-title">CONNECT</h3>
          <p className="slide-subtitle">
            Connect and chat directly to bring your plans to life with confidence
          </p>
          <img className="slide-img" src={connectImg} alt="Doctor on smartphone" />
        </section>

        <section className="signin">
          <form onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}

            <label>
              First Name
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="John"
                required
              />
            </label>

            <label>
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Doe"
                required
              />
            </label>

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
                placeholder="••••••••"
                required
              />
            </label>

            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            <label>
              Photo URL
              <input
                type="url"
                value={photoUrl}
                onChange={e => setPhotoUrl(e.target.value)}
                placeholder="https://..."
              />
            </label>

            <label>
              Birth Date
              <input
                type="date"
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
              />
            </label>

            <label>
              Address
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="123 Main St"
              />
            </label>

            <label>
              City
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Paris"
              />
            </label>

            <label>
              Country
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                placeholder="France"
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="+33123456789"
              />
            </label>

            <label>
              Allergies to Medicine
              <input
                type="text"
                value={allergies}
                onChange={e => setAllergies(e.target.value)}
                placeholder="Penicillin, ..."
              />
            </label>

            <label>
              Blood Group
              <input
                type="text"
                value={bloodGroup}
                onChange={e => setBloodGroup(e.target.value)}
                placeholder="A+, O-, etc."
              />
            </label>

            <label>
              Height (cm)
              <input
                type="number"
                value={heightCm}
                onChange={e => setHeightCm(e.target.value)}
                placeholder="180"
                min="0"
              />
            </label>

            <label>
              Weight (kg)
              <input
                type="number"
                value={weightKg}
                onChange={e => setWeightKg(e.target.value)}
                placeholder="75"
                min="0"
              />
            </label>

            <label>
              Gender
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                required
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label>
              Favorite Specialization
              <input
                type="text"
                value={favoriteSpec}
                onChange={e => setFavoriteSpec(e.target.value)}
                placeholder="Cosmetic Surgery"
              />
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                required
              />
              I agree with{' '}
              <a href="/terms" target="_blank" rel="noreferrer">Terms</a>{' '}
              and{' '}
              <a href="/privacy" target="_blank" rel="noreferrer">Privacy policy</a>.
            </label>

            <button type="submit" className="btn primary">
              Sign up
            </button>

            <p className="small">
              Already have an account?{' '}
              <a href="/login">Sign in</a>
            </p>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>
          Bodymine is the leading directory to help you find the perfect surgeon
          or clinic, anywhere in the world.
        </p>
        <div className="footer-cols">
          <div>
            <h4>Home</h4>
            <ul>
              <li>Menu</li>
              <li>Chat</li>
              <li>Search</li>
            </ul>
          </div>
          <div>
            <h4>Info</h4>
            <ul>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>FAQ's</li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <ul>
              <li>info@bodymine.com</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
