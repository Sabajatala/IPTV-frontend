import { createSlice } from '@reduxjs/toolkit';

const seriesSlice = createSlice({
  name: 'series',
  initialState: {
    list: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    updateSeries: (state, action) => {
      state.list = action.payload.series;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    addSeries: (state, action) => {
      state.list.push(action.payload);
    },
    updateSeriesItem: (state, action) => {
      const index = state.list.findIndex(series => series._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteSeries: (state, action) => {
      state.list = state.list.filter(series => series._id !== action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { updateSeries, addSeries, updateSeriesItem, deleteSeries,setCurrentPage, setLoading, setError } = seriesSlice.actions;
export default seriesSlice.reducer;
