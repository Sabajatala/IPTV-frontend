
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:2022';


const getToken = () => localStorage.getItem('token');

const AddSeries = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/series', { name, description, status ,genre}, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      navigate('/series'); 
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to add series.');
    }
  };

  return (
    <div className="add-series-container">
      <h1>Add Series</h1>
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
          <label>Genre:</label>
          <textarea
            value={genre}
              type="string"
            onChange={(e) => setGenre(e.target.value)}
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
        <button type="submit">Add Series</button>
        <td>
        <Link to={`/series`}className="button-link">Back</Link> 
        </td>
      </form>
    </div>
  );
};

export default AddSeries;

