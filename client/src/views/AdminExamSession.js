import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import jwt_decode from "jwt-decode";
import AgoraRTC from "agora-rtc-sdk-ng";
import '../css/AdminExamSession.css';
import FlagNotification from "../components/FlagNotification";
import * as bodyPix from "@tensorflow-models/body-pix";

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
  rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8", App: secrets.appId, token: secrets.token });
  await rtc.client.join(secrets.appId, "main", secrets.token);
}

async function leaveCall() {
  await stopVideo();
  rtc.client.leave();
}
        
const stopVideo = async () => {
  rtc.localVideoTrack.close();
  rtc.localVideoTrack.stop();
  rtc.client.unpublish(rtc.localVideoTrack);
};

function AdminExamSession() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState();
  const [userIds, setUserIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin === true) {
        setIsAdmin(true);
      } else {
        navigate("/noaccess");
      }
    }
  }, [isAdmin, navigate]);

  const startVideo = async () => {
    const net = await bodyPix.load();

    rtc.client.on("user-published", async (user, mediaType) => {

      // Ensure the user has subscribed to the video
      await rtc.client.subscribe(user, mediaType);

      // TO FIX: Attempting to clear all old canvas from users video (before a new person joins a format changes)
      if (userIds) {
        for (const uid of userIds) {
          const videoContainer = document.querySelector(`#user_${user.uid}.videoContainer`);
          const canvasCtx = (document.getElementById(`user_${uid}.canvas`)).getContext("2d");
          const blurCanvasCtx = (document.getElementById(`user_${uid}.blurCanvas`)).getContext("2d");
          const maskCanvasCtx = (document.getElementById(`user_${uid}.maskCanvas`)).getContext("2d");
          const personCanvasCtx = (document.getElementById(`user_${uid}.personCanvas`)).getContext("2d");
          const videoContainerCtx = (document.querySelector(`#user_${uid}.videoContainer`)).getContext("2d");
    
          canvasCtx.clearRect(0, 0, videoContainer.offsetWidth, videoContainer.offsetWidth);
          blurCanvasCtx.clearRect(0, 0, videoContainer.offsetWidth, videoContainer.offsetWidth);
          maskCanvasCtx.clearRect(0, 0, videoContainer.offsetWidth, videoContainer.offsetWidth);
          personCanvasCtx.clearRect(0, 0, videoContainer.offsetWidth, videoContainer.offsetWidth);
          videoContainerCtx.clearRect(0, 0, videoContainer.offsetWidth, videoContainer.offsetWidth);
          console.log("CLEARING CANVAS 3", {uid}, {userIds});
        }
      }
  
      if (mediaType !== "video") return;
      setUserId(user.uid);
      
      const remoteVideoTrack = user.videoTrack;
      const remoteContainer = document.getElementById("remoteContainer");
      let videoDiv = document.createElement("div");
      videoDiv.id = "user_" + user.uid;
      videoDiv.style.transform = "rotateY(180deg)";
      videoDiv.className = 'videoContainer';
      remoteContainer.appendChild(videoDiv);
  
      // Render remote video track
      remoteVideoTrack.play(videoDiv);
  
      const canvas = document.createElement("canvas");
      canvas.id = `user_${user.uid}.canvas`;
      canvas.style.top = '0px'
      canvas.style.left = '0px'
      canvas.style.position = 'absolute'
  
      canvas.width  = videoDiv.offsetWidth;
      canvas.height = videoDiv.offsetHeight;
      videoDiv.appendChild(canvas);
      const ctx = canvas.getContext("2d");
  
      const videoElement = document.querySelector(`#user_${user.uid} video`);
      const videoContainer = document.querySelector(`#user_${user.uid}.videoContainer`);

      videoElement.addEventListener('loadeddata', async function () {
        const drawRemoteBody = async () => {
          const { videoWidth: width, videoHeight: height } = videoElement;
          const segmentation = await net.segmentPerson(videoElement);
  
          const blurCanvas = document.createElement("canvas");
          blurCanvas.width = width;
          blurCanvas.height = height;
          blurCanvas.id = `user_${user.uid}.blurCanvas`;
          const blurCtx = blurCanvas.getContext("2d");
          blurCtx.clearRect(0, 0, blurCtx.width, blurCtx.height);
          blurCtx.filter = "blur(10px)";
          blurCtx.drawImage(videoElement, 0, 0, width, height);
  
          const maskCanvas = document.createElement("canvas");
          maskCanvas.id = `user_${user.uid}.maskCanvas`;
          maskCanvas.width = width;
          maskCanvas.height = height;
          const maskCtx = maskCanvas.getContext("2d");
          maskCtx.clearRect(0, 0, maskCtx.width, maskCtx.height);
          const imageData = maskCtx.createImageData(width, height);
          const data = imageData.data;
  
          for (let i = 0; i < segmentation.data.length; i++) {
            const j = i * 4;
            if (segmentation.data[i] === 1) {
              data[j] = 255;
              data[j + 1] = 255;
              data[j + 2] = 255;
              data[j + 3] = 255;
            } else {
              data[j] = 0;
              data[j + 1] = 0;
              data[j + 2] = 0;
              data[j + 3] = 0;
            }
          }
          maskCtx.putImageData(imageData, 0, 0);
  
          const personCanvas = document.createElement("canvas");
          personCanvas.id = `user_${user.uid}.personCanvas`;
          personCanvas.width = width;
          personCanvas.height = height;
          const personCtx = personCanvas.getContext("2d");
          personCtx.clearRect(0, 0, personCtx.width, personCtx.height);
  
          personCtx.drawImage(maskCanvas, 0, 0, width, height);
          personCtx.globalCompositeOperation = "source-in";
          personCtx.drawImage(videoElement, 0, 0, width, height);
  
          blurCanvas.style.zIndex = '-1'
          personCanvas.style.zIndex = '-1'
          ctx.drawImage(blurCanvas, 0, 0, videoContainer.offsetWidth, videoContainer.offsetWidth);
          ctx.globalCompositeOperation = "source-over";
          ctx.drawImage(personCanvas, 0, 0, videoContainer.offsetWidth, videoContainer.offsetWidth);
        };
        
        setInterval(() => {
          drawRemoteBody();
        }, 40);
      });
    });
  };

  async function startCall() {
    await join();
    startVideo();
  }

  useEffect(() => {
    startCall();
  }, []); // Pass an empty array to only call the function once on mount.

  useEffect(() => {
    // Storing user ids as they are joining the call
    const currentUsers = userIds.length > 0 ? userIds.concat([userId]) : (userId ? [userId] : []);
    setUserIds(currentUsers);
    console.log("USER UID TO CLEAR CANVAS 2", {userId}, {userIds}, {currentUsers});
  }, [userId]); // Pass an empty array to only call the function once on mount.

  return (
    <div>
      <AdminHeader />
      <h1>Live Exam Session</h1>
      <FlagNotification/>
      <div className="adminExamSession" style={{ display: 'flex', alignItems: 'center', alignContent: 'center'}}>
        <div id="remoteContainer" />
      </div>
    </div>
  );
}

export default AdminExamSession;
