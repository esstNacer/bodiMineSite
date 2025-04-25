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
import ProfessionalSupport from './PagesPro/ProfessionalSupport';
import ProfessionalFaq from './PagesPro/ProfessionalFaq';
import Editprofile from './PagesPro/EditProfile/Editprofile';

import AddBlogPage from './Admin/AddBlogPage';
import BannerPage from './Admin/BannerPage';

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
      <Route path="/pro/support" element={<ProfessionalSupport />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/pro/faq" element={<ProfessionalFaq />} />
      <Route path="/dataPrivacy" element={<DataPrivacyPage />} />
      <Route path="/CGU" element={<CGUPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/doctor/:id" element={<DoctorProfilePage />} />
      <Route path="/myBodyProject" element={<MyBodyProjectPage />} />
      <Route path="/pro/editProfile" element={<Editprofile />} />

      <Route path="/admin/blog" element={<AddBlogPage />} />
<Route path="/admin/banner/patient" element={<BannerPage variant="patient" />} />
<Route path="/admin/banner/pro"     element={<BannerPage variant="pro" />} />





    </Routes>
  );
}
