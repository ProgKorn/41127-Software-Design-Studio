import '../App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage';
import StudentHomepage from './StudentHomepage';
import AdminHomepage from './AdminHomepage';
import Exam from './Exam';
import Login from './Login';
import Header from './Header'

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/exam" element={<Exam />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/admin" element={<AdminHomepage />} />
      </Routes>
      <Routes>
        <Route path="/student" element={<StudentHomepage />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
