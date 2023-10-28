import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import "../css/FlagNotification.css";
import WarningIcon from '@mui/icons-material/Warning';
import DoneIcon from '@mui/icons-material/Done';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

const FlagNotification = () => {
  const [flagAdded, setFlagAdded] = useState(false);
  const [flagUpdated, setFlagUpdated] = useState(false);

  const url = 'http://localhost:4000/flag';
  var flagId;

  useEffect(() => {
    const socket = io('http://localhost:4001'); // Change the URL to match your Socket.io server's URL
    socket.on('connect', () => {
      console.log(`You connected with id: ${socket.id}`);
      // Emit here to make sure you're always connected before sending events if needed
    })
    socket.on('add-flag', (string) => { // When a flag is added
      flagId = string;
      setFlagAdded(true);
    })
    socket.on('update-flag', () => { // When a flag is updated
      setFlagUpdated(true);
    })
  }, []);

  const closeNotification = () => { // Close Pop Up
    setFlagUpdated(false);
  };

  const resolveFlag = () => { // Resolve or Terminate a flag
    const updateObject = { 
      flagId: flagId,
      status: "Resolved" 
    };
  
    axios.post(url + '/updateFlag', updateObject)
    .then((response) => {
        console.log('Flag updated successfully: ', response.data);
    })
    .catch(error => {
        console.error('Error adding flag: ', error);
    });
    setFlagUpdated(true);
  }

  const terminateFlag = () => { // Terminate a flag
    const updateObject = { 
      flagId: flagId, 
      status: "Terminated" 
    };
  
    axios.post(url + '/updateFlag', updateObject)
    .then((response) => {
        console.log('Flag updated successfully: ', response.data);
    })
    .catch(error => {
        console.error('Error adding flag: ', error);
    });
  }

  // Need to fetch how many flags associated with the active Exam Student to have dynamic message

  return (
    <div>
      {flagAdded && (
        <div className="admin-popup-notification">
          <div className="popup-content">
            <div className="warning-icon">
              <PendingActionsIcon fontSize="inherit"/>
            </div>
            <div className="notification-text">
              <p>Jane Doe has been flagged for misconduct.</p>
              <p>Would you like to Resolve or Terminate this flag?</p>
            </div>
            <div>
              <button onClick={resolveFlag} className="resolve-button"><DoneIcon style={{ verticalAlign: 'middle', marginRight: '5px' }}/>Resolve</button>
              <button onClick={terminateFlag} className="terminate-button"><CloseIcon style={{ verticalAlign: 'middle', marginRight: '5px' }}/>Terminate</button>
            </div>
          </div>
        </div>
      )}
      {flagUpdated && (
        <div className="student-popup-notification">
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