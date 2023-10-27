import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const useVideoStore = () => {
  const navigate = useNavigate();
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const canvasRef = useRef(null);
  const { studentIdExtract, examIdExtract } = useParams(); // Get studentId and examId from URL params
  const startRecording = (canvasRef) => {
    const stream = canvasRef.current.captureStream(30);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      setRecordedChunks(chunks);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };
  
  useEffect(() => {
    console.log("NEWVIDO - EXAM HAS ENDED");
    if (recordedChunks.length > 0 && !recording) {
      const blob = new Blob(recordedChunks, {type:"video/webm; codecs=vp9"});
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('upload_preset', 'ml_default');
      console.log("NEWVIDO - Video begins to upload to cloud");
      fetch(`https://api.cloudinary.com/v1_1/dljsodofn/video/upload`, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.secure_url) {
          console.log("NEWVIDO - Upload successful: ", data.secure_url);
        }
     console.log("NEWVIDO - Video uploaded to cloud");

     
     console.log("NEWVIDO - Student ID:", studentIdExtract);
     console.log("NEWVIDO - Exam ID:", examIdExtract);
        //trying to upload the url to mongodb using the index file
     // Create FormData object to send video
     const videoData = {
      studentId: studentIdExtract,
      examId: examIdExtract,
      videoUrl: data.secure_url,
    };    

     console.log("NEWVIDO - Form data created");
      // Send video data to the server using Axios
      console.log("NEWVIDO - ",formData);

      axios.post(process.env.REACT_APP_SERVER_URL + "/saveVideo", videoData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log("NEWVIDO - Video URL saved successfully", response.data);
      })
      .catch((error) => {
        console.log("NEWVIDO - Error saving video URL:", error);
      });
      


      console.log("NEWVIDO - Navigated to exam done");
        setRecordedChunks([]);
        navigate("/examdone");
      })
      .catch((error) => {
        console.error("Upload failed: ", error);
      });
    }
  }, [recordedChunks, recording]);
  

  return {
    canvasRef,
    recording,
    recordedChunks,
    startRecording,
    stopRecording,
  };
};

export default useVideoStore;