import "./startCall.css";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";

const secrets = {
  appId: "e5709f8be2604869864acfa71a1f8b42",
  channelName: "main",
  token:
    "007eJxTYJCrqJmy7ruBOOeRitQupsRft9Uf3nqokNxX4bRw46/TwtMUGFJNzQ0s0yySUo3MDEwszCwtzEwSk9MSzQ0TDYGiJka+i01SGwIZGarFNjMwQiGIz8KQm5iZx8AAAFqBH0o=",
};

const rtc = {
  client: null,
  localVideoTrack: null,
  localAudioTrack: null,
  localAudioAndVideoTrack: null,
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
    rtc.localVideoTrack.play("videoContainer", { fit: "cover" });
  }

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
}

const App = () => {
  const [videoOn, setVideoOn] = useState(false);
  const [joined, setJoined] = useState(false);

  console.log(process.env);

  const handleCamera = () => {
    if (videoOn) {
      stopVideo();
      setVideoOn(false);
    } else {
      startVideo();
      setVideoOn(true);
    }
  };

  const handleStart = () => {
    startCall();
    startVideo();
    setVideoOn(true);
    setJoined(true);
  };

  return (
    <div>
      <h1>Hello</h1>
      {!joined ? (
        <Button
          onClick={() => {
            handleStart();
          }}
        >
          I consent to being recorded
        </Button>
      ) : (
        <Button disabled>I have consented to being recorded</Button>
      )}
      <div id="videoContainer"></div>
      <div id="remoteContainer">
</div>
    </div>
  );
};

export default App;
