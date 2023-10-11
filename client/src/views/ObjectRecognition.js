import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import { drawRect } from "./utilities";
import "../css/Exam.css";

function ObjectRecognition() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runModels = async () => {
    const net = await bodyPix.load();
    const cocoSsdNet = await cocossd.load();

    console.log('Models loaded');
    setInterval(() => {
      detect(net, cocoSsdNet);
    }, 16);
  };

  const detect = async (net, cocoSsdNet) => {
    if (
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const segmentation = await net.segmentPerson(video);
      drawBody(segmentation);

      const obj = await cocoSsdNet.detect(video);
      drawRect(obj, canvas.getContext("2d"));
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

const drawBody = async (bodySegmentation) => {
    const canvas = canvasRef.current;
<<<<<<< Updated upstream
    const ctx = canvas.getContext('2d');

    const video = webcamRef.current.video;
    const { videoWidth: width, videoHeight: height } = video;

    const blurCanvas = document.createElement('canvas');
    blurCanvas.width = width;
    blurCanvas.height = height;
    const blurCtx = blurCanvas.getContext('2d');

    blurCtx.filter = 'blur(10px)';
    blurCtx.drawImage(video, 0, 0, width, height);

    const maskCanvas = createMaskImage(bodySegmentation, width, height);

    const personCanvas = document.createElement('canvas');
    personCanvas.width = width;
    personCanvas.height = height;
    const personCtx = personCanvas.getContext('2d');

    personCtx.drawImage(maskCanvas, 0, 0, width, height);
    personCtx.globalCompositeOperation = 'source-in';
    personCtx.drawImage(video, 0, 0, width, height);

    canvas.width = 640;
    canvas.height = 480;

    ctx.drawImage(blurCanvas, 0, 0, 640, 480);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(personCanvas, 0, 0, 640, 480);
};
=======

    if (!canvas) {
      console.error('Video is not available.');
      return; // Exit the function to avoid further errors
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
  
      const personCanvas = document.createElement('canvas');
      personCanvas.width = width;
      personCanvas.height = height;
      const personCtx = personCanvas.getContext('2d');
  
      personCtx.drawImage(maskCanvas, 0, 0, width, height);
      personCtx.globalCompositeOperation = 'source-in';
      personCtx.drawImage(video, 0, 0, width, height);
  
      canvas.width = 640;
      canvas.height = 480;
  
      ctx.drawImage(blurCanvas, 0, 0, 640, 480);
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(personCanvas, 0, 0, 640, 480);
    } catch (error) {
      // Handle the error here and log it for debugging
      console.log('An error occurred in drawBody:', error);
    }
  };
  
>>>>>>> Stashed changes



  useEffect(() => { runModels() }, []);

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
          width: 640, // Set the width to the desired value
          height: 480, // Set the height to the desired value
          transform: "scaleX(-1)", // Flip the text horizontally
        }}
      />
    </div>
  );
}

export default ObjectRecognition;
