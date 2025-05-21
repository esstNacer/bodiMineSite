import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Eye, EyeOff, UploadCloud } from 'lucide-react';
import logo from '../images/LogoBODYMINE.png';
import heroDoctor from '../images/doctor-hero.png';
import strip1 from '../images/strip1.png';
import strip2 from '../images/strip2.png';
import strip3 from '../images/strip3.png';
import success from "../images/success.png"
import { usePro } from '../components/ProContext';
import '../assets/ProfessionalSignup.css';
import '../assets/ProfessionalLoginPage.css'

interface ProForm {
  full_name: string;
  type: string;
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
  type: '',
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
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4| 5>(1);
  const [showPwd, setShowPwd] = useState(false);
  const [data, setData] = useState<ProForm>(init);
  const [error, setError] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [createdProfessionalId, setCreatedProfessionalId] = useState<number | null>(null);
   const { setProToken, updateProfessional } = usePro();    
      const [email,       setEmail]       = useState('');
      const [password,    setPassword]    = useState('');

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const next = async () => {
    if (step === 1 && !data.full_name) return setError('Full name is required');
    if (step === 2 && data.password !== data.confirm) return setError('Passwords do not match');
    if (step === 3 && !profilePhoto) return setError('Profile picture is required');
    setError('');
    setStep(prev => (prev + 1) as 1 | 2 | 3 | 4);
  };

  const back = () => setStep(prev => (prev - 1) as 1 | 2 | 3 | 4);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
  
    try {
      // 1. Créer le professionnel
      const res = await fetch('/api/professional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Server error');
      }
  
      const datab = await res.json();
  
      // ⚡ 2. Mettre à jour ton contexte
      setProToken(datab.token);               // Stocke le token
      updateProfessional(datab.professional); // Stocke le professionnel
  
      console.log('professional_id', datab.professional.professional_id);
  
      // ⚡ 3. Récupérer l'ID depuis le contexte
      const professionalId = datab.professional.professional_id;
  
      // 4. Uploader la photo
      if (profilePhoto && professionalId) {
        const formData = new FormData();
        formData.append('photo', profilePhoto);
        formData.append('type', 'profile');
        formData.append('professional_id', String(professionalId));   // Ici, clean
  
        const uploadRes = await fetch('/api/photos/public', {
          method: 'POST',
          body: formData,
        });
  
        if (!uploadRes.ok) {
          throw new Error('Failed to upload profile picture');
        }
      }
  
