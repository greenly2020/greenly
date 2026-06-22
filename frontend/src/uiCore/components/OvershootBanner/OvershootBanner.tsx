import React from 'react';
import { Box, Typography } from '@mui/material';

const OvershootBanner = () => {
  return (
    <Box
      component="a"
      href="https://overshootgreenplace.earth"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: '#1a472a',
        color: '#ffffff',
        padding: '10px 16px',
        textDecoration: 'none',
        width: '100%',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#2d6a4f',
        },
        transition: 'background-color 0.2s ease',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '13px', sm: '15px' },
          fontWeight: 500,
          color: '#ffffff',
        }}
      >
    🎮 <strong>Overshoot</strong> — Can you save the planet before it&apos;s too late?
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '13px', sm: '15px' },
          fontWeight: 700,
          color: '#90ee90',
          whiteSpace: 'nowrap',
        }}
      >
        Play now →
      </Typography>
    </Box>
  );
};

export default OvershootBanner;
