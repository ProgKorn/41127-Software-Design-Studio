import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import AgoraRTC, { getCameras } from "agora-rtc-sdk-ng";
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
  const [userId, setUserId] = useState();
  const initAgora = async () => {

    const client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

    await client.join(TOKEN, "main", null).then((res) => {
      console.log("user " + res + " joined the channel");
      setUserId(res)
      }) 

      const cameras = await getCameras();
      console.log("cameras are " + JSON.stringify(cameras));
      console.log("singular " + cameras[0].deviceId);

    // Join the channel directly using the client object
    //await client.join(APP_ID, CHANNEL, TOKEN, null);

    // Get the locally assigned UID
    // const localUid = client.getLocalUid();
    // setUserId(localUid);

    // const localStream = AgoraRTC.createStream({
    //   streamID: userId,
    //   audio: true,
    //   video: true,
    //   screen: false,
    // });

    // localStream.setVideoProfile("480p_4");

    // await localStream.init(() => {
    //   localStream.play("video-container");
    //   client.publish(localStream, function (err) {
    //     console.log("[ERROR] : publish local stream error: " + err);
    //   });
    // });

    // // Initialize the local stream
    // await localStream.init();

    // // Play the local stream in a div with the ID 'video-container'
    // localStream.play("video-container");

    // // Publish the local stream to the channel
    // await client.publish(localStream);

    return;
  };

  //initAgora();

  useEffect(() => {
    initAgora();
  }, []);

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
