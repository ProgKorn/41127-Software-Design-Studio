import React from 'react';
import { Link } from 'react-router-dom';

function NoAccess() {
  return (
    <div>
      <h1>No Access</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/login" className="button">
        Back to Login
      </Link>
    </div>
  );
}

export default NoAccess;
