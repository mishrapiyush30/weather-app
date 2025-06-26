import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';
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

describe('SearchBar', () => {
  const mockSearchCity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation
    (weatherContext.useWeather as jest.Mock).mockReturnValue({
      searchCity: mockSearchCity,
      loading: false,
    });
  });

  it('should render the search input', () => {
    render(
      <WeatherProvider>
        <SearchBar />
      </WeatherProvider>
    );

    expect(screen.getByPlaceholderText('Enter city name...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should call searchCity when search button is clicked', () => {
    render(
      <WeatherProvider>
        <SearchBar />
      </WeatherProvider>
    );

    const input = screen.getByPlaceholderText('Enter city name...');
    const searchButton = screen.getByRole('button', { name: /search/i });

    // Type in the search input
    fireEvent.change(input, { target: { value: 'London' } });
    
    // Click the search button
    fireEvent.click(searchButton);

    // Check if searchCity was called with the correct value
    expect(mockSearchCity).toHaveBeenCalledWith('London');
  });

  it('should call searchCity when Enter key is pressed', () => {
    render(
      <WeatherProvider>
        <SearchBar />
      </WeatherProvider>
    );

    const input = screen.getByPlaceholderText('Enter city name...');

    // Type in the search input
    fireEvent.change(input, { target: { value: 'New York' } });
    
    // Press Enter key
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    // Check if searchCity was called with the correct value
    expect(mockSearchCity).toHaveBeenCalledWith('New York');
  });

  it('should not call searchCity when input is empty', () => {
    render(
      <WeatherProvider>
        <SearchBar />
      </WeatherProvider>
    );

    const searchButton = screen.getByRole('button', { name: /search/i });
    
    // Click the search button without entering any text
    fireEvent.click(searchButton);

    // Check that searchCity was not called
    expect(mockSearchCity).not.toHaveBeenCalled();
  });

  it('should disable input and button when loading', () => {
    // Mock loading state
    (weatherContext.useWeather as jest.Mock).mockReturnValue({
      searchCity: mockSearchCity,
      loading: true,
    });

    render(
      <WeatherProvider>
        <SearchBar />
      </WeatherProvider>
    );

    const input = screen.getByPlaceholderText('Enter city name...');
    const searchButton = screen.getByRole('button', { name: /search/i });

    // Check if input and button are disabled
    expect(input).toBeDisabled();
    expect(searchButton).toBeDisabled();
  });
}); 