import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import "../css/AdminDashboard.css";
import jwt_decode from "jwt-decode";
import AgoraRTC from "agora-rtc-sdk-ng";
import '../css/AdminExamSession.css';

const secrets = {
    appId: "e5709f8be2604869864acfa71a1f8b42",
    channelName: "main",
    token:
      "007eJxTYPC/L54ft6/Oc76Vh+TmvAMybVE6pob7z9R6PzR9WZJcNUeBIdXU3MAyzSIp1cjMwMTCzNLCzCQxOS3R3DDREChqYrTgtVVqQyAjg+J1PgZGKATxWRhyEzPzGBgA2bEd4A==",
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
    // rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // console.log("Connection State: ", rtc.client.connectionState);
    // if (rtc.client.connectionState === "CONNECTED") {
    //   rtc.client.publish(rtc.localVideoTrack);
    //   rtc.localVideoTrack.play("videoContainer", { fit: "cover" });
    // }
  
    // Subscribe to remote users' video tracks
    rtc.client.on("user-published", async (user, mediaType) => {
      // Ensure the user has subscribed to the video
      await rtc.client.subscribe(user, mediaType);
  
      // If the subscribed media type is video, add it to the video container
      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        const remoteContainer = document.getElementById("remoteContainer");
  
        // Render remote video track
        remoteVideoTrack.play(remoteContainer, { fit: "cover" });
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
      <div className="adminDashboard">
        <h1>Live Exam Session</h1>
        <div id="remoteContainer"></div>
      </div>
    </div>
  );
}

export default AdminExamSession;
