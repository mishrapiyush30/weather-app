import React, { createContext, useState, useContext, ReactNode } from 'react';
import { WeatherData, ForecastData, WeatherError, TemperatureUnit } from '../types/weather';
import { getCurrentWeather, getForecast } from '../api/weatherApi';

interface WeatherContextType {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  loading: boolean;
  error: WeatherError | null;
  temperatureUnit: TemperatureUnit;
  searchCity: (city: string) => Promise<void>;
  toggleTemperatureUnit: () => void;
  clearError: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<WeatherError | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');

  const searchCity = async (city: string): Promise<void> => {
    if (!city.trim()) {
      setError({ message: 'Please enter a city name' });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const weatherData = await getCurrentWeather(city);
      const forecastData = await getForecast(city);
      
      setWeatherData(weatherData);
      setForecastData(forecastData);
    } catch (err) {
      setError({ 
        message: err instanceof Error ? err.message : 'An unknown error occurred' 
      });
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleTemperatureUnit = (): void => {
    setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const clearError = (): void => {
    setError(null);
  };

  // Convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius: number): number => {
    return Math.round((celsius * 9/5) + 32);
  };

  // Adjust temperature based on selected unit
  const processedWeatherData = weatherData && temperatureUnit === 'fahrenheit' 
    ? {
        ...weatherData,
        temperature: celsiusToFahrenheit(weatherData.temperature),
        feelsLike: celsiusToFahrenheit(weatherData.feelsLike)
      }
    : weatherData;

  const processedForecastData = forecastData && temperatureUnit === 'fahrenheit'
    ? {
        list: forecastData.list.map(day => ({
          ...day,
          temperature: {
            min: celsiusToFahrenheit(day.temperature.min),
            max: celsiusToFahrenheit(day.temperature.max)
          }
        }))
      }
    : forecastData;

  const value = {
    weatherData: processedWeatherData,
    forecastData: processedForecastData,
    loading,
    error,
    temperatureUnit,
    searchCity,
    toggleTemperatureUnit,
    clearError
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}; 