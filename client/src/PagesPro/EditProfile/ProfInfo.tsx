import { Box, Grid, Typography, TextField, MenuItem, Button, Avatar } from '@mui/material';

export default function ProfInfo() {
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
        
        {/* Avatar centré */}
        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar 
            src="/path-to-profile-image.jpg" 
            sx={{ width: 100, height: 100 }} 
          />
        </Grid>

        <Grid item sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2" color="primary">
            Change Picture
          </Typography>
        </Grid>

        {/* Informations utilisateur */}
        <Grid item sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
            Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            defaultValue="Albert Drake"
            variant="outlined"
            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
          />
        </Grid>

        <Grid item sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
            Email
          </Typography>
          <TextField
            fullWidth
            size="small"
            defaultValue="albert.drake@email.com"
            variant="outlined"
            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
          />
        </Grid>

        <Grid item sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue">
            Numero
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                select
                variant="outlined"
                sx={{ borderRadius: '8px', backgroundColor: 'white' }}
              >
                <MenuItem value="+33">+33</MenuItem>
                <MenuItem value="+213">+213</MenuItem>
                <MenuItem value="+1">+1</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                size="small"
                defaultValue="123456789"
                variant="outlined"
                sx={{ borderRadius: '8px', backgroundColor: 'white' }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue">
            Address
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            margin="dense"
            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
          />
        </Grid>

        <Grid item sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue">
            Country
          </Typography>
          <TextField
            fullWidth
            size="small"
            select
            defaultValue="France"
            variant="outlined"
            margin="dense"
            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
            inputProps={{ style: { color: 'darkblue' } }}
          >
            <MenuItem value="France">France</MenuItem>
            <MenuItem value="Algeria">Algeria</MenuItem>
            <MenuItem value="United Kingdom">United Kingdom</MenuItem>
          </TextField>
        </Grid>

        <Grid item sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue">
            Specialization
          </Typography>
          <TextField
            fullWidth
            size="small"
            select
            defaultValue="Expert in advanced medicine"
            variant="outlined"
            margin="dense"
            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
            inputProps={{ style: { color: 'darkblue' } }}
          >
            <MenuItem value="Expert in advanced medicine">Expert in advanced medicine</MenuItem>
            <MenuItem value="General Practitioner">General Practitioner</MenuItem>
            <MenuItem value="Cardiologist">Cardiologist</MenuItem>
          </TextField>
        </Grid>

        {/* Bouton Save aligné à droite */}
        <Grid item sx={{ px: 20 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
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
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}
