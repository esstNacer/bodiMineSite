// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import EditProfilePage from './pages/EditProfilePage';
import SignUpPage from './pages/SignUpPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SupportPage from './pages/SupportPage';
import FaqPage from './pages/faqPage';
import DataPrivacyPage from './pages/DataPrivacyPage';
import CGUPage from './pages/CGUPage';
import SearchPage from './pages/SearchPage';
import ChatPage from './pages/ChatPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import MyBodyProjectPage from './pages/MyBodyProjectPage';

import ProfessionalLoginPage from './PagesPro/ProfessionalLoginPage';
import ProfessionalDashboard from './PagesPro/ProfessionalDashboard';
import ProfessionalSignup from './PagesPro/ProfessionalSignup';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/loginPro" element={<ProfessionalLoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/professional/sign-up" element={<ProfessionalSignup/>} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/pro/dashboard" element={<ProfessionalDashboard />} />
      <Route path="/editProfile" element={<EditProfilePage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/dataPrivacy" element={<DataPrivacyPage />} />
      <Route path="/CGU" element={<CGUPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/doctor/:id" element={<DoctorProfilePage />} />
      <Route path="/myBodyProject" element={<MyBodyProjectPage />} />

    </Routes>
  );
}
