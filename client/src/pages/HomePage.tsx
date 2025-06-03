// src/pages/HomePage.tsx
import React, { useContext, useState, useEffect, useRef } from "react";
import "../assets/Home.css";
import "../assets/speciality-fixes.css"; // Import des styles améliorés pour les spécialités
import "../assets/mobile-tailwind.css"; // Import mobile Tailwind optimizations
import "../assets/responsive.css"; // Import responsive styles with animations
import "../assets/mobile-carousel-fix.css"; // Import des styles minimaux pour les carrousels mobile
import "../assets/scroll-carousel.css"; // Import des styles pour ScrollCarousel
import ScrollCarousel from "../components/ScrollCarousel"; // Import du nouveau composant de carrousel
import { Link, useNavigate } from "react-router-dom";
import { addDefaultTestClinics } from "./ClinicSection";
import { 
  FiSearch, FiMapPin, FiSliders, FiHome, 
  FiHeart, FiSmile, FiScissors, FiActivity, FiUser, 
  FiThumbsUp, FiBriefcase, 
  FiUserCheck, FiRefreshCw, FiAward, 
  FiChevronLeft, FiChevronRight, FiMessageCircle,
  FiGlobe
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
import bodyMine from "../images/LogoBODYMINE.png";
import { FaHeart, FaHeartbeat, FaRegHeart, FaUserMd } from "react-icons/fa";
import Footer from "../components/Footer";
import { IoFilterSharp } from "react-icons/io5";
import '../assets/scroll-carousel.css';

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

export default function HomePage() {  const { user, updateUser, setToken } = useUser();  
  const navigate = useNavigate();
  const location = useLocation();
  const [slide, setSlide] = useState(0);
  const [openedSections, setOpenedSections] = useState<string[]>([]);

  const [query,       setQuery]       = useState('');
  const [localisation,    setLocation]    = useState('');
  const [speciality,  setSpeciality]  = useState('');
  const [country,     setCountry]     = useState('');
  const [activity,    setActivity]    = useState('');
  const [sortBy,      setSortBy]      = useState('relevance');

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
    { name: "Hair Surgery", icon: <FiScissors /> },
    { name: "Hand Surgery", icon: <FiBriefcase /> },
    { name: "Ear Surgery", icon: <FiHeart /> },
    { name: "Intimate Surgery", icon: <FiUserCheck /> },
    { name: "Reconstructive Surgery", icon: <FiRefreshCw /> },
    { name: "Non-Surgical Treatments", icon: <FiAward /> },
  ];
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

  const [clinics, setClinics] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([
    { 
      id: 1, 
      title: "Understanding Cosmetic Surgery", 
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29zbWV0aWMlMjBzdXJnZXJ5fGVufDB8fDB8fHww",
    },
    { 
      id: 2, 
      title: "Benefits of Dental Care", 
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRlbnRhbCUyMGNhcmV8ZW58MHx8MHx8fDA%3D",
    },
    { 
      id: 3, 
      title: "Facial Rejuvenation Trends", 
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsJTIwY2FyZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    { 
      id: 4, 
      title: "Liposuction: What to Expect", 
      image: "https://images.unsplash.com/photo-1511174944925-a99f10911d45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9keSUyMGNvbnRvdXJpbmd8ZW58MHx8MHx8fDA%3D",
    },
    { 
      id: 5, 
      title: "Hair Transplant Innovations", 
      image: "https://images.unsplash.com/photo-1580421383874-7e139567454a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFpciUyMHRyYW5zcGxhbnR8ZW58MHx8MHx8fDA%3D",
    }
  ]);
  const [doctors, setDoctors] = useState<Professional[]>([]);
  const isMobile = useBreakpoint();

  const toggleSection = (sectionName: string) => {
    setOpenedSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((name) => name !== sectionName)
        : [...prev, sectionName]
    );
  };  useEffect(() => {
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
  }, [location, navigate, setToken, updateUser]);
  
  // Correction des carrousels - ajout des classes pour contrôler l'affichage des flèches
  useEffect(() => {
    // Attendre que React ait rendu tous les composants
    const timeout = setTimeout(function() {
      // 1. Identifier les sections concernées
      const sections = document.querySelectorAll('.section-speciality, .section-doctors, .section-clinics, .section-articles');
      
      // 2. Pour chaque section
      sections.forEach(function(section) {
        // Trouver les boutons de navigation
        const prevButtons = section.querySelectorAll('button[class*="prev"]');
        const nextButtons = section.querySelectorAll('button[class*="next"]');
        
        // Ajouter la classe carousel-arrow aux boutons de navigation
        prevButtons.forEach(function(button) {
          if (!button.classList.contains('carousel-arrow')) {
            button.classList.add('carousel-arrow');
          }
        });
        
        nextButtons.forEach(function(button) {
          if (!button.classList.contains('carousel-arrow')) {
            button.classList.add('carousel-arrow');
          }
        });
        
        // Vérifier si la section est ouverte (déjà dans openedSections)
        const sectionName = section.classList[1].replace('section-', '');
        if (openedSections.includes(sectionName)) {
          section.classList.add('open');
        } else {
          section.classList.remove('open');
        }
      });
    }, 500); // Délai pour s'assurer que React a bien rendu la page
    
    return () => clearTimeout(timeout);
  }, [openedSections]); // Réexécuter lorsque openedSections change
    // auto-slide sur mobile
    useEffect(() => {
      if (!isMobile) return;
      const interval = setInterval(() => {
        setSlide(prev => (prev + 1) % carousel.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [isMobile, carousel.length, setSlide]);
  
  
    /** 1) Fetch initial list */
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`/api/professional/doctors`);
        const data: Professional[] = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };    const fetchClinics = async () => {
      try {
        const res = await fetch(`/api/professional/clinics`);
        const data: Professional[] = await res.json();
        
        if (data && data.length > 0) {
          // Si on a des données réelles de l'API, les combiner avec nos cliniques par défaut
          setClinics(prev => {
            // Garder les cliniques test (IDs >= 9000) et ajouter les données réelles
            const testClinics = prev.filter(c => c.professional_id >= 9000);
            return [...testClinics, ...data];
          });
        }
      } catch (err) {
        console.error('Error fetching clinics:', err);
        // En cas d'erreur, on garde nos cliniques par défaut
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
          // Ajouter d'abord les cliniques par défaut, puis essayer de récupérer les cliniques réelles
        useEffect(() => {
          // Utiliser la fonction du fichier ClinicSection pour ajouter des cliniques par défaut
          addDefaultTestClinics(clinics, setClinics);
          
          // Ensuite essayer de récupérer les vraies cliniques
          fetchClinics();
        }, []);
      
  const handleToggleSection = (section: string) => {
    if (openedSections.includes(section)) {
      setOpenedSections(openedSections.filter((s) => s !== section));
      // Retirer manuellement la classe 'open' de la section
      const sectionElement = document.querySelector(`.section-${section}`);
      if (sectionElement) {
        sectionElement.classList.remove('open');
      }
    } else {
      setOpenedSections([...openedSections, section]);
      // Ajouter manuellement la classe 'open' à la section
      const sectionElement = document.querySelector(`.section-${section}`);
      if (sectionElement) {
        sectionElement.classList.add('open');
      }
    }
  };
  const handleScroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      // Ajuster le défilement en fonction de la largeur de l'écran et des éléments visibles
      const isMobile = window.innerWidth < 768;
      
      // Trouver la largeur d'un élément du carrousel si possible
      const item = ref.current.querySelector('.flex-none, .snap-start');
      const itemWidth = item ? (item as HTMLElement).offsetWidth + 20 : 300; // 20px pour le gap
      
      // Sur mobile, faire défiler un élément à la fois pour une meilleure expérience
      const amount = isMobile ? itemWidth : Math.min(ref.current.clientWidth * 0.8, 3 * itemWidth);
      
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
  return (
    <>
    {!isMobile && (
    <div className="home-wrapper">
  
      {/* Navbar */}
      <Header className="navbar"/>
  
      {/* Hero Section */}
      <section className="hero w-full flex flex-row items-center justify-between gap-12 px-16 py-12 bg-[#eefaff] relative overflow-hidden z-10 min-h-[340px]" style={{paddingTop:0}}>
        {/* Left: Title and CTA */}        <div className="hero-left flex flex-col justify-center min-w-[340px] max-w-[480px] z-10">
          <h1 className="text-[2.4rem] leading-tight font-semibold text-gray-900 mb-4" style={{lineHeight:'1.2'}}>
            Find the Right Care,<br />
            <span className="text-[#7ddbdc]">Anywhere in the World</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">Connect with top-rated cosmetic surgeons and clinics.<br />Your journey to confidence starts here.</p>
          <div className="hero-buttons flex gap-4 mt-2">
            <button className="btn-hero secondary px-8 py-3 rounded-full text-lg font-medium shadow-sm transition-colors" onClick={() => handleProtectedNavigation("/search")}>Explore</button>
          </div>
        </div>
        {/* Center: Doctor image with organic halo */}
        <div className="doctor-wrapper relative flex items-center justify-center flex-1 min-w-[320px] max-w-[420px] h-full">
          <span className="absolute w-[420px] h-[420px] bg-[radial-gradient(circle_at_center,_#92ded9_0%,_#eefaff_100%)] rounded-[62%_38%_48%_70%_/_58%_62%_35%_42%] z-0"></span>
          <img src={doctorImage} alt="Doctor" className="doctor-img relative z-10 max-w-[360px] w-full h-auto" />
        </div>
        {/* Right: How it works */}
        <div className="hero-right flex flex-col justify-center min-w-[320px] max-w-[340px] z-10">
        <h4 className="text-3xl font-medium text-gray-900 mb-6 mt-0">How BodyMine Works</h4>          <ol className="list-none pl-0 max-w-[300px] ml-8 mt-2 counter-reset-[list-counter]">
            <li className="relative pl-12 mb-4 text-lg leading-snug before:content-['1'] before:absolute before:left-0 before:top-0 before:w-10 before:h-10 before:rounded-full before:bg-[#7ddbdc] before:text-white before:flex before:items-center before:justify-center before:font-medium before:text-xl before:border before:border-[#7ddbdc] before:z-10">Search for doctors by specialty or service.</li>
            <li className="relative pl-12 mb-4 text-lg leading-snug before:content-['2'] before:absolute before:left-0 before:top-0 before:w-10 before:h-10 before:rounded-full before:bg-[#7ddbdc] before:text-white before:flex before:items-center before:justify-center before:font-medium before:text-xl before:border before:border-[#7ddbdc] before:z-10">Select based on experience, fee or rating.</li>
            <li className="relative pl-12 mb-4 text-lg leading-snug before:content-['3'] before:absolute before:left-0 before:top-0 before:w-10 before:h-10 before:rounded-full before:bg-[#7ddbdc] before:text-white before:flex before:items-center before:justify-center before:font-medium before:text-xl before:border before:border-[#7ddbdc] before:z-10">Start chat and ask questions with your Doctors.</li>
          </ol>
          <div className="flex justify-center">
            <Link to="/how-it-works" className="mt-4 px-6 py-2 rounded-full text-base font-medium shadow-sm transition-colors bg-transparent border-2 border-[#04C2C2] text-[#04C2C2] hover:bg-[#92ded9] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#04C2C2] focus:ring-offset-2">
              Read more
            </Link>
          </div>
        </div>
      </section>
  
      {/* Searchbar */}
      <section className="searchbar">

  {/* ─────────── Bloc 1 : Doctor + (Speciality & Country) ─────────── */}
  <div className="field-col">
    {/* Doctor */}
    <div className="input-group">
      <FiSearch className="icon" />
      <input
        type="text"
        placeholder="Doctor, Hospital, Dental"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>

    {/* Speciality + Country (½–½) */}
    <div className="field-row">
      <div className="select-group">
        <FaUserMd className="icon" />
        <select
          value={speciality}
          onChange={e => setSpeciality(e.target.value)}
        >
          <option value="">Speciality</option>          {specialities.map(sp => (
            <option key={sp.name} value={sp.name}>{sp.name}</option>
          ))}
        </select>
      </div>

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
    </div>
  </div>

  {/* ─────────── Bloc 2 : Location + Activity ─────────── */}
  <div className="field-col">
    {/* Location */}
    <div className="loc">
      <FiMapPin className="icon" />
      <input
        type="text"
        placeholder="Location"
        value={localisation}
        onChange={e => setLocation(e.target.value)}
      />
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
  </div>

  {/* ─────────── Bloc 3 : Sort By + Search ─────────── */}
  <div className="field-col">
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

    {/* Search button */}
    <button
      className="search-btn"
      onClick={() => handleProtectedNavigation('/search')}
    >
      Search
    </button>
  </div>  </section>

  
      {/* Carousel */}
      <section className="home carousel relative w-full">
        <button 
          className="carousel-arrow prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer text-[#007c8a] hover:bg-[#eefaff]"
          onClick={() => setSlide(prev => (prev === 0 ? carousel.length - 1 : prev - 1))}
        >
          <FiChevronLeft className="text-xl" />
        </button>
        
        <div className="home carousel-inner">
          {carousel.map((item, i) => (
            <img key={i} src={item.src} alt={item.alt} className={i === slide ? "active" : ""} />
          ))}
        </div>
        
        <button 
          className="carousel-arrow next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer text-[#007c8a] hover:bg-[#eefaff]"
          onClick={() => setSlide(prev => (prev + 1) % carousel.length)}
        >
          <FiChevronRight className="text-xl" />
        </button>
      </section>
  
      {/* Sections */}
      <section className="sections">
  {/* Specialities */}  <div className={`section section-speciality ${openedSections.includes("speciality") ? 'open' : ''}`}>
    <h2 onClick={() => handleToggleSection("speciality")} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center">
      Our Speciality <a onClick={(e) => {e.stopPropagation(); handleProtectedNavigation("/search")}} className="ml-4 text-lg md:text-2xl font-medium text-[#04C2C2] hover:underline cursor-pointer">See All</a>
    </h2>
    <div className="section-content">      {openedSections.includes("speciality") && (
        <ScrollCarousel id="speciality-carousel" showArrows={true}>
          {specialities.map((spec, index) => (
            <div key={index} className="scroll-carousel-item min-w-[120px] bg-white rounded-xl shadow-md p-4 text-center flex flex-col items-center justify-center">
              <div className="text-[2.5rem] text-[#19c7c7] mb-2">{spec.icon}</div>
              <div className="font-bold text-base text-[#222]">{spec.name}</div>
            </div>
          ))}
        </ScrollCarousel>
      )}
    </div>
  </div>
  {/* Doctors */}  <div className={`section section-doctors ${openedSections.includes("doctors") ? 'open' : ''}`}>
  <h2 onClick={() => handleToggleSection("doctors")} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center">
      Top <span className="ml-2">Doctors</span> <a onClick={(e) => {e.stopPropagation(); handleProtectedNavigation("/search")}} className="ml-4 text-xl md:text-3xl font-medium text-[#04C2C2] hover:underline cursor-pointer">See All</a>
  </h2>
  <div className="section-content">
      {openedSections.includes("doctors") && (        <ScrollCarousel id="doctors-carousel" containerRef={doctorsRef} showArrows={true} className="doctors-carousel-wrapper" autoRotate={true} autoRotateInterval={3000}>
          {doctors.map((doc) => (
            <article className="scroll-carousel-item w-[240px] bg-white rounded-xl shadow-md overflow-hidden relative" key={doc.professional_id}>
              <Link to={`/doctor/${doc.professional_id}`} className="block">
                <img className="w-full h-[210px] object-cover object-center" src={doc.photo_url || "https://i.imgur.com/1X3K1vF.png"} alt={doc.full_name} />
                <div className="p-[0.3rem_0.5rem_0.3rem]">
                  <div className="flex justify-end mb-1">
                    <button className="border-none bg-transparent flex items-center justify-center text-red-500 text-[1.2rem] cursor-pointer">
                      {doc.isFavorited ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                  <h4 className="font-bold text-base m-0 leading-tight">Dr. {doc.full_name}</h4>
                  <p className="text-[0.8rem] text-[#666] m-0 leading-tight">{doc.specialization}</p>
                  <h1 className="text-[0.75rem] text-[#666] m-0 leading-tight">{doc.country}</h1>
                  <div className="flex items-center gap-0 mt-[0.1rem] mb-0">
                    <span className="text-[0.8rem] text-black">⭐ {4.8}</span>
                  </div>
                  <span className="text-[0.75rem] text-[#666] m-0 block leading-tight">
                    {doc.practice_tenure ?? "N/A"} years
                  </span>
                  <button 
                    type="button" 
                    className="flex items-center mx-auto mt-[0.15rem] mb-[0.1rem] justify-center gap-[0.2rem] w-[70%] py-[0.35rem] rounded-md bg-[#00b6c8] hover:bg-[#0092a3] text-white text-[0.75rem] font-semibold border-none cursor-pointer transition-colors"
                    onClick={() => handleStartChat(doc.professional_id)}
                  >
                    💬 Chat
                  </button>
                </div>
              </Link>
            </article>
          ))}
        </ScrollCarousel>
      )}
    </div>
  </div>{/* Clinics */}  <div className={`section section-clinics ${openedSections.includes("clinics") ? 'open' : ''}`}>
    <h2 onClick={() => handleToggleSection("clinics")} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center">
      Top <span className="ml-2">Clinics</span> <a onClick={(e) => {e.stopPropagation(); handleProtectedNavigation("/search")}} className="ml-4 text-xl md:text-3xl font-medium text-[#04C2C2] hover:underline cursor-pointer">See All</a>
    </h2>
    <div className="section-content">
      {openedSections.includes("clinics") && (
        <ScrollCarousel id="clinics-carousel" containerRef={clinicsRef} showArrows={true} className="clinics-carousel-wrapper">
          {clinics.map((clinic) => (
            <article className="scroll-carousel-item w-[240px] bg-white rounded-xl shadow-md overflow-hidden relative" key={clinic.professional_id}>
              <Link to={`/doctor/${clinic.professional_id}`} className="block">
                <img className="w-full h-[210px] object-cover object-center" src={clinic.photo_url || "https://i.imgur.com/1X3K1vF.png"} alt={clinic.full_name} />
                <div className="p-[0.3rem_0.5rem_0.3rem]">
                  <div className="flex justify-end mb-1">
                    <button className="border-none bg-transparent flex items-center justify-center text-red-500 text-[1.2rem] cursor-pointer">
                      {clinic.isFavorited ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                  <h4 className="font-bold text-base m-0 leading-tight">{clinic.full_name}</h4>
                  <p className="text-[0.8rem] text-[#666] m-0 leading-tight">{clinic.specialization}</p>
                  <h1 className="text-[0.75rem] text-[#666] m-0 leading-tight">{clinic.country}</h1>
                  <div className="flex items-center gap-0 mt-[0.1rem] mb-0">
                    <span className="text-[0.8rem] text-black">⭐ {4.8}</span>
                  </div>
                  <span className="text-[0.75rem] text-[#666] m-0 block leading-tight">
                    {clinic.practice_tenure ?? "N/A"} years
                  </span>
                  <button 
                    type="button" 
                    className="flex items-center mx-auto mt-[0.15rem] mb-[0.1rem] justify-center gap-[0.2rem] w-[70%] py-[0.35rem] rounded-md bg-[#00b6c8] hover:bg-[#0092a3] text-white text-[0.75rem] font-semibold border-none cursor-pointer transition-colors"
                    onClick={() => handleStartChat(clinic.professional_id)}
                  >
                    💬 Chat
                  </button>
                </div>
              </Link>
            </article>
          ))}
        </ScrollCarousel>
      )}
    </div>
  </div>{/* Articles */}  <div className={`section section-articles ${openedSections.includes("articles") ? 'open' : ''}`}>
    <h2 onClick={() => handleToggleSection("articles")} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center">
      Health Article <a onClick={(e) => {e.stopPropagation()}} href="#" className="ml-4 text-lg md:text-2xl font-medium text-[#04C2C2] hover:underline cursor-pointer">See All</a>
    </h2>
    <div className="section-content">
      {openedSections.includes("articles") && (
        <ScrollCarousel id="articles-carousel" containerRef={articlesRef} showArrows={true} className="articles-carousel-wrapper">
          {articles.map((article) => (
            <article className="scroll-carousel-item w-[240px] bg-white rounded-xl shadow-md overflow-hidden relative" key={article.id}>
              <a href="#" className="block">
                <img
                  className="w-full h-[300px] object-cover object-center"
                  src={article.image}
                  alt={article.title}
                />
              </a>
            </article>
          ))}
        </ScrollCarousel>
      )}
    </div>
  </div>

</section>
  
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
</section>      <div className="hero-right">
          
          <h4 className="font-medium">How BodyMine Works</h4>
          <ol>
            <li>Search for doctors by specialty or service.</li>
            <li>Select based on experience, fee or rating.</li>
            <li>Start chat and ask questions with your Doctors.</li>
          </ol>          <Link to="/how-it-works" className="inline-block mt-4 px-8 py-3 border-2 border-[#04C2C2] text-[#04C2C2] rounded-full font-medium text-base shadow-sm transition hover:bg-[#92ded9] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#04C2C2] focus:ring-offset-2">
            Read more
          </Link>
      </div>
  
      {/* Searchbar *      {/* Carousel */}
      <section className="home carousel relative w-full">
        <button 
          className="carousel-arrow prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer text-[#007c8a] hover:bg-[#eefaff]"
          onClick={() => setSlide(prev => (prev === 0 ? carousel.length - 1 : prev - 1))}
        >
          <FiChevronLeft className="text-xl" />
        </button>
        
        <div className="home carousel-inner">
          {carousel.map((item, i) => (
            <img key={i} src={item.src} alt={item.alt} className={i === slide ? "active" : ""} />
          ))}
        </div>
        
        <button 
          className="carousel-arrow next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer text-[#007c8a] hover:bg-[#eefaff]"
          onClick={() => setSlide(prev => (prev + 1) % carousel.length)}
        >
          <FiChevronRight className="text-xl" />
        </button>
      </section>
  
      {/* Sections */}
      <section className="sections pb-24">        {/* Specialities */}        <div className={`section section-speciality ${openedSections.includes("speciality") ? 'open' : ''}`}>
          <h2 onClick={() => handleToggleSection("speciality")} className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center">
            Our Speciality <a onClick={(e) => {e.stopPropagation(); handleProtectedNavigation("/search")}} className="ml-4 text-base md:text-xl font-medium text-[#04C2C2] hover:underline cursor-pointer">See All</a>
          </h2>      {openedSections.includes("speciality") && (
            <ScrollCarousel id="speciality-carousel" containerRef={specialityRef} showArrows={true} className="speciality-carousel-wrapper">
              {specialities.map((spec, index) => (
                <div key={index} className="scroll-carousel-item min-w-[110px] bg-white rounded-xl shadow-md p-3 text-center flex flex-col items-center justify-center">
                  <div className="text-[2rem] text-[#19c7c7] mb-2">{spec.icon}</div>
                  <div className="font-bold text-sm text-[#222]">{spec.name}</div>
                </div>
              ))}
            </ScrollCarousel>)
          }
        </div>        {/* Doctors */}        <div className={`section section-doctors ${openedSections.includes("doctors") ? 'open' : ''}`}>
  <h2 onClick={() => handleToggleSection("doctors")} className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center">
    Top <span className="ml-2">Doctors</span>
    <a onClick={(e) => {e.stopPropagation(); handleProtectedNavigation("/search")}} className="ml-4 text-base md:text-xl font-medium text-[#04C2C2] hover:underline cursor-pointer">See All</a>
  </h2>
  {openedSections.includes("doctors") && (    <ScrollCarousel id="mobile-doctors-carousel" containerRef={doctorsRef} showArrows={true} className="doctors-carousel-wrapper" autoRotate={true} autoRotateInterval={3000}>
      {doctors.map((doc) => (
        <article className="scroll-carousel-item w-[240px] bg-white rounded-xl shadow-md overflow-hidden relative" key={doc.professional_id}>
          <Link to={`/doctor/${doc.professional_id}`} className="block">
            {/* Photo */}
            <img
              className="w-full h-[210px] object-cover object-center"
              src={doc.photo_url || "https://i.imgur.com/1X3K1vF.png"}
              alt={doc.full_name}
            />

            {/* Infos principales */}
            <div className="p-[0.3rem_0.5rem_0.3rem]">
              {/* Icône favori déplacée sous l'image */}
              <div className="flex justify-end mb-1">
                <button className="border-none bg-transparent flex items-center justify-center text-red-500 text-[1.2rem] cursor-pointer">
                  {doc.isFavorited ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
              <h4 className="font-bold text-base m-0 leading-tight">Dr. {doc.full_name}</h4>
              <p className="text-[0.8rem] text-[#666] m-0 leading-tight">{doc.specialization}</p>
              <h1 className="text-[0.75rem] text-[#666] m-0 leading-tight">{doc.country}</h1>

              {/* Note + ancienneté */}
              <div className="flex items-center gap-0 mt-[0.1rem] mb-0">
                <span className="text-[0.8rem] text-black">
                  ⭐ { 4.8}
                </span>
              </div>
              <span className="text-[0.75rem] text-[#666] m-0 block leading-tight">
                {doc.practice_tenure ?? "N/A"} years
              </span>
              {/* Bouton Chat */}
              <button
                type="button" 
                className="flex items-center mx-auto mt-[0.15rem] mb-[0.1rem] justify-center gap-[0.2rem] w-[70%] py-[0.35rem] rounded-md bg-[#00b6c8] hover:bg-[#0092a3] text-white text-[0.75rem] font-semibold border-none cursor-pointer transition-colors"
                onClick={() => handleStartChat(doc.professional_id)}
              >
                💬 Chat
              </button>
            </div>
          </Link>
        </article>
      ))}
    </ScrollCarousel>
  )}
</div>        {/* Clinics */}        <div className={`section section-clinics ${openedSections.includes("clinics") ? 'open' : ''}`}>
          <h2 onClick={() => handleToggleSection("clinics")} className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center">
            Top <span className="ml-2">Clinics</span><a onClick={(e) => {e.stopPropagation(); handleProtectedNavigation("/search")}} className="ml-4 text-base md:text-xl font-medium text-[#04C2C2] hover:underline cursor-pointer">See All</a>
          </h2>          {openedSections.includes("clinics") && (
    <ScrollCarousel id="mobile-clinics-carousel" containerRef={clinicsRef} showArrows={true} className="clinics-carousel-wrapper">
      {clinics.map((clinic) => (
        <article className="scroll-carousel-item w-[240px] bg-white rounded-xl shadow-md overflow-hidden relative" key={clinic.professional_id}>
          <Link to={`/doctor/${clinic.professional_id}`} className="block">
            <img
              className="w-full h-[210px] object-cover object-center"
              src={clinic.photo_url || "https://i.imgur.com/1X3K1vF.png"}
              alt={clinic.full_name}
            />

            <div className="p-[0.3rem_0.5rem_0.3rem]">
              <div className="flex justify-end mb-1">
                <button className="border-none bg-transparent flex items-center justify-center text-red-500 text-[1.2rem] cursor-pointer">
                  {clinic.isFavorited ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
              <h4 className="font-bold text-base m-0 leading-tight">{clinic.full_name}</h4>
              <p className="text-[0.8rem] text-[#666] m-0 leading-tight">{clinic.specialization}</p>
              <h1 className="text-[0.75rem] text-[#666] m-0 leading-tight">{clinic.country}</h1>
              <div className="flex items-center gap-0 mt-[0.1rem] mb-0">
                <span className="text-[0.8rem] text-black">⭐ {4.8}</span>
              </div>
              <span className="text-[0.75rem] text-[#666] m-0 block leading-tight">
                {clinic.practice_tenure ?? "N/A"} years
              </span>
              <button 
                type="button" 
                className="flex items-center mx-auto mt-[0.15rem] mb-[0.1rem] justify-center gap-[0.2rem] w-[70%] py-[0.35rem] rounded-md bg-[#00b6c8] hover:bg-[#0092a3] text-white text-[0.75rem] font-semibold border-none cursor-pointer transition-colors"
                onClick={() => handleStartChat(clinic.professional_id)}
              >
                💬 Chat
              </button>
            </div>
          </Link>
        </article>
      ))}
    </ScrollCarousel>
  )}
        </div>        {/* Articles */}        <div className={`section section-articles ${openedSections.includes("articles") ? 'open' : ''}`}>
          <h2 onClick={() => handleToggleSection("articles")} className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center">
            Health Article <a onClick={(e) => {e.stopPropagation()}} href="#" className="ml-4 text-base md:text-xl font-medium text-[#04C2C2] hover:underline cursor-pointer">See All</a>
          </h2>
          {openedSections.includes("articles") && (
            <ScrollCarousel id="mobile-articles-carousel" containerRef={articlesRef} showArrows={true} className="articles-carousel-wrapper">
              {articles.map((article) => (
                <article className="scroll-carousel-item w-[240px] bg-white rounded-xl shadow-md overflow-hidden relative" key={article.id}>
                  <a href="#" className="block">
                    <img
                      className="w-full h-[160px] object-cover object-center"
                      src={article.image}
                      alt={article.title}
                    />
                  </a>
                </article>
              ))}
            </ScrollCarousel>
          )}
        </div>      </section>
  
      
    </div>      )}
        {/* Footer with responsive Tailwind styling */}
      <Footer className="responsive-footer" />
      {/* Ajout d'un conteneur blanc derrière la barre de navigation mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-white" style={{zIndex: 999}}></div>
      )}
      {isMobile && <BottomNav />}
       </>
  );
  
}
