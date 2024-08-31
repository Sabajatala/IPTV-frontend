import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { login } from '../redux/userSlice';
import './Signin.css';

axios.defaults.baseURL = 'http://localhost:2022';
const SignIn = ({heading}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        dispatch(login({ email, password }));
        alert('Successfully signed in!');
        
      }
      const { token } = response.data;

      
      localStorage.setItem('token', token);

      
      navigate('/genres');

    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || 'Invalid email or password.');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h1>{heading}</h1>
      {
   
    
    <form onSubmit={handleSubmit}>
      
      <p>Welcome back! Please enter your details.</p>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">Remember me</label>
        <a href="/forgot-password">Forgot Password?</a>
      </div>
      <button type="submit">Sign In</button>
      
    </form>
   
      }
      </div>
  );
};

export default SignIn;
