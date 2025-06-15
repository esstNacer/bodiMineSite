import React, { useState } from 'react';
import TopBarPro from '../../components/TopbarPro';
import SidebarPro from '../../components/SidebarPro';
import FooterPro from '../../components/FooterPro';
import { User, Building2, Check, Plus, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@mui/material';

// Import des images du carrousel comme sur le dashboard
import strip1 from '../../images/strip1.png';
import strip2 from '../../images/strip2.png';
import strip3 from '../../images/strip3.png';

// Import du CSS pour le style du carrousel
import '../../assets/ProfessionalDashboard.css';

const planPrices: Record<string, number> = {
  doctor: 150,
  clinic300: 300,
  clinic600: 600,
};

const servicePrices: Record<string, number> = {
  Banner: 400,
  'Top List': 100,
  'Matching Service': 30,
};

function computeTotal(plan: string, services: string[]): number {
  const base   = planPrices[plan]   ?? 0;
  const extras = services.reduce((sum, s) => sum + (servicePrices[s] ?? 0), 0);
  return base + extras;          // € (float).  Multipliez ×100 avant d’envoyer au backend.
}

export default function ChoosePlan() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
async function handleConfirm() {
  if (!selectedPlatform) return;

  /* ── 1. Calcule le montant ─────────────────────────────────── */
  const totalPrice  = computeTotal(selectedPlan, additionalServices); // € float
  const amountCents = Math.round(totalPrice * 100);                  // int
  const currency    = 'eur';

  try {
    /* ── 2. Appel API backend (toujours) ──────────────────────── */
    const { data } = await axios.post('/api/payments/create', {
      platform: selectedPlatform,
      amount  : amountCents,
      currency,
    });

    /* ── 3. Route selon plateforme ────────────────────────────── */
    switch (selectedPlatform) {
      /* Apple Pay & Google Pay → Payment Element */
      case 'Apple Pay':
      case 'Google Pay': {
        const stripe = await stripePromise;
        setClientSecret(data.clientSecret);     // stocke → affichera PaymentElement
        return;                                 // on sort : confirmation via formulaire
      }

      /* PayPal */
      case 'PayPal':
        window.location.href = data.approvalUrl;
        return;

      /* Amazon Pay */
      case 'Amazon Pay':
        window.location.href = data.amazonPayUrl;
        return;

      default:
        alert('Moyen de paiement non pris en charge');
    }
  } catch (err: any) {
    console.error(err);
    alert(err.response?.data?.error ?? 'Erreur de paiement');
  }
}

function WalletForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe   = useStripe();
  const elements = useElements();

  const submit = async () => {
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + '/payment-success' },
      redirect: 'if_required',
    });

    if (error) {
      alert(error.message);
    } else {
      onSuccess();          // passe à l’étape 4
    }
  };

  return (
    <>
      <PaymentElement options={{ layout: 'tabs' }} />
      <Button variant="contained" fullWidth onClick={submit} sx={{ mt: 2 }}>
        Payer
      </Button>
    </>
  );
}


  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
    setStep(2);
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleServiceToggle = (service: string) => {
    if (additionalServices.includes(service)) {
      setAdditionalServices(additionalServices.filter((s) => s !== service));
    } else {
      setAdditionalServices([...additionalServices, service]);
    }
  };

  const handlePayment = () => {
    setStep(3);
  };

  const services = [
    { name: 'Banner', price: '€400', description: 'Premium banner placement at the top of the site for maximum visibility' },
    { name: 'Top List', price: '€100', description: 'Featured placement in top listing' },
    { name: 'Matching Service', price: '€30/month', description: 'Receive phone notifications of patient enquiries' }
  ];
  return (
    <div className='pro'>
      <div className="pro-dash">
        {/* Header */}
        <div className='pure'>
          <TopBarPro />
        </div>
        <br />
        
        {/* ░░ Carousel des images partenaires comme sur le dashboard ░░ */}
        <section className="partner-strip">
          <img src={strip1} alt="Partner 1" />
          <img src={strip2} alt="Partner 2" />
          <img src={strip3} alt="Partner 3" />
        </section>
        
        {/* Main Layout: Sidebar + Content */}
        <main className="flex w-full">
          {/* Sidebar */}
          <SidebarPro active='Plan'/>
          
          {/* Content Area */}
          <div className="flex-1 p-6 bg-gray-50">
            <div className="bg-white rounded-lg shadow-sm h-full p-8">
              {step === 1 && (
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-black mb-8">
                    Create your Account
                  </h1>

                  <div className="bg-gray-100 rounded-lg p-12 flex flex-col items-center gap-6 min-h-[500px] justify-center">
                    <div
                      className="bg-white rounded-lg p-6 w-full max-w-2xl cursor-pointer border-2 border-transparent hover:border-blue-300 hover:text-blue-400 transition-all duration-200 flex items-center gap-4"
                      onClick={() => handleUserTypeSelect('doctor')}
                    >
                      <User size={48} className="text-blue-400" />
                      <div className="text-left">
                        <h3 className="text-xl font-semibold">Doctor</h3>
                        <p className="text-gray-600">Individual medical practitioner</p>
                      </div>
                    </div>

                    <div
                      className="bg-white rounded-lg p-6 w-full max-w-2xl cursor-pointer border-2 border-transparent hover:border-blue-300 hover:text-blue-400 transition-all duration-200 flex items-center gap-4"
                      onClick={() => handleUserTypeSelect('clinic')}
                    >
                      <Building2 size={48} className="text-blue-400" />
                      <div className="text-left">
                        <h3 className="text-xl font-semibold">Hospital or Clinic</h3>
                        <p className="text-gray-600">Healthcare facility</p>
                      </div>
                    </div>

                    <p className="text-gray-600">
                      Already have an account?{' '}
                      <span className="text-blue-400 cursor-pointer hover:underline">Sign in</span>                    </p>
                    
                    {/* Gros bouton Create Account */}
                    <div className="w-full max-w-2xl mt-4">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6 px-8 rounded-xl text-xl transition-all duration-300 shadow-xl transform hover:scale-[1.02] active:scale-[0.98] border-0 focus:ring-4 focus:ring-blue-300 focus:outline-none">
                        Create Account
                      </button>
                    </div>
                  </div>
                </div>
              )}              {step === 2 && (
                <div className="rounded-lg p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">                    {/* Left side - Plan selection */}
                    <div className="space-y-6 flex flex-col items-center">
                      <h2 className="text-2xl font-semibold mb-4 text-center">
                        {userType === 'doctor' ? 'Doctor Plan' : 'Clinic Plan'}
                      </h2>                      {userType === 'doctor' ? (
                        <div className="flex justify-center">
                          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-[331px] h-[346px] flex">
                            {/* 4 icônes verticales à gauche, alignées avec le titre */}
                            <div className="flex flex-col justify-start gap-3 mr-4 pt-1">
                              <User size={24} className="text-blue-600" />
                              <Building2 size={24} className="text-blue-600" />
                              <CheckCircle2 size={24} className="text-blue-600" />
                              <Plus size={24} className="text-blue-600" />
                            </div>                            {/* Contenu principal */}
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-black text-center mb-4">
                                Doctor Subscription
                              </h3>
                              
                              {/* Prix avec ancien prix barré en gris et nouveau prix en bleu clair */}
                              <div className="text-center mb-4">
                                <div className="text-sm text-gray-500 line-through mb-1">
                                  $200
                                </div>
                                <div className="text-3xl font-bold text-blue-400">
                                  $150
                                </div>
                              </div>
                                {/* Textes alignés à gauche et plus gros */}
                              <div className="space-y-2 mb-4">
                                <div className="text-black text-base font-medium">
                                  1 Doctor Profile
                                </div>
                                <div className="text-black text-base font-medium">
                                  Full Access to Dashboard
                                </div>
                                <div className="text-black text-base font-medium">
                                  Patient Management System
                                </div>
                                <div className="text-black text-base font-medium">
                                  Unlimited Live Chat with Patients
                                </div>
                              </div>
                              
                              {/* Bouton compact à l'intérieur de la carte */}
                              <button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                                onClick={() => handlePlanSelect('doctor')}
                              >
                                Choose Plan
                              </button>
                            </div>
                          </div>
                        </div>                      ) : (
                        <div className="space-y-4 flex justify-center">
                          <div className="space-y-4">
                            {[
                              { 
                                price: "$300", 
                                originalPrice: "$400",
                                doctors: "2 Doctor Profiles", 
                                id: 'clinic300',
                                features: [
                                  "2 Doctor Profiles",
                                  "Full Access to Dashboard",
                                  "Clinic Management System", 
                                  "Unlimited Live Chat with Patients"
                                ]
                              },
                              { 
                                price: "$600", 
                                originalPrice: "$800",
                                doctors: "6 Doctor Profiles", 
                                id: 'clinic600',
                                features: [
                                  "6 Doctor Profiles",
                                  "Full Access to Dashboard",
                                  "Advanced Clinic Management",
                                  "Unlimited Live Chat with Patients"
                                ]
                              }
                            ].map((plan, index) => (
                              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-[331px] h-[346px] flex">
                                {/* 4 icônes verticales à gauche, alignées avec le titre */}
                                <div className="flex flex-col justify-start gap-3 mr-4 pt-1">
                                  <Building2 size={24} className="text-blue-600" />
                                  <User size={24} className="text-blue-600" />
                                  <CheckCircle2 size={24} className="text-blue-600" />
                                  <Plus size={24} className="text-blue-600" />
                                </div>

                                {/* Contenu principal */}
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-black text-center mb-4">
                                    Clinic Subscription
                                  </h3>
                                  
                                  {/* Prix avec ancien prix barré en gris et nouveau prix en bleu clair */}
                                  <div className="text-center mb-4">
                                    <div className="text-sm text-gray-500 line-through mb-1">
                                      {plan.originalPrice}
                                    </div>
                                    <div className="text-3xl font-bold text-blue-400">
                                      {plan.price}
                                    </div>
                                  </div>
                                    
                                  {/* Textes alignés à gauche et plus gros, sans encoches */}
                                  <div className="space-y-2 mb-4">
                                    {plan.features.map((feature, featureIndex) => (
                                      <div key={featureIndex} className="text-black text-base font-medium">
                                        {feature}
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {/* Bouton compact à l'intérieur de la carte */}
                                  <button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                                    onClick={() => handlePlanSelect(plan.id)}
                                  >
                                    Choose Plan
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>                    {/* Right side - Add services - Design personnalisé */}
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl font-semibold mb-6 text-black text-center">
                        Add Services
                      </h2>                      <div className="space-y-3 flex flex-col items-center">
                        {services.map((service, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-full max-w-md">
                            {/* Header avec icône service + titre + icône info plus proche */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {/* Icône à gauche du titre selon le service */}
                                {service.name === 'Banner' && <Building2 size={20} className="text-black" />}
                                {service.name === 'Top List' && <ArrowRight size={20} className="text-black" />}
                                {service.name === 'Matching Service' && <User size={20} className="text-black" />}
                                <h3 className="text-lg font-bold text-black">{service.name}</h3>
                              </div>
                              {/* Icône info grise ronde plus proche */}
                              <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center ml-4">
                                <span className="text-white text-xs font-bold">i</span>
                              </div>
                            </div>

                            {/* Prix en dessous du titre */}
                            <div className="text-xl font-bold text-black mb-3">
                              {service.price}
                            </div>

                            {/* Description plus grande */}
                            <p className="text-lg text-black mb-3 leading-relaxed font-medium">
                              {service.description}
                            </p>

                            {/* Bouton bleu */}
                            <button
                              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                                additionalServices.includes(service.name)
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                              onClick={() => handleServiceToggle(service.name)}
                            >
                              {service.name === 'Banner' && (additionalServices.includes(service.name) ? 'Remove Banner' : 'Select Banner')}
                              {service.name === 'Top List' && (additionalServices.includes(service.name) ? 'Remove Top List' : 'Select Top List')}
                              {service.name === 'Matching Service' && (additionalServices.includes(service.name) ? 'Remove Matching Service' : 'Select Matching Service')}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation buttons - Positioned at the bottom */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <button 
                      className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                    <button
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handlePayment}
                      disabled={!selectedPlan}
                    >
                      Continue to Payment
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}{/* ──────────────── STEP 3 : Payment (version Tailwind) ──────────────── */}
{step === 3 && (
  <div className="rounded-lg p-4 text-center">
    <h2 className="text-3xl font-bold mb-8">Payment</h2>

    <div className="bg-white rounded-lg p-6 max-w-lg mx-auto">
      {/* ░░ 1. Choix du moyen de paiement ░░ */}
      {!clientSecret ? (
        <>
          <div className="space-y-4">
            {[
              { name: 'Google Pay', icon: '/icons/google-pay.png' },
              { name: 'PayPal',     icon: '/icons/paypal.png'     },
              { name: 'Apple Pay',  icon: '/icons/apple-pay.png'  },
              { name: 'Amazon Pay', icon: '/icons/amazon-pay.png' },
            ].map((platform, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer
                           hover:border-blue-300 hover:bg-gray-50 transition-all duration-200"
                onClick={() => setSelectedPlatform(platform.name)}
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                  <img src={platform.icon} alt={platform.name} className="w-8 h-8" />
                </div>

                <span className="flex-1 text-left font-semibold">{platform.name}</span>

                <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                  {selectedPlatform === platform.name && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ░░ Boutons navigation ░░ */}
          <div className="flex justify-between mt-8">
            <button
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700
                         rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setStep(2)}
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <button
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg
                         hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleConfirm}
              disabled={!selectedPlatform}
            >
              Confirm Payment
              <CheckCircle2 size={16} />
            </button>
          </div>
        </>
      ) : (
        /* ░░ 2. Stripe PaymentElement pour Apple / Google Pay ░░ */
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <WalletForm onSuccess={() => setStep(4)} />
        </Elements>
      )}
    </div>
  </div>
)}


              {step === 4 && (
                <div className="rounded-lg p-4 text-center">
                  <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
                    <CheckCircle2 size={80} className="text-green-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-4">
                      Payment Successfully
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Thank you for purchasing our plan. We value you!
                    </p>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                      onClick={() => window.location.href = '/PRO/dashboard'}
                    >
                      Go to Dashboard
                    </button>                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <FooterPro />
      </div>
    </div>
  );
}