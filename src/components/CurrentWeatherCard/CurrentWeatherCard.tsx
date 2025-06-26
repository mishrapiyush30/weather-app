import React from 'react';
import { Paper, Typography, Grid, Box, IconButton } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import GrainIcon from '@mui/icons-material/Grain';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { useWeather } from '../../contexts/WeatherContext';
import CircularLoader from '../Loader/CircularLoader';

const CurrentWeatherCard: React.FC = () => {
  const { weatherData, loading, error, temperatureUnit, toggleTemperatureUnit } = useWeather();

  // Weather icon mapping
  const getWeatherIcon = (condition: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
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

  if (error || !weatherData) {
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
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
          {getWeatherIcon(weatherData.condition)}
        </Box>
        <Typography variant="h5" component="h2">
          {weatherData.city}, {weatherData.country}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h1" component="p" sx={{ fontWeight: 'bold' }}>
            {weatherData.temperature}
            <Box 
              component="span" 
              sx={{ 
                fontSize: '0.5em', 
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
              onClick={toggleTemperatureUnit}
            >
              {unitSymbol}
            </Box>
          </Typography>
        </Box>
        <Typography variant="h6" component="p">
          {weatherData.description.charAt(0).toUpperCase() + weatherData.description.slice(1)}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
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
            <OpacityIcon sx={{ mb: 1 }} />
            <Typography variant="body2">Humidity</Typography>
            <Typography variant="h6">{weatherData.humidity}%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
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
            <AirIcon sx={{ mb: 1 }} />
            <Typography variant="body2">Wind Speed</Typography>
            <Typography variant="h6">{weatherData.windSpeed} km/h</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
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
            <VisibilityIcon sx={{ mb: 1 }} />
            <Typography variant="body2">Visibility</Typography>
            <Typography variant="h6">{weatherData.visibility} km</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
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
            <DeviceThermostatIcon sx={{ mb: 1 }} />
            <Typography variant="body2">Feels Like</Typography>
            <Typography variant="h6">{weatherData.feelsLike}{unitSymbol}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CurrentWeatherCard; 