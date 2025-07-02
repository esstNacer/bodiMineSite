import React, { useState } from 'react';
import '../../assets/ProfessionalDashboard.css'; // Import du CSS dashboard professionnel
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
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
            <div style={{ width: '100%' }}>
              <Paper sx={{ p: 3, backgroundColor: 'transparent', width: '100%' }}><Typography 
                      variant="h3" 
                      component="h2" 
                      color="#81bfe4" 
                      sx={{ mb: 3, fontSize: '2.5rem', fontWeight: 700 }} 
                      gutterBottom
                    >
                      Update Profile
                    </Typography>                    <Box sx={{ 
                      borderBottom: 1, 
                      borderColor: 'divider', 
                      mb: 3, 
                      width: '100% !important',
                      margin: '0 !important',
                      padding: '0 !important',
                      boxSizing: 'border-box !important'
                    }}>
                      <Tabs 
                        value={tabValue} 
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        sx={{
                          width: '100% !important',
                          margin: '0 !important',
                          padding: '0 !important',
                          '& .MuiTabs-root': {
                            width: '100% !important'
                          },
                          '& .MuiTabs-scroller': {
                            width: '100% !important'
                          },
                          '& .MuiTabs-flexContainer': {
                            width: '100% !important',
                            display: 'flex !important'
                          },
                          '& .MuiTab-root': {
                            fontSize: '1.4rem !important',
                            fontWeight: '700 !important',
                            textTransform: 'none !important',
                            minHeight: '80px !important',
                            padding: '20px 4px !important',
                            flex: '1 1 25% !important',
                            maxWidth: 'none !important',
                            minWidth: '0 !important',
                            width: '25% !important'
                          }
                        }}
                      >
                        <Tab label="Prof Info" />
                        <Tab label="Complement Info" />
                        <Tab label="License" />
                        <Tab label="Media" />
                      </Tabs>
                    </Box>{tabValue === 0 && <ProfInfo />}
                    {tabValue === 1 && <CompleteInfo />}
                    {tabValue === 2 && <License />}
                    {tabValue === 3 && <Media />}
                  </Paper>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <FooterPro />
      </div>
    </div>
  );
}

export default BodyMineProfilePage;
