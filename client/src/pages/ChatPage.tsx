// src/pages/ChatPage.tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../assets/ChatPage.css'
import { FiHome, FiPhoneCall, FiSearch } from 'react-icons/fi'
import { IoSend } from 'react-icons/io5'
import bodyMineLogo from '../images/logobodymine.png'
import clinic1 from '../images/clinic1.png'
import clinic2 from '../images/clinic2.png'
import clinic3 from '../images/clinic3.png'
import { useUser } from '../components/UserContext'
import { Link } from 'react-router-dom'

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

  // 1) Charger la liste des médecins avec lesquels on a déjà conversé
  useEffect(() => {
    if (!user?.patient_id) return
    axios
      .get(`/api/chats/conversations/${user.patient_id}`)
      .then(res => setDoctors(res.data))
      .catch(err => console.error('Error fetching doctor conversations:', err))
  }, [user?.patient_id])

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
    <div className='chat'>
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
          <a href="/search">
            <FiSearch /> Search
          </a>
        </nav>

        <div className="profile-mini">
          <span className="lang">EN ▾</span>
          <Link to="/editProfile">
            <img
              className="profile-avatar"
              src={user?.photo_url || 'https://i.pravatar.cc/40'}
              alt={`${user?.first_name} ${user?.last_name}`}
            />
            <span className="profile-name">
              {user?.first_name} {user?.last_name}{' '}
              <span className="status-dot">●</span>
            </span>
          </Link>
        </div>
      </header>

      <div className="carousel">
        <img src={clinic1} alt="Clinic 1" />
        <img src={clinic2} alt="Clinic 2" />
        <img src={clinic3} alt="Clinic 3" />
      </div>

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

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-block">
            <img
              src={bodyMineLogo}
              alt="BodyMine"
              className="footer-logo"
            />
            <p>
              Bodymine is the leading directory to help you find the
              perfect surgeon or clinic, anywhere in the world.
            </p>
            <div className="social-icons">🔵 🔮 ▶️</div>
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
    </div>
  )
}
