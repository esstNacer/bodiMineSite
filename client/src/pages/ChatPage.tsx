import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/ChatPage.css';
import { FiPhoneCall } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';
import bodyMineLogo from '../images/logobodymine.png';
import clinic1 from '../images/clinic1.png';
import clinic2 from '../images/clinic2.png';
import clinic3 from '../images/clinic3.png';
import { useUser } from '../components/UserContext';
import { Link } from 'react-router-dom';

export default function ChatPage() {
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const storedDoctorId = localStorage.getItem('selectedDoctorId');
    if (storedDoctorId) {
      setSelectedDoctorId(parseInt(storedDoctorId));
      localStorage.removeItem('selectedDoctorId');
    }
  }, []);

  useEffect(() => {
    if (user?.patient_id) {
      axios.get(`/api/chats/conversations/${user.patient_id}`)
        .then(res => setDoctors(res.data))
        .catch(err => console.error('Error fetching doctor conversations:', err));
    }
  }, [user?.patient_id]);

  useEffect(() => {
    if (user?.patient_id && selectedDoctorId) {
      axios.get(`/api/chats?patientId=${user.patient_id}&professionalId=${selectedDoctorId}`)
        .then(res => setMessages(res.data))
        .catch(err => console.error('Error fetching messages:', err));
    }
  }, [selectedDoctorId, user?.patient_id]);

  const handleSend = async () => {
    if (!message.trim() || !selectedDoctorId || !user?.patient_id) return;

    const newMsg = {
      patient_id: user.patient_id,
      professional_id: selectedDoctorId,
      message,
      sender: 'patient', // ← très important
    };

    try {
      await axios.post('/api/chats', newMsg);
      setMessages(prev => [...prev, { ...newMsg, timestamp: new Date().toISOString() }]);
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const selectedDoctor = doctors.find(doc => doc.professional_id === selectedDoctorId);

  return (
    <div className="page">
      <header className="navbar">
        <div className="nav-left">
          <img src={bodyMineLogo} alt="BodyMine" className="logo" />
          <nav className="menu">
            <a href="/home">Home</a>
            <a href="/chat" className="active">Chat</a>
            <a href="/search">Search</a>
          </nav>
        </div>
        <div className="nav-right">
          <span className="lang">EN ▾</span>
           <Link to="/editProfile" className="profile">
                      <img src="https://i.pravatar.cc/32?img=12" alt="avatar" className="avatar" />
                      <div>
                        <span className="name">{user?.first_name || "User"} {user?.last_name || "User"}</span><br />
                        <span className="status">Online</span>
                      </div>
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
          <h3>Messages <span className="badge">{doctors.length}</span></h3>
          <input type="text" placeholder="Search conversation" className="chat-search" />
          <ul className="chat-list">
            {doctors.map(doc => (
              <li
                key={doc.professional_id}
                className={`chat-item ${selectedDoctorId === doc.professional_id ? 'active' : ''}`}
                onClick={() => setSelectedDoctorId(doc.professional_id)}
              >
                <img src={doc.photo_url || 'https://i.pravatar.cc/36'} alt="avatar" />
                <div className="info">
                  <strong>{doc.full_name}</strong>
                  <span>{doc.specialization || 'Specialist'}</span>
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
                  <img src={selectedDoctor.photo_url || `https://i.pravatar.cc/36?img=${selectedDoctor.professional_id}`} alt="doctor" />
                  <div>
                    <strong>{selectedDoctor.full_name}</strong>
                    <p>{selectedDoctor.specialization || 'General Physician'}</p>
                  </div>
                </div>
                <button className="call-btn"><FiPhoneCall /></button>
              </>
            )}
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.sender === 'patient' ? 'right' : 'left'}`}>
                <div className="bubble">{msg.message}</div>
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Send a Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!selectedDoctorId}
            />
            <button onClick={handleSend} disabled={!message.trim()}><IoSend /></button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-block">
            <img src={bodyMineLogo} alt="BodyMine" className="footer-logo" />
            <p>Bodymine is the leading directory to help you find the perfect surgeon or clinic, anywhere in the world.</p>
            <div className="social-icons">
              <span>🔵</span><span>🔮</span><span>▶️</span>
            </div>
          </div>
          <div className="footer-block">
            <h4>Home</h4>
            <ul><li>Menu</li><li>Chat</li><li>Search</li></ul>
          </div>
          <div className="footer-block">
            <h4>Info</h4>
            <ul><li>Terms & Conditions</li><li>Privacy Policy</li><li>FAQs</li></ul>
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
