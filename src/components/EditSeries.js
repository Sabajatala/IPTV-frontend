import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSeriesItem } from '../redux/seriesSlice';
import { Link } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:2022';

const getToken = () => localStorage.getItem('token');

const EditSeries = () => {
  const { id } = useParams(); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get(`/series/${id}`, {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });
        const data=(response.data.data.data);
        setName(data.name);
        setDescription(data.description);
        setGenres(data.genres)
        setStatus(data.status);
        
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to fetch series.');
      }
    };

    fetchSeries();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/series/${id}`, { name, description,genres, status }, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      dispatch(updateSeriesItem(response.data.data)); 
      navigate('/series'); 
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update series.');
    }
  };

  return (
    <div className="edit-genre-container">
      <h1>Edit Series</h1>
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
          <label>Genres:</label>
          <textarea
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
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
        <button type="submit">Update Series</button>
        <td>
        <Link to={`/series`}className="button-link">Back</Link> 
        </td>
      </form>
    </div>
  );
};

export default EditSeries;
