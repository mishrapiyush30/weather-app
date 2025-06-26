import React from 'react';
import { Typography, Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  // Map size to font sizes
  const sizeMap = {
    small: {
      fontSize: '1.5rem',
      iconSize: 'small',
    },
    medium: {
      fontSize: '2.5rem',
      iconSize: 'medium',
    },
    large: {
      fontSize: '3.5rem',
      iconSize: 'large',
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <WbSunnyIcon
        fontSize={sizeMap[size].iconSize as 'small' | 'medium' | 'large' | 'inherit'}
        sx={{
          color: '#FFD700',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              opacity: 0.7,
            },
            '50%': {
              opacity: 1,
            },
            '100%': {
              opacity: 0.7,
            },
          },
        }}
      />
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontWeight: 'bold',
          fontSize: sizeMap[size].fontSize,
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        WeatherNow
      </Typography>
    </Box>
  );
};

export default Logo; 