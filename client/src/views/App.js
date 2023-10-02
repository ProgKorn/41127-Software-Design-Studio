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
import Exam from './Exam';
import ExamHistory from './ExamHistory';
import FlagLog from './FlagLog';
import Flag from './Flag';
import Schedule from './Schedule';
import LaunchExam from './LaunchExam';
import CreateSession from './CreateSession';
import ManageClasses from './ManageClasses';
import StudentHomepage from './StudentHomepage';
import PreviousExams from './PreviousExams';
import ExamSession from './ExamSession';
import NoAccess from './NoAccess';
import PrivateRoute from './PrivateRoute'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    if (storedToken) {
      setIsLoggedIn(true);
    }
    return () => clearTimeout(loadingTimeout);
  }, []);

  return isLoading ? (
    <div>Loading...</div>
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
          <Route path="/exam" element={<PrivateRoute element={<Exam />} isLoggedIn={isLoggedIn} />} />
          <Route path="/examhistory" element={<PrivateRoute element={<ExamHistory />} isLoggedIn={isLoggedIn} />} />
          <Route path="/flaglog" element={<PrivateRoute element={<FlagLog />} isLoggedIn={isLoggedIn} />} />
          <Route path="/flag" element={<PrivateRoute element={<Flag />} isLoggedIn={isLoggedIn} />} />
          <Route path="/schedule" element={<PrivateRoute element={<Schedule />} isLoggedIn={isLoggedIn} />} />
          <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} isLoggedIn={isLoggedIn} />} />
          <Route path="/launchexam" element={<PrivateRoute element={<LaunchExam />} isLoggedIn={isLoggedIn} />} />
          <Route path="/createsession" element={<PrivateRoute element={<CreateSession />} isLoggedIn={isLoggedIn} />} />
          <Route path="/manageclasses" element={<PrivateRoute element={<ManageClasses />} isLoggedIn={isLoggedIn} />} />
          <Route path="/studenthomepage" element={<PrivateRoute element={<StudentHomepage />} isLoggedIn={isLoggedIn} />} />
          <Route path="/previousexams" element={<PrivateRoute element={<PreviousExams />} isLoggedIn={isLoggedIn} />} />
          <Route path="/examsession" element={<PrivateRoute element={<ExamSession />} isLoggedIn={isLoggedIn} />} />
          <Route path="/noaccess" element={<NoAccess />} />
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