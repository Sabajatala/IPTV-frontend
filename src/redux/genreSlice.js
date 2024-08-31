// src/redux/genreSlice.js
import { createSlice,  } from '@reduxjs/toolkit';


const genreSlice = createSlice({
  name: 'genres',
  initialState: {
    list: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    updateGenres: (state, action) => {
      state.list = action.payload.genres;
      state.totalPages = action.payload.totalPages;
    },
    addGenre: (state, action) => {
      state.list.push(action.payload);
    },
    updateGenre: (state, action) => {
      const index = state.list.findIndex(genre => genre.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteGenre: (state, action) => {
      state.list = state.list.filter(genre => genre.id !== action.payload.id);
    }
  },
  
});

export const { updateGenres, addGenre, updateGenre, deleteGenre } = genreSlice.actions;
export default genreSlice.reducer;
