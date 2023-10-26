import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const FlagNotification = () => {
  const [flagAdded, setFlagAdded] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:4001'); // Change the URL to match your Socket.io server's URL
    socket.on('connect', () => {
      console.log(`You connected with id: ${socket.id}`);
      // move emit here to make sure you're always connected before sending events if needed
    })
    socket.emit('custom-event', 10, 'Hi', {a: 'a'});
  }, []);

  return (
    <div>
      {flagAdded && (
        <div className="popup-notification">
          New Flag Added!
        </div>
      )}
      {/* Rest of your application */}
    </div>
  );
};

export default FlagNotification;