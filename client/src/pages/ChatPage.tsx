// src/pages/ChatPage.tsx
import React, { useEffect, useState, useRef } from 'react'
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
  const [onlineUsers, setOnlineUsers] = useState<Record<number, boolean>>({}) // Pour suivre qui est en ligne
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.style.height = 'auto';
      messageInputRef.current.style.height = Math.min(messageInputRef.current.scrollHeight, 120) + 'px'; // max 5 lignes environ
    }
  }, [message]);

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
                />                <div className="info">
                  <strong>{doc.full_name}</strong>
                  <span>
                    {doc.specialization || 'Specialist'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>      <section className="chat-box">
          {selectedDoctorId && selectedDoctor ? (
            <div className="chat-header flex items-center gap-3 px-4 py-1 bg-white shadow-sm min-h-0" style={{height:'auto'}}>
              <div className="info flex items-center gap-3">
                <img
                  src={
                    selectedDoctor.photo_url ||
                    `https://i.pravatar.cc/42?u=${selectedDoctor.professional_id}`
                  }
                  alt={selectedDoctor.full_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col justify-center">
                  <strong className="text-lg font-bold text-gray-900 leading-tight">{selectedDoctor.full_name}</strong>
                  <p className="text-base text-gray-500 mb-0 leading-tight">{selectedDoctor.specialization || 'General Physician'}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`inline-block w-3 h-3 rounded-full ${onlineUsers[selectedDoctor.professional_id] ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`text-base font-semibold ${onlineUsers[selectedDoctor.professional_id] ? 'text-green-600' : 'text-red-500'}`}>{onlineUsers[selectedDoctor.professional_id] ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              <button className="call-btn w-12 h-12 text-2xl flex items-center justify-center bg-[#00b184] text-white rounded-full ml-2">
                <FiPhoneCall />
              </button>
            </div>
          ) : (
            <div className="chat-header flex items-center justify-center py-4 bg-white shadow-sm">
              <p className="text-gray-500">Sélectionnez une conversation pour commencer</p>
            </div>
          )}
          

          <div className="chat-messages flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-3 bg-[#F9F9F9]" style={{minHeight:0}}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message flex flex-col max-w-[80%] mb-2 ${msg.sender === 'patient' ? 'self-end items-end' : 'self-start items-start'}`}
              >
                <div className={`bubble inline-block rounded-xl px-4 py-2 text-sm ${msg.sender === 'patient' ? 'bg-teal-100 text-gray-900' : 'bg-blue-50 text-gray-900'} break-words whitespace-pre-line`}>
                  {msg.message}
                </div>
                <span className="message-time text-xs text-gray-400 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <textarea
  ref={messageInputRef}
  className="message-input resize-none w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
  placeholder="Send a Message ..."
  value={message}
  onChange={e => setMessage(e.target.value)}
  disabled={!selectedDoctorId}
  rows={1}
  style={{ minHeight: 40, maxHeight: 120, overflowY: 'auto' }}
  onKeyDown={e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) handleSend();
    }
  }}
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
        <header className="detail-header flex items-center gap-3 px-4 py-2 bg-white shadow-sm min-h-0" style={{height:'auto'}}>
  <button
    className="back-btn"
    onClick={() => setSelectedDoctorId(null)}
  >
    <FiArrowLeft />
  </button>
  <div className="info flex items-center gap-3">
    <img
      src={
        selectedDoctor.photo_url ||
        `https://i.pravatar.cc/42?u=${selectedDoctor.professional_id}`
      }
      alt={selectedDoctor.full_name}
      className="w-12 h-12 rounded-full object-cover"
    />
    <div className="flex flex-col justify-center">
      <strong className="text-lg font-bold text-gray-900 leading-tight">{selectedDoctor.full_name}</strong>
      <p className="text-base text-gray-500 mb-0 leading-tight">{selectedDoctor.specialization || 'General Physician'}</p>
      <div className="flex items-center gap-2 mt-0.5">
        <span className={`inline-block w-3 h-3 rounded-full ${onlineUsers[selectedDoctor.professional_id] ? 'bg-green-500' : 'bg-red-500'}`}></span>
        <span className={`text-base font-semibold ${onlineUsers[selectedDoctor.professional_id] ? 'text-green-600' : 'text-red-500'}`}>{onlineUsers[selectedDoctor.professional_id] ? 'Online' : 'Offline'}</span>
      </div>
    </div>
  </div>
  <div className="header-actions ml-auto">
    <button className="menu-btn">
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
              <div className="bubble inline-block rounded-xl px-4 py-2 text-sm break-words whitespace-pre-line max-w-[80%]">{msg.message}</div>
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
      onKeyDown={e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (message.trim()) handleSend();
        }
      }}
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
