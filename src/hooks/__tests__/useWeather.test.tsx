import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { WeatherProvider } from '../../contexts/WeatherContext';
import { useWeatherData } from '../useWeather';
import * as weatherApi from '../../api/weatherApi';

// Mock the API calls
jest.mock('../../api/weatherApi', () => ({
  getCurrentWeather: jest.fn(),
  getForecast: jest.fn(),
}));

// Mock component that uses the hook
const TestComponent = ({ initialCity }: { initialCity?: string }) => {
  const { weatherData, forecastData, loading, error, temperatureUnitSymbol } = useWeatherData(initialCity);

  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">{error.message}</div>;
  if (!weatherData) return <div data-testid="no-data">No data</div>;

  return (
    <div>
      <div data-testid="city">{weatherData.city}</div>
      <div data-testid="temperature">{weatherData.temperature}{temperatureUnitSymbol}</div>
      <div data-testid="forecast-days">{forecastData?.list.length || 0}</div>
    </div>
  );
};

describe('useWeatherData hook', () => {
  const mockWeatherData = {
    city: 'London',
    country: 'UK',
    temperature: 18,
    feelsLike: 20,
    condition: 'Clear',
    description: 'clear sky',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    icon: '01d',
    timestamp: 1623456789,
  };

  const mockForecastData = {
    list: [
      {
        date: 'Thu, Jun 26',
        dayOfWeek: 'Thu',
        temperature: { min: 16, max: 34 },
        condition: 'Sunny',
        icon: '01d',
      },
      {
        date: 'Fri, Jun 27',
        dayOfWeek: 'Fri',
        temperature: { min: 16, max: 30 },
        condition: 'Partly Cloudy',
        icon: '02d',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state initially', () => {
    // Mock the API calls to never resolve during this test
    (weatherApi.getCurrentWeather as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    (weatherApi.getForecast as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should load weather data successfully', async () => {
    // Mock successful API responses
    (weatherApi.getCurrentWeather as jest.Mock).mockResolvedValue(mockWeatherData);
    (weatherApi.getForecast as jest.Mock).mockResolvedValue(mockForecastData);

    render(
      <WeatherProvider>
        <TestComponent initialCity="London" />
      </WeatherProvider>
    );

    // Initially should show loading
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByTestId('city')).toBeInTheDocument();
    });

    // Check if data is displayed correctly
    expect(screen.getByTestId('city')).toHaveTextContent('London');
    expect(screen.getByTestId('temperature')).toHaveTextContent('18°C');
    expect(screen.getByTestId('forecast-days')).toHaveTextContent('2');
  });

  it('should handle API errors', async () => {
    // Mock API error
    const errorMessage = 'City not found';
    (weatherApi.getCurrentWeather as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(
      <WeatherProvider>
        <TestComponent initialCity="InvalidCity" />
      </WeatherProvider>
    );

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByTestId('error')).toHaveTextContent(errorMessage);
  });
}); 