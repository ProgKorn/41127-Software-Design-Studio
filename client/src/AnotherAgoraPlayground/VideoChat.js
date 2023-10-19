// VideoChat.js
import React, { useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import agoraConfig from './agoraConfig';

const VideoChat = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  let client = null;

  useEffect(() => {
    // Initialize Agora
    client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    client.init(agoraConfig.appId);

    // Join the channel
    client.join(agoraConfig.tempToken, 'your-channel-name', null, (uid) => {
      // Create and initialize the local video stream
      const localVideo = AgoraRTC.createCameraVideoTrack();
      localVideo.play(localVideoRef.current);

      // Publish the local video stream
      client.publish([localVideo]);

      // Subscribe to remote streams
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'video') {
          const remoteVideo = user.videoTrack;
          remoteVideo.play(remoteVideoRef.current);
        }
      });
    });

    return () => {
      // Leave the channel and unpublish the local stream when the component unmounts
      client.leave();
    };
  }, []);

  return (
    <div>
      <div ref={localVideoRef}></div>
      <div ref={remoteVideoRef}></div>
    </div>
  );
};

export default VideoChat;
