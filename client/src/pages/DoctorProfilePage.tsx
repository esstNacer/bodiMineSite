import React from 'react';
import '../assets/DoctorProfilePage.css';
import { FiMessageCircle, FiMapPin, FiPhoneCall } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';

export default function DoctorProfilePage() {
  return (
    <div className="doctor-profile-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">BODYMINE</div>
        <nav>
          <a href="/home">Home</a>
          <a href="/chat">Chat</a>
          <a href="/search">Search</a>
        </nav>
        <div className="profile-nav">Parth Ramani ▾</div>
      </header>

      <main className="profile-main">
        <section className="doctor-header">
          <img src="https://i.pravatar.cc/150?img=50" alt="Dr. Wilson" className="doctor-photo" />
          <div className="doctor-info">
            <div className="doctor-top">
              <h2>Dr. Daniel Wilson</h2>
              <BsCheckCircleFill className="verified-icon" />
            </div>
            <p className="speciality">Plastic Surgeon</p>
            <p className="location"><FiMapPin /> 100 rue de Paris, France</p>
            <p className="rating"><AiFillStar /> 4.8 (139 reviews)</p>
            <button className="message-btn"><FiMessageCircle /> Message</button>
          </div>
        </section>

        <section className="about-section">
          <h3>About</h3>
          <p>
            Dr. Wilson is a highly esteemed plastic surgeon with expertise in facial and body aesthetics.
            He offers personalized, modern procedures for optimal results.
          </p>
        </section>

        <section className="services-section">
          <h3>Services</h3>
          <div className="services-gallery">
            <span>Rhinoplasty</span>
            <span>Liposuction</span>
            <span>Facial Augmentation</span>
            <span>Smile Teeth</span>
            <span className="gallery-btn">📷 OPEN GALLERY</span>
          </div>
        </section>

        <section className="reviews-section">
          <h3>Patient Reviews <AiFillStar /> 4.8 (139 reviews)</h3>
          <div className="review">
            <img src="https://i.pravatar.cc/40?img=11" alt="reviewer" />
            <div>
              <p><strong>Darrel Steward</strong></p>
              <p>Excellent experience. Very professional and caring. The results exceeded my expectations.</p>
              <span className="review-time">2 days ago</span>
            </div>
          </div>
          <div className="review">
            <img src="https://i.pravatar.cc/40?img=14" alt="reviewer" />
            <div>
              <p><strong>Michael Brown</strong></p>
              <p>Great surgeon. The staff was helpful too.</p>
              <span className="review-time">1 week ago</span>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h3>Information</h3>
          <p><strong>Address:</strong> 100 rue de Paris, 75001, France</p>
          <p><strong>Working Hours:</strong> Mon - Fri: 9 AM – 5 PM</p>
          <p><strong>Contact:</strong> +33 01 24 23 23 23</p>
        </section>

        <section className="recommended-section">
          <h3>Recommended</h3>
          <div className="recommended-card">
            <img src="https://i.pravatar.cc/100?img=30" alt="Dr. Natalie Gomez" />
            <p><strong>Dr. Natalie Gomez</strong></p>
            <p>Plastic Surgeon</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Bodymine is the leading directory to help you find the perfect surgeon or clinic, anywhere in the world.</p>
      </footer>
    </div>
  );
}
