import { useRef, useState, useEffect, useCallback } from "react";
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
  const { studentId } = useParams();
  const { examId } = useParams();
  const {seatNo} = useParams();

  const [isUploading, setIsUploading] = useState(false);

  const [fiveSecondChunks, setFiveSecondChunks] = useState([]);
  const startRecording = (canvasRef) => {
    const stream = canvasRef.current.captureStream(30);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
        setFiveSecondChunks(prevState => [...prevState, e.data]); // update the fiveSecondChunks state
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
  
  const uploadNextFiveSeconds = useCallback(() => {
    let latestEntry = null;

    axios.post(process.env.REACT_APP_SERVER_URL + '/genericDbOp', {
      operationType: 'find',
      collType: 'FlaggedIncidents',
      entry: {
        query: {}
      }
    })
    .then(response => {
      if (response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        // Sort by _id in descending order to get the latest entry
        const sortedData = response.data.data.sort((a, b) => b._id.localeCompare(a._id));
        latestEntry = sortedData[0];
        console.log('NEWVIDOCHEAT Latest Entry:', latestEntry);
      } else {
        console.log('NEWVIDOCHEAT No entries found in FlaggedIncidents collection.');
      }
    })
    .catch(error => {
      console.log('NEWVIDOCHEAT An error occurred while fetching FlaggedIncidents:', error);
    });

    console.log("RECORDING NEXT 5 SECONDS");
  
    // Create a new MediaRecorder instance for the 5-second recording
    const stream = canvasRef.current.captureStream(30);
    const fiveSecondMediaRecorder = new MediaRecorder(stream);
    const chunks = [];
  
    fiveSecondMediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };
  
    fiveSecondMediaRecorder.onstop = () => {
      // Create blob from the last 5 seconds of data
      const blob = new Blob(chunks, { type: "video/webm; codecs=vp9" });
  
      console.log("NEWVIDOCHEAT THE BLOB: " + blob);
  
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('upload_preset', 'ml_default');
  
      fetch(`https://api.cloudinary.com/v1_1/dljsodofn/video/upload`, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.secure_url) {

          axios.post(process.env.REACT_APP_SERVER_URL +'/genericDbOp', {
            operationType: 'update',
            collType: 'FlaggedIncidents',
            entry: { 
              query: { flagId: latestEntry.flagId }, 
              docs: { $set: { fullRecording: data.secure_url } } 
            }
          }).then(response => {
            console.log("NEWVIDOCHEAT - " + response.data);
          })
          .catch(error => {
            console.error('NEWVIDOCHEAT - An error occurred:', error);
          });
            

          console.log("NEWVIDOCHEAT - Upload successful: ", data.secure_url);
          setIsUploading(false);
        }
        setIsUploading(false);
      }).catch((error) => {
        console.error("NEWVIDOCHEAT - Upload failed: ", error);
        setIsUploading(false);
      });
    };
  
    // Start recording
    fiveSecondMediaRecorder.start();
  
    setTimeout(() => {
      // Stop recording after 5 seconds
      fiveSecondMediaRecorder.stop();
    }, 6000);
  
  }, []);
  


  useEffect(() => {
    const interceptor = axios.interceptors.request.use(function (config) {
      if (!isUploading && config.url === 'https://sentinel-backend.fly.dev/flag/addFlag' && config.method === 'post') {
        setIsUploading(true);
        console.log('Detected the network request you want to monitor');
        console.log("RECORD THE 5 SECONDS NOW");
        uploadNextFiveSeconds();
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [isUploading, uploadNextFiveSeconds]);


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

      navigate(`/examdone/${studentId}/${examId}/${seatNo}`);



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