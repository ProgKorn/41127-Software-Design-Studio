import React, { useRef, useState, useEffect } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import { cheatingObject, drawRect, bannedObjects } from "./utilities";
import "../css/Exam.css";
import useVideoStore from "./VideoStore";  // Video storage function
import { useParams } from "react-router-dom";

function ObjectRecognition({ examInProgress }) {
  const webcamRef = useRef(null);
  const { studentId, examId } = useParams();


  const {
    canvasRef,
    recording,
    recordedChunks,
    videoSaved,
    startRecording,
    stopRecording} = useVideoStore(studentId, examId);

  const runModels = async () => {
    const net = await bodyPix.load();
    const cocoSsdNet = await cocossd.load();

    console.log('Models loaded');

    // Start the recording here
    startRecording(canvasRef);

    setInterval(() => {
      detect(net, cocoSsdNet);
    }, 40);
  };

  const detect = async (net, cocoSsdNet) => {
    if (
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const segmentation = await net.segmentPerson(video);
      const obj = await cocoSsdNet.detect(video);

      drawBody(segmentation, obj);  // Pass detected objects here

      drawRect(obj, canvas.getContext("2d"));
      // Cheating Detections
      cheatingObject(obj);
    }
  };

  const createMaskImage = (segmentation, width, height) => {
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskCtx = maskCanvas.getContext('2d');
    const imageData = maskCtx.createImageData(width, height);
    const data = imageData.data;
    for (let i = 0; i < segmentation.data.length; i++) {
        const j = i * 4;
        if (segmentation.data[i] === 1) {  
            data[j] = 255;
            data[j + 1] = 255;
            data[j + 2] = 255;
            data[j + 3] = 255; 
        } else {
            data[j] = 0;
            data[j + 1] = 0;
            data[j + 2] = 0;
            data[j + 3] = 0; 
        }
    }
    maskCtx.putImageData(imageData, 0, 0);
    return maskCanvas;
  };

  const drawBody = async (bodySegmentation, detectedObjects) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error('Video is not available.');
      return;
    }

    const ctx = canvas.getContext('2d');
    const video = webcamRef.current.video;
    const { videoWidth: width, videoHeight: height } = video;

    try {
      const blurCanvas = document.createElement('canvas');
      blurCanvas.width = width;
      blurCanvas.height = height;
      const blurCtx = blurCanvas.getContext('2d');

      blurCtx.filter = 'blur(10px)';
      blurCtx.drawImage(video, 0, 0, width, height);

      const maskCanvas = createMaskImage(bodySegmentation, width, height);

      // Draw only banned objects on the mask canvas
      const maskCtx = maskCanvas.getContext('2d');
      maskCtx.fillStyle = 'white';
      detectedObjects.forEach((obj) => {
        if (bannedObjects.includes(obj.class)) {
          maskCtx.fillRect(obj.bbox[0], obj.bbox[1], obj.bbox[2], obj.bbox[3]);
        }
      });

      const personCanvas = document.createElement('canvas');
      personCanvas.width = width;
      personCanvas.height = height;
      const personCtx = personCanvas.getContext('2d');

      //Draw only people
      personCtx.drawImage(maskCanvas, 0, 0, width, height);
      personCtx.globalCompositeOperation = 'source-in';
      personCtx.drawImage(video, 0, 0, width, height);

      canvas.width = 640;
      canvas.height = 480;

      ctx.drawImage(blurCanvas, 0, 0, 640, 480);
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(personCanvas, 0, 0, 640, 480);

      //Deal with video ending
    } catch (error) {
      console.log('An error occurred in drawBody:', error);
    }
  };

  useEffect(() => {
    runModels();
    
    if (!examInProgress) {
      stopRecording();
    }
  }, [examInProgress]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="flipped-video-container">
        <Webcam ref={webcamRef} className="flipped-video" mirrored={true} />
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 8,
          width: 640,
          height: 480,
          transform: "scaleX(-1)",
        }}
      />
    </div>
  );
}

export default ObjectRecognition;