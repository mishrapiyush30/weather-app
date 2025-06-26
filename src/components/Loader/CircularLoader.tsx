import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface CircularLoaderProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const CircularLoader: React.FC<CircularLoaderProps> = ({ 
  size = 'medium', 
  message = 'Loading weather data...' 
}) => {
  // Map size to pixel values
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        minHeight: '200px',
      }}
    >
      <CircularProgress
        size={sizeMap[size]}
        sx={{
          color: 'white',
          mb: 2
        }}
      />
      {message && (
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            textAlign: 'center'
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default CircularLoader; 