import React from 'react';
import { Link } from 'react-router-dom';

function NoAccess() {
  return (
    <div>
      <h1>No Access</h1>
      <p>You do not have permission to access this page.</p>
      <div className="error-message-container">
        <Link to="/login" className="button">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default NoAccess;
