import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userList: [],
  lastUserId: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userList.push(action.payload);
      state.lastUserId += 1;
    },
  },
});

export const { addUser } = userSlice.actions;

export const selectUserList = (state) => state.user.userList;
export const selectLastUserId = (state) => state.user.lastUserId;

export default userSlice.reducer;
