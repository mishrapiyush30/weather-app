import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import GrainIcon from '@mui/icons-material/Grain';
import OpacityIcon from '@mui/icons-material/Opacity';
import { useWeather } from '../../contexts/WeatherContext';
import CircularLoader from '../Loader/CircularLoader';

const ForecastGrid: React.FC = () => {
  const { forecastData, loading, error, temperatureUnit } = useWeather();

  // Weather icon mapping
  const getWeatherIcon = (condition: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      'Clear': <WbSunnyIcon fontSize="large" sx={{ color: '#FFD700' }} />,
      'Clouds': <CloudIcon fontSize="large" sx={{ color: '#B0C4DE' }} />,
      'Rain': <UmbrellaIcon fontSize="large" sx={{ color: '#4682B4' }} />,
      'Snow': <AcUnitIcon fontSize="large" sx={{ color: '#F0F8FF' }} />,
      'Thunderstorm': <FlashOnIcon fontSize="large" sx={{ color: '#9370DB' }} />,
      'Drizzle': <GrainIcon fontSize="large" sx={{ color: '#87CEEB' }} />,
      'Mist': <OpacityIcon fontSize="large" sx={{ color: '#B0C4DE', opacity: 0.7 }} />,
      'Fog': <OpacityIcon fontSize="large" sx={{ color: '#B0C4DE', opacity: 0.5 }} />,
      'Haze': <OpacityIcon fontSize="large" sx={{ color: '#D3D3D3', opacity: 0.6 }} />,
    };
    
    return iconMap[condition] || <WbSunnyIcon fontSize="large" />;
  };

  if (loading) {
    return <CircularLoader />;
  }

  if (error || !forecastData || forecastData.list.length === 0) {
    return null;
  }

  const unitSymbol = temperatureUnit === 'celsius' ? '°C' : '°F';

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        color: 'white',
      }}
    >
      <Typography variant="h6" component="h3" sx={{ mb: 2, textAlign: 'center' }}>
        5-Day Forecast
      </Typography>

      <Grid container spacing={2}>
        {forecastData.list.map((day, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Paper
              sx={{
                p: 2,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body2" sx={{ mb: 1 }}>
                {day.dayOfWeek}, {day.date.split(' ')[1]} {day.date.split(' ')[2]}
              </Typography>
              
              <Box sx={{ my: 1 }}>
                {getWeatherIcon(day.condition)}
              </Box>
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                {day.condition}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Typography variant="h6" component="p">
                  {day.temperature.max}{unitSymbol}
                </Typography>
                <Typography variant="body2" component="p" sx={{ alignSelf: 'center', opacity: 0.7 }}>
                  {day.temperature.min}{unitSymbol}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ForecastGrid; 