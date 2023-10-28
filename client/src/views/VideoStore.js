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
  const {studentIdExtract} = useParams();
  const {examIdExtract} = useParams();

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

      axios.post(process.env.REACT_APP_SERVER_URL +'/genericDbOp', {
        operationType: 'update',
        collType: 'Exam-Student',  // Replace with the actual collection name
        entry: { 
          query: { studentId: studentIdExtract, examId: examIdExtract }, 
          docs: { $set: { fullRecording: data.secure_url } } 
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
        

      console.log("NEWVIDO - Navigated to exam done");
        setRecordedChunks([]);
        navigate("/examdone");
      })
      .catch((error) => {
        console.error("NEWVIDO - Upload failed: ", error);
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