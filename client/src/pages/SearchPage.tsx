import React, { useState, useEffect } from 'react';
import '../assets/Search.css';
import bodyMineLogo from '../images/logobodymine.png';
import { useUser } from '../components/UserContext';
import { FiSearch } from 'react-icons/fi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { components } from 'react-select';

interface Professional {
    isFavorited: any;
    photo_url: string;
    professional_id: number;
    full_name: string;
    clinic_address?: string;
    city?: string;
    country?: string;
    email: string;
    specialization?: string;
    practice_tenure?: string;
    practice_start_date?: string;
    is_premium?: boolean;
  }
  

export default function DoctorListPage() {
  const { user } = useUser();
  
const specialityOptions = [
  { value: 'Breast surgery', label: 'Breast surgery' },
  { value: 'Facial surgery', label: 'Facial surgery' },
  { value: 'Liposuction', label: 'Liposuction' },
  { value: 'Abdominoplasty', label: 'Abdominoplasty' },
  { value: 'Dental care', label: 'Dental care' },
  { value: 'Buttock surgery', label: 'Buttock surgery' },
  { value: 'Hair surgery', label: 'Hair surgery' },
  { value: 'Hand Surgery', label: 'Hand Surgery' },
  { value: 'Ear surgery', label: 'Ear surgery' },
  { value: 'Intimate surgery', label: 'Intimate surgery' },
  { value: 'Reconstructive surgery', label: 'Reconstructive surgery' },
  { value: 'Non surgical treatments', label: 'Non surgical treatments' },
];

const countryOptions = [
  "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bulgaria",
  "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia",
  "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Lithuania", "Luxembourg", "Malta",
  "Moldova", "Monaco", "Montenegro", "North Macedonia", "Norway", "Poland", "Portugal", "Romania",
  "Serbia", "Turkey"
].map(country => ({ value: country, label: country }));

const relevanceOptions = [
  { value: 'speciality', label: 'Speciality' },
  { value: 'relevance', label: 'Relevance' },
  { value: 'reviews', label: 'Reviews' },
  { value: 'popularity', label: 'Popularity' },
];

const activityOptions = [
  {
    value: 'online',
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ width: 10, height: 10, backgroundColor: 'green', borderRadius: '50%', marginRight: 8 }}></span>
        Online
      </div>
    ),
  },
  {
    value: 'offline',
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: '50%', marginRight: 8 }}></span>
        Offline
      </div>
    ),
  },
];

  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [country, setCountry] = useState('');
  const [doctors, setDoctors] = useState<Professional[]>([]);

  const fetchDoctors = async () => {
    try {
      const params = new URLSearchParams({
        query,
        location,
        speciality,
        country,
      });
      const res = await fetch(`/api/professionals/filter?${params.toString()}`);
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };
  const handleStartChat = async (professionalId: number) => {
    if (!user?.patient_id) return;
  
    try {
      await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: user.patient_id,
          professional_id: professionalId,
          message: "Hi doctor, I'd like to start a conversation.",
          sender: "patient"
        }),
      });
  
      // Enregistre l'ID du médecin sélectionné dans localStorage
      localStorage.setItem('selectedDoctorId', String(professionalId));
  
      // Redirige vers la page de chat
      window.location.href = "/chat";
    } catch (err) {
      console.error("Error starting chat:", err);
    }
  };
  
  

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSearch = () => {
    fetchDoctors();
  };

  function setActivity(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  function setRelevance(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="page">
      <header className="navbar">
        <div className="nav-left">
          <div className="logo">
            <img src={bodyMineLogo} alt="BodyMine" />
          </div>
          <nav className="menu">
            <a href="/home">Home</a>
            <a href="/chat">Chat</a>
            <a href="/search" className="active">Search</a>
          </nav>
        </div>
        <div className="nav-right">
          <span className="lang">EN ▾</span>
          <Link to="/editProfile" className="profile">
            <img src="https://i.pravatar.cc/32?img=12" alt="avatar" className="avatar" />
            <div>
              <span className="name">{user?.first_name || 'User'} {user?.last_name || 'User'}</span><br />
              <span className="status">Online</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="main-content">
        <div className="filters-wrapper">
          <div className="filter-row">
            <input
              type="text"
              placeholder="Doctor, Hospital, Dental"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}><FiSearch /> Search</button>
          </div>
          <div className="filter-row">
    <Select
      options={specialityOptions}
      placeholder="Speciality"
      onChange={(option) => setSpeciality(option?.value || '')}
      className="react-select"
    />
    <Select
      options={countryOptions}
      placeholder="Country"
      onChange={(option) => setCountry(option?.value || '')}
      className="react-select"
    />
    <Select
      options={activityOptions}
      placeholder="Activity"
      className="react-select"
    />
    <Select
      options={relevanceOptions}
      placeholder="Relevance"
      className="react-select"
    />
  </div>
        </div>
<a href="/doctor"><div className="doctor-grid">
          {doctors.length > 0 ? (
            doctors.map((doc) => (
              <div className="doctor-card" key={doc.professional_id}>
                <div className="doctor-img">
                  <img src={doc.photo_url || 'https://i.imgur.com/1X3K1vF.png'} alt={doc.full_name} />
                  <div className="heart-icon">
                    {doc.isFavorited ? <FaHeart /> : <FaRegHeart />}
                  </div>
                </div>
                <h4>{doc.full_name}</h4>
                <p>{doc.specialization}</p>
                <p>{doc.country}</p>
                <div className="rating">
                  <span>⏱ {doc.practice_tenure || 'N/A'}</span>
                </div>
                <button className="chat-btn" onClick={() => handleStartChat(doc.professional_id)}>
  💬 Chat
</button>

              </div>
            ))
          ) : (
            <p style={{ padding: '1rem', textAlign: 'center', gridColumn: '1/-1' }}>No results found</p>
          )}
        </div></a>
        
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-block">
            <img src={bodyMineLogo} alt="BodyMine" className="footer-logo" />
            <p>Bodymine is the leading directory to help you find the perfect surgeon or clinic, anywhere in the world.</p>
            <div className="social-icons">
              <span>🔵</span><span>🐦</span><span>▶️</span>
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
