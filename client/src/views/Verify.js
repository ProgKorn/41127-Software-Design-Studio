import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "../css/Exam.css";
import VerifyObjectRecognition from "./VerifyObjectRecognition";

function Verify() {
  const [continueFlag, setContinueFlag] = useState("continue");
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [timer, setTimer] = useState(10); // Timer for the continue button

  const navigate = useNavigate();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer === 0) {
        setShowContinueButton(true);
        clearInterval(timerInterval);
      } else if (continueFlag === "continue" && timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [continueFlag, timer]);

  const handleContinueClick = () => {
    if (continueFlag === "continue") {
      navigate("/examsession");
    }
  };

  const resetTimer = () => {
    setShowContinueButton(false);
    setTimer(10);
  };

  return (
    <Box className="main">
      {/* Page Title goes here */}
      <Box className="subtitle">
        <h1>Pre-exam verification</h1>
      </Box>
      {/* Camera preview goes here */}
      <Box className="preview">
        <VerifyObjectRecognition
          setContinueFlag={(value) => {
            setContinueFlag(value);
            if (value === "block" || value === "pointdown") {
              resetTimer();
            }
          }}
        />
      </Box>
      {/* Countdown timer */}
      <Box className="countdown">
        <Paper elevation={3} className="verify-box">
          {showContinueButton ? (
            // Display an enabled "Continue" button when the timer is complete
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleContinueClick}
            >
              Continue
            </Button>
          ) : (
            // Show a circular timer with a smoother fill effect
            <div>
              <CircularProgress
                variant="determinate"
                value={100 - timer * 10}
                color="primary"
                size={60}
                sx={{
                  position: "relative",
                  "& circle": {
                    strokeLinecap: "round",
                  },
                  "& .MuiCircularProgress-bar": {
                    borderRadius: 50,
                    backgroundColor: "#1976D2",
                  },
                }}
              />
            </div>
          )}
        </Paper>
      </Box>
      {/* Additional logic to control exam continuation */}
      {continueFlag === "continue" ? (
        // Display any additional content or instructions when continueFlag is "continue"
        <Box className="additional-instructions">
          <p>{continueFlag === "continue" && "No cheating objects detected. Please wait for the countdown to complete."}</p>
        </Box>
      ) : (
        // Display a message when continueFlag is "block" or "pointdown"
        <Box className="exam-instructions">
          <p>
            {continueFlag === "pointdown"
              ? "Person detected. Please verify your workspace by pointing your camera down."
              : "Stop! Unauthorized objects detected. Please follow exam instructions."}
          </p>
        </Box>
      )}
    </Box>
  );
}

export default Verify;
