import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import "../css/Exam.css";
import axios from "axios";

function ExamDone() {

const navigate = useNavigate();
const [examTerminated, setExamTerminated] = useState(false);
const [examName, setExamName] = useState("");
const { examId } = useParams();

useEffect(() => {
  // This code will run after the component renders
  // It's where you can perform side effects

  // Need to grab active session name + number (GET request from exam-session)
  // Need to grab active session status from GET request as well
  // Once they click the Return to Home Page button the entry is deleted

  axios.get(process.env.REACT_APP_SERVER_URL + `/exam/getExamDetails/${examId}`).then((response) => {
    setExamName(response.data.examName);
  }).catch((error) => {
    console.error(error);
  });
  return () => {
    // This code will run when the component is unmounted or before a new effect is run
    // It's where you can clean up any resources
  };
}, []);

const returnToHome = () => {
  navigate('/studenthomepage');
};
    
return (
    <Box className="main">
      {/* Header */}
      <Box className="subtitle">
        <h1>{examName}</h1>
      </Box>

      {/* Exam Complete Title */}
      {!examTerminated && (
        <Box className="complete-box">
          <span className="MuiSvgIcon-root">
            <CheckCircleTwoToneIcon/>
          </span>
          <h1 className="complete-title">
            Exam Complete
          </h1>
          <h1 className="complete-description">
            You've successfully completed this exam. You may now close this tab.
          </h1>
          {/* Button */}
          <Button onClick={returnToHome} variant="contained" style={{
            backgroundColor: '#2b2d42',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
            textTransform: 'capitalize',
            }}>
            <strong>Return to Home Page</strong>
          </Button>
        </Box>
      )}

      {/* Exam Session Terminated Title */}
      {examTerminated && (
        <Box className="terminated-box">
          <span className="MuiSvgIcon-root">
            <ErrorTwoToneIcon/>
          </span>
          <p className="terminated-title">
                Exam Session Terminated
          </p>
          <p className="description">
                You have been flagged for academic misconduct. If you feel a mistake has been made, contact your Academic Institution's administration.
          </p>
          {/* Button */}
          <Button onClick={returnToHome} variant="contained">
            <strong>Return to Home Page</strong>
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ExamDone;