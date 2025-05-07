// src/pages/DoctorListPage.tsx
import React, { useState, useEffect } from 'react';
import '../assets/Search.css';
import bodyMineLogo from '../images/logobodymine.png';
import { useUser } from '../components/UserContext';
import { FiHome, FiSearch } from 'react-icons/fi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Professional {
  professional_id: number;
  full_name: string;
  specialization?: string;
  country?: string;
  practice_tenure?: string;
  email: string;
  photo_url?: string;
  isFavorited?: boolean;
}

interface Photo {
  photo_id: number;
  professional_id: number;
  photo_url: string;
  type: string;
}

export default function DoctorListPage() {
  const { user } = useUser();

  const specialityOptions = [
    { value: 'Breast surgery', label: 'Breast surgery' },
    { value: 'Facial surgery', label: 'Facial surgery' },
    /* …etc… */
  ];
  const countryOptions = [
    /* …etc… */
  ].map(c => ({ value: c, label: c }));
  const activityOptions = [
    {
      value: 'online',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{
            width: 10, height: 10,
            backgroundColor: 'green',
            borderRadius: '50%',
            marginRight: 8
          }} />
          Online
        </div>
      ),
    },
    {
      value: 'offline',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{
            width: 10, height: 10,
            backgroundColor: 'red',
            borderRadius: '50%',
            marginRight: 8
          }} />
          Offline
        </div>
      ),
    },
  ];
  const relevanceOptions = [
    { value: 'speciality', label: 'Speciality' },
    { value: 'relevance', label: 'Relevance' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'popularity', label: 'Popularity' },
  ];

  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [country, setCountry] = useState('');
  const [doctors, setDoctors] = useState<Professional[]>([]);

  /** 1) Fetch initial list */
  const fetchDoctors = async () => {
    try {
      const params = new URLSearchParams({ query, location, speciality, country });
      const res = await fetch(`/api/professional/filter?${params.toString()}`);
      const data: Professional[] = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  /** 2) Après chaque chargement, récupérer la photo profile si manquante */
  useEffect(() => {
    doctors.forEach(doc => {
      if (!doc.photo_url) {
        fetch(`/api/photos/pro/${doc.professional_id}`)
          .then(r => r.json())
          .then((photos: Photo[]) => {
            const prof = photos.find(p => p.type === 'profile');
            if (prof) {
              setDoctors(prev =>
                prev.map(d =>
                  d.professional_id === doc.professional_id
                    ? { ...d, photo_url: prof.photo_url }
                    : d
                )
              );
            }
          })
          .catch(() => {
            // si pas de photo ou erreur, on laisse le placeholder
          });
      }
    });
  }, [doctors]);

  useEffect(() => { fetchDoctors(); }, []);


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
        })
      });
      localStorage.setItem('selectedDoctorId', String(professionalId));
      window.location.href = "/chat";
    } catch (err) {
      console.error("Error starting chat:", err);
    }
  };


  return (
    <div className="home-wrapper">

    <div className="page">
            <Header className="navbar"/>
      

      <main className="main-content">
        <div className="filters-wrapper">
          <div className="filter-row">
            <input
              type="text"
              placeholder="Doctor, Hospital, Dental"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <button className="search-btn" onClick={fetchDoctors}>
              <FiSearch /> Search
            </button>
          </div>
          <div className="filter-row">
            <Select
              options={specialityOptions}
              placeholder="Speciality"
              onChange={opt => setSpeciality(opt?.value || '')}
              className="react-select"
            />
            <Select
              options={countryOptions}
              placeholder="Country"
              onChange={opt => setCountry(opt?.value || '')}
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

        <div className="doctor-grid">
          {doctors.length > 0 ? (
            doctors.map(doc => (
              <div className="doctor-card" key={doc.professional_id}>
                <Link to={`/doctor/${doc.professional_id}`} className="doctor-link">
                  <div className="doctor-img">
                    <img
                      src={doc.photo_url || 'https://i.imgur.com/1X3K1vF.png'}
                      alt={doc.full_name}
                    />
                    <div className="heart-icon">
                      {doc.isFavorited ? <FaHeart /> : <FaRegHeart />}
                    </div>
                  </div>
                  <h4>Dr.{doc.full_name}</h4>
                  <p>{doc.specialization}</p>
                  <p>{doc.country}</p>
                  <div className="rating">
                  <span className="doctor-rating">
                    ⭐ { 4.8}
                  </span>
                  </div>
                  <span > {doc.practice_tenure || 'N/A'} years</span>
                </Link>
                <button
                  className="chat-btn"
                  onClick={() => handleStartChat(doc.professional_id)}
                >
                  💬 Chat
                </button>
              </div>
            ))
          ) : (
            <p style={{ padding: '1rem', textAlign: 'center', gridColumn: '1/-1' }}>
              No results found
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
    </div>
  );
}
