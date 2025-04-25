import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Divider, 
  Avatar, 
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  IconButton,
  InputAdornment,
  AppBar,
  Toolbar,
  MenuItem
} from '@mui/material';    
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications'; 
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ImageIcon from '@mui/icons-material/Image';
import { 
  Dashboard as DashboardIcon,
  Edit as EditIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  BusinessCenter as BusinessCenterIcon,
  Security as SecurityIcon,
  ExitToApp as ExitToAppIcon,
  Upload as UploadIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  NotificationsNone as NotificationIcon
} from '@mui/icons-material';

import strip1 from '../images/strip1.png';
import strip2 from '../images/strip2.png';
import strip3 from '../images/strip3.png';
function BodyMineProfilePage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#87CEFA', boxShadow: 'none', color: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            BODY<span style={{ color: '#0078d4' }}>MINE</span>
          </Typography>
          <IconButton color="inherit">
            <NotificationIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ mr: 1 }}>
              Dr. Hiroshi
            </Typography>
            <Avatar src="/path-to-avatar.jpg" sx={{ width: 30, height: 30 }} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
        {/* Header Images (full width) */}
        <Box sx={{ width: '100vw', overflow: 'hidden', px: 2, mt: 2 }}>
        <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
            <Paper sx={{ p: 0, height: 150, width: 350, position: 'relative', overflow: 'hidden' }}>
                <Box 
                component="img" 
                src={strip1}
                alt="Partner" 
                sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'brightness(0.7)'
                }} 
                />
                <Typography 
                variant="h4" 
                sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    color: 'white',
                    fontWeight: 'bold'
                }}
                >
                PARTNER
                </Typography>
                <Typography 
                variant="subtitle1" 
                sx={{ 
                    position: 'absolute', 
                    top: '65%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    color: 'white'
                }}
                >
                Botox Filler
                </Typography>
            </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
            <Paper sx={{ p: 0, height: 150 ,width: 350}}>
                <Box 
                component="img" 
                src={strip2}
                alt="Clinic" 
                sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                }} 
                />
            </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
            <Paper sx={{ p: 0, height: 150,width: 350 }}>
                <Box 
                component="img" 
                src={strip3}
                alt="Products" 
                sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                }} 
                />
            </Paper>
            </Grid>
        </Grid>
        </Box>

