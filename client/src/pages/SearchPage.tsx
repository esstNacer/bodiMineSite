// src/pages/DoctorListPage.tsx
import React, { useState, useEffect } from 'react';
import '../assets/Search.css';
import bodyMineLogo from '../images/LogoBODYMINE.png';
import { useUser } from '../components/UserContext';
import { FiChevronDown, FiGlobe, FiHome, FiMapPin, FiSearch } from 'react-icons/fi';
import { FaCircle, FaGlobe, FaHeart, FaHeartbeat, FaRegHeart, FaUserMd } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import useBreakpoint from '../hooks/useBreakpoint';
import MobileNavbar from '../components/MobileNavbar';
import { IoFilterSharp, IoLocationSharp } from 'react-icons/io5';

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
    const isMobile = useBreakpoint();
    const [showFilters, setShowFilters] = useState(true);
    const [rating, setRating] = useState<number | null>(null);
    const specialitie = [
      'Breast surgery','Facial surgery','Liposuction','Abdominoplasty',
      'Dental care','Buttock surgery','Hair surgery','Hand Surgery',
      'Ear surgery','Intimate surgery','Reconstructive surgery',
      'Non surgical treatments',
    ];
    
    const countries = [
      'Albania','Andorra','Armenia','Austria','Azerbaijan','Belarus','Belgium',
      'Bulgaria','Croatia','Cyprus','Czech Republic','Denmark','Estonia','Finland',
      'France','Georgia','Germany','Greece','Hungary','Iceland','Ireland','Italy',
      'Lithuania','Luxembourg','Malta','Moldova','Monaco','Montenegro',
      'North Macedonia','Norway','Poland','Portugal','Romania','Serbia','Turkey',
    ];
  

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
    const [activity,    setActivity]    = useState('');
    const [sortBy,      setSortBy]      = useState('relevance');

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
   useEffect(() => {
      window.scrollTo(0, 0);  // force le scroll tout en haut à l'ouverture
    }, []);

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
  useEffect(() => {
    document.body.style.overflow = showFilters ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showFilters]);

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
    <>
    {!isMobile && (
    <div className="home-wrapper">

    <div className="page">
            <Header className="navbar"/>
      

      <main className="main-content">
        {/* ===========================================================
    BARRE DE RECHERCHE (remplace l'ancien <div className="filters-wrapper">)
=========================================================== */}
<section className="searchbar-search">
  {/* ───────── Ligne 1 ───────── */}
  <div className="search-row">
    {/* Champ recherche « Doctor, Hospital… » */}
    <div className="input-group">
      <FiSearch className="icon" />
      <input
        type="text"
        placeholder="Doctor, Hospital, Dental"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>

    {/* Champ localisation */}
    <div className="input-group">
      <FiMapPin className="icon" />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
    </div>

    {/* Bouton Search (déclenche ta requête) */}
    <button className="search-btn" onClick={fetchDoctors}>
      Search
    </button>

    {/* Bouton d’éventuels filtres secondaires / layout */}
    <button className="filter-btn">
      <IoFilterSharp className="icon" />
    </button>
  </div>

  {/* ───────── Ligne 2 : menus déroulants ───────── */}
  <div className="filter-row">
    {/* Speciality */}
    <div className="select-group">
      <FaUserMd className="icon" />
      <select
        value={speciality}
        onChange={e => setSpeciality(e.target.value)}
      >
        <option value="">Speciality</option>
        {specialitie.map(sp => (
          <option key={sp} value={sp}>{sp}</option>
        ))}
      </select>
    </div>

    {/* Country */}
    <div className="select-group">
      <FiGlobe className="icon" />
      <select
        value={country}
        onChange={e => setCountry(e.target.value)}
      >
        <option value="">Country</option>
        {countries.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>

    {/* Activity */}
    <div className="select-group">
      <FaHeartbeat className="icon" />
      <select
        value={activity}
        onChange={e => setActivity(e.target.value)}
      >
        <option value="">Activity</option>
        <option value="clinic">Clinic</option>
        <option value="hospital">Hospital</option>
        <option value="doctor">Doctor</option>
      </select>
    </div>

    {/* Sort By */}
    <div className="select-group sort-group">
      <label htmlFor="sortBy">Sort&nbsp;By</label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
      >
        <option value="relevance">Relevance</option>
        <option value="speciality">Speciality</option>
        <option value="reviews">Reviews</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  </div>
</section>


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
      )}
   {isMobile && (
        <div className="home-wrapper">
          <div className="page">
            <MobileNavbar />

            <main className="main-content">
              {showFilters ? (
                // ─── Écran 1 : filtres ─────────────────────
                <div className="filters-wrapper">
  {/* ── Doctor, Hospital, Dental ───────────────────── */}
  <div className="filter-item">
    <div className="input-with-icon">
      <FiSearch className="icon-left" />
      <input
        type="text"
        placeholder="Doctor, Hospital, Dental"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
  </div>

  {/* ── Location ───────────────────────────────────── */}
  <div className="filter-item">
    <div className="input-with-icon2">
      <IoLocationSharp className="icon-left" />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
    </div>
  </div>

  {/* ── Speciality ────────────────────────────────── */}
  {/* Speciality */}
<div className="filter-item">
  <div className="select-with-icon select-speciality">
    <FaUserMd className="icon-left" />
    <Select
      options={specialityOptions}
      placeholder="Speciality"
      onChange={opt => setSpeciality(opt?.value || '')}
      className="custom-select"
      classNamePrefix="custom-select"
      components={{ DropdownIndicator: () => <FiChevronDown className="icon-right" /> }}
    />
  </div>
</div>

{/* Country */}
<div className="filter-item">
  <div className="select-with-icon select-country">
    <FaGlobe className="icon-left" />
    <Select
      options={countryOptions}
      placeholder="Country"
      onChange={opt => setCountry(opt?.value || '')}
      className="custom-select"
      classNamePrefix="custom-select"
      components={{ DropdownIndicator: () => <FiChevronDown className="icon-right" /> }}
    />
  </div>
</div>

{/* Activity */}
<div className="filter-item">
  <div className="select-with-icon select-activity">
    <FaCircle className="icon-left" />
    <Select
      options={activityOptions}
      placeholder="Activity"
      className="custom-select"
      classNamePrefix="custom-select"
      components={{ DropdownIndicator: () => <FiChevronDown className="icon-right" /> }}
    />
  </div>
</div>

 {/* ─── Sort By + Relevance ───────────────────────── */}
 <div className="sort-relevance-row">
              <span className="sort-label">Sort By</span>
              <div className="select-with-icon select-relevance">
                <Select
                  options={relevanceOptions}
                  placeholder="Relevance"
                  className="custom-select"
                  classNamePrefix="custom-select"
                  components={{
                    DropdownIndicator: () => (
                      <FiChevronDown className="icon-right" />
                    )
                  }}
                />
              </div>
            </div>

            {/* ─── Filtre Notes ────────────────────────────────── */}
            <div className="rating-filters">
              <button
                className={rating === null ? 'active' : ''}
                onClick={() => setRating(null)}
              >
                All
              </button>
              {[5, 4, 3, 2, 1].map(n => (
                <button
                  key={n}
                  className={rating === n ? 'active' : ''}
                  onClick={() => setRating(n)}
                >
                  ★{n}
                </button>
              ))}
            </div>

            {/* ─── Bouton Search ─────────────────────────────── */}
            <button
              className="search-btn-full"
              onClick={() => {
                fetchDoctors();
                setShowFilters(false);
              }}
            >
              Search
            </button>
          </div>
              ) : (
                // ─── Écran 2 : résultats ────────────────────
                <>
                  <div className="results-header">
                    <button
                      className="back-btn"
                      onClick={() => setShowFilters(true)}
                    >
                      ← Filters
                    </button>
                    <span className="results-count">
                      {doctors.length} found
                    </span>
                  </div>

                  <div className="doctor-grid">
                    {doctors.length > 0 ? (
                      doctors.map(doc => (
                        <div className="doctor-card" key={doc.professional_id}>
                          <Link
                            to={`/doctor/${doc.professional_id}`}
                            className="doctor-link"
                          >
                            <div className="doctor-img">
                              <img
                                src={
                                  doc.photo_url ||
                                  'https://i.imgur.com/1X3K1vF.png'
                                }
                                alt={doc.full_name}
                              />
                              <div className="heart-icon">
                                {doc.isFavorited ? <FaHeart /> : <FaRegHeart />}
                              </div>
                            </div>
                            <h4>Dr. {doc.full_name}</h4>
                            <p>{doc.specialization}</p>
                            <p>{doc.country}</p>
                            <div className="rating">
                              <span className="doctor-rating">⭐ 4.8</span>
                            </div>
                            <span>{doc.practice_tenure ?? 'N/A'} years</span>
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
                      <p className="no-results">
                        No results found
                      </p>
                    )}
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      )}

           {isMobile && <BottomNav />}
           </>
  );
}
