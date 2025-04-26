import { Box, Grid, Paper, Typography } from "@mui/material";
import strip1 from "../images/strip1.png"; // Update the extension to match the actual file
import strip2 from "../images/strip2.png"; // Update the extension to match the actual file
import strip3 from "../images/strip3.png"; // Update the extension to match the actual file

const ImageHeaderPro = () => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden', px: 2, mt: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        
        {/* Bloc 1 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 0, position: 'relative', overflow: 'hidden', width: '100%', height: 150 }}>
            <Box
              component="img"
              src={strip1}
              alt="Partner"
              role="img"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.7)',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
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
                color: 'white',
                textAlign: 'center',
              }}
            >
              Botox Filler
            </Typography>
          </Paper>
        </Grid>

        {/* Bloc 2 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 0, overflow: 'hidden', width: '100%', height: 150 }}>
            <Box
              component="img"
              src={strip2}
              alt="Clinic"
              role="img"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Paper>
        </Grid>

        {/* Bloc 3 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 0, overflow: 'hidden', width: '100%', height: 150 }}>
            <Box
              component="img"
              src={strip3}
              alt="Products"
              role="img"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default ImageHeaderPro;
