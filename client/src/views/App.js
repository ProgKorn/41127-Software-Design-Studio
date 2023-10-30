import '../App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import { Title } from './Header';
import HelpCentre from './HelpCentre';
import ExamStart from './ExamStart';
import FacialLandmarkRecognition from './FacialLandmarkRecognition';
import ObjectRecognition from './ObjectRecognition';
import AdminDashboard from './AdminDashboard';
import AdminExamSession from './AdminExamSession';
import Exam from './Exam';
import ExamHistory from './ExamHistory';
import FlagLog from './FlagLog';
import Flag from './Flag';
import Schedule from './Schedule';
import LaunchExam from './LaunchExam';
import CreateSession from './CreateSession';
import ManageClasses from './ManageClasses';
import Student from './Student';
import StudentHomepage from './StudentHomepage';
import PreviousExams from './PreviousExams';
import ExamSession from './ExamSession';
import NoAccess from './NoAccess';
import PrivateRoute from './PrivateRoute';
import Loader from '../components/Loader';
import ExamDone from './ExamDone';
import CreateClass from '../views/CreateClass';
import ThirdPlayground from '../KatsAgoraPlayground/startCall';
import Verify from './Verify';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem('token');
      setIsLoggedIn(!!storedToken); 
      setIsLoading(false);
    };

    checkToken();

    const tokenCheckInterval = setInterval(checkToken, 10); 

    return () => clearInterval(tokenCheckInterval); 
  }, [])

  return isLoading && isLoggedIn ? (
    <div> <Loader loading={isLoading}/> </div>
  ) : (
    // Routing setup for individual pages
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/helpcentre" element={<HelpCentre />} />
          <Route path="/examstart/:studentId/:examId" element={<PrivateRoute element={<ExamStart />} isLoggedIn={isLoggedIn} />} />
          <Route path="/faciallandmarkrecognition" element={<PrivateRoute element={<FacialLandmarkRecognition />} isLoggedIn={isLoggedIn} />} />
          <Route path="/objectrecognition" element={<PrivateRoute element={<ObjectRecognition />} isLoggedIn={isLoggedIn} />} />
          <Route path="/exam/:examId" element={<PrivateRoute element={<Exam />} isLoggedIn={isLoggedIn} />} />
          <Route path="/student/:studentId" element={<PrivateRoute element={<Student />} isLoggedIn={isLoggedIn} />} />
          <Route path="/examhistory" element={<PrivateRoute element={<ExamHistory />} isLoggedIn={isLoggedIn} />} />
          <Route path="/flaglog" element={<PrivateRoute element={<FlagLog />} isLoggedIn={isLoggedIn} />} />
          <Route path="/flag/:flagId" element={<PrivateRoute element={<Flag />} isLoggedIn={isLoggedIn} />} />
          <Route path="/schedule" element={<PrivateRoute element={<Schedule />} isLoggedIn={isLoggedIn} />} />
          <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} isLoggedIn={isLoggedIn} />} />
          <Route path="/adminExamSession" element={<PrivateRoute element={<AdminExamSession />} isLoggedIn={isLoggedIn} />} />
          <Route path="/launchexam" element={<PrivateRoute element={<LaunchExam />} isLoggedIn={isLoggedIn} />} />
          <Route path="/createsession" element={<PrivateRoute element={<CreateSession />} isLoggedIn={isLoggedIn} />} />
          <Route path="/manageclasses" element={<PrivateRoute element={<ManageClasses />} isLoggedIn={isLoggedIn} />} />
          <Route path="/createclass" element={<PrivateRoute element={<CreateClass />} isLoggedIn={isLoggedIn} />} />
          <Route path="/studenthomepage" element={<PrivateRoute element={<StudentHomepage />} isLoggedIn={isLoggedIn} />} />
          <Route path="/previousexams" element={<PrivateRoute element={<PreviousExams />} isLoggedIn={isLoggedIn} />} />
          <Route path="/examsession/:studentId/:examId" element={<PrivateRoute element={<ExamSession />} isLoggedIn={isLoggedIn} />} />
          <Route path="/examdone" element={<PrivateRoute element={<ExamDone />} isLoggedIn={isLoggedIn} />} />
          <Route path="/examverify/:studentId/:examId" element={<PrivateRoute element={<Verify />} isLoggedIn={isLoggedIn} />} />
          <Route path="/noaccess" element={<NoAccess />} />
          <Route path="/startCall" element={<ThirdPlayground />} />
        </Routes>
      </div>
    </Router>
  );
}

//component rendered in routes component when root path '/' is matched
//this prevents buttons persisting between windows
function HomePage() {
  return (
    <div>
      <Title />
      <div className="button-container">
        <Link to="/login" className="button">
          Sign In
        </Link>
        <Link to="/helpcentre" className="button">
          Help Centre
        </Link>
      </div>
    </div>
  );
}

export default App;