      setStep(5); // étape finale : succès
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred');
    }
  }
  

  return (  <div className='paro'>
      <div className="pro-signup">
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
    
        <section className="hero">
                  {/* — Colonne gauche : texte + boutons — */}
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
                      <Link to="/loginPro" className="btn primary">Log in</Link>
                      <Link to="/professional/sign-up" className="btn outline-profile">New profil</Link>
                    </div>
                  </div>
          
                  {/* — Colonne droite : visuel + explication — */}
                  <div className="hero-aside">
                    <div className="hero-visual">
                      <img src={heroDoctor} alt="Aesthetic surgeon" />
                    </div>
          
                    <div className="how-block">
                      <h4 className="how-title">How BodyMine Works</h4>
          
                      <ul className="how-works">
                        <li>Add your profile, showcase your expertise</li>
                        <li>Interact directly with potential patients</li>
                        <li>Growth your patient base</li>
                      </ul>
                    </div>
                  </div>
                </section>
        {/* --- Wizard Card --- */}
        <section className="double">
        <article className="pitch">
            <h2>
              <span>Boost</span> Your Aesthetic <br />
              Surgery Practice with <br />
              <span>Bodymine</span>
            </h2>
  
            <p>
            Bodymine is the premier platform designed to elevate the visibility of aesthetic surgery professionals.
            </p>
  
            <p>
            By joining our exclusive directory, you connect with a highly targeted audience actively searching for trusted aesthetic experts. 
            Showcase your skills, share verified patient reviews, and engage directly with potential clients in a community focused on quality care. 
            </p>

            <p>Bodymine helps you build credibility, grow your patient base, and stand out in a competitive market. 
            Whether you're a clinic or solo practitioner, our platform empowers your online presence and reputation. 
            Join Bodymine today and turn your expertise into a powerful patient attraction tool.</p>
          </article>
          
            {step === 1 && (
              <section className="login-card">
              <form onSubmit={e => { e.preventDefault(); next(); }}>
                <h3>Create your Account</h3>
                <label > Full Name</label>
                <input name="full_name" placeholder="John John" value={data.full_name} onChange={handle} required />
                <label > Type</label>
                <select name="type" value={data.type} onChange={handle} required>
                  <option value="">Select Type</option>
                  <option >Clinic</option>
                  <option >Professional</option>
                </select>
                <label> Email</label>
                <input name="email" placeholder="john@example.com" type="email" value={data.email} onChange={handle} required />
                <label > Clinic Address</label>
                <input name="clinic_address" placeholder="15205 North Kierland Blvd. Suite " value={data.clinic_address} onChange={handle} required />
                <label > Country</label>
                <select name="country" value={data.country} onChange={handle} required>
                <option value="">Select Country</option>
                <option>Albania</option>
                <option>Andorra</option>
                <option>Armenia</option>
                <option>Austria</option>
                <option>Azerbaijan</option>
                <option>Belarus</option>
                <option>Belgium</option>
                <option>Bulgaria</option>
                <option>Croatia</option>
                <option>Cyprus</option>
                <option>Czech Republic</option>
                <option>Denmark</option>
                <option>Estonia</option>
                <option>Finland</option>
                <option>France</option>
                <option>Georgia</option>
                <option>Germany</option>
                <option>Greece</option>
                <option>Hungary</option>
                <option>Iceland</option>
                <option>Ireland</option>
                <option>Italy</option>
                <option>Lithuania</option>
                <option>Luxembourg</option>
                <option>Malta</option>
                <option>Moldova</option>
                <option>Monaco</option>
                <option>Montenegro</option>
                <option>North Macedonia</option>
                <option>Norway</option>
                <option>Poland</option>
                <option>Portugal</option>
                <option>Romania</option>
                <option>Serbia</option>
                <option>Turkey</option>
                </select>
                <label > City</label>
                <input name="city" placeholder="city" value={data.city} onChange={handle} required/>
                <label > Phone Number</label>
                <input name="phone_number" placeholder="Phone Number" type="number" value={data.phone_number} onChange={handle} required/>
                <label > Specialization</label>
                <select name="specialization" value={data.specialization} onChange={handle} required>
                  <option value="">Select Specialization</option>
                  <option >Breast surgery</option>
                  <option >Facial surgery</option>
                  <option >Liposuction</option>
                  <option >Abdominoplasty</option>
                  <option >Dental care</option>
                  <option>Buttock surgery</option>
                  <option >Hair surgery</option>
                  <option>Hand Surgery</option>
                  <option>Ear surgery</option>
                  <option>Intimate surgery</option>
                  <option>Reconstructive surgery</option>
                  <option >Non surgical treatments</option>
                </select>
                <label > Practice Tenure</label>
                <input name="practice_tenure" placeholder="3 years" type="number" value={data.practice_tenure} onChange={handle} required/>
                <label > Practice Start Date</label>
                <input name="practice_start_date" type="date" value={data.practice_start_date} onChange={handle} required/>
                {error && <p className="form-error">{error}</p>}
                <button className="btn primary full">Next</button>
              </form>
              </section>
            )}

            {step === 2 && (
              <section className="login-card2">
              <form onSubmit={e => { e.preventDefault(); next(); }}>
                <h3>Create your Password</h3>
                  <input
                    name="password"
                    type={'password'}
                    placeholder="Password"
                    value={data.password}
                    onChange={handle}
                    required
                  />
                  
                  
                  <input
                    name="confirm"
                    type={showPwd ? 'text' : 'password'}
                    placeholder="Retype Password"
                    value={data.confirm}
                    onChange={handle}
                    required
                  />
                {error && <p className="form-error">{error}</p>}
                <div className='back-next'>
                  <button type="button" onClick={back} className="btn outline">Back</button>
                  <button className="btn-primary">Next</button>
                  </div>
              </form>
              </section>
            )}

            {step === 3 && (
              <section className="login-card2">

              <form onSubmit={e => { e.preventDefault(); next(); }}>
                <h3>Upload your Profile Picture</h3>

                <div className="upload-area">
                  <UploadCloud size={48} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setProfilePhoto(e.target.files?.[0] || null)}
                  />
                </div>

                {profilePhoto && (
                  <p style={{ marginTop: '10px' }}>
                    Selected: <strong>{profilePhoto.name}</strong>
                  </p>
                )}

                {error && <p className="form-error">{error}</p>}

                <div className="back-next">
                  <button type="button" onClick={back} className="btn outline">Back</button>
                  <button className="btn-primary">Next</button>
                </div>
              </form>
              </section>
            )}

            {step === 4 && (
                            <section className="login-card2">
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
                 terms &amp; conditions.
               </label>
   
               {error && <p className="form-error">{error}</p>}
   
               <div className="back-next">
                  <button type="button" onClick={back} className="btn outline">Back</button>
                  <button className="btn-primary">Create Account</button>
                </div>
             </form>
             </section>
            )}
            {step === 5 && (
            <section className="login-card3">

          <div className="success">
            <img src={success} alt="" />
            <h3>Great!</h3>
            <p>You have successfully created your doctor account on BODYMINE.</p>
            <button className="btn primary full" onClick={()=>navigate('/pro/dashboard')}>
              Continue to Dashboard
            </button>
          </div>
          </section>
        )}
        </section>

        <section className="partner-strip">
          <img src={strip1} alt="Partner 1" />
          <img src={strip2} alt="Partner 2" />
          <img src={strip3} alt="Partner 3" />
        </section>

        <footer className="footer">
                  <div>
                  <img src={logo} alt="BodyMine" className="footer-logo" />
          
                  <p className="baseline">
                    Bodymine is the leading directory to help you find the perfect surgeon or clinic,
                    anywhere in the world.
                  </p>
          </div>
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
    </div>
  );
}
