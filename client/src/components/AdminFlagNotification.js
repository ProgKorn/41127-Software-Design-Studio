import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import "../css/FlagNotification.css";
import DoneIcon from '@mui/icons-material/Done';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import jwt_decode from 'jwt-decode';

const AdminFlagNotification = () => {
  const [flagAdded, setFlagAdded] = useState(false);
  const [flagUpdated, setFlagUpdated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [flagId, setFlagId] = useState("");
  const [student, setStudent] = useState('');
  const [studentId, setStudentId] = useState('');

  const url = process.env.REACT_APP_SERVER_URL + '/flag';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin) {
        setIsAdmin(true);
      }

      const studenturl = process.env.REACT_APP_SERVER_URL + "/student/get/" + decodedToken.userName;
      axios.get(studenturl).then((response) => {
        const studentData = response.data; // Extract student data from the response
        setStudent(studentData);
        setStudentId(studentId); // Store the studentId
        console.log(studentId);
      })
      .catch(studentError => {
        console.error(studentError);
      });
    }

    const socket = io(process.env.REACT_APP_SERVER_URL + ':4001'); // Change the URL to match the Socket.IO server URL
    socket.on('connect', () => {
      console.log(`You connected with id: ${socket.id}`);
      console.log("You are an admin " + isAdmin);
    })
    socket.on('add-flag', (string) => { // When a flag is added
      setFlagId(string);
      setFlagAdded(true);
    })
    socket.on('update-flag', () => { // When a flag is updated
      setFlagUpdated(true);
    })
  }, []);

  const resolveFlag = () => { // Resolve a flag
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
    setFlagAdded(false);
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
    setFlagAdded(false);
  }

  const name = () => {
    return student.name.firstName + " " + student.name.lastName;
  }

  return (
    <div>
      {flagAdded && (
        <div className="admin-popup-notification">
          <div className="popup-content">
            <div className="warning-icon">
              <PendingActionsIcon fontSize="inherit"/>
            </div>
            <div className="notification-text">
              <p>
                <span className="bold-underline"></span> has been flagged for academic misconduct.
              </p>
              <p>Would you like to Approve or Deny this flag?</p>
            </div>
            <div>
              <button onClick={resolveFlag} className="resolve-button"><DoneIcon style={{ verticalAlign: 'middle', marginRight: '5px' }}/>Resolve</button>
              <button onClick={terminateFlag} className="terminate-button"><CloseIcon style={{ verticalAlign: 'middle', marginRight: '5px' }}/>Terminate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );  
};

export default AdminFlagNotification;