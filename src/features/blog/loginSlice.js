import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
    },
  },
});

export const { setUser, clearUser } = loginSlice.actions;

export const selectUserData = (state) => state.user.userData;

export default loginSlice.reducer;
