import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import AgoraRTC from "agora-rtc-sdk";
import AdminHeader from "../components/AdminHeader";
import { Button } from "@mui/material";

const APP_ID = "e5709f8be2604869864acfa71a1f8b42";
const TOKEN =
  "007eJxTYNCNLffc9+ybilqsz97OU9aMctxr7jgm/fZ6PLHxVemlO4IKDKmm5gaWaRZJqUZmBiYWZpYWZiaJyWmJ5oaJhkBRE6NPmwxSGwIZGdQ3FDEzMkAgiM/CkJuYmcfAAABHvx+F";
const CHANNEL = "main";

var localStreams = {
  camera: {
    id: "",
    stream: {},
  },
  screen: {
    id: "",
    stream: {},
  },
};

function StartCall() {
  const [uid, setUserId] = useState("");

  // // Function to get temporary token from your server
  // const getTempToken = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/generateAgoraToken?channelName=main&uid=your_user_id');
  //     const data = await response.json();
  //     return data.token;
  //   } catch (error) {
  //     console.error('Error fetching temporary token:', error);
  //   }
  // };

  const initAgora = async () => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

    client.init(APP_ID, async () => {
      console.log("AgoraRTC client initialized");
      client.join(TOKEN, "main", null, (uid) => {
        console.log("User " + uid + " joined the channel");
        setUserId(uid);
      });

      const localStream = AgoraRTC.createStream({
        streamID: uid,
        audio: true,
        video: true,
        screen: false,
      });

      localStream.setVideoProfile("480p_4");

      localStream.init(() => {
        localStream.play("video-container");
        client.publish(localStream, function (err) {
          console.log("[ERROR] : publish local stream error: " + err);
        });
      });
    });
  };

  initAgora();

  return (
    <div>
      <AdminHeader />
      <Helmet>
        <script src="https://download.agora.io/sdk/release/AgoraRTC_N-4.7.3.js"></script>
      </Helmet>
      <div>
        <h1>Kat's Agora Playground</h1>
        <div id="video-container"></div>
      </div>
    </div>
  );
}

export default StartCall;
