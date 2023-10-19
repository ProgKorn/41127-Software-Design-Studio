import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import AgoraRTC from 'agora-rtc-sdk-ng';
import AdminHeader from '../components/AdminHeader';
import { Button } from '@mui/material';

const APP_ID = 'e5709f8be2604869864acfa71a1f8b42';

function StartCall() {
  const localStream = useRef(null);

  useEffect(() => {
    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    client.init(APP_ID, () => {
      localStream.current = AgoraRTC.createStream({
        streamID: 1,
        audio: true,
        video: true,
        screen: false,
      });

      localStream.current.init(() => {
        localStream.current.play('video-container');
      });
    });

    client.join(null, 'main', null, (uid) => {
      console.log('User ' + uid + ' joined the channel');
    });

    return () => {
      client.leave(() => {
        localStream.current.stop();
        localStream.current.close();
      });
    };
  }, []);

  return (
    <div>
      <AdminHeader />

      {/* Use Helmet to dynamically add scripts to the document head */}
      <Helmet>
        <script src="https://download.agora.io/sdk/release/AgoraRTC_N-4.7.3.js"></script>
      </Helmet>

      <div>
        <h1>Kat's Agora Playground</h1>

        <Button variant="contained">Start Call</Button>

        {/* Container to play the local video stream */}
        <div id="video-container"></div>
      </div>
    </div>
  );
}

export default StartCall;
