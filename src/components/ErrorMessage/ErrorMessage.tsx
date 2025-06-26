import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useWeather } from '../../contexts/WeatherContext';

interface ErrorMessageProps {
  message?: string;
  retry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message,
  retry 
}) => {
  const { error, clearError } = useWeather();
  
  const errorMessage = message || (error ? error.message : 'An error occurred');
  
  const handleRetry = () => {
    clearError();
    if (retry) {
      retry();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 60, mb: 2, color: '#f44336' }} />
      
      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        {errorMessage}
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        <Button 
          variant="contained" 
          color="error"
          onClick={handleRetry}
          sx={{
            backgroundColor: '#f44336',
            '&:hover': {
              backgroundColor: '#d32f2f',
            },
          }}
        >
          Try Again
        </Button>
      </Box>
    </Paper>
  );
};

export default ErrorMessage; 