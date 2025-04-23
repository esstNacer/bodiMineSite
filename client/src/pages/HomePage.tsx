// src/pages/HomePage.tsx
import React, { useContext, useState } from "react";
import "../assets/Home.css";
import { Link } from "react-router-dom";
import { FiSearch, FiMapPin, FiSliders } from "react-icons/fi";
import { UserContext } from "../components/UserContext";

import doctorImage from "../images/doctor.png";
import clinic1 from "../images/clinic1.png";
import clinic2 from "../images/clinic2.png";
import clinic3 from "../images/clinic3.png";
import bodyMine from "../images/logobodymine.png";

export default function HomePage() {
  const { user } = useContext(UserContext) || { user: null };
  console.log(user?.first_name);
  const [slide, setSlide] = useState(0);

  const carousel = [
    { src: clinic1, alt: "New Clinic Dental Care" },
    { src: clinic2, alt: "Cosmetic Surgery" },
    { src: clinic3, alt: "New Cosmetic Surgery Website" },
  ];

  return (
    <div className="homepage">
      <header className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <img src={bodyMine} alt="BodyMine Cosmetic Surgery" />
          </div>
          <nav>
            <a href="/home" className="active">Home</a>
            <a href="/chat">Chat</a>
            <a href="/search">Search</a>
          </nav>
        </div>
        <div className="navbar-right">
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

      <section className="hero">
        <div className="hero-left">
          <h1>
            Find the Right Care,<br />
            <span>Anywhere in the World</span>
          </h1>
          <p>
            Connect with top-rated cosmetic surgeons and clinics.<br />
            Your journey to confidence starts here.
          </p>
          <div className="hero-buttons">
            <button className="btn primary">Explore Clinics</button>
            <a href="/search"><button className="btn secondary">Find a Doctor</button></a>
          </div>
        </div>

        <div className="hero-right">
          <img src={doctorImage} alt="Doctor" className="doctor-img" />
          <div className="how-it-works">
            <h4>How BodyMine Works</h4>
            <ol>
              <li>Search for doctors by specialty or service.</li>
              <li>Select based on experience, fee or rating.</li>
              <li>Start chat and ask questions with your Doctors.</li>
            </ol>
            <Link to="/how-it-works" className="btn primary read-more">Read more</Link>
          </div>
        </div>
      </section>

      <section className="searchbar">
        <div className="search-row">
          <div className="input-group">
            <FiSearch className="icon" />
            <input type="text" placeholder="Doctor, Hospital, Dental" />
          </div>
          <div className="input-group">
            <FiMapPin className="icon" />
            <input type="text" placeholder="Location" />
          </div>
          <button className="search-btn">Search</button>
          <button className="filter-btn"><FiSliders /></button>
        </div>

        <div className="filter-row">
          <select><option>Speciality</option></select>
          <select><option>Country</option></select>
          <select><option>Activity</option></select>
          <select><option>Sort By: Relevance</option></select>
        </div>
      </section>

      <section className="carousel">
        <div className="carousel-inner">
          {carousel.map((item, i) => (
            <img
              key={i}
              src={item.src}
              alt={item.alt}
              className={i === slide ? "active" : ""}
            />
          ))}
        </div>
        <div className="carousel-indicators">
          {carousel.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={i === slide ? "active" : ""}
            />
          ))}
        </div>
      </section>

      <section className="sections">
        <div className="section section-speciality">
          <h2>Our Speciality <a href="#">See All</a></h2>
        </div>
        <div className="section section-doctors">
          <h2>Top <span>Doctors</span></h2>
        </div>
        <div className="section section-clinics">
          <h2>Top <span>Clinics</span></h2>
        </div>
        <div className="section section-articles">
          <h2>Health Article <a href="#">See All</a></h2>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-block">
            <img src={bodyMine} alt="BodyMine" className="footer-logo" />
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
  );
}
