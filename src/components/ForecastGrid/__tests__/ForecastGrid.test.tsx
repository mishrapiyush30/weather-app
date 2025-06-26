import React from 'react';
import { render, screen } from '@testing-library/react';
import ForecastGrid from '../ForecastGrid';
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

describe('ForecastGrid', () => {
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
      {
        date: 'Sat, Jun 28',
        dayOfWeek: 'Sat',
        temperature: { min: 11, max: 20 },
        condition: 'Cloudy',
        icon: '03d',
      },
      {
        date: 'Sun, Jun 29',
        dayOfWeek: 'Sun',
        temperature: { min: 17, max: 26 },
        condition: 'Sunny',
        icon: '01d',
      },
      {
        date: 'Mon, Jun 30',
        dayOfWeek: 'Mon',
        temperature: { min: 15, max: 22 },
        condition: 'Partly Cloudy',
        icon: '02d',
      },
    ],
  };

  it('should render loading state', () => {
    // Mock the hook to return loading state
    (weatherContext.useWeather as jest.Mock).mockReturnValue({
      forecastData: null,
      loading: true,
      error: null,
      temperatureUnit: 'celsius',
    });

    render(
      <WeatherProvider>
        <ForecastGrid />
      </WeatherProvider>
    );

    // CircularLoader should be rendered, but we can't directly test for its presence
    // since it's a separate component. Instead, we check that the forecast data isn't rendered.
    expect(screen.queryByText('5-Day Forecast')).not.toBeInTheDocument();
  });

  it('should render forecast data', () => {
    // Mock the hook to return forecast data
    (weatherContext.useWeather as jest.Mock).mockReturnValue({
      forecastData: mockForecastData,
      loading: false,
      error: null,
      temperatureUnit: 'celsius',
    });

    render(
      <WeatherProvider>
        <ForecastGrid />
      </WeatherProvider>
    );

    // Check if forecast data is displayed
    expect(screen.getByText('5-Day Forecast')).toBeInTheDocument();
    expect(screen.getByText('Thu, Jun 26')).toBeInTheDocument();
    expect(screen.getByText('Fri, Jun 27')).toBeInTheDocument();
    expect(screen.getByText('Sat, Jun 28')).toBeInTheDocument();
    expect(screen.getByText('Sun, Jun 29')).toBeInTheDocument();
    expect(screen.getByText('Mon, Jun 30')).toBeInTheDocument();
    
    // Check if conditions are displayed
    expect(screen.getAllByText('Sunny').length).toBe(2);
    expect(screen.getAllByText('Partly Cloudy').length).toBe(2);
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
    
    // Check if temperatures are displayed (at least one)
    expect(screen.getByText('34°C')).toBeInTheDocument();
  });

  it('should render with Fahrenheit units', () => {
    // Convert temperatures to Fahrenheit for the test
    const fahrenheitForecastData = {
      list: mockForecastData.list.map(day => ({
        ...day,
        temperature: {
          min: Math.round(day.temperature.min * 9/5 + 32),
          max: Math.round(day.temperature.max * 9/5 + 32),
        },
      })),
    };
    
    // Mock the hook to return forecast data with Fahrenheit units
    (weatherContext.useWeather as jest.Mock).mockReturnValue({
      forecastData: fahrenheitForecastData,
      loading: false,
      error: null,
      temperatureUnit: 'fahrenheit',
    });

    render(
      <WeatherProvider>
        <ForecastGrid />
      </WeatherProvider>
    );

    // Check if temperatures are displayed in Fahrenheit
    expect(screen.getByText('93°F')).toBeInTheDocument(); // 34°C converted to Fahrenheit
  });

  it('should not render when there is an error', () => {
    // Mock the hook to return an error
    (weatherContext.useWeather as jest.Mock).mockReturnValue({
      forecastData: null,
      loading: false,
      error: { message: 'Failed to fetch forecast data' },
      temperatureUnit: 'celsius',
    });

    render(
      <WeatherProvider>
        <ForecastGrid />
      </WeatherProvider>
    );

    // Component should not render any content
    expect(screen.queryByText('5-Day Forecast')).not.toBeInTheDocument();
  });

  it('should not render when forecast data is empty', () => {
    // Mock the hook to return empty forecast data
    (weatherContext.useWeather as jest.Mock).mockReturnValue({
      forecastData: { list: [] },
      loading: false,
      error: null,
      temperatureUnit: 'celsius',
    });

    render(
      <WeatherProvider>
        <ForecastGrid />
      </WeatherProvider>
    );

    // Component should not render any content
    expect(screen.queryByText('5-Day Forecast')).not.toBeInTheDocument();
  });
}); 