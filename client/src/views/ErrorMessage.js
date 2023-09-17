import React from 'react';
import '../css/ErrorComponent.css';

function ErrorMessage({ message }) {
  return (
    <div className="error-message"> { message } </div>
  );
}

export default ErrorMessage;
