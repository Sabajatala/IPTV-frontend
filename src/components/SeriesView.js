import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/seriesSlice'; 
import './GenreView.css'; 

axios.defaults.baseURL = 'http://localhost:2022';

const getToken = () => localStorage.getItem('token');

const SeriesView = () => {
  const { id } = useParams(); 
  const [series, setSeries] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get(`/series/${id}`, {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });
        setSeries(response.data.data.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch series.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [id]);

  
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="genre-view-container">
      <h1>Series Details</h1>
      {series ? (
        <div className="genre-details">
          <h2>{series.name}</h2>
          <p><strong>ID:</strong> {series._id}</p>
          <p><strong>Description:</strong> {series.description}</p>
          <p><strong>Status:</strong> {series.status}</p>
          <p><strong>createdAt:</strong> {series.createdAt}</p>
          <p><strong>updatedAt:</strong> {series.updatedAt}</p>
          
          <div className="actions">
            <button onClick={() => window.history.back()}>Back</button>
            <button onClick={() => window.location.href = `/series/${id}/edit`}>Edit</button>
            <button onClick={() => handleDelete(id)}>Delete</button>
          </div>
        </div>
      ) : (
        <p>No series found.</p>
      )}
    </div>
  );
};


const handleDelete = async (id) => {
  try {
    await axios.delete(`/series/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });

    
    alert('Series deleted successfully');
    window.location.href = '/series'; 
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to delete series.');
  }
};

export default SeriesView;
