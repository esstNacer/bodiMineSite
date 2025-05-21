// src/pages/ChatPage.tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../assets/ChatPage.css'
import { FiArrowLeft, FiCamera, FiHome, FiInfo, FiMoreVertical, FiPaperclip, FiPhoneCall, FiSearch, FiVideo } from 'react-icons/fi'
import { IoSend } from 'react-icons/io5'
import bodyMineLogo from '../images/LogoBODYMINE.png'
import clinic1 from '../images/clinic1.png'
import clinic2 from '../images/clinic2.png'
import clinic3 from '../images/clinic3.png'
import { useUser } from '../components/UserContext'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useBreakpoint from '../hooks/useBreakpoint'
import BottomNav from '../components/BottomNav'
import MobileNavbar from '../components/MobileNavbar'

interface Photo {
  photo_id: number
  professional_id: number
  photo_url: string
  type: string
  created_at: string
}

export default function ChatPage() {
  const { user } = useUser()
  const [message, setMessage] = useState('')
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null)
  const [doctors, setDoctors] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
    const [slide, setSlide] = useState(0);
      const isMobile = useBreakpoint();
      const [tab, setTab] = useState<'active' | 'ended'>('active');   // NEW

    
  
  const carousel = [
        { src: clinic1, alt: "New Clinic Dental Care" },
        { src: clinic2, alt: "Cosmetic Surgery" },
        { src: clinic3, alt: "New Cosmetic Surgery Website" },
      ];

  function uniqueByDoctor(list: any[]) {
    const seen = new Set<number>();
    return list.filter(item => {
      if (seen.has(item.professional_id)) return false;
      seen.add(item.professional_id);
      return true;
    });
  }

  // 1) Charger la liste des médecins avec lesquels on a déjà conversé
 useEffect(() => {
    if (!user?.patient_id) return;

    axios
      .get(`/api/chats/conversations/${user.patient_id}`)
      .then(res => {
        const uniq = uniqueByDoctor(res.data);   // <— déduplication
        setDoctors(uniq);
      })
      .catch(err =>
        console.error('Error fetching doctor conversations:', err)
      );
  }, [user?.patient_id]);



  // 2) Pour chaque médecin sans photo, charger sa photo "profile"
  useEffect(() => {
    doctors
      .filter(doc => !doc.photo_url)
      .forEach(doc => {
        axios
          .get<Photo[]>(`/api/photos/pro/${doc.professional_id}`)
          .then(res => {
            const profile = res.data.find(p => p.type === 'profile')
            if (profile) {
              setDoctors(prev =>
                prev.map(d =>
                  d.professional_id === doc.professional_id
                    ? { ...d, photo_url: profile.photo_url }
                    : d
                )
              )
            }
          })
          .catch(() => {
            /* on ignore si pas de photo ou erreur */
          })
      })
  }, [doctors])

  // 3) Charger les messages dès qu’un médecin est sélectionné
  useEffect(() => {
    if (user?.patient_id && selectedDoctorId) {
      axios
        .get(
          `/api/chats?patientId=${user.patient_id}&professionalId=${selectedDoctorId}`
        )
        .then(res => setMessages(res.data))
        .catch(err => console.error('Error fetching messages:', err))
    }
  }, [selectedDoctorId, user?.patient_id])

  const handleSend = async () => {
    if (!message.trim() || !selectedDoctorId || !user?.patient_id) return

    const newMsg = {
      patient_id: user.patient_id,
      professional_id: selectedDoctorId,
      message,
      sender: 'patient',
    }

    try {
      await axios.post('/api/chats', newMsg)
      setMessages(prev => [
        ...prev,
        { ...newMsg, timestamp: new Date().toISOString() },
      ])
      setMessage('')
    } catch (err) {
      console.error('Error sending message:', err)
    }
  }

  const selectedDoctor = doctors.find(
    doc => doc.professional_id === selectedDoctorId
  )

  return (
    <>
    {!isMobile && (
    <div className='chat'>
    <div className="page">
            <Header className="navbar"/>
      

      <section className="home carousel">
        <div className="home carousel-inner">
          {carousel.map((item, i) => (
            <img key={i} src={item.src} alt={item.alt} className={i === slide ? "active" : ""} />
          ))}
        </div>
      </section>

      <main className="chat-layout">
        <aside className="chat-sidebar">
          <h3>
            Messages <span className="badge">{doctors.length}</span>
          </h3>
          <input
            type="text"
            placeholder="Search conversation"
            className="chat-search"
          />
          <ul className="chat-list">
            {doctors.map(doc => (
              <li
                key={doc.professional_id}
                className={`chat-item ${
                  selectedDoctorId === doc.professional_id ? 'active' : ''
                }`}
                onClick={() => setSelectedDoctorId(doc.professional_id)}
              >
                <img
                  src={
                    doc.photo_url ||
                    `https://i.pravatar.cc/36?u=${doc.professional_id}`
                  }
                  alt={doc.full_name}
                />
                <div className="info">
                  <strong>{doc.full_name}</strong>
                  <span>
                    {doc.specialization || 'Specialist'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <section className="chat-box">
          <div className="chat-header">
            {selectedDoctor && (
              <>
                <div className="info">
                  <img
                    src={
                      selectedDoctor.photo_url ||
                      `https://i.pravatar.cc/36?u=${selectedDoctor.professional_id}`
                    }
                    alt={selectedDoctor.full_name}
                  />
                  <div>
                    <strong>{selectedDoctor.full_name}</strong>
                    <p>
                      {selectedDoctor.specialization ||
                        'General Physician'}
                    </p>
                  </div>
                </div>
                <button className="call-btn">
                  <FiPhoneCall />
                </button>
              </>
            )}
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${
                  msg.sender === 'patient' ? 'right' : 'left'
                }`}
              >
                <div className="bubble">{msg.message}</div>
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Send a Message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              disabled={!selectedDoctorId}
            />
            <button onClick={handleSend} disabled={!message.trim()}>
              <IoSend />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </div>
        )}
    {isMobile && (
  <div className="chat-mobile">

    {/* ───────── ÉCRAN 1 : LISTE DES CONVERSATIONS ───────── */}
    {!selectedDoctorId && (
      <>

      <div className="list-screen">
        <header className="mobile-header">
          <h2>Chat</h2>
        </header>

        {/* barre recherche avec icône */}
        <div className="search-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search conversation"
              className="search-input"
            />
          </div>

           {/* onglets ACTIVE / ENDED */}
           <nav className="tabs">
            <button
              className={tab === 'active' ? 'current' : ''}
              onClick={() => setTab('active')}
            >
              ACTIVE
            </button>
            <button
              className={tab === 'ended' ? 'current' : ''}
              onClick={() => setTab('ended')}
            >
              ENDED
            </button>
          </nav>

        <ul className="chat-list">
          {doctors.map(doc => (
            <li
              key={doc.professional_id}
              className={`chat-item${
                selectedDoctorId === doc.professional_id ? ' active' : ''
              }`}
              onClick={() => setSelectedDoctorId(doc.professional_id)}
            >
              <img
                src={
                  doc.photo_url ||
                  `https://i.pravatar.cc/46?u=${doc.professional_id}`
                }
                alt={doc.full_name}
              />
              <div className="info">
                <strong>Dr.{doc.full_name}</strong>
                <span>{doc.specialization || 'Specialist'}</span>
              </div>

              {/* — méta : heure + badge non-lus (si dispo) — */}
              <div className="meta">
                <span className="time">
                  {doc.lastMessageTime
                    ? new Date(doc.lastMessageTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''}
                </span>
                {!!doc.unread && <span className="badge">{doc.unread}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <BottomNav />
      </>
    )
    }

    {/* ───────── ÉCRAN 2 : DÉTAIL D’UN CHAT ───────── */}
    {selectedDoctorId && selectedDoctor && (
      <div className="detail-screen">
        <header className="detail-header">
          <button
            className="back-btn"
            onClick={() => setSelectedDoctorId(null)}
          >
            <FiArrowLeft />
          </button>

          <div className="info">
            <img
              src={
                selectedDoctor.photo_url ||
                `https://i.pravatar.cc/42?u=${selectedDoctor.professional_id}`
              }
              alt={selectedDoctor.full_name}
            />
            <div>
              <strong>{selectedDoctor.full_name}</strong>
              <p>{selectedDoctor.specialization || 'General Physician'}</p>
            </div>
          </div>

          <div className="header-actions">
  <button
    className="menu-btn"
    /* onClick={handleMoreOptions}  // si tu gères un menu */
  >
    <FiMoreVertical />
  </button>
</div>
        </header>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.sender === 'patient' ? 'right' : 'left'}`}
            >
              <div className="bubble">{msg.message}</div>
              <span className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          ))}
        </div>

     {/* ───────── zone de saisie ───────── */}
<div className="chat-footer">
  <div className="input-wrapper">
    {/* icône appareil-photo (ex. ouvrir galerie ou caméra) */}
    <button
      type="button"
      className="icon-btn"
      //onClick={handleOpenCamera /* à créer si besoin */}
    >
      <FiCamera />
    </button>

    {/* icône trombone (joindre fichier) */}
    <button
      type="button"
      className="icon-btn"
      //onClick={handleAttach /* à créer si besoin */}
    >
      <FiPaperclip />
    </button>

    {/* champ texte */}
    <input
      type="text"
      className="message-input"
      placeholder="Send a Message ..."
      value={message}
      onChange={e => setMessage(e.target.value)}
      disabled={!selectedDoctorId}
    />

    {/* envoi */}
    <button
      type="button"
      className="send-btn"
      onClick={handleSend}
      disabled={!message.trim()}
    >
      <IoSend />
    </button>
  </div>
</div>

      </div>
    )}
  </div>
)}
             </>
  )
}
