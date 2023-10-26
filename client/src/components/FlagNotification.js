import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import "../css/FlagNotification.css";
import WarningIcon from '@mui/icons-material/Warning';

const FlagNotification = () => {
  const [flagAdded, setFlagAdded] = useState(false); // For Student

  useEffect(() => {
    const socket = io('http://localhost:4001'); // Change the URL to match your Socket.io server's URL
    socket.on('connect', () => {
      console.log(`You connected with id: ${socket.id}`);
      // Emit here to make sure you're always connected before sending events if needed
    })
    socket.on('add-flag', () => { // When a flag is added
      setFlagAdded(true);
    })
  }, []);

  const closeNotification = () => { // Close Pop Up
    setFlagAdded(false);
  };

  // Need to fetch how many flags associated with the active Exam Student to have dynamic message

  return (
    <div>
      {flagAdded && (
        <div className="popup-notification">
          <div className="popup-content">
            <div className="warning-icon">
              <WarningIcon fontSize="inherit"/>
            </div>
            <div className="notification-text">
              <p>
                You have been flagged for academic misconduct. You have <span className="bold-underline">one</span> remaining flag before your exam session is ended.
              </p>
            </div>
            <button onClick={closeNotification} className="ok-button">OK</button>
          </div>
        </div>
      )}
    </div>
  );  
};

export default FlagNotification;