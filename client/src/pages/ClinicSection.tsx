import React, { useEffect } from 'react';

// This function adds default test clinics to the HomePage
export const addDefaultTestClinics = (clinics: any[], setClinics: React.Dispatch<React.SetStateAction<any[]>>) => {
  // Only add default clinics if none exist
  if (clinics.length === 0) {    const defaultClinics = [
      {
        professional_id: 9001,
        full_name: "BeauClinic Paris",
        clinic_name: "BeauClinic Paris",
        city: "Paris",
        country: "France",
        specialization: "Facial & Aesthetic Surgery",
        practice_tenure: 15,
        photo_url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=500&auto=format&fit=crop",
        isFavorited: false
      },
      {
        professional_id: 9002,
        full_name: "DentalSpa Madrid",
        clinic_name: "DentalSpa Madrid",
        city: "Madrid",
        country: "Spain",
        specialization: "Dental Care & Cosmetic Dentistry",
        practice_tenure: 8,
        photo_url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f9b?q=80&w=500&auto=format&fit=crop",
        isFavorited: false
      },
      {
        professional_id: 9003,
        full_name: "GlamourCare Milano",
        clinic_name: "GlamourCare Milano",
        city: "Milan",
        country: "Italy",
        specialization: "Facial & Body Aesthetic",
        practice_tenure: 12,
        photo_url: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=500&auto=format&fit=crop",
        isFavorited: false
      },
      {
        professional_id: 9004,
        full_name: "HairRestore Berlin",
        clinic_name: "HairRestore Berlin",
        city: "Berlin",
        country: "Germany",
        specialization: "Hair Surgery & Transplants",
        practice_tenure: 6,
        photo_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500&auto=format&fit=crop",
        isFavorited: false
      },
      {
        professional_id: 9005,
        full_name: "SkinRevive London",
        clinic_name: "SkinRevive London",
        city: "London",
        country: "United Kingdom",
        specialization: "Dermatology & Facial Surgery",
        practice_tenure: 10,
        photo_url: "https://images.unsplash.com/photo-1571941096025-98206c9b72d3?q=80&w=500&auto=format&fit=crop",
        isFavorited: false
      },
      {
        professional_id: 9006,
        full_name: "Beauty Center Vienna",
        clinic_name: "Beauty Center Vienna",
        city: "Vienna",
        country: "Austria",
        specialization: "Cosmetic & Plastic Surgery",
        practice_tenure: 14,
        photo_url: "https://images.unsplash.com/photo-1578307363969-1c529ab77ebc?q=80&w=500&auto=format&fit=crop",
        isFavorited: false
      },
      {
        professional_id: 9007,
        full_name: "AesthetiCare Barcelona",
        clinic_name: "AesthetiCare Barcelona",
        city: "Barcelona",
        country: "Spain",
        specialization: "Body Contouring & Liposuction",
        practice_tenure: 9,
        photo_url: "https://images.unsplash.com/photo-1578342976795-062a1b744f37?q=80&w=500&auto=format&fit=crop",
        isFavorited: false
      },
      {
        professional_id: 9008,
        full_name: "SwissBeauty Zürich",
        clinic_name: "SwissBeauty Zürich",
        city: "Zürich",
        country: "Switzerland",
        specialization: "Anti-aging & Skin Rejuvenation",
        practice_tenure: 11,
        photo_url: "https://images.unsplash.com/photo-1629865749523-fed71a51d6c9?q=80&w=500&auto=format&fit=crop",
        isFavorited: false
      },
      {
        professional_id: 9009,
        full_name: "Nordic Aesthetics Oslo",
        clinic_name: "Nordic Aesthetics Oslo",
        city: "Oslo",
        country: "Norway",
        specialization: "Cosmetic & Reconstructive Surgery",
        practice_tenure: 7,
        photo_url: "https://images.unsplash.com/photo-1571923748946-82a9b94b31dd?q=80&w=500&auto=format&fit=crop",
        isFavorited: false
      },
      {
        professional_id: 9010,
        full_name: "Athens Medical Spa",
        clinic_name: "Athens Medical Spa",
        city: "Athens",
        country: "Greece",
        specialization: "Skin Treatments & Facial Restructuring",
        practice_tenure: 16,
        photo_url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=500&auto=format&fit=crop",
        isFavorited: false
      }
    ];
    
    setClinics(defaultClinics);
    return true;
  }
  return false;
};
