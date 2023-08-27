import '../App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import HelpCentre from './HelpCentre';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/helpcentre" element={<HelpCentre />} />
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
