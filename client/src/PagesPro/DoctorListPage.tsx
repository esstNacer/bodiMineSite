// src/PagesPro/DoctorListPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import TopbarPro from '../components/TopbarPro';
import SidebarPro from '../components/SidebarPro';
import FooterPro from '../components/FooterPro';
import '../assets/ProfessionalDashboard.css';

// Import images for banner
import strip1 from '../images/strip1.png';
import strip2 from '../images/strip2.png';
import strip3 from '../images/strip3.png';

interface Doctor {
  professional_id: number;
  full_name: string;
  specialization: string;
  city: string;
  country: string;
  practice_tenure: number;
  photo_url?: string;
  is_certified: boolean;
}

interface Clinic {
  name: string;
  address: string;
  created_date: string;
  image_url: string;
}

// Mock data for clinic
const mockClinic: Clinic = {
  name: "BodiMine Medical Center",
  address: "123 Health Avenue, 75001 Paris, France",
  created_date: "January 15, 2020",
  image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop"
};

// Mock data for doctors
const mockDoctors: Doctor[] = [
  {
    professional_id: 1,
    full_name: "Sarah Martin",
    specialization: "Cardiology",
    city: "Paris",
    country: "France",
    practice_tenure: 12,
    photo_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    is_certified: true
  },
  {
    professional_id: 2,
    full_name: "Michel Dubois",
    specialization: "Neurology",
    city: "Lyon",
    country: "France",
    practice_tenure: 8,
    photo_url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    is_certified: true
  },
  {
    professional_id: 3,
    full_name: "Emma Rodriguez",
    specialization: "Dermatology",
    city: "Marseille",
    country: "France",
    practice_tenure: 15,
    photo_url: "https://images.unsplash.com/photo-1594824804732-ca8d832ff5b1?w=150&h=150&fit=crop&crop=face",
    is_certified: true
  },
  {
    professional_id: 4,
    full_name: "Thomas Chen",
    specialization: "Pediatrics",
    city: "Nice",
    country: "France",
    practice_tenure: 6,
    photo_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    is_certified: true
  },
  {
    professional_id: 5,
    full_name: "Julia Fernandez",
    specialization: "Gynecology",
    city: "Toulouse",
    country: "France",
    practice_tenure: 10,
    photo_url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&crop=face",
    is_certified: true
  }
];

export default function DoctorListPage() {  // Use mock data without filtering
  const filteredDoctors = mockDoctors;

  return (
    <div className="pro">
      <div className="pro-dash">        {/* Professional header */}
        <TopbarPro />
        <br />        {/* Horizontal banner - identical to other professional pages */}
        <section className="partner-strip">
          <img src={strip1} alt="Partner 1" />
          <img src={strip2} alt="Partner 2" />
          <img src={strip3} alt="Partner 3" />
        </section>
      </div>      {/* Layout with sidebar - like ProfessionalDashboard */}
      <main className="flex w-full">
        {/* Sidebar - Stuck to the left */}
        <SidebarPro active="DoctorList" />        <div className="flex-1 flex flex-col gap-6 p-6">
          {/* Main content */}
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>            
            {/* Clinic Section */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '3rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '2rem'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <h1 style={{ 
                    fontSize: '2rem', 
                    color: '#333', 
                    margin: '0',
                    fontWeight: 'bold'
                  }}>
                    {mockClinic.name}
                  </h1>                  <span style={{
                    background: '#007bff',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    clinic
                  </span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  color: '#666'
                }}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                  <span>{mockClinic.address}</span>
                </div>
                  <p style={{ 
                  color: '#666',
                  fontSize: '1rem',
                  margin: '0'
                }}>
                  Created on {mockClinic.created_date}
                </p>
              </div>
              
              <div style={{ flexShrink: 0 }}>
                <img
                  src={mockClinic.image_url}
                  alt={mockClinic.name}
                  style={{
                    width: '300px',
                    height: '200px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    border: '2px solid #04C2C2'
                  }}
                />
              </div>
            </div>            {/* Doctor list header */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                color: '#333', 
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}>
                🩺 Doctors ({filteredDoctors.length})
              </h2>
            </div>            {/* Statistics */}
            <div style={{ 
              marginBottom: '2rem',
              color: '#666'
            }}>
              <p>{filteredDoctors.length} doctor(s) found</p>
            </div>

            {/* Doctor list in horizontal format */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div key={doctor.professional_id} style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    position: 'relative',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                  >                    {/* Blue pencil icon in top right */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#007bff',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}>
                      <svg width="12" height="12" fill="white" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708L9.708 9H9a.5.5 0 0 1-.5-.5V8.292l5.146-5.146z"/>
                        <path d="M3 10v3a1 1 0 0 0 1 1h3l8-8-4-4-8 8z"/>
                        <path d="M9.708 9L9 9.708v-.708h.708z"/>
                      </svg>
                    </div>                    
                    {/* Doctor photo on the left */}
                    <img
                      src={doctor.photo_url || 'https://i.imgur.com/1X3K1vF.png'}
                      alt={doctor.full_name}
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid #04C2C2',
                        flexShrink: 0
                      }}
                    />                    
                    {/* Doctor information */}
                    <div style={{ flex: 1 }}>
                      {/* Name with certified badge */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        <h3 style={{ 
                          margin: '0', 
                          color: '#333',
                          fontSize: '1.4rem',
                          fontWeight: 'bold'
                        }}>
                          Dr. {doctor.full_name}
                        </h3>
                        {doctor.is_certified && (
                          <span style={{
                            background: '#007bff',
                            color: 'white',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '15px',
                            fontSize: '0.7rem',
                            fontWeight: 'bold'
                          }}>
                            CERTIFIED
                          </span>
                        )}
                      </div>                        {/* Specialization */}
                      <p style={{ 
                        margin: '0 0 0.5rem', 
                        color: '#333',
                        fontWeight: '600',
                        fontSize: '1.1rem'
                      }}>
                        {doctor.specialization}
                      </p>
                        {/* Experience */}
                      <p style={{ 
                        margin: '0', 
                        color: '#666',
                        fontSize: '1rem'
                      }}>
                        ⭐ {doctor.practice_tenure} years of experience
                      </p></div>
                  </div>
                ))
              ) : (                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: '#666',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <h3>No doctors found</h3>
                  <p>Try modifying your search criteria.</p>
                </div>
              )}
            </div>            {/* Back to dashboard button */}
            <div style={{ textAlign: 'center' }}>
              <Link
                to="/pro/dashboard"
                style={{
                  background: '#6c757d',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>        </div>
      </main>      {/* Professional footer */}
      <FooterPro />
    </div>
  );
}
