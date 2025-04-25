import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Settings,
  MessageSquare,
  Phone,
  Menu
} from 'lucide-react';
import '../assets/ProfessionalDashboard.css';
import logoBodyMine from '../images/logobodymine.png';

/* ------------------------------------------------------------------ */
/* ————— placeholders (données factices) ————— */
const carousel = [
  { src: '/assets/partner1.jpg', alt: 'Partner' },
  { src: '/assets/clinic1.jpg',  alt: 'Clinic'  },
  { src: '/assets/partner2.jpg', alt: 'Silicone Industry' }
];
const notifications = [
  { id: 1, text: 'New message from your patient…', date: '28 OCT — 09:53', type: 'msg' },
  { id: 2, text: 'Plan upgraded to PREMIUM',        date: '27 OCT — 17:42', type: 'plan' }
];
const messagesSidebar = [
  { id: 1, name: 'Brooklyn Simmons', snippet: 'Hi! How Are You?', avatar: '/assets/avatar_woman.png', active: true }
];
const chatHistory = [
  { id: 1, mine:false, text:'This is an example of medicine that you have to buy at the pharmacy', time:'05:21 pm', img:'/assets/pills.jpg' },
  { id: 2, mine:true , text:'Alright, I’ll get it from the pharmacy.',                                    time:'05:21 pm' }
];
/* ------------------------------------------------------------------ */

export default function ProfessionalDashboard() {
  const [slide, setSlide] = useState(0);

  /* ——— helpers ——— */
  const prev = () => setSlide(s => (s === 0 ? carousel.length - 1 : s - 1));
  const next = () => setSlide(s => (s === carousel.length - 1 ? 0 : s + 1));

  return (
    <div className="pro-dash">
      {/* ========== NAVBAR ========== */}
      <nav className="topbar">
        <img src={logoBodyMine} alt="BodyMine" className="logo" />

        <div className="topbar-right">
          <span className="lang">EN ▾</span>
          <img src="/assets/doctor_small.png" alt="Dr." className="avatar-sm" />
          <div className="doc-info">
            <strong>Dr. Himakshi</strong>
            <span className="online">Online</span>
          </div>
        </div>
      </nav>

      {/* ========== CAROUSEL ========= */}
      <section className="carousel">
        <button className="nav prev" onClick={prev}><ChevronLeft size={18}/></button>
        <img src={carousel[slide].src} alt={carousel[slide].alt} />
        <button className="nav next" onClick={next}><ChevronRight size={18}/></button>
        <div className="dots">
          {carousel.map((_,i)=>
            <span key={i} className={i===slide?'dot active':'dot'} onClick={()=>setSlide(i)} />)}
        </div>
      </section>

      <main className="grid">
        {/* ===== SIDEBAR ===== */}
        <aside className="sidebar">
          <div className="profile-card">
            <img src="/assets/doctor_small.png" alt="" />
            <div>
              <h4>Dr. Himakshi</h4>
              <span className="online">Online</span>
            </div>
          </div>

          <ul className="side-links">
            <li className="active"><Menu size={16}/> Dashboard</li>
            <li><User size={16}/> Edit Profile</li>
            <li>Your Plan</li>
            <li>Doctor list</li>
            <li>Purchase Services</li>
            <li>Change Password</li>
            <li>Terms &amp; Conditions</li>
            <li>Support</li>
          </ul>

          <button className="btn logout"><LogOut size={16}/> Logout</button>
          <button className="btn delete">Delete Account</button>
        </aside>

        {/* ===== MIDDLE COLUMN ===== */}
        <section className="middle">
          {/* notifications */}
          <div className="widget notif">
            <h5>Notifications</h5>
            {notifications.map(n=>(
              <div key={n.id} className="notif-row">
                <Bell size={14}/>
                <div>
                  <p>{n.text}</p>
                  <span>{n.date}</span>
                </div>
              </div>
            ))}
            <Link to="#" className="btn tiny full">View Chat</Link>
          </div>

          {/* (fake) chart */}
          <div className="widget chart">
            <h5>Patients Chat</h5>
            <img src="/assets/chart_dummy.png" alt="chart" />
          </div>

          {/* messages list */}
          <div className="widget messages">
            <header>
              <h5>Messages <span className="count">12</span></h5>
              <input type="text" placeholder="Search conversation" />
              <div className="tabs">
                <button className="active">Active</button>
                <button>Ended</button>
              </div>
            </header>

            <ul className="msg-list">
              {messagesSidebar.map(m=>(
                <li key={m.id} className={m.active?'active':''}>
                  <img src={m.avatar} alt="" />
                  <div>
                    <h6>{m.name}</h6>
                    <p>{m.snippet}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== CHAT AREA ===== */}
        <section className="chatbox">
          <header className="chat-head">
            <div>
              <h5>Dr. Chirag Patel</h5>
              <span className="spec">General Physician · <span className="online">Active</span></span>
            </div>
            <button className="btn tiny"><Phone size={14}/> Call</button>
          </header>

          <div className="chat-body">
            {chatHistory.map(msg=>(
              <div key={msg.id} className={msg.mine?'msg mine':'msg'}>
                {msg.img && <img src={msg.img} alt="" />}
                <p>{msg.text}</p>
                <span>{msg.time}</span>
              </div>
            ))}
            <em className="typing">Dr. Chirag is typing</em>
          </div>

          <footer className="chat-foot">
            <input type="text" placeholder="Send a Message…" />
            <button className="btn tiny send"><MessageSquare size={14}/></button>
          </footer>
        </section>
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="site-footer">
        <img src="/assets/logobodymine.png" alt="BodyMine" />
        <p>Bodymine is the leading directory to help you find the perfect surgeon or clinic, anywhere in the world.</p>

        <div className="f-columns">
          <div><h6>Home</h6><ul><li>Menu</li><li>Chat</li></ul></div>
          <div><h6>Info</h6><ul><li>Terms & Conditions</li><li>Privacy Policy</li><li>FAQs</li></ul></div>
          <div><h6>Contact Us</h6><p>info@bodymine.com</p></div>
        </div>
      </footer>
    </div>
  );
}
