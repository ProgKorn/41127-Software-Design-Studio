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
const startVideo = async () => {
  const net = await bodyPix.load();
  console.log("BodyPix model loaded");

  // const adminExamPageDiv = document.getElementById("adminExamPage");

  // const videoSizeMap = {
  //   1: {width: adminExamPageDiv.clientWidth * 0.9, height: adminExamPageDiv.clientHeight * 0.9},
  //   2: {width: adminExamPageDiv.clientWidth * 0.5, height: adminExamPageDiv.clientHeight * 0.9}
  // }
  // console.log("MAPPING", {videoSizeMap});

  rtc.client.on("user-published", async (user, mediaType) => {
    // Ensure the user has subscribed to the video
    await rtc.client.subscribe(user, mediaType);

    if (mediaType !== "video") return;

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
    
    canvas.width = 640;
    canvas.height = 480;
    videoDiv.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const videoElement = document.querySelector(`#user_${user.uid} video`);
    videoElement.addEventListener('loadeddata', async function () {
      const drawRemoteBody = async () => {
        const { videoWidth: width, videoHeight: height } = videoElement;
        const segmentation = await net.segmentPerson(videoElement);

        const blurCanvas = document.createElement("canvas");
        blurCanvas.width = width;
        blurCanvas.height = height;
        const blurCtx = blurCanvas.getContext("2d");
        blurCtx.filter = "blur(10px)";
        blurCtx.drawImage(videoElement, 0, 0, width, height);

        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = width;
        maskCanvas.height = height;
        const maskCtx = maskCanvas.getContext("2d");
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
        personCanvas.width = width;
        personCanvas.height = height;
        const personCtx = personCanvas.getContext("2d");

        personCtx.drawImage(maskCanvas, 0, 0, width, height);
        personCtx.globalCompositeOperation = "source-in";
        personCtx.drawImage(videoElement, 0, 0, width, height);

        ctx.drawImage(blurCanvas, 0, 0, videoDiv.clientWidth, videoDiv.clientHeight);
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(personCanvas, 0, 0, videoDiv.clientWidth, videoDiv.clientHeight);
      };

      setInterval(() => {
        drawRemoteBody();
      }, 40);
    });
  });
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

function AdminExamSession() {
  const [isAdmin, setIsAdmin] = useState(false);
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

  useEffect(() => {
    startCall();
  }, []); // Pass an empty array to only call the function once on mount.


  return (
    <div id="adminExamPage">
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