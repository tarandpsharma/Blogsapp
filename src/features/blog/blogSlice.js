import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [],
  error: ''
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    removeBlog: (state, action) => {
      state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
    setBlogs: (state, action) => {
        state.blogs = action.payload;
    },
  },
});

export const { addBlog, removeBlog, setError, clearError, setBlogs } = blogSlice.actions;

export default blogSlice.reducer;
