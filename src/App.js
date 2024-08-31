import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import GenreList from './components/GenreList';
import AddGenre from './components/AddGenre';
import EditGenre from './components/EditGenre';



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
            path="/genres/:id/edit"
            element={<EditGenre heading="Edit Genre" />}
          />
          
  </Routes>
      </div>
    </Router>
  );
}

export default App;
