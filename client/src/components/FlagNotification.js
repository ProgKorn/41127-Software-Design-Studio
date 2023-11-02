import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import "../css/FlagNotification.css";
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import jwt_decode from 'jwt-decode';

const FlagNotification = () => {
  const [flagAdded, setFlagAdded] = useState(false);
  const [flagUpdated, setFlagUpdated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [flagId, setFlagId] = useState("");
  const [cheatingType, setCheatingType] = useState("");
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [examId, setExamId] = useState("");

  const url = process.env.REACT_APP_SERVER_URL + '/flag';
  const examStudentUrl = process.env.REACT_APP_SERVER_URL + '/examStudent'

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin) {
        setIsAdmin(true);
      }
    }

    // const socket = io(process.env.REACT_APP_SERVER_URL + ':4001'); // Change the URL to match the Socket.IO server URL
    // socket.on('connect', () => {
    //   console.log(`You connected with id: ${socket.id}`);
    // });
    const socket = io('http://localhost' + ':4001'); // Change the URL to match the Socket.IO server URL
    socket.on('connect', () => {
      console.log(`You connected with id: ${socket.id}`);
    });

    socket.on('add-flag', (newFlagId, cheatingStudentId, cheatingType, examId) => { // When a flag is added
      setFlagId(newFlagId);
      setStudentId(cheatingStudentId);
      setCheatingType(cheatingType);
      setFlagAdded(true);
      setExamId(examId);
      socket.emit('register-student', parseInt(cheatingStudentId)); // Register the student that has cheated
    });

    socket.on('update-flag', () => { // When a flag is updated
      setFlagUpdated(true);
    });
  }, []);

  const closeNotification = () => { // Close Pop Up
    setFlagUpdated(false);
  };

  const resolveFlag = () => { // Resolve a flag
    console.log("Resolving flag for this student " + studentId);
    const updateObject = { 
      flagId: flagId,
      status: "Resolved",
      studentId: parseInt(studentId), 
    };
    // UPDATE FLAG COUNT HERE 

    axios.post(url + '/updateFlag', updateObject)
    .then((response) => {
        console.log('Flag updated successfully: ', response.data);
    })
    .catch(error => {
        console.error('Error adding flag: ', error);
    });
    axios.put(examStudentUrl + `/addFlag/${studentId}/${examId}/${flagId}`)
    .then((response) => {
        console.log('Flag ID added successfully: ', response.data);
    })
    .catch(error => {
        console.error('Error adding flag: ', error);
    });
    setFlagAdded(false);
    setFlagUpdated(true);
    // console.log("Props in FlagNotification:", examId, onFlagAdded);
    // onFlagAdded();

  }

  const terminateFlag = () => { // Terminate a flag
    const updateObject = { 
      flagId: flagId, 
      status: "Terminated",
      studentId: parseInt(studentId),
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
    const studenturl = process.env.REACT_APP_SERVER_URL + '/student/getStudentDetails/' + studentId;
    axios.get(studenturl).then((response) => {
      const studentData = response.data; // Extract student data from the response
      setFirstName(studentData.name.firstName);
      setLastName(studentData.name.lastName);
      })
      .catch(studentError => {
        console.error(studentError);
      });
    return firstName + " " + lastName + " " + `(${studentId})`;
  }

  const misconductType = (cheatingType) => {
    switch (cheatingType) {
      case "Banned Object":
        return "Banned Object spotted in frame.";
      case "Person Count":
        return "More than one person in the frame.";
      case "Unfocused Window":
        return "Navigated out of Exam Session window.";
      case "Face rotated to the left":
        return "Face rotated to the left.";
      case "Face rotated to the right":
        return "Face rotated to the right.";
      default:
        return "";
    }
  }

  const numberOfFlagsRemaining = () => {
    // Need to fetch how many flags associated with the active Exam Student to have dynamic message
    return "one";
  }

  return (
    <div style={{ 
      fontFamily: 'Montserrat, sans-serif'
    }}>
      {flagAdded && isAdmin && (
        <div className="admin-popup-notification">
          <div className="popup-content">
            <div className="pending-icon" style={{display: "flex"}}>
              <AccessTimeIcon fontSize="inherit"/>
            </div>
            <h1 className="popup-title">PENDING FLAG</h1>
            <div className="notification-text">
              <p>
                <span className="bold-underline">{name()}</span> has been flagged.
              </p>
              <p>{misconductType(cheatingType)}</p>
              {/* <p>Would you like to Resolve or Terminate this flag?</p> */}
            </div>
            <div style={{display: "flex", gap: "10px"}}>
              <button onClick={resolveFlag} className="resolve-button"><DoneIcon style={{ verticalAlign: 'middle', marginRight: '10px' }}/>RESOLVE</button>
              <button onClick={terminateFlag} className="terminate-button"><CloseIcon style={{ verticalAlign: 'middle', marginRight: '10px' }}/>TERMINATE</button>
            </div>
          </div>
        </div>
      )}
      {flagUpdated && !isAdmin && (parseInt(studentId) === 42345678) && (
        <div className="student-popup-notification">
          <div className="popup-content">
            <div className="warning-icon">
              <WarningIcon fontSize="inherit"/>
            </div>
            <div className="notification-text">
              <p>
                You have been flagged for academic misconduct. You have <span className="bold-underline">{numberOfFlagsRemaining()}</span> remaining flag before your exam session is ended.
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