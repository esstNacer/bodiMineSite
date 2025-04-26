// src/components/Media.tsx
import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import ImageIcon from '@mui/icons-material/Image'
import { usePro } from '../../components/ProContext'  // corrigez le chemin si besoin

type PhotoType = 'profile' | 'clinic' | 'patient'

interface Photo {
  photo_id: number
  professional_id: number
  photo_url: string
  created_at: string
  type: PhotoType
}

export default function Media() {
  const { professional, proToken } = usePro()
  const [uploading, setUploading] = useState(false)
  const [photos, setPhotos] = useState<Record<PhotoType, Photo[]>>({
    profile: [],
    clinic: [],
    patient: [],
  })

  // 1) Charger les photos existantes au montage
  useEffect(() => {
    if (!proToken) return
    fetch('/api/photos', {
      headers: { 'Authorization': `Bearer ${proToken}` }
    })
      .then(res => res.json())
      .then((all: Photo[]) => {
        const grouped: Record<PhotoType, Photo[]> = { profile: [], clinic: [], patient: [] }
        all.forEach(p => {
          if (p.type === 'profile') grouped.profile.push(p)
          else if (p.type === 'clinic') grouped.clinic.push(p)
          else if (p.type === 'patient') grouped.patient.push(p)
        })
        setPhotos(grouped)
      })
      .catch(console.error)
  }, [proToken])

  // 2) Upload
  const handleUpload = async (
    type: PhotoType,
    files: FileList | null
  ) => {
    if (!files?.[0] || !professional || !proToken) return

    setUploading(true)
    const formData = new FormData()
    formData.append('photo', files[0])
    formData.append('type', type)

    try {
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${proToken}`
        },
        body: formData
      })
      if (!res.ok) throw new Error(`Upload failed (${res.status})`)
      const newPhoto: Photo = await res.json()
      // ajouter au state
      setPhotos(prev => ({
        ...prev,
        [type]: [newPhoto, ...prev[type]]
      }))
    } catch (err) {
      console.error(err)
      alert((err as Error).message)
    } finally {
      setUploading(false)
    }
  }

  // Helper pour afficher la première photo d’un type (ou placeholder)
  const firstUrl = (type: PhotoType, placeholder: string) =>
    photos[type][0]?.photo_url || placeholder

  return (
    <Box
      sx={{
        backgroundColor: '#f3f6fa',
        borderRadius: '20px',
        padding: '32px',
        width: '775px',
        minHeight: '600px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        position: 'relative'
      }}
    >
      {uploading && (
        <Box
          sx={{
            position: 'absolute', inset: 0,
            bgcolor: 'rgba(255,255,255,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10
          }}
        >
          <Typography>Uploading…</Typography>
        </Box>
      )}

      {/* Profile Picture */}
      <Typography variant="h5" sx={{ mb: 2, color: 'darkblue' }}>
        Update Profile
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: 'darkblue' }}>
            Profile Picture
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
            Upload a professional headshot. Square image recommended (1:1 ratio)
          </Typography>

          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Box
                component="img"
                src={firstUrl('profile', '/profile-placeholder.jpg')}
                alt="Profile"
                sx={{
                  width: 100, height: 100,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #ccc'
                }}
              />
            </Grid>
            <Grid item>
              <Box
                sx={{
                  border: '2px dashed #3da9fc',
                  borderRadius: 2,
                  width: 150,
                  height: 150,
                  bgcolor: 'white',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 40, color: '#3da9fc', mb: 1 }} />
                <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
                  Upload Profile Picture
                </Typography>
                <Button variant="outlined" component="label" size="small">
                  Upload
                  <input
                    type="file"
                    hidden
                    onChange={e => handleUpload('profile', e.target.files)}
                  />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Clinic Photos */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: 'darkblue' }}>
            Clinic Photos
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
            Showcase your medical facility with up to 5 high-quality photos
          </Typography>

          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {photos.clinic.map(p => (
                  <Grid item key={p.photo_id}>
                    <Box
                      component="img"
                      src={p.photo_url}
                      alt="Clinic"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        objectFit: 'cover',
                        border: '1px solid #ccc'
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  border: '2px dashed #3da9fc',
                  borderRadius: 2,
                  width: 150,
                  height: 150,
                  bgcolor: 'white',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <LocalHospitalIcon sx={{ fontSize: 40, color: '#3da9fc', mb: 1 }} />
                <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
                  Upload Clinic Picture
                </Typography>
                <Button variant="outlined" component="label" size="small">
                  Upload
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={e => handleUpload('clinic', e.target.files)}
                  />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Patient Photos */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: 'darkblue' }}>
            Patient Photos
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
            Share images of treatments, equipment, and results (up to 10 images)
          </Typography>

          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {photos.patient.map(p => (
                  <Grid item key={p.photo_id}>
                    <Box
                      component="img"
                      src={p.photo_url}
                      alt="Patient"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        objectFit: 'cover',
                        border: '1px solid #ccc'
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  border: '2px dashed #3da9fc',
                  borderRadius: 2,
                  width: 150,
                  height: 150,
                  bgcolor: 'white',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <ImageIcon sx={{ fontSize: 40, color: '#3da9fc', mb: 1 }} />
                <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
                  Upload Patient Picture
                </Typography>
                <Button variant="outlined" component="label" size="small">
                  Upload
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={e => handleUpload('patient', e.target.files)}
                  />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12} sx={{ textAlign: 'right', mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#3da9fc',
              '&:hover': { bgcolor: '#3098e5' },
              color: 'white'
            }}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
