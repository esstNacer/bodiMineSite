import React from 'react';
import { Box, Grid, Typography, TextField, Button } from '@mui/material';

const License = () => {
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
      <Grid container direction="column" spacing={2}>
        {/* Name on LIC Person */}
        <Grid item sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
            Name on LIC Person
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Full Name"
            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
          />
        </Grid>

        {/* LIC Number */}
        <Grid item sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
            LIC Number
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Enter LIC Number"
            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
          />
        </Grid>

        {/* Address on LIC */}
        <Grid item sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
            Address on LIC
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Street Address"
            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
          />
        </Grid>

        {/* Postal Code */}
        <Grid item sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
            Postal Code
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Postal Code"
            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
          />
        </Grid>

        {/* Date of Birth */}
        <Grid item sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
            Date of Birth
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            type="date"
            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
          />
        </Grid>

        {/* Upload Front of LIC */}
        <Grid item sx={{ px: 20 }}>
          <Box
            sx={{
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
            }}
          >
            <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
              Upload Front of Your LIC
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              PNG, JPG, or PDF (min 4MB, max 5MB)
            </Typography>
            <Button
              variant="outlined"
              component="label"
              sx={{
                bgcolor: '#f0f7ff',
                '&:hover': { bgcolor: '#e3f2ff' },
                color: '#3da9fc',
                borderRadius: '8px',
                padding: '8px 24px',
                alignSelf: 'start',
              }}
            >
              Upload Front
              <input type="file" hidden />
            </Button>
          </Box>
        </Grid>

        {/* Save Button */}
        <Grid item sx={{ px: 20 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default License;
