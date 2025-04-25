import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ImageIcon from '@mui/icons-material/Image';

const Media = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f3f6fa',
        borderRadius: '20px',
        padding: '32px',
        width: '775px',
        minHeight: '600px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" sx={{ mb: 4, color: 'darkblue' }}>
        Update Profile
      </Typography>

      <Grid container spacing={4}>
        {/* Profile Picture */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: 'darkblue' }}>
            Profile Picture
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
            Upload a professional headshot. Square image recommended (1:1 ratio)
          </Typography>

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Box
                component="img"
                src="/profile-placeholder.jpg"
                alt="Profile"
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #ccc',
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
                  marginLeft: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 40, color: '#3da9fc', mb: 1 }} />
                <Typography variant="body2" sx={{ mb: 1, color: 'gray' }}>
                  Upload Profile Picture
                </Typography>
                <Button variant="outlined" component="label" size="small">
                  Upload
                  <input type="file" hidden />
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

          <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {[1, 2].map((photo, index) => (
                  <Grid item key={index}>
                    <Box
                      component="img"
                      src={`/clinic${photo}.jpg`}
                      alt={`Clinic ${photo}`}
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        objectFit: 'cover',
                        border: '1px solid #ccc',
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
                  marginLeft: 33,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <LocalHospitalIcon sx={{ fontSize: 40, color: '#3da9fc', mb: 1 }} />
                <Typography variant="body2" sx={{ mb: 1, color: 'gray' }}>
                  Upload Clinic Picture
                </Typography>
                <Button variant="outlined" component="label" size="small">
                  Upload
                  <input type="file" hidden />
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

          <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {[1, 2, 3].map((photo, index) => (
                  <Grid item key={index}>
                    <Box
                      component="img"
                      src={`/patient${photo}.jpg`}
                      alt={`Patient ${photo}`}
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        objectFit: 'cover',
                        border: '1px solid #ccc',
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
                  marginLeft: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <ImageIcon sx={{ fontSize: 40, color: '#3da9fc', mb: 1 }} />
                <Typography variant="body2" sx={{ mb: 1, color: 'gray' }}>
                  Upload Patient Picture
                </Typography>
                <Button variant="outlined" component="label" size="small">
                  Upload
                  <input type="file" multiple hidden />
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
              color: 'white',
            }}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Media;
