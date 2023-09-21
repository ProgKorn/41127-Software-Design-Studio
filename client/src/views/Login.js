import '../App.css';
import '../css/Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'; 
import SignInHeader from '../components/SignInHeader'
import { Checkbox } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    await axios.post('http://localhost:4000/login', { username, password, keepLoggedIn: document.getElementById('keepSignedIn').checked }).then(response => {
    if (response.data.isAdmin === true) {
        navigate('/admindashboard');
      } else {
        navigate ('/studenthomepage');
      }
      localStorage.setItem('token', response.data.token);}
    ).catch(error => {
      setErrorMessage("Login failed: " + error.response.data.message);
    })
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
      <div>
      <input
        className="form"
        type="text"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      </div>
      <div>
      <input
        className="form"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
  );
}

export default Login;
