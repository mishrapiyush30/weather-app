import axios from 'axios';
import { WeatherData, ForecastData, WeatherCondition } from '../types/weather';

// API key for OpenWeatherMap
const API_KEY = '1980defa254ff1c4ce0fbf6d45883f2e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mock data for development
const MOCK_WEATHER_DATA: { [key: string]: WeatherData } = {
  'London': {
    city: 'London',
    country: 'UK',
    temperature: 18,
    feelsLike: 20,
    condition: 'Clouds',
    description: 'partly cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    icon: '03d',
    timestamp: Date.now() / 1000
  },
  'New York': {
    city: 'New York',
    country: 'US',
    temperature: 22,
    feelsLike: 24,
    condition: 'Clear',
    description: 'clear sky',
    humidity: 45,
    windSpeed: 8,
    visibility: 16,
    icon: '01d',
    timestamp: Date.now() / 1000
  },
  'Tokyo': {
    city: 'Tokyo',
    country: 'JP',
    temperature: 26,
    feelsLike: 28,
    condition: 'Rain',
    description: 'light rain',
    humidity: 80,
    windSpeed: 5,
    visibility: 8,
    icon: '10d',
    timestamp: Date.now() / 1000
  }
};

const MOCK_FORECAST_DATA: { [key: string]: ForecastData } = {
  'London': {
    list: [
      {
        date: 'Thu, Jun 26',
        dayOfWeek: 'Thu',
        temperature: { min: 16, max: 22 },
        condition: 'Clear',
        icon: '01d'
      },
      {
        date: 'Fri, Jun 27',
        dayOfWeek: 'Fri',
        temperature: { min: 16, max: 20 },
        condition: 'Clouds',
        icon: '02d'
      },
      {
        date: 'Sat, Jun 28',
        dayOfWeek: 'Sat',
        temperature: { min: 11, max: 20 },
        condition: 'Clouds',
        icon: '03d'
      },
      {
        date: 'Sun, Jun 29',
        dayOfWeek: 'Sun',
        temperature: { min: 17, max: 26 },
        condition: 'Clear',
        icon: '01d'
      },
      {
        date: 'Mon, Jun 30',
        dayOfWeek: 'Mon',
        temperature: { min: 15, max: 22 },
        condition: 'Clouds',
        icon: '02d'
      }
    ]
  },
  'New York': {
    list: [
      {
        date: 'Thu, Jun 26',
        dayOfWeek: 'Thu',
        temperature: { min: 18, max: 25 },
        condition: 'Clear',
        icon: '01d'
      },
      {
        date: 'Fri, Jun 27',
        dayOfWeek: 'Fri',
        temperature: { min: 19, max: 26 },
        condition: 'Clear',
        icon: '01d'
      },
      {
        date: 'Sat, Jun 28',
        dayOfWeek: 'Sat',
        temperature: { min: 20, max: 28 },
        condition: 'Clouds',
        icon: '02d'
      },
      {
        date: 'Sun, Jun 29',
        dayOfWeek: 'Sun',
        temperature: { min: 21, max: 29 },
        condition: 'Clouds',
        icon: '02d'
      },
      {
        date: 'Mon, Jun 30',
        dayOfWeek: 'Mon',
        temperature: { min: 20, max: 27 },
        condition: 'Rain',
        icon: '10d'
      }
    ]
  },
  'Tokyo': {
    list: [
      {
        date: 'Thu, Jun 26',
        dayOfWeek: 'Thu',
        temperature: { min: 22, max: 28 },
        condition: 'Rain',
        icon: '10d'
      },
      {
        date: 'Fri, Jun 27',
        dayOfWeek: 'Fri',
        temperature: { min: 23, max: 29 },
        condition: 'Rain',
        icon: '10d'
      },
      {
        date: 'Sat, Jun 28',
        dayOfWeek: 'Sat',
        temperature: { min: 24, max: 30 },
        condition: 'Clouds',
        icon: '03d'
      },
      {
        date: 'Sun, Jun 29',
        dayOfWeek: 'Sun',
        temperature: { min: 25, max: 31 },
        condition: 'Clouds',
        icon: '02d'
      },
      {
        date: 'Mon, Jun 30',
        dayOfWeek: 'Mon',
        temperature: { min: 24, max: 30 },
        condition: 'Clear',
        icon: '01d'
      }
    ]
  }
};

// Helper function to map OpenWeatherMap conditions to our app's conditions
const mapWeatherCondition = (condition: string): WeatherCondition => {
  const conditionMap: { [key: string]: WeatherCondition } = {
    'Clear': 'Clear',
    'Clouds': 'Clouds',
    'Rain': 'Rain',
    'Snow': 'Snow',
    'Thunderstorm': 'Thunderstorm',
    'Drizzle': 'Drizzle',
    'Mist': 'Mist',
    'Fog': 'Fog',
    'Haze': 'Haze'
  };
  
  return conditionMap[condition] || 'Clear';
};

// Helper function to format date
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

// Helper function to get day of week
const getDayOfWeek = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

// Get current weather data for a city
export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  try {
    console.log(`Fetching weather data for: ${city}`);
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    const data = response.data;
    console.log('API response:', data);
    
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: mapWeatherCondition(data.weather[0].main),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      visibility: data.visibility / 1000, // Convert to km
      icon: data.weather[0].icon,
      timestamp: data.dt
    };
  } catch (error) {
    console.error('API Error:', error);
    
    // Only use mock data if API fails
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch weather data');
    }
    throw new Error('Failed to fetch weather data');
  }
};

// Get 5-day forecast data for a city
export const getForecast = async (city: string): Promise<ForecastData> => {
  try {
    console.log(`Fetching forecast data for: ${city}`);
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    const data = response.data;
    console.log('Forecast API response received');
    
    // Process forecast data to get one forecast per day (noon)
    const dailyForecasts: { [key: string]: any } = {};
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      
      // Only keep one forecast per day (around noon)
      const hour = new Date(item.dt * 1000).getHours();
      
      if (!dailyForecasts[date] || Math.abs(hour - 12) < Math.abs(new Date(dailyForecasts[date].dt * 1000).getHours() - 12)) {
        dailyForecasts[date] = item;
      }
    });
    
    // Convert to array and limit to 5 days
    const forecastList = Object.values(dailyForecasts).slice(0, 5).map((item: any) => ({
      date: formatDate(item.dt),
      dayOfWeek: getDayOfWeek(item.dt),
      temperature: {
        min: Math.round(item.main.temp_min),
        max: Math.round(item.main.temp_max)
      },
      condition: mapWeatherCondition(item.weather[0].main),
      icon: item.weather[0].icon
    }));
    
    return {
      list: forecastList
    };
  } catch (error) {
    console.error('API Error:', error);
    
    // Only use mock data if API fails
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch forecast data');
    }
    throw new Error('Failed to fetch forecast data');
  }
}; 