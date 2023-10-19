import React, { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-react';
import { Button, Grid } from '@mui/material';
import VideoCall from "./VideoCall";

const StartPage = () => {
  const [inCall, setInCall] = useState(false);
  // const [client, setClient] = useState(null);
  // const [joined, setJoined] = useState(false);

  // useEffect(() => {
  //   const createClient = async () => {
  //     try {
  //       const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  //       setClient(agoraClient);
  //       console.log('Agora Client created successfully');
  //     } catch (error) {
  //       console.error('Error creating Agora Client', error);
  //     }
  //   };

  //   createClient();

  //   // Cleanup when the component is unmounted
  //   return () => {
  //     if (client) {
  //       if (joined) {
  //         client.leave();
  //       }
  //       client.removeAllListeners();
  //     }
  //   };
  // }, [client, joined]);

  // const joinChannel = async () => {
  //   if (client) {
  //     const appId = 'e5709f8be2604869864acfa71a1f8b42';
  //     const channel = 'main';
  //     const uid = 123; // The UID of the local user
  //     const token = '007eJxTYJBbV7V+92n2jzOn/vhSmPNWYhdL71xn7xvsD1c4b3gS/e2FAkOqqbmBZZpFUqqRmYGJhZmlhZlJYnJaorlhoiFQ1MTo3E6D1IZARgbeslUsjAwQCOKzMOQmZuYxMAAAHegh2w==';

  //     try {
  //       await client.join(appId, channel, token, null);
  //       setJoined(true);
  //       console.log('Successfully joined channel');
  //     } catch (error) {
  //       console.error('Error joining channel', error);
  //     }
  //   }
  // };

  // const leaveChannel = () => {
  //   if (client) {
  //     if (joined) {
  //       client.leave();
  //       setJoined(false);
  //       console.log('Left the channel');
  //     }
  //   }
  // };

  return (
    <div>
      <h1>Kat's Agora Playground</h1>
      {!inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setInCall(true)}
        >
          Join Call
        </Button>
      )}
    </div>
  );
};

export default StartPage;
