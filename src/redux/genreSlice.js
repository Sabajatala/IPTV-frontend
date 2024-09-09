import { createSlice } from '@reduxjs/toolkit';

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
      state.currentPage = action.payload.currentPage;
    },
    addGenre: (state, action) => {
      state.list.push(action.payload);
    },
    updateGenre: (state, action) => {
      const index = state.list.findIndex(genre => genre._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteGenre: (state, action) => {
      state.list = state.list.filter(genre => genre._id !== action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
});

export const { updateGenres, addGenre, updateGenre, deleteGenre ,setCurrentPage,} = genreSlice.actions;
export default genreSlice.reducer;
