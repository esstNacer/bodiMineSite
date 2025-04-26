// src/pages/PurchaseServicesPage.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/PurchaseServicesPage.css'

import TopbarPro  from '../components/TopbarPro'
import SidebarPro from '../components/SidebarPro'
import FooterPro  from '../components/FooterPro'

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
      <div className="pure">
        <TopbarPro />
        <main className="grid">
          <SidebarPro active="Purchase Services" />
          <div className="content">
            <div className="service-card">
              <FiCheckCircle className="success-icon" />
              <h3>Payment Successful</h3>
              <p>Thank you for patronizing us today.<br/>We value you!</p>
              <button className="select-button" onClick={() => navigate('/pro/dashboard')}>
                Dashboard
              </button>
            </div>
          </div>
        </main>
        <FooterPro />
      </div>
    )
  }

  // UI principale
  return (
    <div className="pure">
      <TopbarPro />

      {/* Carousel */}
      <section className="carousel">
        <button className="nav prev" onClick={prev}>‹</button>
        <div className="carousel-strip" style={{ transform: `translateX(-${slide * 100}%)` }}>
          {carousel.map((src, i) => <img key={i} src={src} alt={`slide ${i+1}`} />)}
        </div>
        <button className="nav next" onClick={next}>›</button>
        <div className="carousel-dots">
          {carousel.map((_, i) => (
            <span key={i}
                  className={i === slide ? 'dot active' : 'dot'}
                  onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </section>

      <main className="grid">
        <SidebarPro active="Purchase Services" />
        <div className="content">

          {/* 1) Liste des services */}
          {!detailService && !paymentService && (
            <>
              <h2 className="page-title">Add Promotional Services</h2>
              <div className="services-list">
                {services.map(s => (
                  <div key={s.id} className="service-card">
                    <div className="service-summary">
                      <s.Icon className="service-icon" />
                      <span className="service-title">{s.title}</span>
                      <span className="service-price">{s.price}€</span>
                      <FiInfo className="info-icon" onClick={() => setDetailService(s.id)} />
                    </div>
                    <p className="service-description">{s.summary}</p>
                    <button className="select-button" onClick={() => setPaymentService(s.id)}>
                      Select {s.title}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 2) Vue détaillée */}
          {detailService && !paymentService && (() => {
            const s = services.find(x => x.id === detailService)!
            const DetailIcon = s.Icon
            return (
              <div className="service-card">
                <div className="service-summary">
                  <DetailIcon className="service-icon" />
                  <span className="service-title">{s.title}</span>
                  <span className="service-price">{s.price}€</span>
                  <FiInfo className="info-icon" onClick={() => setDetailService(null)} />
                </div>
                <img src={s.detailImg} alt={s.title} className="detail-img" />
                {s.detailText.split('\n\n').map((para, idx) => (
                  <p key={idx}>
                    {para.startsWith('**') ? <strong>{para.slice(2, -2)}</strong> : para}
                  </p>
                ))}
                <button className="select-button" onClick={() => { setPaymentService(s.id); setDetailService(null); }}>
                  Select {s.title}
                </button>
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
                })}
                <button className="select-button" onClick={handleConfirm}>
                  Confirm Payment
                </button>
              </div>
            </>
          )}

        </div>
      </main>

      <FooterPro />
    </div>
  )
}
