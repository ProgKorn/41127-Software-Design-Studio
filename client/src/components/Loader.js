import React from 'react';
import { HashLoader as Spinner } from 'react-spinners';
import '../css/Loader.css';

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        <Spinner size={100}
        color="#2b2d42"
        speedMultiplier={0.8}
        loading={loading} />
        <p>Loading...</p> {/* Text to indicate loading */}
      </div>
    </div>
  );
};

export default Loader;

//Example use: 
/*import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      <Loader loading={loading} />
      {!loading && <div>Your main content here...</div>}
    </div>
  );
};

export default App;*/