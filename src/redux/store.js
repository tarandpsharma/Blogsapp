import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../features/blog/blogSlice';
import userReducer from '../features/blog/userSlice';
import loginReducer from '../features/blog/loginSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
    login: loginReducer,
  },
});

export default store;
