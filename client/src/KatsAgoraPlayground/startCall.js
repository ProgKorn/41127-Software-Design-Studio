import { useState, useEffect } from "react";
import './startCall.css'
import AgoraRTC from "agora-rtc-sdk-ng";

const secrets = {
  appId: "e5709f8be2604869864acfa71a1f8b42",
  channelName: "newmain",
  token:
    "007eJxTYPBSP1B96P/Vo0/f8Ow907FoxXU2lcq7aye4BLr7XbKQ3H1DgSHV1NzAMs0iKdXIzMDEwszSwswkMTkt0dww0RAoamI0id0ytSGQkUHA7gkLIwMEgvgsDLmJmXkMDADjICBR",
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

const App = () => {
  const [videoOn, setVideoOn] = useState(false);
  const [joined, setJoined] = useState(false);
  console.log(process.env);

  useEffect(() => {
    setJoined(true);
    startCall();    
 }, []); // Pass an empty array to only call the function once on mount.

  return (
    <div>
      <h1>Big Brother is Watching You</h1>
      <div id="videoContainer"></div>
      <div id="remoteContainer"></div>
    </div>
  );
};

export default App;
