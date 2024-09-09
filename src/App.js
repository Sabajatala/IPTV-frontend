import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import GenreList from './components/GenreList';
import AddGenre from './components/AddGenre';
import EditGenre from './components/EditGenre';
import Episodes from './components/Episode';
import Seasons from './components/Season';
import SeriesList from './components/Series';
import AddSeries from './components/AddSeries';
import EditSeries from './components/EditSeries';
import GenreView from './components/GenreVIew';
import SeriesView from './components/SeriesView';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        
          <Route
            path="/"
            element={<SignUp heading="Sign Up for an Account" />}
          />
            <Route
            path="/signin"
            element={<SignIn heading="Sign In to Your Account" />}
          />
           <Route
            path="/genres"
            element={<GenreList heading="Genre List" />}
          />
          <Route
            path="/genres/add"
            element={<AddGenre heading="Add New Genre" />}
          />
          <Route
            path="/genre/:id/edit"
            element={<EditGenre heading="Edit Genre" />}
          />
           <Route
            path="/series/add"
            element={<AddSeries heading="Add New Series" />}
          />
          <Route
            path="/genre/:id/edit"
            element={<EditGenre heading="Edit Genre" />}
          />
          <Route
            path="/genre/:id/view"
            element={<GenreView heading="View Genre" />}
          />
          <Route
            path="/episodes"
            element={<Episodes heading="Episodes" />}
          />
          <Route
            path="/series"
            element={<SeriesList heading="Series" />}
          />
          <Route
            path="/series/:id/edit"
            element={<EditSeries heading="Edit Series" />}
          />
           <Route
            path="/series/:id/view"
            element={<SeriesView heading="View Series" />}
          />
          <Route
            path="/seasons"
            element={<Seasons heading="Seasons" />}
          />
          
          
  </Routes>
      </div>
    </Router>
  );
}

export default App;
