// src/components/AddGenre.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:2022';

// Function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

const AddGenre = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/genre', { name, description, status }, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      navigate('/genres'); // Redirect to the genre list page
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to add genre.');
    }
  };

  return (
    <div className="add-genre-container">
      <h1>Add Genre</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Genre</button>
      </form>
    </div>
  );
};

export default AddGenre;
