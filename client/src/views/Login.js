import '../App.css';
import '../css/Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignInHeader from '../components/SignInHeader'
import { Checkbox } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    await axios.post('http://localhost:4000/login', { username, password }).then(
      response => {
      if (response.data.isAdmin === true) {
        navigate('/admin');
      } else {
        navigate ('/student');
      }}).catch(
      error => {
        console.error('Login failed:', error);
    })
  };

  return (
    <div className='App'>
      <SignInHeader />
      <header className='sign-in-header'>
        <h1 className="text">Sign In</h1>
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
      <div>
        <button onClick={handleLogin} className='button-grey-out'>Login</button>
      </div>
      <div>
        {/* <input type="checkbox" id="keepSignedIn"></input> */}
        <Checkbox defaultChecked size='medium' color='default' />
        <label className='login-checkbox' htmlFor="keepSignedIn">Keep me signed in</label>
      </div>
    </div>
  );
}

export default Login;
