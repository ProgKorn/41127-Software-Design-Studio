import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "../css/Exam.css";

function ExamSession() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60); 

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
      <Box className="preview">Camera preview goes here</Box>
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
