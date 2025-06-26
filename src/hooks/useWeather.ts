import { useEffect } from 'react';
import { useWeather } from '../contexts/WeatherContext';

// Custom hook for weather data
export const useWeatherData = (initialCity?: string) => {
  const {
    weatherData,
    forecastData,
    loading,
    error,
    temperatureUnit,
    searchCity,
    toggleTemperatureUnit,
    clearError
  } = useWeather();

  // Load initial city on component mount only if provided
  useEffect(() => {
    if (initialCity && initialCity.trim()) {
      console.log('Loading initial city:', initialCity);
      searchCity(initialCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get temperature unit symbol
  const getTemperatureUnitSymbol = () => {
    return temperatureUnit === 'celsius' ? '°C' : '°F';
  };

  return {
    weatherData,
    forecastData,
    loading,
    error,
    temperatureUnit,
    temperatureUnitSymbol: getTemperatureUnitSymbol(),
    searchCity,
    toggleTemperatureUnit,
    clearError
  };
}; 