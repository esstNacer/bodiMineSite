import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import TopBarPro from '../../components/TopBarPro';
import SidebarPro from '../../components/SidebarPro';
import FooterPro from '../../components/FooterPro';
import ImageHeaderPro from '../../components/ImageHeaderPro';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Radio } from '@mui/material';

export default function ChoosePlan() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState('');


  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
    setStep(2);
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleServiceToggle = (service: string) => {
    if (additionalServices.includes(service)) {
      setAdditionalServices(additionalServices.filter((s) => s !== service));
    } else {
      setAdditionalServices([...additionalServices, service]);
    }
  };

  const handlePayment = () => {
    setStep(3);
  };

  const services = [
    { name: 'Banner', price: '€400', description: 'Premium banner placement at the top of the site for maximum visibility' },
    { name: 'Top List', price: '€100', description: 'Featured placement in top listing' },
    { name: 'Matching Service', price: '€30/month', description: 'Receive phone notifications of patient enquiries' }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <TopBarPro />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {/* Header Images (full width) */}
          <Grid item xs={12}>
            <ImageHeaderPro />
          </Grid>

          {/* Main Content */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Sidebar */}
            <Grid item xs={12} md={3}>
              <SidebarPro />
            </Grid>

            {/* Steps Content */}
            <Grid item xs={12} md={9}>
            <Box sx={{
              flex: 1,
              p: 4,
              bgcolor: 'white',   // Fond blanc
              borderRadius: 2,
              width: '800px',
              maxWidth: '1000px',  // Largeur fixe
              minHeight: '700px',  // Hauteur minimum fixe pour toutes les étapes
              margin: '0 auto',
              alignItems: 'center',
            }}>
            {step === 1 && (
            <Box sx={{
              p: 4,
              textAlign: 'center'
            }}>
              <Typography variant="h4" sx={{ mb: 4, color: '#000' }}>
                Create your Account
              </Typography>

              <Box sx={{
                bgcolor: '#f3f6fa',
                display: 'flex',
                flexDirection: 'column',
                height: '500px',
                marginTop: 2,
                padding: 12,
                gap: 3,
                alignItems: 'center'
              }}>
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 2,
                    p: 3,
                    width: '100%',
                    maxWidth: '600px',
                    cursor: 'pointer',
                    borderRadius: 2,
                    p: 3,
                    '&:hover': { border: '1px solid #87CEFA', color: '#87CEFA' },

                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                  onClick={() => handleUserTypeSelect('doctor')}
                >
                  <PersonIcon sx={{ fontSize: 48, color: '#87CEFA' }} />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6">Doctor</Typography>
                    <Typography variant="body2">Individual medical practitioner</Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 2,
                    p: 3,
                    width: '100%',
                    maxWidth: '600px',
                    cursor: 'pointer',
                    '&:hover': { border: '1px solid #87CEFA', color: '#87CEFA' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                  onClick={() => handleUserTypeSelect('clinic')}
                >
                  <BusinessIcon sx={{ fontSize: 48, color: '#87CEFA' }} />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6">Hospital or Clinic</Typography>
                    <Typography variant="body2">Healthcare facility</Typography>
                  </Box>
                </Box>
                <Typography variant="body2">
                    Already have an account?{' '}
                    <span style={{ color: '#87CEFA', cursor: 'pointer' }}>Sign in</span>
                    </Typography>
              </Box>
            </Box>
          )}


                {step === 2 && (
                  <Box sx={{  borderRadius: 2, p: 4 }}>
                    <Grid container spacing={3}>
                      {/* Left side - Plan selection */}
                      <Grid item xs={12} md={5}>
                        <Typography variant="h5" sx={{ mb: 3 }}>
                          {userType === 'doctor' ? 'Doctor Plan' : 'Clinic Plan'}
                        </Typography>

                        {userType === 'doctor' ? (
                          <Card sx={{ borderRadius: 2, maxWidth: '320px', marginBottom: 2 }}>
                            <CardContent>
                              <Typography variant="h6" color="primary" gutterBottom>
                                Doctor Subscription
                              </Typography>
                              <Typography variant="h3" gutterBottom>
                                $150
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                1 Doctor Profile
                              </Typography>
                              <List>
                                {['Full Access to Dashboard', 'Patient Management System', 'Unlimited Live Chat with Patients'].map((item, idx) => (
                                  <ListItem key={idx}>
                                    <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
                                    <ListItemText primary={item} />
                                  </ListItem>
                                ))}
                              </List>
                              <Button
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={() => handlePlanSelect('doctor')}
                              >
                                Choose Plan
                              </Button>
                            </CardContent>
                          </Card>
                        ) : (
                          <>
                            {[{ price: "$300", doctors: "2 Doctor Profiles", id: 'clinic300' },
                            { price: "$600", doctors: "6 Doctor Profiles", id: 'clinic600' }].map((plan, index) => (
                              <Card key={index} sx={{ mb: 2, borderRadius: 2, maxWidth: '320px' }}>
                                <CardContent>
                                  <Typography variant="h6" color="primary" gutterBottom>
                                    Clinic Subscription
                                  </Typography>
                                  <Typography variant="h3" gutterBottom>
                                    {plan.price}
                                  </Typography>
                                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                    {plan.doctors}
                                  </Typography>
                                  <List>
                                    <ListItem>
                                      <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
                                      <ListItemText primary="Full Access to Dashboard" />
                                    </ListItem>
                                    <ListItem>
                                      <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
                                      <ListItemText primary={index === 0 ? "Clinic Management System" : "Advanced Clinic Management"} />
                                    </ListItem>
                                    <ListItem>
                                      <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
                                      <ListItemText primary="Unlimited Live Chat with Patients" />
                                    </ListItem>
                                  </List>
                                  <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    onClick={() => handlePlanSelect(plan.id)}
                                  >
                                    Choose Plan
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </>
                        )}
                      </Grid>

                      {/* Right side - Add services */}
                      <Grid item xs={12} md={7}>
                        <Typography variant="h5" sx={{ mb: 3 }}>
                          Add Services
                        </Typography>

                        {services.map((service, index) => (
                          <Card key={index} sx={{ mb: 2, borderRadius: 2, maxWidth: '320px' }}>
                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="h6">{service.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{service.description}</Typography>
                              </Box>
                              <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="h6" color="primary" sx={{ mb: 1 }}>{service.price}</Typography>
                                <Button
                                  variant={additionalServices.includes(service.name) ? "contained" : "outlined"}
                                  startIcon={<AddCircleOutlineIcon />}
                                  onClick={() => handleServiceToggle(service.name)}
                                >
                                  {additionalServices.includes(service.name) ? 'Selected' : 'Select Service'}
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        ))}

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                          <Button variant="outlined" onClick={() => setStep(1)}>Back</Button>
                          <Button
                            variant="contained"
                            onClick={handlePayment}
                            endIcon={<ArrowForwardIcon />}
                            disabled={!selectedPlan}
                          >
                            Continue to Payment
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                                  )}

                  {step === 3 && (
                    <Box sx={{
                      borderRadius: 2,
                      p: 4,
                      textAlign: 'center'
                    }}>
                      <Typography variant="h4" sx={{ mb: 4 }}>
                        Payment
                      </Typography>

                      <Box sx={{
                        bgcolor: '#fff',
                        borderRadius: 2,
                        p: 3,
                        maxWidth: '500px',
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3
                      }}>
                        {[
                          { name: 'Google Pay', icon: '/icons/google-pay.png' },
                          { name: 'PayPal', icon: '/icons/paypal.png' },
                          { name: 'Apple Pay', icon: '/icons/apple-pay.png' },
                          { name: 'Amazon Pay', icon: '/icons/amazon-pay.png' }
                        ].map((platform, index) => (
                          <Box key={index} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            border: '2px solid #eee',
                            borderRadius: 2,
                            cursor: 'pointer',
                            '&:hover': { borderColor: '#87CEFA', bgcolor: '#f9f9f9' }
                          }}>
                            <Box sx={{
                              width: 50,
                              height: 50,
                              borderRadius: '50%',
                              overflow: 'hidden',
                              bgcolor: '#f0f0f0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2
                            }}>
                              <img src={platform.icon} alt={platform.name} style={{ width: '60%', height: '60%' }} />
                            </Box>
                            <Typography sx={{ flexGrow: 1, textAlign: 'left', fontWeight: 'bold' }}>
                              {platform.name}
                            </Typography>
                            <Radio
                              checked={selectedPlatform === platform.name}
                              onChange={() => setSelectedPlatform(platform.name)}
                              value={platform.name}
                              name="payment-platform"
                              color="primary"
                            />
                          </Box>
                        ))}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                          <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => setStep(2)}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            endIcon={<CheckCircleIcon />}
                            onClick={() => setStep(4)}
                            disabled={!selectedPlatform}
                          >
                            Confirm Payment
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )}

                  {step === 4 && (
                  <Box sx={{
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center'
                  }}>
                    <Box sx={{
                      bgcolor: '#fff',
                      borderRadius: 2,
                      p: 3,
                      maxWidth: '400px',
                      margin: '0 auto'
                    }}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                      <Typography variant="h4" gutterBottom>
                        Payment Successfully
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Thank you for purchasing our plan. We value you!
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => window.location.href = '/dashboard'}
                      >
                        Go to Dashboard
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <FooterPro />
    </Box>
  );
}
