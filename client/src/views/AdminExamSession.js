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
    // Model for object and body segmentation
    console.log("BodyPix model loaded");

    rtc.client.on("user-published", async (user, mediaType) => {
      // Ensure the user has subscribed to the video
      await rtc.client.subscribe(user, mediaType);
  
      // If the subscribed media type is video, add it to the video container
      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        const remoteContainer = document.getElementById("remoteContainer");
        let videoDiv = document.createElement("div"); 
        videoDiv.id = user.uid;                      
        videoDiv.style.transform = "rotateY(180deg)"; 
        videoDiv.className = 'videoContainer'
        remoteContainer.appendChild(videoDiv); 

        // Set up canvas for blurring effect
        const canvas = document.createElement("canvas");
        canvas.width = 640; // Set appropriate dimensions
        canvas.height = 480; // Set appropriate dimensions
        videoDiv.appendChild(canvas);

        // Render remote video track
        remoteVideoTrack.play(String(user.uid))

        // Getting contenxt for canvas
        const ctx = canvas.getContext("2d");

        // Function to draw and blur video
        const drawRemoteBody = async () => {
          // Get video element
          const videoElement = document.getElementById(String(user.uid));
        
          if (!videoElement) {
            return;
          }
        
          // Getting video dimensions
          const { videoWidth: width, videoHeight: height } = videoElement;
          // Body pix to segment person from background
          const segmentation = await net.segmentPerson(videoElement);
        
          // Blur canvas
          const blurCanvas = document.createElement("canvas");
          blurCanvas.width = width;
          blurCanvas.height = height;
          const blurCtx = blurCanvas.getContext("2d");
          // Blur of 10 pixels on video
          blurCtx.filter = "blur(10px)";
          blurCtx.drawImage(videoElement, 0, 0, width, height);
        
          // Create a mask canvas based on the BodyPix segmentation
          const maskCanvas = document.createElement("canvas");
          maskCanvas.width = width;
          maskCanvas.height = height;
          const maskCtx = maskCanvas.getContext("2d");
          const imageData = maskCtx.createImageData(width, height);

          // Create an ImageData object for storing the details of segmented version
          const data = imageData.data;

          // Fill in the mask based on the BodyPix segmentation
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
          // Put image data back onto canvas
          maskCtx.putImageData(imageData, 0, 0);
          
          // Create person canvas layer
          const personCanvas = document.createElement("canvas");
          personCanvas.width = width;
          personCanvas.height = height;
          const personCtx = personCanvas.getContext("2d");

          // Draw just the person plain onto canvas
          personCtx.drawImage(maskCanvas, 0, 0, width, height);
          personCtx.globalCompositeOperation = "source-in";
          personCtx.drawImage(videoElement, 0, 0, width, height);
   
          // Draw final blurred version
          ctx.drawImage(blurCanvas, 0, 0, 640, 480);
          ctx.globalCompositeOperation = "source-over";
          ctx.drawImage(personCanvas, 0, 0, 640, 480);
        };

        // Run blurring at intervals
        setInterval(() => {
          drawRemoteBody();
        }, 40);
      }
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

  const buttonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: "Capitalize",
    color: "white",
    backgroundColor: "#292E64",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
  };

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
