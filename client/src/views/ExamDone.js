import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Done } from "@mui/icons-material";
import "../css/Exam.css";

function ExamDone() {

const navigate = useNavigate();
const [examTerminated, setExamTerminated] = useState(false);

const [subjectNumber, setSubjectNumber] = useState(31274);
const [subjectName, setSubjectName] = useState("Software Design Studio");

useEffect(() => {
  // This code will run after the component renders
  // It's where you can perform side effects

  // Need to grab active session name + number (GET request from exam-session)
  // Need to grab active session status from GET request as well
  // Once they click the Return to Home Page button the entry is deleted
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
        <h1>Subject Number Subject Name: Exam Name</h1>
      </Box>

      {/* Exam Complete Title */}
      <Box className="previewEnd">
        <h1 className="endTitle">
          Exam Complete <Done className="icon"/>
        </h1>
        <h1 className="description">
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
    </Box>
  );
}

export default ExamDone;