import '../App.css';
import '../css/Login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'; 
import SignInHeader from '../components/SignInHeader'
import { Checkbox } from '@mui/material';
import axios from 'axios';
import Loader from '../components/Loader';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log("SERVER URL IS: " + process.env.REACT_APP_SERVER_URL);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/login', {
        username,
        password,
        keepLoggedIn: document.getElementById('keepSignedIn').checked,
      });
  
      localStorage.setItem('token', response.data.token);
  
      if (response.data.isAdmin === true) {
        navigate('/admin');
      } else {
        navigate('/studenthomepage');
      }
    } catch (error) {
      setErrorMessage("Login failed: " + error.response.data.message);
    } finally {
      setLoading(false);
    }
  };  

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='App'>
      <SignInHeader />
      <header className='sign-in-header'>
        <h1 className="text">Welcome</h1>
      </header>
      {loading ? (
        <Loader loading={loading}/>
      ) : (
        <div>
          <div>
            <input
              className="form"
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div>
            <input
              className="form"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="error-message-container">
            {errorMessage && <ErrorMessage message={errorMessage}/>}
          </div>
          <div>
            <button onClick={handleLogin} className='button-grey-out'>Login</button>
          </div>
          <div>
            {/* <input type="checkbox" id="keepSignedIn"></input> */}
            <Checkbox id="keepSignedIn" defaultChecked size='medium' color='default' />
            <label className='login-checkbox' htmlFor="keepSignedIn">Keep me signed in</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
