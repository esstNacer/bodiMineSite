// src/pages/PurchaseServicesPage.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TopbarPro  from '../components/TopbarPro'
import SidebarPro from '../components/SidebarPro'
import FooterPro  from '../components/FooterPro'

// Import du CSS pour le style du carrousel aligné
import '../assets/ProfessionalDashboard.css'

// Carousel images
import strip1 from '../images/strip1.png'
import strip2 from '../images/strip2.png'
import strip3 from '../images/strip3.png'

// Service detail images
import bannerDetail   from '../images/promo-banner-detail.png'
import topListDetail  from '../images/promo-toplist-detail.png'
import matchingDetail from '../images/promo-matching-detail.png'

// Icons
import { FiInfo, FiImage, FiList, FiUsers, FiCheckCircle } from 'react-icons/fi'
import { FaGoogle, FaPaypal, FaApple, FaAmazon, FaMoneyBillWave } from 'react-icons/fa'

// Types
type ServiceID = 'banner' | 'toplist' | 'matching'

interface Service {
  id: ServiceID
  title: string
  price: number       // montant en euros
  summary: string
  Icon: React.FC<any>
  detailImg: string
  detailText: string
}

// Données des services
const services: Service[] = [
  {
    id: 'banner',
    title: 'Banner',
    price: 500,
    summary: 'Premium banner placement at the top of the site for maximum visibility.',
    Icon: FiImage,
    detailImg: bannerDetail,
    detailText: `**Scrolling Banner – Boost Your Visibility!**

Showcase your clinic on Bodymine with our dynamic scrolling banner! 
This service allows you to display an image of your clinic, making it visible to all site visitors in an attractive and engaging way. By subscribing to this option, you gain maximum exposure to potential patients, increasing your chances of attracting new clients. It’s a great way to promote your services and stand out in the aesthetic surgery professional directory.

Don’t wait, sign up now!`
  },
  {
    id: 'toplist',
    title: 'Top List',
    price: 100,
    summary: 'Featured placement in top listing.',
    Icon: FiList,
    detailImg: topListDetail,
    detailText: `**Top List – Get Featured at the Top!**

Place your clinic at the forefront of potential patients' searches with our Top List feature! By subscribing to this service, your clinic will be prominently displayed at the top of search results, ensuring maximum visibility. This premium positioning increases your chances of being noticed by patients actively seeking your services, making it an ideal way to stand out among other professionals in the aesthetic surgery directory. Don't miss out—

Boost your clinic’s visibility today!`
  },
  {
    id: 'matching',
    title: 'Matching Service',
    price: 50,
    summary: 'Receive all new notifications of patient searches.',
    Icon: FiUsers,
    detailImg: matchingDetail,
    detailText: `**Match Service**

Receive Patients Ready to Choose Your Clinic!

Don’t miss the opportunity to connect instantly with new patients actively seeking your services!

With the Match Service, whenever a patient creates an aesthetic surgery project on MyBodyProject, you’ll receive notifications with details of their expectations.

This targeted matchmaking allows you to reach motivated patients who are ready to move forward with their project. Maximize your conversion chances and fill your schedule with prospects genuinely interested in your services.

Join the Match Service today and turn your opportunities into success!`
  }
]

// Options de paiement
const paymentOptions = [
  { id: 'google', label: 'Google Pay', Icon: FaGoogle },
  { id: 'paypal', label: 'Paypal',     Icon: FaPaypal },
  { id: 'apple',  label: 'Apple Pay',  Icon: FaApple },
  { id: 'amazon', label: 'Amazon Pay', Icon: FaAmazon },
  { id: 'cash',   label: 'Cash',       Icon: FaMoneyBillWave }
]

