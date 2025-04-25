import { FormEvent, useState } from 'react';
import { Link, useNavigate }   from 'react-router-dom';
import {
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import logo       from '../images/logobodymine.png';
import heroDoctor from '../images/doctor-hero.png';
import strip1     from '../images/strip1.png';
import strip2     from '../images/strip2.png';
import strip3     from '../images/strip3.png';


import '../assets/ProfessionalSignup.css';

/* ─────────────────────────── Types ─────────────────────────── */
interface ProForm {
  full_name: string;
  email: string;
  clinic_address: string;
  city: string;
  country: string;
  phone_number: string;
  specialization: string;
  practice_tenure: string;
  practice_start_date: string;
  password: string;
  confirm: string;
}

const init: ProForm = {
  full_name: '',
  email: '',
  clinic_address: '',
  city: '',
  country: '',
  phone_number: '',
  specialization: '',
  practice_tenure: '',
  practice_start_date: '',
  password: '',
  confirm: ''
};

export default function ProfessionalSignup() {
  const navigate          = useNavigate();
  const [step, setStep]   = useState<1|2|3|4>(1);
  const [showPwd, setShowPwd] = useState(false);
  const [data, setData]   = useState<ProForm>(init);
  const [error, setError] = useState('');

  /* ───── commun pour tous les champs texte ───── */
  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  /* ───── validation locale simple (exemple) ───── */
  const next = () => {
    if (step === 1 && !data.full_name) return setError('Full name is required');
    if (step === 2 && data.password !== data.confirm)
      return setError('Passwords do not match');
    setError('');
    setStep(prev => (prev + 1) as 1|2|3|4);
  };

  const back = () => setStep(prev => (prev - 1) as 1|2|3|4);

  /* ───── soumission au backend ───── */
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');

    try{
      const res = await fetch('/api/professional', {
        method :'POST',
        headers: { 'Content-Type':'application/json' },
        body   : JSON.stringify(data)
      });
      if(!res.ok){
        const { error } = await res.json();
        throw new Error(error || 'Server error');
      }
      setStep(4);                       // succès
    }catch(err:any){
      setError(err.message);
    }
  }

  /* ─────────────────────────── UI ─────────────────────────── */
  return (
    <div className="pro-signup">
      {/* === HERO + copy EXACTEMENT les mêmes que ta page login === */}
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
      {/* (…)  Logo + hero section déjà réalisés précédemment  */}
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
            
{/* ───── Centre (pitch + wizard) ───── */}
<section className="double">
  {/* ─── colonne gauche (pitch réutilisé) ─── */}
  <article className="pitch">
    <h2>
      <span>Boost</span> Your Aesthetic <br />
      Surgery Practice with <br />
      <span>Bodymine</span>
    </h2>

    <p>
      Bodymine is the premier platform designed to elevate the visibility of aesthetic surgery
      <span className="professionals"> professionals</span>.
    </p>

    <p>
      By joining our <span className="exclusive">exclusive directory</span>, you connect with a highly
      targeted audience actively searching for trusted aesthetic experts. Showcase your skills,
      share verified patient reviews, and engage directly with <span className="potential">potential clients</span>
      in a community focused on quality care.
    </p>

    <p>
      Bodymine <span className="helps">helps</span> you build credibility, grow your patient base, and stand out in a
      competitive market. Whether you’re a clinic or solo practitioner, our platform empowers
      your online presence and reputation. <span className="join">Join Bodymine</span> today …
    </p>
  </article>


      {/* ───── Centre (wizard) ───── */}
      <section className="wizard-card">
        {step === 1 && (
          <form onSubmit={e=>{e.preventDefault();next();}}>
            <h3>Create your Account</h3>

            <input name="full_name"  placeholder="Full Name"        value={data.full_name}  onChange={handle} required />
            <input name="email"      placeholder="Email Address"    type="email"            value={data.email}      onChange={handle} required />
            <input name="clinic_address" placeholder="Clinic Address"  value={data.clinic_address} onChange={handle} required />
            <input name="city"       placeholder="City"             value={data.city}       onChange={handle} />
            <input name="country"    placeholder="Country"          value={data.country}    onChange={handle} />
            <input name="phone_number" placeholder="Phone Number"   value={data.phone_number} onChange={handle} />

            <select name="specialization" value={data.specialization} onChange={handle}>
              <option value="">Select Specialization</option>
              <option>Dermatology</option><option>Plastic surgery</option>
            </select>

            <input name="practice_tenure" placeholder="Practice Tenure" value={data.practice_tenure} onChange={handle} />
            <input name="practice_start_date" type="date" value={data.practice_start_date} onChange={handle} />

            {error && <p className="form-error">{error}</p>}
            <button className="btn primary full">Next</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={e=>{e.preventDefault();next();}}>
            <h3>Create your Password</h3>

            <div className="pwd-wrapper">
              <input
                name="password"
                type={showPwd?'text':'password'}
                placeholder="Password"
                value={data.password}
                onChange={handle}
                required
              />
              <span onClick={()=>setShowPwd(s=>!s)}>{showPwd?<EyeOff size={16}/>:<Eye size={16}/>}</span>
            </div>

            <div className="pwd-wrapper">
              <input
                name="confirm"
                type={showPwd?'text':'password'}
                placeholder="Retype Password"
                value={data.confirm}
                onChange={handle}
                required
              />
              <span onClick={()=>setShowPwd(s=>!s)}>{showPwd?<EyeOff size={16}/>:<Eye size={16}/>}</span>
            </div>

            <small className="pwd-tip">
              ✔️ Use8+ characters, uppercase &amp; lowercase, one number &amp; symbol
            </small>

            {error && <p className="form-error">{error}</p>}

            <div className="row btns">
              <button type="button" onClick={back} className="btn outline">Back</button>
              <button className="btn primary">Next</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={submit}>
            <h3>Terms &amp; Conditions — Healthcare Professionals</h3>

            <div className="terms-box">
  <h4>TERMES ET CONDITIONS – MÉDECINS ET ÉTABLISSEMENTS DE SANTÉ</h4>

  <p className="update">Dernière mise à jour&nbsp;: 01&nbsp;Janvier&nbsp;2025</p>

  <h5>1. PRÉSENTATION DE BODYMINE</h5>
  <p>BodyMine est une plateforme dédiée aux professionnels de santé (médecins, cliniques, hôpitaux) souhaitant partager leur expertise et offrir un accompagnement bienveillant aux utilisateurs.</p>
  <p>L’objectif est de permettre aux patients d’accéder à des conseils fiables, délivrés par des professionnels qualifiés, dans un cadre éthique et respectueux des normes médicales.</p>
  <p>L’inscription à BodyMine implique l’acceptation des présentes conditions, qui garantissent un environnement de confiance entre professionnels et utilisateurs.</p>

  <h5>2. ENGAGEMENTS DES PROFESSIONNELS DE SANTÉ</h5>
  <ul>
    <li>Mettre son expertise au service des utilisateurs en leur apportant des conseils professionnels et bienveillants.</li>
    <li>Respecter les principes fondamentaux de la médecine, notamment l’éthique, la bienveillance et l’intégrité.</li>
    <li>Maintenir une relation de confiance avec les utilisateurs, en étant transparent et pédagogue dans ses réponses.</li>
    <li>Ne jamais induire en erreur, exagérer un traitement ou faire des promesses médicales non justifiées.</li>
    <li>Protéger la confidentialité et la dignité des patients, en respectant strictement les lois en vigueur.</li>
  </ul>

  <h5>3. SERVICES DISPONIBLES</h5>
  <ul>
    <li>Créer un profil détaillé indiquant leur spécialité, leurs diplômes et leur expérience.</li>
    <li>Publier du contenu éducatif (articles, vidéos, conseils) pour informer et sensibiliser les utilisateurs.</li>
    <li>Répondre aux questions générales des utilisateurs, dans le respect des limites de la consultation en ligne.</li>
    <li>Proposer des rendez-vous en cabinet, en téléconsultation ou à domicile, selon leur pratique et la réglementation.</li>
  </ul>

  <h5>4. RELATION AVEC LES UTILISATEURS : RESPECT ET ACCOMPAGNEMENT</h5>
  <p>Les professionnels de santé doivent adopter une approche respectueuse et bienveillante envers les utilisateurs. Cela implique&nbsp;:</p>
  <ul>
    <li>D’être clairs, pédagogues et patients dans leurs réponses et explications.</li>
    <li>De ne jamais porter de jugement sur un utilisateur ou sa situation.</li>
    <li>D’apporter des informations fondées sur la science et les bonnes pratiques médicales.</li>
    <li>De toujours privilégier l’intérêt du patient, en l’orientant vers une consultation en présentiel si nécessaire.</li>
  </ul>

  <h5>5. RESPONSABILITÉ DES PROFESSIONNELS DE SANTÉ</h5>
  <p>Chaque professionnel est entièrement responsable des informations qu’il publie sur BodyMine.</p>
  <p>Aucun diagnostic médical ni prescription ne peut être délivré via la plateforme. BodyMine sert uniquement à informer et orienter.</p>
  <p>Tout abus ou manquement à l’éthique sera sanctionné par la suspension ou la suppression du compte.</p>

  <h5>6. PROTECTION DES DONNÉES ET CONFIDENTIALITÉ</h5>
  <p>Les professionnels de santé doivent respecter la confidentialité des utilisateurs et ne jamais divulguer d’informations personnelles.</p>
  <p>Les données des utilisateurs doivent être protégées conformément aux réglementations en vigueur (RGPD, HIPAA…).</p>

  <h5>7. CONDITIONS FINANCIÈRES</h5>
  <p>L’accès à BodyMine pour les professionnels est soumis à une adhésion annuelle.</p>
  <p>Aucune commission n’est prélevée sur les services ou consultations réalisés hors de la plateforme.</p>
  <p>Les tarifs d’adhésion peuvent être ajustés, avec notification préalable aux inscrits.</p>

  <h5>8. SANCTIONS ET RÉSILIATION</h5>
  <p>Tout comportement inapproprié ou non conforme aux valeurs de BodyMine pourra entraîner&nbsp;:</p>
  <ul>
    <li>Un avertissement, une suspension ou une suppression de compte.</li>
    <li>Une signalisation aux autorités compétentes en cas de faute grave.</li>
  </ul>

  <h5>9. MODIFICATIONS DES CONDITIONS</h5>
  <p>BodyMine peut modifier ces conditions à tout moment pour garantir un cadre toujours plus éthique et sécurisant.</p>

  <p className="closing">
    L’objectif de BodyMine est de créer un espace où les utilisateurs peuvent trouver des conseils fiables et bienveillants, dans
    le respect des règles médicales et de la relation patient-professionnel.
  </p>
</div>


            <label className="agree">
              <input type="checkbox" required /> I’ve read &amp; accept the&nbsp;
              <Link to="#">terms &amp; conditions</Link>.
            </label>

            {error && <p className="form-error">{error}</p>}

            <div className="row btns">
              <button type="button" onClick={back} className="btn outline">Back</button>
              <button className="btn primary">Create Account</button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="success">
            <CheckCircle size={60} color="#70b7e2"/>
            <h3>Great!</h3>
            <p>You have successfully created your doctor account on BODYMINE.</p>
            <button className="btn primary full" onClick={()=>navigate('/pro/dashboard')}>
              Continue to Dashboard
            </button>
          </div>
        )}
      </section>
      
</section>

      {/* === PARTNER STRIP + FOOTER (identiques) === */}
      <section className="partner-strip">
              <img src={strip1} alt="Partner 1" />
              <img src={strip2} alt="Partner 2" />
              <img src={strip3} alt="Partner 3" />
            </section>
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
