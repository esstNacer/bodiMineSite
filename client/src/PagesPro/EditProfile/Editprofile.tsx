import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Container,
  Tabs,
  Tab
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

import strip1 from '../../images/strip1.png';
import strip2 from '../../images/strip2.png';
import strip3 from '../../images/strip3.png';

import TopbarPro from '../../components/TopbarPro';
import SidebarPro from '../../components/SidebarPro';
import CompleteInfo from './CompleteInfo';
import ProfInfo from './ProfInfo';
import License from './License';
import Media from './Media';
import FooterPro from '../../components/FooterPro';

function BodyMineProfilePage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <> <div className='pure'>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <div className="pro">
        <div className="pro-dash">
        <TopbarPro />
</div>
</div>
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
                  <Paper sx={{ p: 0, height: 150, width: 350 }}>
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
                  <Paper sx={{ p: 0, height: 150, width: 350 }}>
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

            {/* Profile Content */}
            <Container maxWidth="lg" sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                {/* Sidebar */}
                
                <SidebarPro />

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

                    {tabValue === 0 && <ProfInfo />}
                    {tabValue === 1 && <CompleteInfo />}
                    {tabValue === 2 && <License />}
                    {tabValue === 3 && <Media />}
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <FooterPro />
      </div>
    </>
  );
}

export default BodyMineProfilePage;
