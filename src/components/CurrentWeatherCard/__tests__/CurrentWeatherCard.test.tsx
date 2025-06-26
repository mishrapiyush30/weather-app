import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentWeatherCard from '../CurrentWeatherCard';
import { WeatherProvider } from '../../../contexts/WeatherContext';
import * as weatherContext from '../../../contexts/WeatherContext';

// Mock the useWeather hook
jest.mock('../../../contexts/WeatherContext', () => {
  const originalModule = jest.requireActual('../../../contexts/WeatherContext');
  return {
    ...originalModule,
    useWeather: jest.fn(),
  };
});

describe('CurrentWeatherCard', () => {
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

  it('should render loading state', () => {
    // Mock the hook to return loading state
    (weatherContext.useWeather as jest.Mock).mockReturnValue({
      weatherData: null,
      loading: true,
      error: null,
      temperatureUnit: 'celsius',
    });

    render(
      <WeatherProvider>
        <CurrentWeatherCard />
      </WeatherProvider>
    );

    // CircularLoader should be rendered, but we can't directly test for its presence
    // since it's a separate component. Instead, we check that the weather data isn't rendered.
    expect(screen.queryByText(/London/)).not.toBeInTheDocument();
  });

  it('should render weather data', () => {
    // Mock the hook to return weather data
    (weatherContext.useWeather as jest.Mock).mockReturnValue({
      weatherData: mockWeatherData,
      loading: false,
      error: null,
      temperatureUnit: 'celsius',
      toggleTemperatureUnit: jest.fn(),
    });

    render(
      <WeatherProvider>
        <CurrentWeatherCard />
      </WeatherProvider>
    );

    // Check if weather data is displayed
    expect(screen.getByText('London, UK')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('Clear Sky')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('12 km/h')).toBeInTheDocument();
    expect(screen.getByText('10 km')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
  });

  it('should render with Fahrenheit units', () => {
    // Mock the hook to return weather data with Fahrenheit units
    (weatherContext.useWeather as jest.Mock).mockReturnValue({
      weatherData: {
        ...mockWeatherData,
        temperature: 64, // Fahrenheit equivalent
        feelsLike: 68,   // Fahrenheit equivalent
      },
      loading: false,
      error: null,
      temperatureUnit: 'fahrenheit',
      toggleTemperatureUnit: jest.fn(),
    });

    render(
      <WeatherProvider>
        <CurrentWeatherCard />
      </WeatherProvider>
    );

    // Check if temperature is displayed in Fahrenheit
    expect(screen.getByText('64')).toBeInTheDocument();
    expect(screen.getByText('68°F')).toBeInTheDocument();
  });

  it('should not render when there is an error', () => {
    // Mock the hook to return an error
    (weatherContext.useWeather as jest.Mock).mockReturnValue({
      weatherData: null,
      loading: false,
      error: { message: 'City not found' },
      temperatureUnit: 'celsius',
    });

    render(
      <WeatherProvider>
        <CurrentWeatherCard />
      </WeatherProvider>
    );

    // Component should not render any content
    expect(screen.queryByText(/London/)).not.toBeInTheDocument();
  });
}); 