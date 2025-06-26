export type WeatherCondition = 'Clear' | 'Clouds' | 'Rain' | 'Snow' | 'Thunderstorm' | 'Drizzle' | 'Mist' | 'Fog' | 'Haze';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: string;
  timestamp: number;
}

export interface ForecastDay {
  date: string;
  dayOfWeek: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: WeatherCondition;
  icon: string;
}

export interface ForecastData {
  list: ForecastDay[];
}

export interface WeatherError {
  message: string;
  code?: string;
} 