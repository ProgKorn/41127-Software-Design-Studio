import AgoraRTC from "agora-rtc-sdk-ng";
import { useState, useEffect } from "react";
import './startCall.css'

const secrets = {
  appId: "e5709f8be2604869864acfa71a1f8b42",
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
  rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  console.log("Connection State: ", rtc.client.connectionState);

  const isVideoPublished = rtc.client.localTracks.some(
    (track) => track.trackMediaType === "video"
  );

  if (rtc.client.connectionState === "CONNECTED" && !isVideoPublished) {
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
  startVideo();
}

function startAllInOne(){
  startCall();
  startVideo();
}

const App = () => {
  const [videoOn, setVideoOn] = useState(false);
  const [joined, setJoined] = useState(false);
  console.log(process.env);

  useEffect(() => {
    if(!joined){
    setJoined(true);
    startCall();
    console.log("joining from here, join is " + joined)
    }
    
 }, []); // Pass an empty array to only call the function once on mount.
  
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
            setJoined(true);
            //startAllInOne();
            startCall();
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
            stopVideo();
          }}
        >
          End Call
        </button>
      )}
      {/* {joined && <button onClick={handleCamera}>Turn {videoOn ? "off" : "on"} Video</button>} */}
      <div id="videoContainer"></div>
    </div>
  );
};

export default App;
