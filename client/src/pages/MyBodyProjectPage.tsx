// src/pages/MyBodyProjectPage.tsx
import React, {
  useContext,
  useState,
  useEffect,
  SyntheticEvent
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/MyBodyProjectPage.css'
import bodyMineLogo from '../images/logobodymine.png'
import clinic1 from '../images/clinic1.png'
import clinic2 from '../images/clinic2.png'
import clinic3 from '../images/clinic3.png'
import {
  FiHome,
  FiLock,
  FiFileText,
  FiBookOpen,
  FiLifeBuoy,
  FiUser,
  FiLogOut,
  FiTrash2,
  FiEdit2,
  FiPlus,
  FiSearch,
  FiX
} from 'react-icons/fi'
import { BsDot } from 'react-icons/bs'
import { UserContext, useUser } from '../components/UserContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface Project {
  project_id: number
  patient_id: number
  title: string
  date_line: string
  budget: number
  desired_surgery: string
  interested_country: string
  comments: string
  created_at: string
}

interface Doctor {
  professional_id: number
  full_name: string
  specialization: string
  country?: string
  rating?: number
  years_experience?: number
  photo_url?: string | null
}

interface Photo {
  photo_id: number
  professional_id: number
  photo_url: string
  type: string
}

interface NotificationPayload {
  professional_id: number
  project_id: number
  message: string
  read: number
}

