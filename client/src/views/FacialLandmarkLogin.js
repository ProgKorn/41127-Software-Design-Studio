import React, { useRef, useEffect, useState } from 'react';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';
import LoadingOverlay from '../components/Initialise';
import '../css/FacialLoader.css';
import FaceLoader from '../components/FaceLoader';
// this is currently a hard coded image for the sake of demo. we can add different images to test different users. 
// working on having this be accessible from the db.
import base64ImageData from '../components/Base64ImageData';

function FacialLandmarkLogin(facialMatch) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const [comparisonData, setComparisonData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [functionLoading, setFunctionLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    async function loadModel() {
      try {
        const detectorConfig = {
          runtime: 'mediapipe',
          solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
        };

        modelRef.current = await facemesh.createDetector(facemesh.SupportedModels.MediaPipeFaceMesh, detectorConfig);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setLoading(false);
          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              videoRef.current.play();
              setIsPlaying(true);
              detectFaceLandmarks(modelRef.current);
            }
          };
        }
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    }

    loadModel();

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => {
            track.stop();
          });
        }
      }
    };
  }, []);

  const detectFaceLandmarks = async (net) => {
    if (
      typeof videoRef.current !== "undefined" &&
      videoRef.current !== null &&
      videoRef.current.readyState === 4
    ) {
      const face = await net.estimateFaces(videoRef.current);
      await compareFacialData(face);
      return face;
    }
  };

  async function compareFacialData(detectedLandmarks) {
    const image = new Image();
    image.src = base64ImageData;

    image.onload = async () => {
      console.log("image loading");
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      await image.decode().then(async () => {
        try {
          const referenceFaces = await modelRef.current.estimateFaces(imageData);
          console.log(referenceFaces);
          if (detectedLandmarks.length !== referenceFaces.length) {
            setComparisonData(false);
          }
          
          const squaredDistances = [];

          const detectedPoints = detectedLandmarks[0].keypoints;
          console.log(detectedPoints)
          const referencePoints = referenceFaces[0].keypoints;

          var detectedPoint = [];
          var referencePoint = [];
          for (let i = 0; i < detectedPoints.length; i++) {
            detectedPoint = detectedPoints[i];
            referencePoint = referencePoints[i];
          
            if (detectedPoint && referencePoint) {
              const squaredDistance = Math.pow(detectedPoint.x - referencePoint.x, 2) + Math.pow(detectedPoint.y - referencePoint.y, 2);
              squaredDistances.push(squaredDistance);
            }
          }

          if (squaredDistances.length > 0) {
            const sumSquaredDistances = squaredDistances.reduce((sum, distance) => sum + distance, 0);
            const averageSquaredDistance = sumSquaredDistances / squaredDistances.length;
            console.log('Average squared distance:', averageSquaredDistance);
            if (averageSquaredDistance < 20000) {
              setComparisonData(true);
            }
          } else {
            console.error('No valid data to calculate average squared distance.')
          };
          setFunctionLoading(true);
        } catch (error) {
          console.error('Error estimating faces:', error);
        }
    })}
  };
  
  let sentData = false;
  let sentComparisonData = false;

  const sendDataToParent = (data) => {
    if (data !== null && data !== undefined && !sentData) {
      console.log("how");
      sentData = true;
      facialMatch.sendDataToParent(data);
    }
  };

  if (functionLoading === true && comparisonData !== null && comparisonData !== undefined && !sentComparisonData) {
    console.log("aiont");
    sentComparisonData = true;
    sendDataToParent(comparisonData);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '640px', height: '480px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: '640px', height: '480px', display: 'inline-block' }}>
        <video
          width="640"
          height="480"
          autoPlay
          style={{
            display: 'block',
            margin: '0 auto',
            opacity: 0.4,
          }}
          ref={videoRef}
        />
        {!loading && isPlaying && showLoader && ( 
          // <div
          //   className="wrapper"
          //   data-anim="base wrapper"
          //   style={{
          //     position: 'absolute',
          //     top: '50%',
          //     left: '50%',
          //     transform: 'translate(-50%, -50%)',
          //     zIndex: 3,
          //   }}
          // >
          //   <div className="circle" data-anim="base left"></div>
          //   <div className="circle" data-anim="base right"></div>
          // </div>
          <FaceLoader loading={showLoader}/>
          // <FaceLoader loading={!functionLoading}/>
        )}
        {/* <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{
            position: 'absolute',
            transform: 'translate(-100%)',
          }}
        /> */}
      </div>
      {loading && <LoadingOverlay />}
    </div>
  );
};

export default FacialLandmarkLogin;