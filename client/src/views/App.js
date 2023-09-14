import '../App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import HelpCentre from './HelpCentre';
import ExamStart from './ExamStart';
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

function App() {
  return (
    // Routing setup for individual pages
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/helpcentre" element={<HelpCentre />} />
          <Route path="/examstart" element={<ExamStart />} />
          <Route path="/objectrecognition" element={<ObjectRecognition />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/examhistory" element={<ExamHistory />} />
          <Route path="/flaglog" element={<FlagLog />} />
          <Route path="/flag" element={<Flag />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/launchexam" element={<LaunchExam />} />
          <Route path="/createsession" element={<CreateSession />} />
          <Route path="/manageclasses" element={<ManageClasses />} />
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
      <Header />
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
