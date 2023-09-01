import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div>
        <h1>Sign In</h1>
      </div>
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
        <button onClick={handleLogin} className='button'>Login</button>
      </div>
      <div>
        <input type="checkbox" id="keepSignedIn"></input>
        <label htmlFor="keepSignedIn">Stay signed in?</label>
      </div>
      <div>
        <button onClick={handleBack} className='button'>Back</button>
      </div>
    </div>
  );
}

export default Login;
