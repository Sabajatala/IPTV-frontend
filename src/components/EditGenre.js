import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateGenre } from '../redux/genreSlice'; 
import { Link } from 'react-router-dom';
axios.defaults.baseURL = 'http://localhost:2022';


const getToken = () => localStorage.getItem('token');

const EditGenre = () => {
  const { id } = useParams(); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await axios.get(`/genre/${id}`, {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });
        // const genre = response.data.data;
        const genre=(response.data.data.genre);
        setName(genre.name);
        setDescription(genre.description);
        setStatus(genre.status);
        
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to fetch genre.');
      }
    };

    fetchGenre();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/genre/${id}`, { name, description, status }, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      dispatch(updateGenre(response.data.data)); 
      navigate('/genres'); 
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update genre.');
    }
  };

  return (
    <div className="edit-genre-container">
      <h1>Edit Genre</h1>
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
        <button type="submit">Update Genre</button>
        <td>
        <Link to={`/genres`}className="button-link">Back</Link> 
        </td>
      </form>
    </div>
  );
};

export default EditGenre;
