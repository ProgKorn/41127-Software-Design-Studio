import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "../css/Exam.css";
import axios from "axios";
import ObjectRecognition from "./ObjectRecognition";
import AgoraRTC from "agora-rtc-sdk-ng";

const secrets = {
  appId: "e5709f8be2604869864acfa71a1f8b42",
  channelName: "main",
  token: process.env.REACT_APP_AGORA_TOKEN,
};

const rtc = {
  client: null,
  localVideoTrack: null,
  localAudioTrack: null,
};

async function join() {
  rtc.client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
    App: secrets.appId,
    token: secrets.token,
  });
  await rtc.client.join(secrets.appId, "main", secrets.token);
}

async function leaveCall() {
  await stopVideo();
  rtc.client.leave();
}

const startVideo = async () => {
  rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  console.log("Connection State: ", rtc.client.connectionState);
  if (rtc.client.connectionState === "CONNECTED") {
    rtc.client.publish(rtc.localVideoTrack);
  }
};

const stopVideo = async () => {
  rtc.localVideoTrack.close();
  rtc.localVideoTrack.stop();
  rtc.client.unpublish(rtc.localVideoTrack);
};

async function startCall() {
  await join();
  startVideo();
}

function ExamSession() {
  const navigate = useNavigate();
  const [examSessionCreated, setExamSessionCreated] = useState(false);
  const [examLength, setExamLength] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const { studentId } = useParams();
  const { examId } = useParams();
  const [examName, setExamName] = useState("");
  const [cameraPermission, setCameraPermission] = useState(false);

  const createExamStudent = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_URL + `/examStudent/createExamStudent/${studentId}/${examId}`);
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
    axios.get(process.env.REACT_APP_SERVER_URL + `/exam/getExamDetails/${examId}`).then((response) => {
      const { startTime, endTime } = response.data;
      setExamName(response.data.examName);
      const examLengthInSeconds = (new Date(endTime) - new Date(startTime)) / 1000;
      // For testing, replace with the actual exam length logic
      // const examLengthInSeconds = 10; 
      setExamLength(examLengthInSeconds);
      setRemainingTime(examLengthInSeconds); // Initialize remaining time
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
      const timer = setInterval(() => {
        if (remainingTime > 0) { // Use remainingTime
          setRemainingTime(remainingTime - 1); // Update remaining time
        }
      }, 1000);

      if (remainingTime <= 0) {
        clearInterval(timer);
        // Update exam session status to "Completed"
        axios.put(process.env.REACT_APP_SERVER_URL + `/examStudent/updateExamStudentStatus/${studentId}/${examId}`, { status: "Completed" });
        navigate("/examdone");
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [remainingTime, cameraPermission, navigate, examId, studentId]);

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
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