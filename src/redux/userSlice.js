
// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
  isRegistered: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isRegistered = true;
    },
    login: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isAuthenticated = true;  
    },
  },
});

export const { register, login } = userSlice.actions;

export default userSlice.reducer;
