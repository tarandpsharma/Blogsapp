import { createSlice } from '@reduxjs/toolkit';

export const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    name: '',
    email: '',
    password: '',
    lastUserId: 0,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    incrementUserId: (state) => {
      state.lastUserId += 1;
    },
    resetSignupForm: (state) => {
      state.name = '';
      state.email = '';
      state.password = '';
    },
  },
});

export const { setName, setEmail, setPassword, incrementUserId, resetSignupForm } = signupSlice.actions;

export default signupSlice.reducer;
