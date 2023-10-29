import '../App.css';
import '../css/Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'; 
import SignInHeader from '../components/SignInHeader'
import { Checkbox } from '@mui/material';
import Loader from '../components/Loader';
import FacialLandmarkLogin from './FacialLandmarkLogin';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (isAdmin || !username) {
        const response = await axios.post('http://localhost:4000/login', {
          username,
          password,
          keepLoggedIn: document.getElementById('keepSignedIn').checked,
        });
  
        localStorage.setItem('token', response.data.token);
  
        if (response.data.isAdmin === true) {
          navigate('/admin');
        } 
      } else {
        const response = await axios.post('http://localhost:4000/studentlogin', {
          username,
          keepLoggedIn: document.getElementById('keepSignedIn').checked,
          facialData: handleDataFromChild()
        });
  
        localStorage.setItem('token', response.data.token);
  
        if (response.data.success) {
          navigate('/studenthomepage');
        } else {
          setErrorMessage(response.data.message);
        }
      }
    } catch (error) {
      setErrorMessage("Login failed: " + error.response.data.message);
    } finally {
      setLoading(false);
      setUsername("");
      setIsAdmin(false);
      setIsStudent(false);
    }
  };  

  const isEmailAdmin = (email) => {
    return email.endsWith("apple@gmail.com");
  };

  const isEmailStudent = (email) => {
    return email.endsWith("steve@musk.com");
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsAdmin(isEmailAdmin(e.target.value));
    setIsStudent(isEmailStudent(e.target.value));
    setErrorMessage("");
  };

  let hasReceivedData = false;
  let capturedData = false;
  
  const handleDataFromChild = (data) => {
    if (!hasReceivedData && data !== undefined && typeof data === 'boolean') {
      console.log('Received data from child:', data);
      hasReceivedData = true; 
      capturedData = data; 
    }
    return capturedData; 
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
                onChange={handleUsernameChange}
                onKeyPress={handleKeyPress}
              />
          </div>
          {isAdmin && (
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
          )}
          {isStudent && (
            <div>
              <FacialLandmarkLogin sendDataToParent={ handleDataFromChild } />
            </div>
          )}
      <div className="error-message-container">
            {errorMessage && <ErrorMessage message={errorMessage}/>}
          </div>
          <div>
            <button onClick={handleLogin} className='button-grey-out'>Login</button>
          </div>
          <div>
                <Checkbox id="keepSignedIn" defaultChecked size='medium' color='default' />
            <label className='login-checkbox' htmlFor="keepSignedIn">Keep me signed in</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
