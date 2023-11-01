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
  const [flagRaised, setFlagRaised] = useState(false); // New state variable
  const [bufferedChunks, setBufferedChunks] = useState([]); // New state variable
  const [shouldCaptureFlaggedSegment, setShouldCaptureFlaggedSegment] = useState(false); // To capture video segment

  const startRecording = (canvasRef) => {
    const stream = canvasRef.current.captureStream(30);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
        if (flagRaised && shouldCaptureFlaggedSegment) {
          setBufferedChunks((prevBufferedChunks) => [...prevBufferedChunks, e.data]);
          if (bufferedChunks.length > 10) { // Assuming 30fps, 10 frames ~ 5 seconds
            console.log("Creating cheating clip");
            saveCheatingClip(bufferedChunks);
            setBufferedChunks([]);
          }
        }
      }
    };

    mediaRecorder.onstop = () => {
      let finalChunks = flagRaised ? bufferedChunks.concat(chunks) : chunks;
      setRecordedChunks(finalChunks);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = (flag) => {
    setFlagRaised(flag);
    if (flag) {
      setShouldCaptureFlaggedSegment(true);
      setTimeout(() => {
        setShouldCaptureFlaggedSegment(false);
        if (bufferedChunks.length > 0) {
          console.log("Creating cheating clip");
          saveCheatingClip(bufferedChunks);
          setBufferedChunks([]);
        }
      }, 10000); // Stop capturing after 10 seconds
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  // Function to update the flag with the new video clip URL in MongoDB
  const updateFlagVideo = (clipUrl) => {
    axios.get(process.env.REACT_APP_SERVER_URL + '/getLatestFlag/' + examIdExtract) //getting latest flag
    .then(response => {
      const latestFlagId = response.data.flagId; // Get latest flag ID
      if (latestFlagId) {
        const operationType = 'update';
        const collType = 'FlaggedIncidents';
        const entry = {
          query: { flagId: latestFlagId },  // Use the latest flag ID
          docs: { $set: { clipUrl: clipUrl } },
        };

        axios.post(process.env.REACT_APP_SERVER_URL + '/genericDbOp', {
          operationType,
          collType,
          entry
        })
        .then(response => {
          console.log("Flag updated successfully", response.data);
        })
        .catch(error => {
          console.error("Error updating flag:", error);
        });
      } else {
        console.error("Latest flag ID not found.");
      }
    })
    .catch(error => {
      console.error("Error fetching latest flag:", error);
    });
};
    

  const saveCheatingClip = () => {
    console.log("Cheating Video Detected");
    const blob = new Blob({type:"video/webm; codecs=vp9"});
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', 'ml_default');
    console.log("CheatingVideo - Video begins to upload to cloud");
    fetch(`https://api.cloudinary.com/v1_1/dljsodofn/video/upload`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.secure_url) {
        const clipUrl = data.secure_url;
        console.log(clipUrl);
        updateFlagVideo(data.secure_url);
      }
    })
    .catch((error) => {
      console.error("Cheating clip upload failed: ", error);
    });
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
    saveCheatingClip,
    updateFlagVideo,
  };
};

export default useVideoStore;