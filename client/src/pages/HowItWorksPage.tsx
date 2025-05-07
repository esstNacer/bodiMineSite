// src/pages/HowItWorksPage.tsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/HowItWorksPage.css';

import howImg    from '../images/howworks.png';
import ordLogo   from '../images/ordre.png';
import sslLogo   from '../images/ssl.png';
import rgpdLogo  from '../images/rgpd.png';
import trustLogo from '../images/trust.png';
import bodyMine  from '../images/logobodymine.png';
import { FiHome, FiSearch } from 'react-icons/fi';
import { UserContext } from '../components/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HowItWorksPage() {
  const { user } = useContext(UserContext) || { user: null };
  const navigate = useNavigate();


  const handleProtectedNavigation = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="home-wrapper">

    <div className="how-page">
      {/* ===== Navbar ===== */}
           <Header className="navbar"/>
     

      {/* ===== Main Content ===== */}
      <main className="how-content-wrapper">
        {/* --- How It Works Hero --- */}
        <section className="how-hero">
          <div className="how-text">
            <h1>How BodyMine Works</h1>
            <ol>
              <li>
                <strong>Search for doctors</strong> by specialty or service.
              </li>
              <li>
                <strong>Select</strong> based on experience, fee or rating.
              </li>
              <li>
                <strong>Start chat</strong> and ask questions with your Doctors.
              </li>
            </ol>
          </div>
          <div className="how-image">
            <img src={howImg} alt="Annotated surgical planning" />
          </div>
        </section>

        {/* --- Recommendations Section --- */}
        <section className="recommendations">
          <div className="logos">
            <img src={ordLogo}  alt="Ordre National des Médecins" />
            <img src={sslLogo}  alt="SSL Secured" />
            <img src={rgpdLogo} alt="RGPD" />
            <img src={trustLogo} alt="Trustpilot" />
          </div>

          {/* conteneur scrollable */}
          <div className="rec-text scrollable">
            <h2>Recommendations for Patients</h2>
            <p>
              At Bodymine, our goal is to simplify your search for aesthetic
              surgery professionals by providing you with a clear and accessible
              directory. We offer information to help you find clinics and doctors
              who specialize in the area you're interested in. However, it’s
              important to understand that we are simply a directory and do not
              provide medical advice.
            </p>
            <p>
              Aesthetic surgery is a personal decision that often has significant
              consequences, and it should be approached with caution and
              consideration. Every surgical procedure carries risks, and your
              safety should always be the top priority. It’s important to take
              the time necessary to conduct thorough research on the professionals
              you are considering. Here are some key reminders to keep in mind
              during your process:
            </p>
            <ol>
              <li>
                <strong>Safety first:</strong> When choosing a clinic or surgeon,
                ensure they are properly qualified and registered with the relevant
                authorities, such as the National Medical Council (CNOM), and that
                they adhere to safety standards.
              </li>
              <li>
                <strong>Consult multiple sources:</strong> We encourage you not to
                rely solely on the information available on our site. Do additional
                research on the clinics, surgeons, and their qualifications by
                checking external reviews, testimonials, and official associations.
              </li>
              <li>
                <strong>Take your time:</strong> Don’t rush. Aesthetic surgery is an
                important and life-changing choice. It's essential to take the time
                to reflect on your decision, consult with multiple professionals,
                and fully understand the risks involved in the procedure.
              </li>
              <li>
                <strong>Request a prior consultation:</strong> Before making any
                decisions, make sure to meet with several surgeons. Ask them about
                their experience, the expected results, the risks, and post-operative
                care. A thorough consultation is essential to fully understand the
                procedure.
              </li>
              <li>
                <strong>Verify qualifications:</strong> Ensure that the professional
                you are consulting with is qualified, registered with the CNOM, and
                has proven experience in the relevant specialty. You can also check
                if they are a member of recognized associations like ISAPS.
              </li>
              <li>
                <strong>Be cautious with pricing:</strong> If an offer seems too good
                to be true, it probably is. Extremely low prices can hide significant
                risks in quality and safety. Ensure the price includes all costs
                (consultation, surgery, follow-up).
              </li>
              <li>
                <strong>Request real results:</strong> Don’t hesitate to ask for
                before-and-after photos of patients who have undergone similar
                procedures. This will help you assess expected results and your
                comfort with the surgeon’s style.
              </li>
              <li>
                <strong>Examine reviews critically:</strong> Patient reviews can be
                helpful, but don’t rely solely on online feedback. Verify authenticity
                and compare with external sources. Use verified health platforms.
              </li>
              <li>
                <strong>Allow time for reflection:</strong> A good surgeon will explain
                risks, benefits, and alternatives clearly. If pressured to decide
                quickly, be cautious.
              </li>
              <li>
                <strong>Know your rights:</strong> You have the right to clear
                information and informed consent. Obtain a detailed quote and consent
                form before any procedure.
              </li>
            </ol>
            <p>
              In summary: At Bodymine, we primarily aim to help you find the right
              professional for your needs. However, the decision to undergo
              aesthetic surgery should be made with careful thought. We encourage you
              to remain cautious, informed, and responsible in your approach. Aesthetic
              surgery is not trivial and requires great attention to patient safety
              and well-being.
            </p>
            <p>
              <strong>Important reminder:</strong> Bodymine does not offer medical advice
              nor guarantee service quality. We simply connect patients and professionals.
              You are responsible for verifying credentials and making informed decisions.
            </p>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <Footer />
    </div>
    </div>
  );
}
