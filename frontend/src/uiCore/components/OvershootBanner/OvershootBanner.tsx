import React from 'react';

const OvershootBanner = () => {
  return (
    
      href="https://overshootgreenplace.earth"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        backgroundColor: '#1a472a',
        padding: '10px 20px',
        textDecoration: 'none',
        width: '100%',
        boxSizing: 'border-box',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <span style={{ fontSize: '14px', color: '#e8f5e9' }}>
        🎮{' '}
        <strong style={{ color: '#ffffff', fontWeight: 500 }}>Overshoot</strong>
        {' '}— Can you save the planet before it&apos;s too late?
      </span>
      <span style={{ fontSize: '14px', fontWeight: 500, color: '#81c784', whiteSpace: 'nowrap' }}>
        Play now →
      </span>
      <span
        style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '11px',
          color: '#4caf50',
          border: '0.5px solid #4caf50',
          borderRadius: '4px',
          padding: '2px 6px',
          opacity: 0.8,
        }}
      >
        NEW
      </span>
    </a>
  );
};

export default OvershootBanner;
