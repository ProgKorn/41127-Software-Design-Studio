import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "../css/Exam.css";
import axios from "axios";
import ObjectRecognition from "./ObjectRecognition";

function ExamSession() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60); 
  const [examLength, setExamLength] = useState(0);
  const {studentId} = useParams();
  const {examId} = useParams();
  
  const createExamStudent = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/examStudent/createExamStudent/${studentId}/${examId}`);
      console.log("Exam Session Response:", response.data); // Log the response
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Creating Exam Student")
    createExamStudent();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        navigate("/examdone");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formattedCountdown = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <Box className="main">
      {/* Page Title goes here */}
      <Box className="subtitle">
        <h1>Subject Number Subject Name: Exam Name</h1>
      </Box>
      {/* Camera preview goes here */}
      <Box className="preview">
        <ObjectRecognition/>
      </Box>
      {/* Countdown timer */}
      <Box className="countdown">
        <Paper elevation={3} className="countdown-box">
          <h1>{formattedCountdown}</h1>
        </Paper>
      </Box>
    </Box>
  );
}
export default ExamSession;
