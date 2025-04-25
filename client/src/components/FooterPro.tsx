import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  IconButton, 
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const FooterPro = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#67b7e1', // Light blue color as seen in the image
        py: 3,
        color: 'white',
        width: '100%'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Logo and description - Left side */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  mb: 1
                }}
              >
                <Box component="span" sx={{ color: 'black' }}>BODY</Box>
                <Box component="span" sx={{ color: 'white' }}>MINE</Box>
                <Box component="span" sx={{ 
                  fontSize: '10px', 
                  verticalAlign: 'super', 
                  color: 'white',
                  ml: 0.5
                }}>
                  COSMETIC SURGERY
                </Box>
              </Typography>
              
              {/* Social media icons */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <IconButton 
                  aria-label="facebook" 
                  size="small" 
                  sx={{ color: 'white', p: 0 }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  aria-label="twitter" 
                  size="small" 
                  sx={{ color: 'white', p: 0 }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton 
                  aria-label="email" 
                  size="small" 
                  sx={{ color: 'white', p: 0 }}
                >
                  <EmailIcon />
                </IconButton>
              </Box>
              
              {/* Description text */}
              <Typography variant="body2" sx={{ maxWidth: '350px' }}>
                Bodymine is the leading directory to help you find the perfect
                surgeon or clinic, anywhere in the world.
              </Typography>
            </Box>
          </Grid>
          
          {/* Navigation Links - Right side */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={isMobile ? 2 : 5}>
              {/* First column of links */}
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                  Home
                </Typography>
                <Link href="#" underline="none" color="inherit" sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem' }}>
                  Menu
                </Link>
                <Link href="#" underline="none" color="inherit" sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem' }}>
                  Chat
                </Link>
                <Link href="#" underline="none" color="inherit" sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem' }}>
                  FAQ's
                </Link>
              </Grid>
              
              {/* Second column of links */}
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                  Info
                </Typography>
                <Link href="#" underline="none" color="inherit" sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem' }}>
                  Terms & Conditions
                </Link>
                <Link href="#" underline="none" color="inherit" sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem' }}>
                  Privacy Policy
                </Link>
              </Grid>
              
              {/* Third column of links */}
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                  Contact Us
                </Typography>
                <Link href="mailto:info@bodymine.com" underline="none" color="inherit" sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem' }}>
                  info@bodymine.com
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FooterPro;