import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateGenres, deleteGenre } from '../redux/genreSlice';
import { Link } from 'react-router-dom';
import './GenreList.css'; 

axios.defaults.baseURL = 'http://localhost:2022';

const getToken = () => localStorage.getItem('token');

const GenreList = ({ heading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const genres = useSelector((state) => state.genres.list || []);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`/genre/getall`, {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          },
          params: {
            page: currentPage, 
          },
        });

        console.log(response.data); 

        const { genres: fetchedGenres, totalPages: fetchedTotalPages, token } = response.data;

        if (token) {
          localStorage.setItem('token', token);
        }

        dispatch(updateGenres({ genres: fetchedGenres, totalPages: fetchedTotalPages }));
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.error("Error fetching genres:", error.response?.data || error);
        alert(error.response?.data?.error || 'Sign in again.');
      }
    };

    fetchGenres();
  }, [currentPage, dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/genre/${id}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      dispatch(deleteGenre({ id }));
    } catch (error) {
      console.error("Failed to delete genre:", error.response?.data || error);
      alert(error.response?.data?.error || 'Failed to delete genre.');
    }
  };

  return (
    <div className="genre-list-container">
      <h1>{heading || "Genre List View"}</h1>
      <div className="tab-container">
        <Link to="/genres" className="tab-link active">Genre</Link>
        <Link to="/series" className="tab-link">Series</Link>
        <Link to="/seasons" className="tab-link">Seasons</Link>
        <Link to="/episodes" className="tab-link">Episodes</Link>
      </div>
      <div className="top-actions">
        <Link to="/genres/add" className="add-genre-button">Add Genre</Link>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Parent</th>
              <th>Color</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.id}>
                <td>{genre.name}</td>
                <td>{genre.description}</td>
                <td>{genre.parent || '-'}</td>
                <td>
                  <div 
                    style={{ 
                      width: '30px', 
                      height: '30px', 
                      backgroundColor: genre.color || '#fff' 
                    }}></div>
                </td>
                <td>{genre.status || 'Active'}</td>
                <td>
                  <Link to={`/genre/${genre.id}/edit`}>Edit</Link> |
                  <Link to={`/genre/${genre.id}/view`}>View</Link> |
                  <button onClick={() => handleDelete(genre.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <select
            value={5} 
            onChange={(e) => {
              
            }}
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GenreList;