export default function PurchaseServicesPage() {
  const navigate = useNavigate()

  // Carousel
  const carousel = [strip1, strip2, strip3]
  const [slide, setSlide] = useState(0)
  const prev = () => setSlide(s => (s - 1 + carousel.length) % carousel.length)
  const next = () => setSlide(s => (s + 1) % carousel.length)

  // États d'UI
  const [detailService, setDetailService] = useState<ServiceID | null>(null)
  const [paymentService, setPaymentService] = useState<ServiceID | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('google')
  const [success, setSuccess] = useState(false)

  // ID du pro (à récupérer depuis contexte / auth)
  const professionalId = 1

  // Traitement du paiement
  const handleConfirm = async () => {
    if (!paymentService) return
    const price = services.find(s => s.id === paymentService)!.price
    const res = await fetch('/api/premium_subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        professional_id: professionalId,
        subscriptions_name: paymentService,
        price,
        payment_method: paymentMethod
      })
    })
    if (res.ok) setSuccess(true)
    else alert('Erreur lors du paiement')
  }
  // Écran « réussite »
  if (success) {
    return (
      <div className="pro">
        <div className="pro-dash">
          <TopbarPro />
          <br />
          
          {/* ░░ Carousel ░░ */}
          <section className="partner-strip">
            <img src={strip1} alt="Partner 1" />
            <img src={strip2} alt="Partner 2" />
            <img src={strip3} alt="Partner 3" />
          </section>
          
          {/* ░░ Layout ░░ */}
          <main className="flex w-full">
            {/* █ Sidebar - Collée à gauche */}
            <SidebarPro active="Purchase" />
            
            <div className="flex-1 flex flex-col gap-6 p-6">
              <div className="bg-white rounded-lg shadow-sm h-full p-8">
                <div className="service-card">
                  <FiCheckCircle className="success-icon" />
                  <h3>Payment Successful</h3>
                  <p>Thank you for patronizing us today.<br/>We value you!</p>
                  <button className="select-button" onClick={() => navigate('/pro/dashboard')}>
                    Dashboard
                  </button>
                </div>
              </div>
            </div>
          </main>
          
          <FooterPro />
        </div>
      </div>
    )
  }
  // UI principale
  return (
    <div className="pro">
      <div className="pro-dash">
        {/* ░░ Top-bar ░░ */}
        <TopbarPro />
        <br />
        
        {/* ░░ Carousel ░░ */}
        <section className="partner-strip">
          <img src={strip1} alt="Partner 1" />
          <img src={strip2} alt="Partner 2" />
          <img src={strip3} alt="Partner 3" />
        </section>
  

        {/* ░░ Layout ░░ */}
        <main className="flex w-full">
          {/* █ Sidebar - Collée à gauche */}
          <SidebarPro active="Purchase" />
          
          <div className="flex-1 flex flex-col gap-6 p-6">
            <div className="bg-white rounded-lg shadow-sm h-full p-8">          {/* 1) Liste des services */}
          {!detailService && !paymentService && (
            <>
              <h1 className="text-4xl font-bold text-black text-center mb-12">Add Promotional Services</h1>
              <div className="space-y-6 max-w-4xl mx-auto">
                {services.map(s => (
                  <div key={s.id} className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 relative hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start gap-6">
                      {/* Logo à gauche */}
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                        <s.Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      
                      {/* Contenu principal */}
                      <div className="flex-1 text-center">
                        {/* Titre centré en gros et gras */}
                        <h3 className="text-2xl font-bold text-black mb-4">
                          {s.title}
                        </h3>
                        
                        {/* Prix centré et en gras */}
                        <div className="text-3xl font-bold text-black mb-6">
                          {s.price}€
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {s.summary}
                        </p>
                        
                        {/* Bouton bleu ciel */}
                        <button 
                          className="bg-[#70b7e2] hover:bg-sky-600 text-white font-semibold py-3 w-full rounded-lg transition-colors duration-200"
                          onClick={() => setPaymentService(s.id)}
                        >
                          Select {s.title}
                        </button>
                      </div>
                      
                      {/* Icône info en haut à droite */}
                      <div className="flex-shrink-0">
                        <FiInfo 
                          className="text-gray-400 hover:text-blue-500 cursor-pointer w-6 h-6" 
                          onClick={() => setDetailService(s.id)} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}{/* 2) Vue détaillée */}
          {detailService && !paymentService && (() => {
            const s = services.find(x => x.id === detailService)!
            return (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 relative">
                  {/* Icône fermer en haut à droite */}
                  <div className="absolute top-6 right-6">
                    <FiInfo 
                      className="text-gray-400 hover:text-blue-500 cursor-pointer w-8 h-8" 
                      onClick={() => setDetailService(null)} 
                    />
                  </div>
                  
                  {/* Titre centré en gros et gras */}
                  <h2 className="text-4xl font-bold text-black text-center mb-6 mt-2">
                    {s.title}
                  </h2>
                  
                  {/* Prix centré et en gras */}
                  <div className="text-4xl font-bold text-black text-center mb-8">
                    {s.price}€
                  </div>
                  
                  {/* Image du service */}
                  <div className="flex justify-center mb-8">
                    <img src={s.detailImg} alt={s.title} className="max-w-full h-auto rounded-lg shadow-md" />
                  </div>
                  
                  {/* Description détaillée */}
                  <div className="text-gray-700 text-center space-y-4 mb-8 leading-relaxed">
                    {s.detailText.split('\n\n').map((para, idx) => (
                      <p key={idx} className="text-lg">
                        {para.startsWith('**') ? 
                          <strong className="text-black text-xl">{para.slice(2, -2)}</strong> : 
                          para
                        }
                      </p>
                    ))}
                  </div>
                  
                  {/* Bouton bleu ciel */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => { setPaymentService(s.id); setDetailService(null); }}
                    >
                      Select {s.title}
                    </button>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* 3) Formulaire de paiement */}
          {paymentService && (
            <>
              <h2 className="page-title">Payment</h2>
              <div className="payment-card">
                {paymentOptions.map(opt => {
                  const Icon = opt.Icon
                  return (
                    <label key={opt.id} className="payment-option">
                      <input
                        type="radio"
                        name="payment"
                        value={opt.id}
                        checked={paymentMethod === opt.id}
                        onChange={() => setPaymentMethod(opt.id)}
                      />
                      <Icon className="payment-icon" />
                      {opt.label}
                    </label>
                  )
                })}                <button className="select-button" onClick={handleConfirm}>
                  Confirm Payment
                </button>
              </div>
            </>
          )}

            </div>
          </div>
        </main>

        <FooterPro />
      </div>
    </div>
  )
}
