import { useState } from 'react';
import { 
  Box, Button, Dialog, DialogContent, DialogTitle, 
  Grid, TextField, Typography, IconButton,
  Switch, FormControlLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function CompleteInfo() {
  const [openWorkingHours, setOpenWorkingHours] = useState(false);

  // Model for working hours based on the Figma design
  const [workingHours, setWorkingHours] = useState([
    { day: 'Monday', active: true, from: '09:00', to: '17:30' },
    { day: 'Tuesday', active: true, from: '09:00', to: '17:30' },
    { day: 'Wednesday', active: true, from: '09:00', to: '17:30' },
    { day: 'Thursday', active: true, from: '09:00', to: '17:30' },
    { day: 'Friday', active: true, from: '09:00', to: '17:30' },
    { day: 'Saturday', active: false, from: '', to: '' },
    { day: 'Sunday', active: false, from: '', to: '' },
  ]);

  const handleDayToggle = (index: number, active: boolean) => {
    const updatedHours = [...workingHours];
    updatedHours[index].active = active;
    setWorkingHours(updatedHours);
  };

  const handleTimeChange = (index: number, field: string, value: string) => {
    const updatedHours = [...workingHours];
    updatedHours[index][field] = value;
    setWorkingHours(updatedHours);
  };

  // Format working hours for display in the text field
  const formatWorkingHours = () => {
    const activeDays = workingHours.filter(day => day.active);
    if (activeDays.length === 0) return 'Click to set working hours';
    
    // Just show how many days are set
    return `${activeDays.length} days set`;
  };

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

        {/* Website */}
        <Grid item sx={{ px: 20 }}>
          <Typography variant="subtitle2" color="darkblue" sx={{ mb: 1 }}>
            Web
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Web url"
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
            placeholder="Web url"
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
            placeholder="Web url"
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
            placeholder="Click to set working hours"
            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
            onClick={() => setOpenWorkingHours(true)}
            value={formatWorkingHours()}
            InputProps={{
              readOnly: true,
              endAdornment: <KeyboardArrowDownIcon />
            }}
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
            placeholder="e.g. 3 years"
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
            placeholder="jj/mm/aaaa"
            sx={{ borderRadius: '8px', backgroundColor: 'white' }}
          />
        </Grid>

        {/* Save Changes Button */}
        <Grid item sx={{ px: 20 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#3da9fc',
                '&:hover': { bgcolor: '#3098e5' },
                color: 'white',
                borderRadius: '8px',
                padding: '8px 16px',
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Working Hours Dialog - styled to match Figma */}
      <Dialog 
        open={openWorkingHours} 
        onClose={() => setOpenWorkingHours(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            overflow: 'visible',
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6">Select Working Hours</Typography>
          <IconButton onClick={() => setOpenWorkingHours(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {workingHours.map((day, index) => (
            <Box key={day.day} sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mb: 2
            }}>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                width: '100%'
              }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={day.active}
                      onChange={(e) => handleDayToggle(index, e.target.checked)}
                      sx={{ mr: 1 }}
                    />
                  }
                  label={day.day}
                  sx={{ 
                    width: '110px', 
                    mr: 1,
                    '.MuiFormControlLabel-label': {
                      fontSize: '14px'
                    }
                  }}
                />

                {day.active ? (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <Box sx={{ mr: 1 }}>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>From</Typography>
                        <TextField
                          select
                          size="small"
                          value={day.from}
                          onChange={(e) => handleTimeChange(index, 'from', e.target.value)}
                          sx={{ 
                            width: '90px',
                            '.MuiOutlinedInput-input': {
                              fontSize: '14px',
                              py: 1
                            }
                          }}
                          SelectProps={{
                            native: true,
                            IconComponent: KeyboardArrowDownIcon
                          }}
                        >
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = String(i).padStart(2, '0');
                            return (
                              <option key={`${hour}:00`} value={`${hour}:00`}>{`${hour}:00`}</option>
                            );
                          })}
                        </TextField>
                      </Box>

                      <Box>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>To</Typography>
                        <TextField
                          select
                          size="small"
                          value={day.to}
                          onChange={(e) => handleTimeChange(index, 'to', e.target.value)}
                          sx={{ 
                            width: '90px',
                            '.MuiOutlinedInput-input': {
                              fontSize: '14px',
                              py: 1
                            }
                          }}
                          SelectProps={{
                            native: true,
                            IconComponent: KeyboardArrowDownIcon
                          }}
                        >
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = String(i).padStart(2, '0');
                            return (
                              <option key={`${hour}:30`} value={`${hour}:30`}>{`${hour}:30`}</option>
                            );
                          })}
                        </TextField>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ 
                    flex: 1, 
                    bgcolor: '#f5f5f5', 
                    borderRadius: '4px',
                    padding: '8px 12px',
                    fontSize: '14px',
                    color: '#757575'
                  }}>
                    Closed
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </Box>
  );
}