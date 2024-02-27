import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../features/blog/blogSlice';
import  signupReducer  from '../features/blog/signupSlice';

export const store = configureStore({
  reducer: {
   blog: blogReducer,
  }
})