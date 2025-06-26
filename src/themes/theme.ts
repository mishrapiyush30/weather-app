import { createTheme, ThemeOptions } from '@mui/material/styles';
import { WeatherCondition } from '../types/weather';

// Define theme options for different weather conditions
const themeOptions: Record<WeatherCondition, ThemeOptions> = {
  Clear: {
    palette: {
      primary: {
        main: '#ff9800',
        light: '#ffb74d',
        dark: '#f57c00',
      },
      secondary: {
        main: '#ffd54f',
      },
      background: {
        default: '#fff9c4',
        paper: 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: '#212121',
        secondary: '#757575',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to bottom right, rgba(255, 152, 0, 0.1), rgba(255, 213, 79, 0.1))',
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
  },
  Clouds: {
    palette: {
      primary: {
        main: '#78909c',
        light: '#b0bec5',
        dark: '#546e7a',
      },
      secondary: {
        main: '#90a4ae',
      },
      background: {
        default: '#eceff1',
        paper: 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: '#263238',
        secondary: '#607d8b',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to bottom right, rgba(120, 144, 156, 0.1), rgba(176, 190, 197, 0.1))',
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
  },
  Rain: {
    palette: {
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#0d47a1',
      },
      secondary: {
        main: '#29b6f6',
      },
      background: {
        default: '#e3f2fd',
        paper: 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: '#0d47a1',
        secondary: '#1976d2',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to bottom right, rgba(25, 118, 210, 0.1), rgba(41, 182, 246, 0.1))',
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
  },
  Snow: {
    palette: {
      primary: {
        main: '#e0e0e0',
        light: '#f5f5f5',
        dark: '#bdbdbd',
      },
      secondary: {
        main: '#90caf9',
      },
      background: {
        default: '#ffffff',
        paper: 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: '#424242',
        secondary: '#757575',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to bottom right, rgba(224, 224, 224, 0.1), rgba(144, 202, 249, 0.1))',
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
  },
  Thunderstorm: {
    palette: {
      primary: {
        main: '#303f9f',
        light: '#3f51b5',
        dark: '#1a237e',
      },
      secondary: {
        main: '#7986cb',
      },
      background: {
        default: '#e8eaf6',
        paper: 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: '#1a237e',
        secondary: '#303f9f',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to bottom right, rgba(48, 63, 159, 0.1), rgba(121, 134, 203, 0.1))',
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
  },
  Drizzle: {
    palette: {
      primary: {
        main: '#0288d1',
        light: '#4fc3f7',
        dark: '#01579b',
      },
      secondary: {
        main: '#4dd0e1',
      },
      background: {
        default: '#e1f5fe',
        paper: 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: '#01579b',
        secondary: '#0288d1',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to bottom right, rgba(2, 136, 209, 0.1), rgba(77, 208, 225, 0.1))',
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
  },
  Mist: {
    palette: {
      primary: {
        main: '#90a4ae',
        light: '#b0bec5',
        dark: '#607d8b',
      },
      secondary: {
        main: '#cfd8dc',
      },
      background: {
        default: '#f5f5f5',
        paper: 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: '#455a64',
        secondary: '#78909c',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to bottom right, rgba(144, 164, 174, 0.1), rgba(207, 216, 220, 0.1))',
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
  },
  Fog: {
    palette: {
      primary: {
        main: '#78909c',
        light: '#b0bec5',
        dark: '#546e7a',
      },
      secondary: {
        main: '#cfd8dc',
      },
      background: {
        default: '#eceff1',
        paper: 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: '#37474f',
        secondary: '#607d8b',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to bottom right, rgba(120, 144, 156, 0.1), rgba(207, 216, 220, 0.1))',
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
  },
  Haze: {
    palette: {
      primary: {
        main: '#9e9e9e',
        light: '#e0e0e0',
        dark: '#757575',
      },
      secondary: {
        main: '#bdbdbd',
      },
      background: {
        default: '#eeeeee',
        paper: 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: '#424242',
        secondary: '#757575',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to bottom right, rgba(158, 158, 158, 0.1), rgba(189, 189, 189, 0.1))',
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
  },
};

// Function to get theme based on weather condition
export const getThemeByWeatherCondition = (condition: WeatherCondition) => {
  return createTheme(themeOptions[condition] || themeOptions.Clear);
}; 