import React from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function NoAccess() {
  const navigate = useNavigate();

  const handleReturn = () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin === true) {
        navigate('/admin');
      } else {
        navigate('/studenthomepage');
      }
    } catch (error) {
      navigate('/');
      localStorage.removeItem('token');
    }
  }

  return (
    <div>
      <h1>No Access</h1>
      <p>You do not have permission to access this page.</p>
      <div className="error-message-container">
        <button onClick={handleReturn} className="button">
          Return to Home Page
        </button>
      </div>
    </div>
  );
}

export default NoAccess;
