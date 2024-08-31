
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/userSlice';
import { Link } from 'react-router-dom';

import axios from 'axios';
import './Signup.css';
axios.defaults.baseURL = 'http://localhost:2022';
const SignUp = ({ heading }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const dispatch = useDispatch();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('/user/registration', {
          firstname,
          lastname,
          email,
          password,
        });
  
        if (response.status === 201) {
          dispatch(register({ firstname, lastname, email, password }));
          alert('Account successfully created!');
        }
        const { token } = response.data;

      
      localStorage.setItem('token', token);

      
      window.location.href = '/Signin';
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error || 'An error occurred during registration.');
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
      
      <div>
        <label>Firstname</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Lastname</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>
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
        <small>Your password must have at least 8 characters</small>
      </div>
      <button type="submit">Sign Up</button>
      <p> Don't have an account? <Link to="/Signin">LogIn here</Link></p>


    </form>
    }
    </div>
  );
};

export default SignUp;
