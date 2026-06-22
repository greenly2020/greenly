import React from 'react';

const OvershootBanner = () => {
  return (
    <a
      href="https://overshootgreenplace.earth"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: '#1a472a',
        color: '#ffffff',
        padding: '10px 16px',
        textDecoration: 'none',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
      }}
    >
      <span style={{ fontSize: '15px', fontWeight: 500 }}>
        🎮 <strong>Overshoot</strong> — Can you save the planet before it&apos;s too late?
      </span>
      <span style={{ fontSize: '15px', fontWeight: 700, color: '#90ee90', whiteSpace: 'nowrap' }}>
        Play now →
      </span>
    </a>
  );
};

export default OvershootBanner;
