import './startCall.css'
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";

const secrets = {
  appId: "4973b0f30bc9433eb0737b3af0464ab6",
  channelName: "main",
  token: "007eJxTYNiZJZDEnbJkj8Szym0pi0sn64W9fcn4mmHJrDYPM8kPNgcUGFJNzQ0s0yySUo3MDEwszCwtzEwSk9MSzQ0TDYGiJkZJhsapDYGMDCd/lzEwQiGIz8KQm5iZx8AAABTYHsM=",
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
  rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  console.log("Connection State: ", rtc.client.connectionState);
  if (rtc.client.connectionState === "CONNECTED") {
    rtc.client.publish(rtc.localVideoTrack);
    rtc.localVideoTrack.play("videoContainer", { fit: "fill" });
  }
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

  return (
    <div>
      <h1>Hello</h1>
      {!joined ? (
        <button
          onClick={() => {
            startCall();
            setJoined(true);
          }}
        >
          Join Call
        </button>
      ) : (
        <button
          onClick={() => {
            leaveCall();
            setJoined(false);
            setVideoOn(false);
          }}
        >
          End Call
        </button>
      )}
      {joined && <button onClick={handleCamera}>Turn {videoOn ? "off" : "on"} Video</button>}
      <div id="videoContainer"></div>
    </div>
  );
};

export default App;
