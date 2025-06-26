import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Typography } from '@mui/material';
import { WeatherProvider } from './contexts/WeatherContext';
import { getThemeByWeatherCondition } from './themes/theme';
import SearchBar from './components/SearchBar/SearchBar';
import CurrentWeatherCard from './components/CurrentWeatherCard/CurrentWeatherCard';
import ForecastGrid from './components/ForecastGrid/ForecastGrid';
import CircularLoader from './components/Loader/CircularLoader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Logo from './components/Logo/Logo';
import { useWeather } from './contexts/WeatherContext';
import { WeatherCondition } from './types/weather';

// Theme wrapper component to handle theme updates based on weather condition
const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { weatherData } = useWeather();
  const [theme, setTheme] = useState(getThemeByWeatherCondition('Clear'));

  // Update theme when weather condition changes
  useEffect(() => {
    if (weatherData && weatherData.condition) {
      setTheme(getThemeByWeatherCondition(weatherData.condition as WeatherCondition));
    }
  }, [weatherData]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <ThemeWrapper>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            background: theme => 
              `linear-gradient(to bottom, ${theme.palette.primary.main}40, ${theme.palette.secondary.main}90)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 4,
            pb: 4,
            transition: 'background 1s ease-in-out',
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                textAlign: 'center',
                mb: 4,
              }}
            >
              <Logo size="large" />
              <Box mt={1}>
                <SearchBar />
              </Box>
            </Box>
            
            <WeatherContent />
          </Container>
        </Box>
      </ThemeWrapper>
    </WeatherProvider>
  );
};

// Separate component to handle weather content display
const WeatherContent: React.FC = () => {
  const { loading, error, weatherData } = useWeather();

  if (loading) {
    return <CircularLoader size="large" />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  // Only show weather data if we have it
  if (!weatherData) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        color: 'white', 
        mt: 4, 
        p: 4, 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: 4 
      }}>
        <Typography variant="h6">
          Enter a city name to see weather information
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mt: 4 }}>
        <CurrentWeatherCard />
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <ForecastGrid />
      </Box>
    </>
  );
};

export default App; 