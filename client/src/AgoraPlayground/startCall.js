import React, { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-react';
import { Button, Grid } from '@mui/material';
import VideoCall from "./VideoCall";

function StartPage() {
  const [inCall, setInCall] = useState(false);
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
