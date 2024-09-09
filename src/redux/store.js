
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import genreReducer from './genreSlice';
import seriesReducer from './seriesSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    genres: genreReducer, 
    series: seriesReducer,
    
  },
});

export default store;
