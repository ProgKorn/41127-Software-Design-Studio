import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "../css/Exam.css";
import ObjectRecognition from "./ObjectRecognition";
import AgoraRTC from "agora-rtc-sdk-ng";

const secrets = {
  appId: "e5709f8be2604869864acfa71a1f8b42",
  channelName: "main",
  token:
    "007eJxTYPBSP1B96P/Vo0/f8Ow907FoxXU2lcq7aye4BLr7XbKQ3H1DgSHV1NzAMs0iKdXIzMDEwszSwswkMTkt0dww0RAoamI0id0ytSGQkUHA7gkLIwMEgvgsDLmJmXkMDADjICBR",
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
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    startCall();
  }, []); // Pass an empty array to only call the function once on mount.

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
  const formattedCountdown = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <Box className="main">
      {/* Page Title goes here */}
      <Box className="subtitle">
        <h1>Subject Number Subject Name: Exam Name</h1>
      </Box>
      {/* Camera preview goes here */}
      <Box className="preview">
        <ObjectRecognition />
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
