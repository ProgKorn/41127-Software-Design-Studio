import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import AgoraRTC from 'agora-rtc-sdk';
import AdminHeader from '../components/AdminHeader';
import { Button } from '@mui/material';

const APP_ID = 'e5709f8be2604869864acfa71a1f8b42';
const TOKEN = '007eJxTYNCNLffc9+ybilqsz97OU9aMctxr7jgm/fZ6PLHxVemlO4IKDKmm5gaWaRZJqUZmBiYWZpYWZiaJyWmJ5oaJhkBRE6NPmwxSGwIZGdQ3FDEzMkAgiM/CkJuYmcfAAABHvx+F';
const CHANNEL = 'main';

function StartCall() {
  const localStream = useRef(null);

  useEffect(() => {
    // Function to get temporary token from your server
    const getTempToken = async () => {
      try {
        const response = await fetch('http://localhost:3001/generateAgoraToken?channelName=main&uid=your_user_id');
        const data = await response.json();
        return data.token;
      } catch (error) {
        console.error('Error fetching temporary token:', error);
      }
    };

    const initAgora = async () => {
      const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

      client.init(APP_ID, async () => {
        const token = await getTempToken();

        localStream.current = AgoraRTC.createStream({
          streamID: 1,
          audio: true,
          video: true,
          screen: false,
        });

        localStream.current.init(() => {
          localStream.current.play('video-container');
        });

        client.join(token, 'main', null, (uid) => {
          console.log('User ' + uid + ' joined the channel');
        });
      });
    };

    initAgora();

    return () => {
      // Cleanup logic
    };
  }, []);

  return (
    <div>
      <AdminHeader />
      <Helmet>
        <script src="https://download.agora.io/sdk/release/AgoraRTC_N-4.7.3.js"></script>
      </Helmet>
      <div>
        <h1>Kat's Agora Playground</h1>
        <Button variant="contained">Start Call</Button>
        <div id="video-container"></div>
      </div>
    </div>
  );
}

export default StartCall;
