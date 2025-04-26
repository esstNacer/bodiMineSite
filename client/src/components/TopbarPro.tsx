// src/components/TopbarPro.tsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { usePro } from './ProContext'

import logo from '../images/logobodymine.png'
import defaultAvatar from '../images/doctor-small.png'
import '../assets/ProfessionalDashboard.css'

interface Photo {
  photo_id: number
  professional_id: number
  photo_url: string
  type: string
  created_at: string
}

interface TopbarProps {
  classNameOverride?: string
}

export default function TopbarPro({ classNameOverride }: TopbarProps) {
  const { professional, proToken, proLogout } = usePro()
  const cls = classNameOverride ?? 'topbar'

  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!professional?.professional_id || !proToken) return

    fetch(`/api/photos/pro/${professional.professional_id}`, {
      headers: { Authorization: `Bearer ${proToken}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch photos')
        return res.json() as Promise<Photo[]>
      })
      .then(photos => {
        // on prend la première photo de type "profile"
        const profilePhoto = photos.find(p => p.type === 'profile')
        if (profilePhoto) {
          setProfilePhotoUrl(profilePhoto.photo_url)
        }
      })
      .catch(err => {
        console.error('Error loading profile photo:', err)
      })
  }, [professional, proToken])

  return (
    <nav className={cls}>
      <Link to="/pro/dashboard">
        <img src={logo} alt="BodyMine" className="logo" />
      </Link>

      <div className="topbar-right">
        <span className="lang">EN ▾</span>

        <img
          src={profilePhotoUrl ?? defaultAvatar}
          alt="avatar"
          className="avatar-sm"
        />

        <div className="doc-info">
          <strong>{professional?.full_name ?? 'Doctor'}</strong>
          <span className="online">Online</span>
        </div>

        <button className="btn tiny" onClick={proLogout}>
          <LogOut size={14} /> Logout
        </button>
      </div>
    </nav>
  )
}
