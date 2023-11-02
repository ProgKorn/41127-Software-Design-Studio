import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "../css/Exam.css";
import axios from "axios";
import ObjectRecognition from "./ObjectRecognition";
import FlagNotification from "../components/FlagNotification";
import AgoraRTC from "agora-rtc-sdk-ng";
import { raiseUnfocusedFlag } from "./utilities";

const secrets = {
  appId: process.env.REACT_APP_AGORA_APP_ID,
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
  const { seatNo } = useParams();
  const [examName, setExamName] = useState("");
  const [cameraPermission, setCameraPermission] = useState(false);
  const [examInProgress, setExamInProgress] = useState(false);
  const [videoUploadStarted, setVideoUploadStarted] = useState(false);
  const [examTerminated, setExamTerminated] = useState(false);
  // var flagCount = 0;
  const [flagCount, setFlagCount] = useState(0);
  const createExamStudent = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL +
          `/examStudent/createExamStudent/${studentId}/${examId}/${seatNo}`
      );
      console.log("Exam Session Response:", response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // const handleFlagAdded = async () => {
  //   // Call and set flagCount to array in ExamStudent
  //   axios
  //     .get(
  //       process.env.REACT_APP_SERVER_URL +
  //         `/examStudent/getActiveExamStudent/${studentId}/${examId}`
  //     )
  //     .then((response) => {
  //       flagCount = response.data.flags.length;
  //       console.log("Number of Flags:", flagCount);
  //     });
  //   if (flagCount >= 2) {
  //     setExamTerminated(true);
  //   }
  // }
  // console.log('PROPS ARE HERE ' + examId, studentId);
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "b") {
        // Redirect to the /examdone page with parameters and examTerminated set to true
        navigate(`/examdone/${studentId}/${examId}/${seatNo}`, { examTerminated: true });
      }
    };

    // Attach the event listener
    window.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate, studentId, examId, seatNo]);
  
  useEffect(() => {
    const handleFlagAdded = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_SERVER_URL +
            `/examStudent/getActiveExamStudent/${studentId}/${examId}`
        );
        setFlagCount(response.data.flags.length);
        console.log("Number of Flags:", response.data.flags.length);
        if (flagCount >= 2) {
              setExamTerminated(true);
            }
      } catch (error) {
        console.error("Error fetching flag count:", error);
      }
    };

    const interval = setInterval(() => {
      handleFlagAdded();
    }, 5000); // Fetch data every 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [studentId, examId]);

  useEffect(() => {
    startCall();
    if (!examSessionCreated) {
      console.log("Creating Exam Student");
      createExamStudent();
      setExamSessionCreated(true);
    }
  }, []);

  useEffect(() => {
    const handleBlur = () => {
      const currentTime = new Date().toLocaleString();
      console.log(`[${currentTime}] Window is not focused or minimized`);
      raiseUnfocusedFlag();
      // handleFlagAdded();
    };

    const handleFocus = () => {
      const currentTime = new Date().toLocaleString();
      console.log(`[${currentTime}] Window is focused`);
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [examId, studentId]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/exam/getExamDetails/${examId}`)
      .then((response) => {
        const { startTime, endTime } = response.data;
        setExamName(response.data.examName);
        const examLengthInSeconds =
          (new Date(endTime) - new Date(startTime)) / 1000;
        setExamLength(examLengthInSeconds);
        setRemainingTime(examLengthInSeconds); 
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      console.log("Finished Fetching Details");
    };
  }, [examId]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        setCameraPermission(true);
      })
      .catch(() => {
        setCameraPermission(false);
      });
  }, []);

  useEffect(() => {
    if (examLength > 0 && cameraPermission) {
      setExamInProgress(true);
      const timer = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(remainingTime - 1);
        }
      }, 1000);

      if (remainingTime <= 0 || examTerminated) {
        clearInterval(timer);
        setExamInProgress(false);
        axios.put(
          process.env.REACT_APP_SERVER_URL +
            `/examStudent/updateExamStudentStatus/${studentId}/${examId}`,
          { status: "Completed" }
        );
        navigate(`/examdone/${studentId}/${examId}/${seatNo}`, { examTerminated });

        // Leave the call after exam ends
        leaveCall();
        setVideoUploadStarted(true); //This signifies that the video is uploading, show the new screen informing user not to close the page while video is uploaded
        //Here I want to display a thing over the entire page, a popup or something, maybe it overrides the page and it says, "Video upload in progress, Do not close the window"
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [remainingTime, cameraPermission, navigate, examId, studentId, examTerminated]);

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  const formattedCountdown = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (

    <>
      <style>
        {`
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 4px;
            text-align: center;
          }

          .modal-text {
            font-size: 20px;
            font-weight: bold;
          }
        `}
      </style>

    <Box className="main">
      <Box className="subtitle">
        <h1>{examName}</h1>
      </Box>
      <Box className="preview">
        {cameraPermission ? (
          <>
            <ObjectRecognition examInProgress={examInProgress}/>
            <FlagNotification/>
          </>
        ) : (
          <p>Please grant camera permission to start the exam timer.</p>
        )}
      </Box>
      <Box className="countdown">
        <Paper elevation={3} className="countdown-box">
          <h1>{formattedCountdown}</h1>
        </Paper>
      </Box>
      {videoUploadStarted && (
        <div className="modal">
          <div className="modal-content">
            <span className="modal-text">Exam video uploading, do not close browser</span>
          </div>
        </div>
      )}
    </Box>
    </>
  );
  
}

export default ExamSession;
