// src/pages/DoctorProfilePage.tsx
import {
  FiMessageCircle,
  FiMapPin,
  FiShare2,
  FiHeart,
  FiHome,
  FiSearch,
} from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'
import { BsCheckCircleFill } from 'react-icons/bs'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import bodyMineLogo from '../images/logobodymine.png'
import '../assets/DoctorProfilePage.css'
import { UserContext } from '../components/UserContext'

interface Professional {
  professional_id: number
  full_name: string
  photo_url?: string | null
  city?: string
  country?: string
  clinic_address?: string
  phone_number?: string
  specialization?: string
  practice_tenure?: string
  photos?: { photo_url: string; type: string }[]
}

interface Photo {
  photo_id: number
  professional_id: number
  photo_url: string
  type: string
}

export default function DoctorProfilePage() {
  // 1. Récupère l’ID depuis l’URL
  const { id } = useParams<{ id: string }>()
  const { user } = useContext(UserContext) ?? { user: null }

  // 2. States
  const [doctor, setDoctor] = useState<Professional | null>(null)
  const [loading, setLoading] = useState(true)
  const [recommended, setRecommended] = useState<Professional[]>([])

  // 3. Fetch du doc au montage / changement d’ID
  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`/api/professional/${id}`)
      .then(r => r.json())
      .then((data: Professional) => setDoctor(data))
      .catch(err => console.error('Error fetching doctor:', err))
      .finally(() => setLoading(false))
  }, [id])

  // 4. Charge ses photos (type="profile") dès qu’on a doctor.professional_id
  useEffect(() => {
    if (!doctor?.professional_id) return
    fetch(`/api/photos/pro/${doctor.professional_id}`)
      .then(r => r.json())
      .then((photos: Photo[]) => {
        const profile = photos.find(p => p.type === 'profile')
        if (profile) {
          setDoctor(d => d && ({ ...d, photo_url: profile.photo_url, photos }))
        } else {
          setDoctor(d => d && ({ ...d, photos }))
        }
      })
      .catch(() => {
        /* ignore si pas de photo */
      })
  }, [doctor?.professional_id])

  // 5. Une fois le doc chargé, fetch des recommended
  useEffect(() => {
    if (!doctor) return
    fetch(`/api/professional/`)
      .then(r => r.json())
      .then((data: Professional[]) => setRecommended(data))
      .catch(err => console.error('Error fetching recommended doctors:', err))
  }, [doctor])

  // 6. Charge la photo pour chaque recommended sans avatar
  useEffect(() => {
    recommended.forEach(rec => {
      if (!rec.photo_url) {
        fetch(`/api/photos/pro/${rec.professional_id}`)
          .then(r => r.json())
          .then((photos: Photo[]) => {
            const profile = photos.find(p => p.type === 'profile')
            if (profile) {
              setRecommended(prev =>
                prev.map(d =>
                  d.professional_id === rec.professional_id
                    ? { ...d, photo_url: profile.photo_url }
                    : d
                )
              )
            }
          })
          .catch(() => {
            /* ignore */
          })
      }
    })
  }, [recommended])

  // 7. Gestion des états de chargement / erreur
  if (loading) {
    return (
      <div className="doctor-profile-page" style={{ padding: '4rem', textAlign: 'center' }}>
        Loading…
      </div>
    )
  }
  if (!doctor) {
    return (
      <div className="doctor-profile-page" style={{ padding: '4rem', textAlign: 'center' }}>
        Professional not found
      </div>
    )
  }

  // 8. Lancer un chat
  const handleStartChat = async (professionalId: number) => {
    if (!user?.patient_id) return
    try {
      await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: user.patient_id,
          professional_id: professionalId,
          message: "Hi doctor, I'd like to start a conversation.",
          sender: 'patient',
        }),
      })
      localStorage.setItem('selectedDoctorId', String(professionalId))
      window.location.href = '/chat'
    } catch (err) {
      console.error('Error starting chat:', err)
    }
  }

  // 9. Choix de l’avatar principal
  const mainPhoto =
    doctor.photo_url ??
    doctor.photos?.find(p => p.type === 'profile')?.photo_url ??
    'https://i.imgur.com/1X3K1vF.png'

  return (
    <div className="doctor-profile-page">
      {/* NAVBAR */}
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
          <a href="/search">
            <FiSearch /> Search
          </a>
        </nav>
        <div className="profile-mini">
          <span className="lang">EN ▾</span>
          <Link to="/editProfile">
            <img
              className="profile-avatar"
              src={`https://i.pravatar.cc/40?u=${user?.patient_id}`}
              alt="You"
            />
            <span className="profile-name">
              {user?.first_name} {user?.last_name} <span className="status-dot">●</span>
            </span>
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="profile-main">
        <div className="profile-grid">
          {/* HEADER CARD */}
          <section className="doctor-header">
            <img className="doctor-photo" src={mainPhoto} alt={doctor.full_name} />
            <div className="doctor-info">
              <h2>
                {doctor.full_name} <BsCheckCircleFill size={18} color="#00cfcf" />
              </h2>
              <p className="speciality">{doctor.specialization}</p>
              <p className="location">
                <FiMapPin /> {doctor.city}, {doctor.country}
              </p>
              <p className="rating">
                <AiFillStar color="#f0b90b" /> 4.8 (139 reviews)
              </p>
              <button
                className="message-btn"
                onClick={() => handleStartChat(doctor.professional_id)}
              >
                <FiMessageCircle /> Chat
              </button>
            </div>
            <div className="action-btns">
              <button title="Add to favourites">
                <FiHeart size={18} />
              </button>
              <button title="Share profile">
                <FiShare2 size={18} />
              </button>
            </div>
          </section>

         <aside className="card stats-card">
            <div className="stats-strip">
              <div className="stat-box">
                <strong>3&nbsp;045</strong>
                <span>Patients</span>
              </div>
              <div className="stat-box">
                <strong>4&nbsp;812</strong>
                <span>Likes</span>
              </div>
              <div className="stat-box">
                <strong>12&nbsp;k</strong>
                <span>Comments</span>
              </div>
              <div className="stat-box">
                <strong>{doctor.practice_tenure ?? '—'}</strong>
                <span>Experience</span>
              </div>
            </div>
          </aside>

          {/* ============ ABOUT ============ */}
          <section className="card about-section">
            <h3>About</h3>
            {/*  À remplacer par doctor.bio si vous l’avez en BDD */}
            <p>
              Dr&nbsp;{doctor.full_name.split(' ').slice(-1)} is a highly-esteemed
              plastic surgeon with expertise in facial and body aesthetics. He
              offers personalised, modern procedures for optimal results and
              patient safety.
            </p>
          </section>

          {/* ============ INFO (adresse, tel…) ============ */}
          <section className="card info-section">
            <h3>Information</h3>
            <div className="info-grid">
              <div>
                <p>
                  <strong>Address :</strong> {doctor.clinic_address ?? '—'}
                </p>
                <p>
                  <strong>Working Hours :</strong> Mon – Fri · 9 AM – 5 PM
                </p>
                <p>
                  <strong>Contact :</strong>{' '}
                  {doctor.phone_number ?? '+33 1 23 45 67 89'}
                </p>
              </div>

              <img
                src="https://picsum.photos/seed/clinic/360/240"
                alt="Clinic"
              />
            </div>
          </section>

          {/* ============ REVIEWS  (placeholder) ============ */}
          <section className="card reviews-section">
            <h3>
              Patient Reviews <AiFillStar color="#f0b90b" /> 4.8
            </h3>

            <div className="review-filter-btns">
              <button>All Reviews</button>
              <button>With Photos</button>
              <button>With Description</button>
            </div>

            {[1, 2].map((_, i) => (
              <div className="review" key={i}>
                <img
                  className="avatar"
                  src={`https://i.pravatar.cc/44?img=${11 + i}`}
                  alt="reviewer"
                />
                <div>
                  <p>
                    <strong>Reviewer&nbsp;{i + 1}</strong>
                  </p>
                  <p>
                    Excellent experience with Dr.&nbsp;
                    {doctor.full_name.split(' ').slice(-1)}. Very professional
                    and caring.
                  </p>
                  <span className="review-meta">{i + 2} days ago</span>
                </div>
              </div>
            ))}
          </section>

          {/* ============ CONNECT ============ */}
          <section className="card connect-card">
            <h3>Connect</h3>
            <div className="connect-list">
              <a href="#">
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a href="#">
                <i className="fa-brands fa-twitter" />
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram" />
              </a>
            </div>
          </section>

          {/* RECOMMENDED */}
          <section className="card recommended-section">
            <h3>Recommended</h3>
            <div className="reco-grid">
              {recommended.map(rec => (
                <div className="recommended-card" key={rec.professional_id}>
                  <img
                    src={rec.photo_url || 'https://i.imgur.com/1X3K1vF.png'}
                    alt={rec.full_name}
                  />
                  <p>
                    <strong>{rec.full_name}</strong>
                  </p>
                  <p style={{ fontSize: '.8rem', color: '#777' }}>
                    {rec.specialization || '—'}
                  </p>
                  <p style={{ fontSize: '.8rem' }}>
                    <AiFillStar color="#f0b90b" />
                  </p>
                  <Link
                    to={`/doctor/${rec.professional_id}`}
                    className="message-btn"
                    style={{ fontSize: '.75rem' }}
                  >
                    <FiMessageCircle /> View
                  </Link>
                </div>
              ))}
              {recommended.length === 0 && (
                <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#777' }}>
                  No recommendations found
                </p>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
             <div className="footer-content">
               <div className="footer-block">
                 <img src={bodyMineLogo} alt="BodyMine" className="footer-logo" />
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
  )
}
