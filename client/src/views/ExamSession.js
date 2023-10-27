import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "../css/Exam.css";
import axios from "axios";
import ObjectRecognition from "./ObjectRecognition";

function ExamSession() {
  const navigate = useNavigate();
  const [examSessionCreated, setExamSessionCreated] = useState(false);
  const [examLength, setExamLength] = useState(0); // Initialize to 0
  const { studentId } = useParams();
  const { examId } = useParams();
  const [examName, setExamName] = useState("");
  const [cameraPermission, setCameraPermission] = useState(false);

  const createExamStudent = async () => {
    try {
      console.log("Creating Exam Student");
      const response = await axios.post(
        `http://localhost:4000/examStudent/createExamStudent/${studentId}/${examId}`
      );
      console.log("Exam Session Response:", response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!examSessionCreated) {
      console.log("Creating Exam Student");
      createExamStudent();
      setExamSessionCreated(true);
    }
  }, []);

  useEffect(() => {
    console.log("Fetching Exam Length");
    axios.get(`http://localhost:4000/exam/getExamDetails/${examId}`).then((response) => {
      const { startTime, endTime } = response.data;
      setExamName(response.data.examName);
      const examLengthInSeconds = (new Date(endTime) - new Date(startTime)) / 1000;
      setExamLength(examLengthInSeconds); // Set the actual exam length
    }).catch((error) => {
      console.error(error);
    });

    return () => {
      console.log("Finished Fetching Details");
    };
  }, [examId]);

  useEffect(() => {
    // Check camera permission
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        // User granted camera permission
        setCameraPermission(true);
      })
      .catch(() => {
        // User denied camera permission
        setCameraPermission(false);
      });
  }, []);

  useEffect(() => {
    if (examLength > 0 && cameraPermission) {
      console.log("Setting up countdown timer");
      const timer = setInterval(() => {
        // Calculate the countdown value inside the timer logic
        if (examLength > 0) {
          setExamLength(examLength - 1);
          if (examLength === 0) {
            clearInterval(timer);
            axios.put(`http://localhost:4000/examStudent/updateExamStudentStatus/${studentId}/${examId}`, { status: "Completed" });
            navigate("/examdone");
          }
        }
      }, 1000);

      return () => {
        clearInterval(timer);
        console.log("Cleaning up timer");
      };
    }
  }, [examLength, cameraPermission, navigate, examId, studentId]);

  const hours = Math.floor(examLength / 3600);
  const minutes = Math.floor((examLength % 3600) / 60);
  const seconds = examLength % 60;
  const formattedCountdown = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <Box className="main">
      <Box className="subtitle">
        <h1>{examName}</h1>
      </Box>
      <Box className="preview">
        {cameraPermission ? (
          <ObjectRecognition />
        ) : (
          <p>Please grant camera permission to start the exam timer.</p>
        )}
      </Box>
      <Box className="countdown">
        <Paper elevation={3} className="countdown-box">
          <h1>{formattedCountdown}</h1>
        </Paper>
      </Box>
    </Box>
  );
}

export default ExamSession;
