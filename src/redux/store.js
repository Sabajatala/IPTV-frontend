
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import genreReducer from './genreSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    genres: genreReducer, 
    
  },
});

export default store;
