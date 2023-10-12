import React, { useRef, useEffect, useState } from 'react';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import LoadingOverlay from '../components/Initialise';

function FacialLandmarkLogin({ comparisonDataParent, receiveFacialData, onVideoTurnOff  }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const [landmarksData, setLandmarksData] = useState([]);
  const [comparisonData, setComparisonData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [timeOnScreen, setTimeOnScreen] = useState(0);

  useEffect(() => {
    async function loadModel() {
      try {
        modelRef.current = await faceLandmarksDetection.load(
          faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
          { shouldLoadIrisModel: true }
        );

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;

        if (videoRef.current != null) {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            detectFaceLandmarks();
            setLoading(false); 
          };
        }
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    }

    loadModel();

    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => { track.stop(); });
      }
    };
  }, []);

  useEffect(() => {
    if (timeOnScreen >= 8) {
      setShowVideo(false); 
      onVideoTurnOff = true;
    }
  }, [timeOnScreen, onVideoTurnOff]);

  async function detectFaceLandmarks() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const processFrame = async () => {
        const predictions = await modelRef.current.estimateFaces({ input: videoRef.current });

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const newLandmarksData = [];
        if (predictions.length > 0) {
            for (const prediction of predictions) {
                const keypoints = prediction.scaledMesh;
                const scaleX = canvas.width / videoRef.current.videoWidth;
                const scaleY = canvas.height / videoRef.current.videoHeight;
                const landmarks = keypoints.map(([x, y, z]) => ({
                    x: x * scaleX,
                    y: y * scaleY,
                    z: z,
                }));
                newLandmarksData.push(landmarks);

                for (const point of keypoints) {
                    const [x, y] = point;
                    ctx.beginPath();
                    ctx.arc(x * scaleX, y * scaleY, 2, 0, 2 * Math.PI);
                    ctx.fillStyle = 'red';
                    ctx.fill();
                }
            }
        }

        setLandmarksData(newLandmarksData);

        if (videoRef.current !== null) {
          requestAnimationFrame(processFrame);
        }
      
        // compareFacialData(newLandmarksData);
    };

    if (videoRef.current !== null) {
      processFrame();
    }
}

  // async function compareFacialData(detectedLandmarks) {
  //   try {
  //       const image = document.createElement('img');
  //       image.src = "C:\\Users\\zeyne\\Documents\\UTS 2023\\41127-Software-Design-Studio\\client\\src\\face-login.jpg";
  //       await image.decode();

  //       const referenceFaces = await modelRef.current.estimateFaces({ input: image });
      
  //       const referenceLandmarks = referenceFaces[0].landmarks;
      
  //       if (detectedLandmarks.length !== referenceLandmarks.length) {
  //           setComparisonData(false);
  //           comparisonDataParent = false;
  //           receiveFacialData(false);
  //       }
      
  //       const similarityThreshold = 50;
  //       const squaredDistances = [];
      
  //       for (let i = 0; i < detectedLandmarks.length; i++) {
  //         const detectedPoint = detectedLandmarks[i];
  //         const referencePoint = referenceLandmarks[i];
  //         const squaredDistance = Math.pow(detectedPoint[0] - referencePoint.x, 2) + Math.pow(detectedPoint[1] - referencePoint.y, 2);
  //         squaredDistances.push(squaredDistance);
  //       }
      
  //       const averageSquaredDistance = squaredDistances.reduce((sum, distance) => sum + distance, 0) / squaredDistances.length;
      
  //       if (averageSquaredDistance < similarityThreshold) {
  //         setComparisonData(true);
  //         comparisonDataParent = true;
  //         receiveFacialData(true);
  //       }
      
  //       setComparisonData(false);
  //       comparisonDataParent = false;
  //       receiveFacialData(false);
  //   } catch (error) {
  //     console.error('Error comparing webcam data with student ID:', error);
  //   }
  // }

  return (
    <div style={{ position: 'relative' }}>
      {loading && <LoadingOverlay />}
      {showVideo && ( 
        <div style={{ position: 'relative' }}>
          <video ref={videoRef} width="640" height="480" autoPlay />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{
              position: 'absolute',
              transform: 'translate(-100%)',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default FacialLandmarkLogin;