export default function MyBodyProjectPage() {
  const { user } = useContext(UserContext)!
  const { logout } = useUser()
  const navigate = useNavigate()

  const [projects, setProjects] = useState<Project[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(false)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toDeleteId, setToDeleteId] = useState<number | null>(null)

  const [currentSlide, setCurrentSlide] = useState(0)
  const banners = [clinic1, clinic2, clinic3]

  const [editing, setEditing] = useState(false)
  const [editProj, setEditProj] = useState<Project | null>(null)

  const [activeTab, setActiveTab] = useState<'info' | 'doctor'>('info')
  const [form, setForm] = useState({
    title: '',
    desired_surgery: '',
    date_line: '',
    budget: '',
    interested_country: '',
    comments: '',
    chosenDoctor: ''
  })
    const [slide, setSlide] = useState(0);
  
   const carousel = [
        { src: clinic1, alt: "New Clinic Dental Care" },
        { src: clinic2, alt: "Cosmetic Surgery" },
        { src: clinic3, alt: "New Cosmetic Surgery Website" },
      ];

  useEffect(() => {
    if (!user?.patient_id) return

    fetch('/api/projects')
      .then(r => r.json())
      .then((all: Project[]) =>
        setProjects(all.filter(p => p.patient_id === user.patient_id))
      )
      .catch(console.error)

    fetch('/api/professional')
      .then(r => r.json())
      .then(async (proList: Doctor[]) => {
        // Charger les photos pour chaque pro
        const updatedList = await Promise.all(proList.map(async pro => {
          try {
            const res = await fetch(`/api/photos/pro/${pro.professional_id}`)
            const photos: Photo[] = await res.json()
            const profilePhoto = photos.find(p => p.type === 'profile')
            return { ...pro, photo_url: profilePhoto?.photo_url || null }
          } catch {
            return { ...pro, photo_url: null }
          }
        }))
        setDoctors(updatedList)
      })
      .catch(console.error)
  }, [user])

  const onChange = (e: React.ChangeEvent<any>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const chooseDoctor = (id: number) => {
    setForm(prev => ({ ...prev, chosenDoctor: String(id) }))
  }

  const openForm = (proj?: Project) => {
    if (proj) {
      setEditProj(proj)
      setForm({
        title: proj.title,
        desired_surgery: proj.desired_surgery,
        date_line: proj.date_line.slice(0, 10),
        budget: String(proj.budget),
        interested_country: proj.interested_country,
        comments: proj.comments,
        chosenDoctor: ''
      })
    } else {
      setEditProj(null)
      setForm({
        title: '',
        desired_surgery: '',
        date_line: '',
        budget: '',
        interested_country: '',
        comments: '',
        chosenDoctor: ''
      })
    }
    setActiveTab('info')
    setEditing(true)
  }

  const cancelForm = () => {
    setEditing(false)
    setEditProj(null)
  }

  const handleSave = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!user?.patient_id) return
    setLoading(true)
    try {
      const payload = {
        patient_id: user.patient_id,
        title: form.title,
        desired_surgery: form.desired_surgery,
        date_line: form.date_line,
        budget: parseFloat(form.budget),
        interested_country: form.interested_country,
        comments: form.comments
      }
      let project: Project
      if (editProj) {
        await fetch(`/api/projects/${editProj.project_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        project = { ...editProj, ...payload }
        setProjects(ps =>
          ps.map(p =>
            p.project_id === project.project_id ? project : p
          )
        )
      } else {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        project = await res.json()
        setProjects(ps => [project, ...ps])
      }

      if (form.chosenDoctor) {
        const notif: NotificationPayload = {
          professional_id: +form.chosenDoctor,
          project_id: project.project_id,
          message: `New project request by ${user.first_name} ${user.last_name}`,
          read: 0
        }
        await fetch('/api/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(notif)
        })
      }
      cancelForm()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const askDelete = (id: number) => {
    setToDeleteId(id)
    setConfirmOpen(true)
  }
  const confirmDelete = () => {
    if (toDeleteId == null) return
    fetch(`/api/projects/${toDeleteId}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          setProjects(ps => ps.filter(p => p.project_id !== toDeleteId))
        }
      })
      .catch(console.error)
      .finally(() => {
        setConfirmOpen(false)
        setToDeleteId(null)
      })
  }
  const cancelDelete = () => {
    setConfirmOpen(false)
    setToDeleteId(null)
  }
  return (
    <div className="home-wrapper">

    <div className="mybody-page">
      {/* Pop-up confirmation */}
      {confirmOpen && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Are you sure you want to delete this project?</p>
            <div className="confirm-buttons">
              <button className="btn cancel" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <Header className="navbar"/>


      {/* CAROUSEL */}
      <section className="home carousel">
        <div className="home carousel-inner">
          {carousel.map((item, i) => (
            <img key={i} src={item.src} alt={item.alt} className={i === slide ? "active" : ""} />
          ))}
        </div>
      </section>

      {/* CONTENU PRINCIPAL */}
      <main className="content-grid">
        <aside className="side-menu">
          <div className="hello-card">
            <img
              src="https://i.pravatar.cc/64?img=12"
              alt="avatar"
              className="hello-avatar"
            />
            <div>
              <p className="hello-hi">Hello</p>
              <p className="hello-name">
                {user?.first_name} {user?.last_name}
              </p>
            </div>
          </div>
          <ul className="menu-links">
            <li><Link to="/editProfile"><FiUser /> Edit Profile</Link></li>
            <li><Link to="/changePassword"><FiLock /> Change Password</Link></li>
            <li className="active">
              <Link to="/myBodyProject"><FiFileText /> My Body Project</Link>
            </li>
            <li><Link to="/CGU"><FiFileText /> Terms & Conditions</Link></li>
            <li><Link to="/news"><FiBookOpen /> News & Article</Link></li>
            <li><Link to="/support"><FiLifeBuoy /> Support</Link></li>
          </ul>
          <button className="danger-btn"><FiTrash2 /> Delete Account</button>
          <button className="logout-btn" onClick={logout}>
            <FiLogOut /> Logout
          </button>
        </aside>

        {!editing ? (
          // Liste des projets
          <section className="projects-area">
            <div className="projects-header">
              <h1>My Body Project</h1>
              <button className="add-btn" onClick={() => openForm()}>
                <FiPlus /> Add new project
              </button>
            </div>
            <div className="greeting">
              <img
                src="https://i.pravatar.cc/48?img=33"
                alt="patient"
                className="greet-avatar"
              />
              <span>
                Hi,&nbsp;<strong>{user?.first_name} {user?.last_name}</strong>
              </span>
            </div>
            {projects.map(p => (
              <div className="project-card" key={p.project_id}>
                <div className="project-icon">🦷</div>
                <div className="project-info">
                  <h4>{p.title}</h4>
                  <span className="proj-type">{p.desired_surgery}</span>
                  <p className="proj-desc">{p.comments}</p>
                  <p className="proj-date">
                    Scheduled: {new Date(p.date_line).toLocaleDateString()}
                  </p>
                </div>
                <div className="project-actions">
                  <FiEdit2
                    className="act act-edit"
                    onClick={() => openForm(p)}
                  />
                  <FiTrash2
                    className="act act-del"
                    onClick={() => askDelete(p.project_id)}
                  />
                  <Link
                  to={""}
                    onClick={() => openForm(p)}
                    className="view-link"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </section>
        ) : (
          // Formulaire création/édition
          <section className="projects-area">
            <div className="projects-header">
              <h1>{editProj ? 'Edit Body Project' : 'New Body Project'}</h1>
              <button className="add-btn" onClick={cancelForm}>
                <FiX /> Close this project
              </button>
            </div>

            <nav className="modal-tabs">
              <button
                type="button"
                className={activeTab === 'info' ? 'active' : ''}
                onClick={() => setActiveTab('info')}
              >
                INFO
              </button>
              <button
                type="button"
                className={activeTab === 'doctor' ? 'active' : ''}
                onClick={() => setActiveTab('doctor')}
              >
                FAVORITE DOCTOR
              </button>
            </nav>

            <form className="modal-body" onSubmit={handleSave}>
              {activeTab === 'info' ? (
                <>
                  <input
                    name="title"
                    placeholder="Project Name"
                    required
                    value={form.title}
                    onChange={onChange}
                  />
                  <select
                    name="desired_surgery"
                    required
                    value={form.desired_surgery}
                    onChange={onChange}
                  >
                    <option value="">Select Specialty</option>
                    <option>Dental Implant</option>
                    <option>Hair Implant</option>
                  </select>
                  <input
                    type="date"
                    name="date_line"
                    required
                    value={form.date_line}
                    onChange={onChange}
                  />
                  <input
                    type="number"
                    name="budget"
                    placeholder="Budget"
                    value={form.budget}
                    onChange={onChange}
                  />
                  <input
                    name="interested_country"
                    placeholder="Country Wished"
                    value={form.interested_country}
                    onChange={onChange}
                  />
                  <textarea
                    name="comments"
                    placeholder="Additional Notes"
                    value={form.comments}
                    onChange={onChange}
                  />
                </>
              ) : (
                <div className="doctor-cards">
                  {doctors.map(d => {
                    const selected = form.chosenDoctor === String(d.professional_id)
                    return (
                      <div
                        key={d.professional_id}
                        className={`doctor-card ${selected ? 'selected' : ''}`}
                        onClick={() => chooseDoctor(d.professional_id)}
                      >
                        <button type="button" className="fav-icon">
                          ❤️
                        </button>
                        <img
                          className="doctor-photo"
                          src={d.photo_url || 'https://i.imgur.com/1X3K1vF.png'}
                          alt={d.full_name}
                        />
                        <h4 className="doctor-name">{d.full_name}</h4>
                        <p className="doctor-spec">{d.specialization}</p>
                        {d.country && (
                          <p className="doctor-country">{d.country}</p>
                        )}
                        <div className="doctor-meta">
                          <span className="rating">
                            ★ {d.rating?.toFixed(1) || '4.8'}
                          </span>
                          <span className="experience">
                            {d.years_experience || 8} years
                          </span>
                        </div>
                        <button
                          type="button"
                          className="btn doctor-chat"
                          onClick={() =>
                            navigate(`/pro/chat/${d.professional_id}`)
                          }
                        >
                          Chat
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="modal-footer">
                <div className="options">
                  <label>
                    <input type="checkbox" />
                    Enable Matching Service
                  </label>
                  <label>
                    <input type="checkbox" />
                    Only Show Validated Clinics/Doctors
                  </label>
                </div>

                <button
                  type="submit"
                  className="close-btn"
                  disabled={loading}
                >
                  {loading
                    ? 'Saving…'
                    : editProj
                    ? 'Save Changes'
                    : 'Save & Close'}
                </button>
              </div>
            </form>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
    </div>
  )
}
