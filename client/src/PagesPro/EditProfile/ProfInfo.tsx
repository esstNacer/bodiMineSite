import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Avatar,
  Grid,
} from '@mui/material';
import { usePro } from '../../components/ProContext';
import { useState, useEffect, ChangeEvent } from 'react';

export default function ProfInfo() {
  const { professional, proToken, updateProfessional } = usePro();

  /* ---------- état local contrôlé ---------- */
  const [values, setValues] = useState({
    full_name: '',
    email: '',
   phone_number: '',
    clinic_address: '',
    country: '',
    specialization: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------- sync contexte → formulaire ---------- */
  useEffect(() => {
    if (!professional) return;
    setValues({
      full_name:      professional.full_name         ?? '',
      email:          professional.email             ?? '',
     phone_number: professional.phone_number         ?? '',
      clinic_address: professional.clinic_address   ?? '',
      country:        professional.country           ?? '',
      specialization: professional.specialization    ?? ''
    });
  }, [professional]);

  /* ---------- handlers ---------- */
  const handleChange =
    (field: keyof typeof values) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setValues({ ...values, [field]: e.target.value });

  const handleSave = async () => {
    if (!professional) return;
    setLoading(true);
    setError(null);

    // Prépare le payload
    const payload = {
      full_name:      values.full_name,
      email:          values.email,
      phone_number:   `${values.phone_number}`,
      clinic_address: values.clinic_address,
      country:        values.country,
      specialization: values.specialization
    };

    try {
      const res = await fetch(
        `/api/professional/${professional.professional_id}`, 
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(proToken 
              ? { Authorization: `Bearer ${proToken}` } 
              : {}
            )
          },
          body: JSON.stringify(payload),
          credentials: 'include'  // si vous utilisez les cookies
        }
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || res.statusText);
      }

      const updated: typeof professional = await res.json();
      updateProfessional(updated);       // met à jour le contexte + storage
    } 
    catch (err: any) {
      console.error(err);
      setError(err.message || 'Erreur lors de la mise à jour');
    }
    finally {
      setLoading(false);
    }
  };

  /* ---------- rendu ---------- */
  return (
    <Box
      sx={{
        backgroundColor: '#f3f6fa',
        borderRadius: 2,
        p: 4,
        width: 775,
        minHeight: 600,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}
    >
      <Grid container direction="column" gap={2}>
        {/* avatar & titre */}
        <Grid container justifyContent="center">
          <Avatar
            src={professional?.photo_url ?? '/images/default-avatar.png'}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid textAlign="center">
          <Typography variant="subtitle2" color="primary">
            Change picture
          </Typography>
        </Grid>

        {/* Nom */}
        <Grid sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" mb={1}>
            Name
          </Typography>
          <TextField
            fullWidth size="small"
            value={values.full_name}
            onChange={handleChange('full_name')}
          />
        </Grid>

        {/* Email */}
        <Grid sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" mb={1}>
            Email
          </Typography>
          <TextField
            fullWidth size="small"
            value={values.email}
            onChange={handleChange('email')}
          />
        </Grid>

        {/* Téléphone */}
        <Grid sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" mb={1}>
            Numero
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <TextField
                fullWidth size="small"
                value={values.phone_number}
                onChange={handleChange('phone_rest')}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Adresse */}
        <Grid sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" mb={1}>
            Address
          </Typography>
          <TextField
            fullWidth size="small"
            value={values.clinic_address}
            onChange={handleChange('clinic_address')}
          />
        </Grid>

        {/* Country */}
        <Grid sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" mb={1}>
            Country
          </Typography>
          <TextField
            fullWidth size="small" select
            value={values.country}
            onChange={handleChange('country')}
          >
            {['France', 'Algeria', 'United Kingdom'].map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Spécialisation */}
        <Grid sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" mb={1}>
            Specialization
          </Typography>
          <TextField
            fullWidth size="small" select
            value={values.specialization}
            onChange={handleChange('specialization')}
          >
            {[
              'Expert in advanced medicine',
              'General Practitioner',
              'Cardiologist'
            ].map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Save button & feedback */}
        <Grid sx={{ px: 20 }}>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: '#3da9fc',
                '&:hover': { bgcolor: '#3098e5' }
              }}
              onClick={handleSave}
            >
              {loading ? 'Saving…' : 'Save changes'}
            </Button>
          </Box>
          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
