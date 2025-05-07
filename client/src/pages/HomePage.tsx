// src/pages/HomePage.tsx
import React, { useContext, useState, useEffect, useRef } from "react";
import "../assets/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiSearch, FiMapPin, FiSliders, FiHome, 
  FiHeart, FiSmile, FiScissors, FiActivity, FiUser, 
  FiThumbsUp, FiScissors as FiHairCut, FiBriefcase, 
  FiUserCheck, FiRefreshCw, FiAward, 
  FiChevronLeft, FiChevronRight, FiMessageCircle
} from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { useUser } from '../components/UserContext'; // très important

import useBreakpoint from "../hooks/useBreakpoint";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";


import doctorImage from "../images/doctor.png";
import clinic1 from "../images/clinic1.png";
import clinic2 from "../images/clinic2.png";
import clinic3 from "../images/clinic3.png";
import bodyMine from "../images/logobodymine.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Footer from "../components/Footer";

interface Professional {
  professional_id: number;
  full_name: string;
  type: string;
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

export default function HomePage() {
  const { user, updateUser, setToken } = useUser();  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [openedSections, setOpenedSections] = useState<string[]>([]);

  const specialityRef = useRef<HTMLDivElement>(null!);
  const doctorsRef = useRef<HTMLDivElement>(null!);
  const clinicsRef = useRef<HTMLDivElement>(null!);
  const articlesRef = useRef<HTMLDivElement>(null!);

  const carousel = [
    { src: clinic1, alt: "New Clinic Dental Care" },
    { src: clinic2, alt: "Cosmetic Surgery" },
    { src: clinic3, alt: "New Cosmetic Surgery Website" },
  ];

  const specialities = [
    { name: "Breast Surgery", icon: <FiHeart /> },
    { name: "Facial Surgery", icon: <FiSmile /> },
    { name: "Liposuction", icon: <FiScissors /> },
    { name: "Abdominoplasty", icon: <FiActivity /> },
    { name: "Dental Care", icon: <FiUser /> },
    { name: "Buttock Surgery", icon: <FiThumbsUp /> },
    { name: "Hair Surgery", icon: <FiHairCut /> },
    { name: "Hand Surgery", icon: <FiBriefcase /> },
    { name: "Ear Surgery", icon: <FiHeart /> },
    { name: "Intimate Surgery", icon: <FiUserCheck /> },
    { name: "Reconstructive Surgery", icon: <FiRefreshCw /> },
    { name: "Non-Surgical Treatments", icon: <FiAward /> },
  ];

  const [clinics, setClinics] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<Professional[]>([]);

  const toggleSection = (sectionName: string) => {
    setOpenedSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((name) => name !== sectionName)
        : [...prev, sectionName]
    );
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    const userParam = params.get('user');
  
    if (tokenParam && userParam) {
      try {
        const userObj = JSON.parse(decodeURIComponent(userParam));
        setToken(tokenParam, true);          // Stocker le token (remember = true car OAuth)
        updateUser(userObj, true);            // Stocker l'utilisateur
  
        navigate('/home', { replace: true }); // Nettoyer l'URL (plus de /?token=xxx&user=xxx visible)
      } catch (err) {
        console.error('Error parsing user from URL:', err);
      }
    }
  }, [location]);
  
  
    /** 1) Fetch initial list */
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`/api/professional/doctors`);
        const data: Professional[] = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };
    const fetchClinics = async () => {
      try {
        const res = await fetch(`/api/professional/clinics`);
        const data: Professional[] = await res.json();
        setClinics(data);
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };
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

        useEffect(() => {
          clinics.forEach(clinic => {
            if (!clinic.photo_url) {
              fetch(`/api/photos/pro/${clinic.professional_id}`)
                .then(r => r.json())
                .then((photos: Photo[]) => {
                  const prof = photos.find(p => p.type === 'profile');
                  if (prof) {
                    setDoctors(prev =>
                      prev.map(d =>
                        d.professional_id === clinic.professional_id
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
        }, [clinics]);
          useEffect(() => { fetchClinics(); }, []);
      

  const handleToggleSection = (section: string) => {
    if (openedSections.includes(section)) {
      setOpenedSections(openedSections.filter((s) => s !== section));
    } else {
      setOpenedSections([...openedSections, section]);
    }
  };

  const handleScroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const amount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const handleProtectedNavigation = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
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
        })
      });
      localStorage.setItem('selectedDoctorId', String(professionalId));
      window.location.href = "/chat";
    } catch (err) {
      console.error("Error starting chat:", err);
    }
  };
  const isMobile = useBreakpoint();
  return (
    <>
    {!isMobile && (
    <div className="home-wrapper">
  
      {/* Navbar */}
      <Header className="navbar"/>
  
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h1>Find the Right Care,<br /><span>Anywhere in the World</span></h1>
          <p>Connect with top-rated cosmetic surgeons and clinics.<br />Your journey to confidence starts here.</p>
          <div className="hero-buttons">
            <button className="btn-hero secondary" onClick={() => handleProtectedNavigation("/search")}>Find a Doctor</button>
          </div>
        </div>
        <div className="doctor-wrapper">
  <img src={doctorImage} alt="Doctor" className="doctor-img" />
  </div>
  
        <div className="hero-right">
          
            <h4>How BodyMine Works</h4>
            <ol>
              <li>Search for doctors by specialty or service.</li>
              <li>Select based on experience, fee or rating.</li>
              <li>Start chat and ask questions with your Doctors.</li>
            </ol>
            <Link to="/how-it-works" className="home-wrapper hero-right read-more">Read more</Link>
        </div>
      </section>
  
      {/* Searchbar */}
      <section className="searchbar">
        <div className="search-row">
          <div className="input-group">
            <FiSearch className="icon" />
            <input type="text" placeholder="Doctor, Hospital, Dental" />
          </div>
          <div className="input-group-location">
            <FiMapPin className="icon" />
            <input type="text" placeholder="Location" />
          </div>
          <button className="search-btn" onClick={() => handleProtectedNavigation("/search")}>Search</button>
          <button className="filter-btn"><FiSliders /></button>
        </div>
  
        <div className="filter-row">
          <select><option>Speciality</option></select>
          <select><option>Country</option></select>
          <select><option>Activity</option></select>
          <select><option>Sort By: Relevance</option></select>
        </div>
      </section>
  
      {/* Carousel */}
      <section className="home carousel">
        <div className="home carousel-inner">
          {carousel.map((item, i) => (
            <img key={i} src={item.src} alt={item.alt} className={i === slide ? "active" : ""} />
          ))}
        </div>
      </section>
  
      {/* Sections */}
      <section className="sections">

  {/* Specialities */}
  <div className={`section section-speciality ${openedSections.includes("speciality") ? 'open' : ''}`}>
    <h2 onClick={() => handleToggleSection("speciality")}>
      Our Speciality <a onClick={() => handleProtectedNavigation("/search")}>See All</a>
    </h2>
    <div className="section-content">
      {openedSections.includes("speciality") && (
        <div className="specialities-carousel-wrapper">
          <FiChevronLeft className="speciality-arrow left" onClick={() => handleScroll(specialityRef, "left")} />
          <div className="doctors-track" ref={specialityRef}>
            {specialities.map((spec, index) => (
              <div key={index} className="speciality-item">
                <div className="speciality-icon">{spec.icon}</div>
                <div className="speciality-name">{spec.name}</div>
              </div>
            ))}
          </div>
          <FiChevronRight className="speciality-arrow right" onClick={() => handleScroll(specialityRef, "right")} />
        </div>
      )}
    </div>
  </div>

  {/* Doctors */}
  <div className={`section section-doctors ${openedSections.includes("doctors") ? 'open' : ''}`}>
    <h2 onClick={() => handleToggleSection("doctors")}>
      Top <span>Doctors</span> <a onClick={() => handleProtectedNavigation("/search")}>See All</a>
    </h2>
    <div className="section-content">
      {openedSections.includes("doctors") && (
        <section className="doctors-carousel-wrapper">
          <button className="carousel-arrow prev" onClick={() => handleScroll(doctorsRef, "left")}>
            <FiChevronLeft />
          </button>
          <div className="doctors-track" ref={doctorsRef}>
            {doctors.map((doc) => (
              <article className="doctor-card" key={doc.professional_id}>
                <Link to={`/doctor/${doc.professional_id}`} className="doctor-link">
                  <img className="doctor-photo" src={doc.photo_url || "https://i.imgur.com/1X3K1vF.png"} alt={doc.full_name} />
                  <button className="doctor-fav">
                    {doc.isFavorited ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <div className="doctor-info">
                    <h4 className="doctor-name">Dr. {doc.full_name}</h4>
                    <p className="doctor-title">{doc.specialization}</p>
                    <h1 className="doctor-meta-home">{doc.country}</h1>
                    <div className="doctor-stats">
                      <span className="doctor-rating">⭐ {4.8}</span>
                    </div>
                    <span className="doctor-meta-home">
                      {doc.practice_tenure ?? "N/A"} years
                    </span>
                    <button type="button" className="doctor-chat-btn" onClick={() => handleStartChat(doc.professional_id)}>
                      💬 Chat
                    </button>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <button className="carousel-arrow next" onClick={() => handleScroll(doctorsRef, "right")}>
            <FiChevronRight />
          </button>
        </section>
      )}
    </div>
  </div>

  {/* Clinics */}
  <div className={`section section-clinics ${openedSections.includes("clinics") ? 'open' : ''}`}>
    <h2 onClick={() => handleToggleSection("clinics")}>Top <span>Clinics</span></h2>
    <div className="section-content">
      {openedSections.includes("clinics") && (
        <section className="doctors-carousel-wrapper">
          <button className="carousel-arrow prev" onClick={() => handleScroll(clinicsRef, "left")}>
            <FiChevronLeft />
          </button>
          <div className="doctors-track" ref={clinicsRef}>
            {clinics.map((clinic) => (
              <article className="doctor-card" key={clinic.professional_id}>
                <Link to={`/doctor/${clinic.professional_id}`} className="doctor-link">
                  <img className="doctor-photo" src={clinic.photo_url || "https://i.imgur.com/1X3K1vF.png"} alt={clinic.full_name} />
                  <button className="doctor-fav">
                    {clinic.isFavorited ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <div className="doctor-info">
                    <h4 className="doctor-name">{clinic.full_name}</h4>
                    <p className="doctor-title">{clinic.specialization}</p>
                    <h1 className="doctor-meta-home">{clinic.country}</h1>
                    <div className="doctor-stats">
                      <span className="doctor-rating">⭐ {4.8}</span>
                    </div>
                    <span className="doctor-meta-home">
                      {clinic.practice_tenure ?? "N/A"} years
                    </span>
                    <button type="button" className="doctor-chat-btn" onClick={() => handleStartChat(clinic.professional_id)}>
                      💬 Chat
                    </button>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <button className="carousel-arrow next" onClick={() => handleScroll(clinicsRef, "right")}>
            <FiChevronRight />
          </button>
        </section>
      )}
    </div>
  </div>

  {/* Articles */}
  <div className={`section section-articles ${openedSections.includes("articles") ? 'open' : ''}`}>
    <h2 onClick={() => handleToggleSection("articles")}>Health Article <a href="#">See All</a></h2>
    <div className="section-content">
      {openedSections.includes("articles") && (
        <div className="specialities-carousel-wrapper">
          <FiChevronLeft className="speciality-arrow left" onClick={() => handleScroll(articlesRef, "left")} />
          <div className="specialities-track" ref={articlesRef}>
            {articles.map((article) => (
              <div key={article.id} className="speciality-item">
                <div className="speciality-icon">📚</div>
                <div className="speciality-name">{article.title}</div>
              </div>
            ))}
          </div>
          <FiChevronRight className="speciality-arrow right" onClick={() => handleScroll(articlesRef, "right")} />
        </div>
      )}
    </div>
  </div>

</section>

  
      {/* Footer */}
      <Footer />
  
    </div>
    )}
    {isMobile && (
      <div className="home-wrapper">
  <header className="navbar-tel">
          <div className="logo-tel">
            <Link to={"/"}>
            <img src={bodyMine} alt="BodyMine Cosmetic Surgery" />
            </Link>
          </div>
      </header>
  
      {/* Hero Section */}

<section className="hero-tel">
  {/* Ligne 1 – Titre pleine largeur */}
  <h1 className="hero-tel-title">
    Find the Right Care,<br />
    <span>Anywhere in the World</span>
  </h1>

  {/* Ligne 2 – Paragraphe + Photo */}
  <p className="hero-tel-text">
    Connect with top-rated cosmetic surgeons and clinics.<br />
    Your journey to confidence starts here.
  </p>

  <div className="doctor-wrapper">
    <img src={doctorImage} alt="Doctor" className="doctor-img" />
  </div>

  {/* Ligne 3 – Boutons côte-à-côte */}
  <div className="hero-tel-buttons">
    <button
      className="btn-hero secondary"
      onClick={() => handleProtectedNavigation("/search")}
    >
      Explore
    </button>

    <button
      className="btn-hero primary"
      onClick={() => handleProtectedNavigation("/login")}
    >
      Login
    </button>
  </div>
</section>

      <div className="hero-right">
          
          <h4>How BodyMine Works</h4>
          <ol>
            <li>Search for doctors by specialty or service.</li>
            <li>Select based on experience, fee or rating.</li>
            <li>Start chat and ask questions with your Doctors.</li>
          </ol>
          <Link to="/how-it-works" className="hero-right read-more-tel">Read more</Link>
      </div>
  
      {/* Searchbar *
  
      {/* Carousel */}
      <section className="home carousel">
        <div className="home carousel-inner">
          {carousel.map((item, i) => (
            <img key={i} src={item.src} alt={item.alt} className={i === slide ? "active" : ""} />
          ))}
        </div>
      </section>
  
      {/* Sections */}
      <section className="sections">
  
        {/* Specialities */}
        <div className="section section-speciality">
          <h2 onClick={() => handleToggleSection("speciality")}>Our Speciality <a onClick={() => handleProtectedNavigation("/search")}>See All</a></h2>
          {openedSections.includes("speciality") && (
            <div className="specialities-carousel-wrapper">
              <FiChevronLeft className="speciality-arrow left" onClick={() => handleScroll(specialityRef, "left")} />
              <div className="specialities-track" ref={specialityRef}>
                {specialities.map((spec, index) => (
                  <div key={index} className="speciality-item">
                    <div className="speciality-icon">{spec.icon}</div>
                    <div className="speciality-name">{spec.name}</div>
                  </div>
                ))}
              </div>
              <FiChevronRight className="speciality-arrow right" onClick={() => handleScroll(specialityRef, "right")} />
            </div>
          )}
        </div>
  
        {/* Doctors */}
        <div className="section section-doctors">
  <h2 onClick={() => handleToggleSection("doctors")}>
    Top <span>Doctors</span><a  onClick={() => handleProtectedNavigation("/search")}>See All</a>
  </h2>

  {openedSections.includes("doctors") && (
    <section className="doctors-carousel-wrapper">
      {/* Flèche ← */}
      <button
        className="carousel-arrow prev"
        onClick={() => handleScroll(doctorsRef, "left")}
      >
        <FiChevronLeft />
      </button>

      {/* Piste défilante */}
      <div className="doctors-track" ref={doctorsRef}>
        {doctors.map((doc) => (
          <article className="doctor-card" key={doc.professional_id}>
            <Link to={`/doctor/${doc.professional_id}`} className="doctor-link">
              {/* Photo + icône favori */}
              <img
                className="doctor-photo"
                src={doc.photo_url || "https://i.imgur.com/1X3K1vF.png"}
                alt={doc.full_name}
              />
              <button className="doctor-fav">
                {doc.isFavorited ? <FaHeart /> : <FaRegHeart />}
              </button>

              {/* Infos principales */}
              <div className="doctor-info">
                <h4 className="doctor-name">Dr.{doc.full_name}</h4>
                <p className="doctor-title">{doc.specialization}</p>
                <h1 className="doctor-meta-home">{doc.country}</h1>

                {/* Note + ancienneté */}
                <div className="doctor-stats">
                  <span className="doctor-rating">
                    ⭐ { 4.8}
                  </span>
                </div>
                  <span className="doctor-meta-home">
                    {doc.practice_tenure ?? "N/A"} years
                  </span>
                {/* Bouton Chat */}
                <button
                  type="button"
                  className="doctor-chat-btn"
                  onClick={() => handleStartChat(doc.professional_id)}
                >
                  💬 Chat
                </button>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Flèche → */}
      <button
        className="carousel-arrow next"
        onClick={() => handleScroll(doctorsRef, "right")}
      >
        <FiChevronRight />
      </button>
    </section>
  )}
</div>

  
        {/* Clinics */}
        <div className="section section-clinics">
          <h2 onClick={() => handleToggleSection("clinics")}>Top <span>Clinics</span></h2>
          {openedSections.includes("clinics") && (
    <section className="doctors-carousel-wrapper">
      {/* Flèche ← */}
      <button
        className="carousel-arrow prev"
        onClick={() => handleScroll(clinicsRef, "left")}
      >
        <FiChevronLeft />
      </button>

      {/* Piste défilante */}
      <div className="doctors-track" ref={clinicsRef}>
        {clinics.map((clinic) => (
          <article className="doctor-card" key={clinic.professional_id}>
            <Link to={`/doctor/${clinic.professional_id}`} className="doctor-link">
              {/* Photo + icône favori */}
              <img
                className="doctor-photo"
                src={clinic.photo_url || "https://i.imgur.com/1X3K1vF.png"}
                alt={clinic.full_name}
              />
              <button className="doctor-fav">
                {clinic.isFavorited ? <FaHeart /> : <FaRegHeart />}
              </button>

              {/* Infos principales */}
              <div className="doctor-info">
                <h4 className="doctor-name">{clinic.full_name}</h4>
                <p className="doctor-title">{clinic.specialization}</p>
                <h1 className="doctor-meta-home">{clinic.country}</h1>

                {/* Note + ancienneté */}
                <div className="doctor-stats">
                  <span className="doctor-rating">
                    ⭐ { 4.8}
                  </span>
                </div>
                  <span className="doctor-meta-home">
                    {clinic.practice_tenure ?? "N/A"} years
                  </span>
                {/* Bouton Chat */}
                <button
                  type="button"
                  className="doctor-chat-btn"
                  onClick={() => handleStartChat(clinic.professional_id)}
                >
                  💬 Chat
                </button>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Flèche → */}
      <button
        className="carousel-arrow next"
        onClick={() => handleScroll(clinicsRef, "right")}
      >
        <FiChevronRight />
      </button>
    </section>
  )}
        </div>
  
        {/* Articles */}
        <div className="section section-articles">
          <h2 onClick={() => handleToggleSection("articles")}>Health Article <a href="#">See All</a></h2>
          {openedSections.includes("articles") && (
            <div className="specialities-carousel-wrapper">
              <FiChevronLeft className="speciality-arrow left" onClick={() => handleScroll(articlesRef, "left")} />
              <div className="specialities-track" ref={articlesRef}>
                {articles.map((article) => (
                  <div key={article.id} className="speciality-item">
                    <div className="speciality-icon">📚</div>
                    <div className="speciality-name">{article.title}</div>
                  </div>
                ))}
              </div>
              <FiChevronRight className="speciality-arrow right" onClick={() => handleScroll(articlesRef, "right")} />
            </div>
          )}
        </div>
  
      </section>
  
      
  
    </div>
      )}
       {isMobile && <BottomNav />}
       </>
  );
  
}
