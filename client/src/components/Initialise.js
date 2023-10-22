import React, { useState, useEffect } from 'react';

function LoadingOverlay() {
  const [loadingMessage, setLoadingMessage] = useState('Preparing face scan, please wait a moment');
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingMessage((prevMessage) => {
        if (prevMessage === 'Preparing face scan, please wait a moment...') return 'Preparing face scan, please wait a moment';
        return prevMessage + '.';
      });
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
      }}
    >
      <p>{loadingMessage}</p>
    </div>
  );
}

export default LoadingOverlay;
