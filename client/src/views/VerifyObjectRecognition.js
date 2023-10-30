import React, { useRef, useState, useEffect } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import {
  cheatingObject,
  drawRect,
  bannedObjects,
  notBannedObjects,
  pointDownObjects,
} from "./verifyUtilities";
import "../css/Exam.css";

function VerifyObjectRecognition({ setContinueFlag }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [message, setMessage] = useState(
    "Person detected. Please verify your workspace by pointing your camera down."
  );

  const runModels = async () => {
    const net = await bodyPix.load();
    const cocoSsdNet = await cocossd.load();

    console.log("Models loaded");
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
      const segmentation = await net.segmentPerson(video);
      const obj = await cocoSsdNet.detect(video);
  
      // Check for banned objects
      const detectedBannedObjects = obj.filter((item) =>
        bannedObjects.includes(item.class)
      );
      if (detectedBannedObjects.length > 0) {
        setContinueFlag("block"); // Set to "block" if banned objects are detected
        setMessage("Stop! Unauthorized objects detected. Please follow exam instructions.");
      } else {
        // Check for non-banned objects (keyboard and mouse)
        const nonBannedDetectedObjects = obj.filter((item) =>
          notBannedObjects.includes(item.class)
        );
        if (nonBannedDetectedObjects.length === obj.length) {
          setContinueFlag("continue"); // Set to "continue" if only keyboard and mouse are detected
          setMessage("No cheating objects detected. Please wait for the countdown to complete.");
        } else {
          setContinueFlag("block"); // Set to "block" if other non-banned objects are detected
          setMessage("Stop! Unauthorized objects detected. Please follow exam instructions.");
        }
      }
  
      // Check for "pointDownObjects" and set continueFlag accordingly
      const detectedPointDownObjects = obj.filter((item) =>
        pointDownObjects.includes(item.class)
      );
      if (detectedPointDownObjects.length > 0) {
        setContinueFlag("pointdown"); // Set to "pointdown" if pointDownObjects are detected
        setMessage("Person detected. Please verify your workspace by pointing your camera down.");
      }
  
      drawBody(segmentation, obj);
      drawRect(obj, canvasRef.current.getContext("2d"));
      cheatingObject(obj);
    }
  }

  const createMaskImage = (segmentation, width, height) => {
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskCtx = maskCanvas.getContext("2d");
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
      console.error("Video is not available.");
      return;
    }

    const ctx = canvas.getContext("2d");
    const video = webcamRef.current.video;
    const { videoWidth: width, videoHeight: height } = video;

    try {
      const maskCanvas = createMaskImage(bodySegmentation, width, height);

      // Draw only banned objects on the mask canvas
      const maskCtx = maskCanvas.getContext("2d");
      maskCtx.fillStyle = "white";
      detectedObjects.forEach((obj) => {
        if (bannedObjects.includes(obj.class)) {
          maskCtx.fillRect(obj.bbox[0], obj.bbox[1], obj.bbox[2], obj.bbox[3]);
        }
      });

      const personCanvas = document.createElement("canvas");
      personCanvas.width = width;
      personCanvas.height = height;
      const personCtx = personCanvas.getContext("2d");

      //Draw only people
      personCtx.drawImage(maskCanvas, 0, 0, width, height);
      personCtx.globalCompositeOperation = "source-in";
      personCtx.drawImage(video, 0, 0, width, height);

      canvas.width = 640;
      canvas.height = 480;

      //   ctx.drawImage(blurCanvas, 0, 0, 640, 480);
      ctx.globalCompositeOperation = "source-over";
      //   ctx.drawImage(personCanvas, 0, 0, 640, 480);

      //Deal with video ending
    } catch (error) {
      console.log("An error occurred in drawBody:", error);
    }
  };

  useEffect(() => {
    runModels();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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

export default VerifyObjectRecognition;
