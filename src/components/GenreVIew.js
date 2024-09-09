import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/genreSlice'; 
import './GenreView.css'; 

axios.defaults.baseURL = 'http://localhost:2022';

const getToken = () => localStorage.getItem('token');

const GenreView = () => {
  const { id } = useParams(); 
  const [genre, setGenre] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await axios.get(`/genre/${id}`, {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });
        
        setGenre(response.data.data.genre);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch genre.');
      } finally {
        setLoading(false);
      }
    };

    fetchGenre();
  }, [id]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="genre-view-container">
      <h1>Genre Details</h1>
      {genre ? (
        <div className="genre-details">
          <h2>{genre.name}</h2>
          <p><strong>ID:</strong> {genre._id}</p>
          <p><strong>Description:</strong> {genre.description}</p>
          <p><strong>Status:</strong> {genre.status}</p>
          <p><strong>createdAt:</strong> {genre.createdAt}</p>
          <p><strong>updatedAt:</strong> {genre.updatedAt}</p>
    
          <div className="actions">
            <button onClick={() => window.history.back()}>Back</button>
            <button onClick={() => window.location.href = `/genre/${id}/edit`}>Edit</button>
            <button onClick={() => handleDelete(id)}>Delete</button>
          </div>
        </div>
      ) : (
        <p>No genre found.</p>
      )}
    </div>
  );
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`/genre/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    alert('Genre deleted successfully');
    window.location.href = '/genres';
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to delete genre.');
  }
};

export default GenreView;
