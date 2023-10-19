import React, { useRef, useState, useEffect } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import { cheatingObject, drawRect, bannedObjects } from "./utilities";
import "../css/Exam.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function ObjectRecognition() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoSaved, setVideoSaved] = useState(false);
  const mediaRecorderRef = useRef(null);
  const {studentId} = useParams();
  const {examId} = useParams();

  console.log("URL Parameters:", studentId, examId);

  const runModels = async () => {
    const net = await bodyPix.load();
    const cocoSsdNet = await cocossd.load();

    console.log('Models loaded');

    startRecording(); // Start recording after models are loaded
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

  // Start recording tells the MediaRecorder API to start recording
  const startRecording = () => {
    console.log("Started recording");

    // Capturing the content of the canvas as a media stream called stream with 30FPS
    const stream = canvasRef.current.captureStream(30);

    //Setting new instance of MediaRecorder and adding it to a current reference for later stopping it and recording timestamps
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    // Checking if anything is being captured, when it is it will log the data and append it to recordedChunks
    // then it will use setRecordedChunks as a reference to update it
    mediaRecorder.ondataavailable = (e) => {
      console.log('Data available:', e);
      if (e.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(e.data));
      }
    };
    
    // For logging when recording is stopped
    mediaRecorder.onstop = () => {
      console.log('MediaRecorder stopped');
    };
    
    // Tells MediaRecorder API to actually start capturing video
    mediaRecorder.start();
    setRecording(true);
  };

  // Stop recording tells the mediarecorder to stop and set the recording status to false
  const stopRecording = () => {
    console.log("Stopping recording");
    if (mediaRecorderRef.current) {
      console.log('Stopping MediaRecorder state:', mediaRecorderRef.current.state);
      mediaRecorderRef.current.stop();
      setRecording(false);

      // Create FormData object to send video
      const formData = new FormData();
      formData.append("studentId", studentId); // Add studentID
      formData.append("examId", examId); // Add examID
      formData.append("fullRecording", new Blob(recordedChunks, {
        type: "video/webm; codecs=vp9", // Create blob with recorded data in WebM format with VP9 codec
      }));

      // Send video data to the server using Axios
      axios.post("http://localhost:4000/saveVideo", formData, {
      })
      .then((response) => {
        console.log("Video saved successfully", response.data);
      })
      .catch((error) => {
        console.error("Error saving video:", error);
      });
  }
};

  useEffect(() => {
    //If a video has been recorded and the recording is no longer happening
    if (recordedChunks.length > 0 && !recording) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm; codecs=vp9", //Create blob with recorded data in WebM format with VP9 codec
      });
      const url = URL.createObjectURL(blob); //Create blob URL

      // Create a download link
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "test.webm";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      // Clear the recorded chunks
      setRecordedChunks([]);
      setVideoSaved(true);
      const event = new CustomEvent('videoSaved');
      window.dispatchEvent(event);
    }
  }, [recordedChunks, recording]);

  useEffect(() => {
    runModels();
  }, []);

  useEffect(() => {
    const handleCountdownEnd = () => {
      stopRecording();
      console.log("Countdown ended detected from exam sesh!");
    };
  
    window.addEventListener('countdownEnded', handleCountdownEnd);
  
    return () => {
      window.removeEventListener('countdownEnded', handleCountdownEnd);
    };
  }, []);

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