import React, { useState } from 'react';
import { Button } from '@mui/material';
import VideoCall from "./VideoCall";

function StartPage() {
  const [inCall, setInCall] = useState(false);

  return (
    <div>
      <h1>Kat's Agora Playground</h1>
      <Button
          variant="contained"
          color="primary"
          onClick={() => setInCall(true)}
        >
          Join Call
        </Button>
        {inCall && <VideoCall setInCall={setInCall} />}
    </div>
  );
}

export default StartPage;