<Container maxWidth="lg" sx={{ mt: 4 }}>
<Grid container spacing={2}>
    {/* Sidebar */}
    <Grid item xs={12} md={3}>
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2, 
            backgroundColor: 'white', 
            borderRadius: '8px',
            padding: '16px', 
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
            width: 'fit-content', 
            maxWidth: '500px', 
            marginBottom: '16px', 
            }}>
            <Avatar 
                src="/path-to-avatar.jpg" 
                sx={{ width: 40, height: 40, mr: 1 }} 
            />
            <Typography variant="subtitle1">Dr. Hiroshi</Typography>
            
            <IconButton size="small" sx={{ ml: 6 }}> 
                <NotificationsIcon fontSize="small" /> 
            </IconButton>


            </Box>


              <Paper sx={{ p: 2, mb: 2 }}>
              <List dense component="nav">
                <ListItem button>
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button variant="contained" color="primary" 
                  sx={{ 
                    bgcolor: '#3da9fc', 
                    color: 'white',
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: '#3098e5',
                    }
                  }}
                >
                  <ListItemIcon>
                    <EditIcon fontSize="small" sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Edit Profile" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <DescriptionIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Your Files" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Doctor ID" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <BusinessCenterIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Partner Services" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <SecurityIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Change Password" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <UploadIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Terms & Conditions" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Support" />
                </ListItem>
              </List>
              <Button 
                fullWidth 
                variant="contained" 
                sx={{ 
                  mt: 2,
                  bgcolor: '#3da9fc',
                  '&:hover': {
                    bgcolor: '#3098e5',
                  }
                }}
              >
                Logout
              </Button>
              <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', color: 'text.secondary' }}>
                Version 1.0.3
              </Typography>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3, backgroundColor: 'transparent' }}>
          <Typography 
            variant="h6" 
            component="h2" 
            color="#81bfe4" 
            sx={{ mb: 2 }} 
            gutterBottom
            >
            Update Profile
            </Typography>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Prof Info" />
                  <Tab label="Complement Info" />
                  <Tab label="License" />
                  <Tab label="Media" />
                </Tabs>
              </Box>

              {tabValue === 0 && (
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
                
                    {/* Le reste aligné à gauche avec de la marge */}
                    <Grid item sx={{ px: 20 }}>
                        <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>Name</Typography>
                        <TextField
                        fullWidth
                        size="small"
                        defaultValue="Albert Drake"
                        variant="outlined"
                        sx={{ borderRadius: '8px', backgroundColor: 'white' }}
                        />
                    </Grid>
                
                    <Grid item sx={{ px: 20 }}>
                        <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>Email</Typography>
                        <TextField
                        fullWidth
                        size="small"
                        defaultValue="albert.drake@email.com"
                        variant="outlined"
                        sx={{ borderRadius: '8px', backgroundColor: 'white' }}
                        />
                    </Grid>
                
                
                    <Grid item sx={{ px: 20 }}>
                        <Typography variant="subtitle2" color="darkblue">Numero</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                            <TextField
                                fullWidth
                                size="small"
                                select
                                variant="outlined"
                                sx={{ borderRadius: '8px', backgroundColor: 'white' }}
                            >
                                <MenuItem value="+33" >+33</MenuItem>
                                <MenuItem value="+213">+213</MenuItem>
                                <MenuItem value="+1" >+1</MenuItem>
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
                        <Typography variant="subtitle2" color="darkblue">Address</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            margin="dense"
                            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
                        />
                        </Grid>

                        <Grid item sx={{ px: 20 }}>
                        <Typography variant="subtitle2" color="darkblue">Country</Typography>
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

                            <MenuItem value="France" >France</MenuItem>
                            <MenuItem value="Algeria">Algeria</MenuItem>    
                            <MenuItem value="United Kingdom" >United Kingdom</MenuItem>
                        </TextField>
                        </Grid>

                        <Grid item sx={{ px: 20 }}>
                        <Typography variant="subtitle2" color="darkblue">Specialization</Typography>
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
                            <MenuItem value="Expert in advanced medicine" sx={{ color: 'darkblue' }}>Expert in advanced medicine</MenuItem>
                            <MenuItem value="General Practitioner" sx={{ color: 'darkblue' }}>General Practitioner</MenuItem>
                            <MenuItem value="Cardiologist" sx={{ color: 'darkblue' }}>Cardiologist</MenuItem>
                        </TextField>

                        {/* Bouton Save aligné à droite */}
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
            )}

        {tabValue === 1 && (
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
                {/* Website */}
                <Grid item sx={{ px: 20 }}>
                    <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
                    Website
                    </Typography>
                    <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="https://example.com"
                    sx={{ borderRadius: '8px', backgroundColor: 'white' }}
                    />
                </Grid>

                {/* Facebook */}
                <Grid item sx={{ px: 20 }}>
                    <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
                    Facebook
                    </Typography>
                    <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="https://facebook.com/..."
                    sx={{ borderRadius: '8px', backgroundColor: 'white' }}
                    />
                </Grid>

                {/* Instagram */}
                <Grid item sx={{ px: 20 }}>
                    <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
                    Instagram
                    </Typography>
                    <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="https://instagram.com/..."
                    sx={{ borderRadius: '8px', backgroundColor: 'white' }}
                    />
                </Grid>

                {/* About Me */}
                <Grid item sx={{ px: 20 }}>
                    <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
                    About me
                    </Typography>
                    <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Tell us a bit more about yourself..."
                    multiline
                    minRows={1}
                    sx={{ borderRadius: '8px', backgroundColor: 'white' }}
                    />
                </Grid>

                {/* Working Hours */}
                <Grid item sx={{ px: 20 }}>
                    <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
                    Working Hours
                    </Typography>
                    <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="e.g. Mon-Fri 09:00 - 17:00"
                    sx={{ borderRadius: '8px', backgroundColor: 'white' }}
                    />
                </Grid>

                {/* Practice Tenue */}
                <Grid item sx={{ px: 20 }}>
                    <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
                    Practice Tenue
                    </Typography>
                    <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="e.g. Medical coat, Sports gear..."
                    sx={{ borderRadius: '8px', backgroundColor: 'white' }}
                    />
                </Grid>

                {/* Practice Start Date */}
                <Grid item sx={{ px: 20 }}>
                    <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
                    Practice Start Date
                    </Typography>
                    <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    type="date"
                    sx={{ borderRadius: '8px', backgroundColor: 'white' }}
                    />
                </Grid>

                {/* Save Changes Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
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
            </Box>
            )}
            {tabValue === 2 && (
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
              
                    {/* Box for uploading Front of LIC */}
                    <Box
                      sx={{
                        borderRadius: '8px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'Left',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        mt: 3,
                        marginLeft: 20,
                        marginRight: 20,
                        width: 400,
                      }}
                    >
                      <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
                        Upload Front of Your LIC
                      </Typography>
                      <Typography variant="subtitle4" color="grey" sx={{ mb: 1 }}>
                        PNG, JPG,or PDF (min 4MB max 5MB)
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
                        }}
                      >
                        Upload Front
                        <input type="file" hidden />
                      </Button>
                    </Box>
              
                    {/* Save Button */}
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
                </Box>
              )}  
          {tabValue === 3 && (
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
)}
            
            </Paper>
          </Grid>
        </Grid>
      </Container>
      </Grid>
      </Container>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          mt: 'auto', 
          py: 3, 
          bgcolor: '#87CEFA',
          color: 'text.primary' 
        }}
      >
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                BODY<span style={{ color: '#0078d4' }}>MINE</span>
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                BodyMine is the leading directory to help you find the right treatment clinic, anywhere in the world.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton size="small" sx={{ color: '#3b5998' }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: '#1da1f2' }}>
                  <TwitterIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: '#0077b5' }}>
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Home</Typography>
                  <Typography variant="body2" color="text.secondary">Search</Typography>
                  <Typography variant="body2" color="text.secondary">Chat</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Info</Typography>
                  <Typography variant="body2" color="text.secondary">Terms & Conditions</Typography>
                  <Typography variant="body2" color="text.secondary">Privacy Policy</Typography>
                  <Typography variant="body2" color="text.secondary">FAQs</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Contact Us</Typography>
                  <Typography variant="body2" color="text.secondary">contact@bodymine.com</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default BodyMineProfilePage;