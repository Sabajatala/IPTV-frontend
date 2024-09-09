import React from "react";
import { Link } from 'react-router-dom';
const Seasons = ({ heading }) => 
    
{

    return (
        <div className="genre-list-container">
          <h1>{heading || "Genre List View"}</h1>
          <div className="tab-container">
            <Link to="/genres" className="tab-link active">Genre</Link>
            <Link to="/series" className="tab-link">Series</Link>
            <Link to="/seasons" className="tab-link">Seasons</Link>
            <Link to="/episodes" className="tab-link">Episodes</Link>
          </div>
          </div>




);
};
    export default Seasons;