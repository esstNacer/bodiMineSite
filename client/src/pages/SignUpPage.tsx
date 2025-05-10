// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/SignUpPage.css';

import connectImg from '../images/connect.png';
import bodyMineLogo  from '../images/logobodymine.png';
import bodyMineMobile from '../images/LogoMobile.png'

import { FiHome, FiSearch } from 'react-icons/fi';
import { useUser } from '../components/UserContext';
import Footer from '../components/Footer';
import useBreakpoint from '../hooks/useBreakpoint';
import { EyeOffIcon, EyeIcon } from 'lucide-react';

export default function SignUpPage() {
    const { updateUser, setToken } = useUser();
  const [remember, setRemember] = useState<boolean>(false);

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

  const handleSubmit = async (e: any) => {
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
      last_name: lastName,
      email,
      password,
      photo_url: photoUrl,
      birth_date: birthDate,
      address,
      city,
      country,
      phone_number: phoneNumber,
      allergies_to_medicine: allergies,
      blood_group: bloodGroup,
      height_cm: Number(heightCm),
      weight_kg: Number(weightKg),
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
  
      // Récupérer les données du nouvel utilisateur créé
      const data = await res.json();
  
      // Mettre à jour le contexte utilisateur
      updateUser(data.user,  true);   // ← stocke + déclenche le re-render
      setToken (data.token, true);    // ← idem pour le JWT
  
      // Rediriger vers /home
      navigate('/home');
      
    } catch (err: any) {
      setError(err.message);
    }
  };
    const isMobile = useBreakpoint();
  

  return (
    <>
    {!isMobile && (
    <div className='login'>
  <div className="home-wrapper">

    <div className="page">
     <header className="navbar">
                   <div className="logo">
                     <Link to={"/"}><img src={bodyMineLogo} alt="BodyMine Cosmetic Surgery" /></Link>
                   </div>
           
                   <nav className="main-nav">
                     <a href="/home">
                       <FiHome /> Home
                     </a>
                     <a href="/sign-up">
                       <FiSearch /> Chat
                     </a>
                     <a  href="/sign-up">
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
        <div className="signin-card">
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
  <select
    value={country}
    onChange={e => setCountry(e.target.value)}
    required
  >
    <option value="">Select your country</option>
    <option value="Albania">Albania</option>
    <option value="Andorra">Andorra</option>
    <option value="Armenia">Armenia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option value="Belarus">Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Croatia">Croatia</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czech Republic">Czech Republic</option>
    <option value="Denmark">Denmark</option>
    <option value="Estonia">Estonia</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Greece">Greece</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="Ireland">Ireland</option>
    <option value="Italy">Italy</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Malta">Malta</option>
    <option value="Moldova">Moldova</option>
    <option value="Monaco">Monaco</option>
    <option value="Montenegro">Montenegro</option>
    <option value="North Macedonia">North Macedonia</option>
    <option value="Norway">Norway</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Romania">Romania</option>
    <option value="Serbia">Serbia</option>
    <option value="Turkey">Turkey</option>
  </select>
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
              I agree with Terms and Privacy policy.
            </label>

            <button type="submit" className="btn primary">
              Sign up
            </button>

            <p className="small">
              Already have an account?{' '}
              <a href="/login">Sign in</a>
            </p>
          </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </div>
    </div>
    )}
   {isMobile && (
  <div className="signup mobile">
    {/* Logo centré */}
    <img
      src={bodyMineMobile}
      alt="BODYMINE Cosmetic Surgery"
      className="signup-card__logo"
    />

    <div className="signup-card">
      <h2 className="signup-card__title">Create a new account</h2>

      <form onSubmit={handleSubmit} className="signup-card__form">
        {error && <div className="form-error">{error}</div>}

        {/* Name */}
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={`${firstName} ${lastName}`}
            onChange={e => {
              const [fn, ...rest] = e.target.value.split(" ")
              setFirstName(fn)
              setLastName(rest.join(" "))
            }}
            placeholder="John Doe"
            required
          />
        </div>

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

        {/* Code Validation */}

        {/* Password */}
        <div className="input-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={"password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <span
              className="toggle-password"
              //onClick={() => setPassword(v => !v)}
            >
            </span>
          </div>
        </div>

        {/* Retype Password */}
        <div className="input-group">
          <label>Retype Password</label>
          <div className="password-wrapper">
            <input
              type={"password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <span
              className="toggle-password"
              //onClick={() => setShowConfirm(v => !v)}
            >
              {/*showConfirm ? <EyeOffIcon /> : <EyeIcon />*/}
            </span>
          </div>
        </div>

        {/* Tous les autres champs en “more-fields” scrollable */}
        <div className="more-fields">
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
  <select
    value={country}
    onChange={e => setCountry(e.target.value)}
    required
  >
    <option value="">Select your country</option>
    <option value="Albania">Albania</option>
    <option value="Andorra">Andorra</option>
    <option value="Armenia">Armenia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option value="Belarus">Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Croatia">Croatia</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czech Republic">Czech Republic</option>
    <option value="Denmark">Denmark</option>
    <option value="Estonia">Estonia</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Greece">Greece</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="Ireland">Ireland</option>
    <option value="Italy">Italy</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Malta">Malta</option>
    <option value="Moldova">Moldova</option>
    <option value="Monaco">Monaco</option>
    <option value="Montenegro">Montenegro</option>
    <option value="North Macedonia">North Macedonia</option>
    <option value="Norway">Norway</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Romania">Romania</option>
    <option value="Serbia">Serbia</option>
    <option value="Turkey">Turkey</option>
  </select>
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
        </div>

        {/* Checkbox */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={agree}
            onChange={e => setAgree(e.target.checked)}
            required
          />J’ai lu et j’accepte les<a href="/terms">conditions générales d’utilisation</a> ainsi que la{' '}
          
          <a href="/privacy">politique de confidentialité</a>.
          
        </label>

        {/* Bouton Create */}
        <button type="submit" className="btn primarySign">
          Create Account
        </button>

        <p className="small">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </form>
    </div>
  </div>
)}


</>
  );
}
