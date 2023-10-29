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
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2
      }}
    >
      <p>{loadingMessage}</p>
    </div>
  );
}

export default LoadingOverlay;
