import React, { useState } from 'react';
import '../../assets/ProfessionalDashboard.css'; // Import du CSS dashboard professionnel
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Container,
  Tabs,
  Tab
} from '@mui/material';

import TopbarPro from '../../components/TopbarPro';
import SidebarPro from '../../components/SidebarPro';
import CompleteInfo from './CompleteInfo';
import ProfInfo from './ProfInfo';
import License from './License';
import Media from './Media';
import FooterPro from '../../components/FooterPro';
import ImageHeaderPro from '../../components/ImageHeaderPro';
import strip1 from "../../images/strip1.png"
import strip2 from "../../images/strip2.png"
import strip3 from "../../images/strip3.png"


function BodyMineProfilePage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };
  return (
    <div className="pro">
      <div className="pro-dash">
        {/* ░░ Top-bar ░░ */}
        <TopbarPro />
        <br />
        
        {/* ░░ Carousel ░░ */}
        <section className="partner-strip">
                  <img src={strip1} alt="Partner 1" />
                  <img src={strip2} alt="Partner 2" />
                  <img src={strip3} alt="Partner 3" />
                </section>
        
        {/* ░░ Layout ░░ */}
        <main className="flex w-full">
          {/* Sidebar */}
          <SidebarPro active='Edit'/>

          {/* Main Content */}          <div className="flex-1 flex flex-col gap-6 p-6">
            <Container maxWidth="lg">
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
                    </Box>                    {tabValue === 0 && <ProfInfo />}
                    {tabValue === 1 && <CompleteInfo />}
                    {tabValue === 2 && <License />}
                    {tabValue === 3 && <Media />}
                  </Paper>            </Container>
          </div>
        </main>
        
        {/* Footer */}
        <FooterPro />
      </div>
    </div>
  );
}

export default BodyMineProfilePage;
