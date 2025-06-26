import React, { useState, KeyboardEvent } from 'react';
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useWeather } from '../../contexts/WeatherContext';

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { searchCity, loading } = useWeather();

  const handleSearch = () => {
    if (searchValue.trim() && !loading) {
      console.log('Searching for city:', searchValue.trim());
      searchCity(searchValue.trim());
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 500,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="location">
          <LocationOnIcon />
        </IconButton>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: 'white',
            '& input::placeholder': {
              color: 'rgba(255, 255, 255, 0.7)',
              opacity: 1,
            },
          }}
          placeholder="Enter city name..."
          inputProps={{ 'aria-label': 'search city' }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={handleSearch}
          disabled={loading}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar; 