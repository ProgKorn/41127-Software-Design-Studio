import '../App.css';
import Header from './Header';
import '../css/Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // await axios.post('http://localhost:4000/login', { username, password }, config).then(response => {
  //       if (response.data.role === 'admin') {
  //         navigate('/admin');
  //       } else {
  //         navigate('/student');
  //       } 
  // const handleLogin = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //     await axios({
  //       method: 'post',
  //       url: `http://localhost:4000/login`,
  //       withCredentials: false,
  //       params:  {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     }).catch(error => {
  //       console.error("POST failed: ", error);
  //     });
  //   } catch (error) {
  //     console.error("Login failed: ", error);
  //   }
  // };
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/login', { username, password });
      console.log(response.data);
      // Handle success, e.g., redirect to a dashboard
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  //need logic for disabling button until certain login reqs met
  return (
    <div className='App'>
      <Header />
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
        <input type="checkbox" id="keepSignedIn"></input>
        <label className='login-checkbox' htmlFor="keepSignedIn">Keep me signed in</label>
      </div>
      <div>
      <a class="back-link" href="javascript:history.back()"> &lt; Back</a>
      </div>
    </div>
  );
}

export default Login;
