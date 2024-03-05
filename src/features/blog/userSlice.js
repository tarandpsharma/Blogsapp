import { createSlice } from '@reduxjs/toolkit';

// Load the initial state from local storage if it exists
const loadFromLocalStorage = () => {
  try {
    const activeUserDetail = localStorage.getItem('activeUserDetail');
    if (activeUserDetail) {
      return JSON.parse(activeUserDetail);
    }
  } catch (error) {
    console.error('Error loading activeUserDetail from localStorage:', error);
  }
  return null;
};

const initialState = {
  userList: [],
  lastUserId: 0,
  activeUserDetail: loadFromLocalStorage(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { name, email, password } = action.payload;
      const newUser = {
        id: state.lastUserId + 1,
        name,
        email,
        password,
      };
      state.userList.push(newUser);
      state.lastUserId += 1;
    },
    setActiveUser: (state, action) => {
      const activeUserDetail = action.payload;
      state.activeUserDetail = activeUserDetail;
      // Save to local storage
      try {
        localStorage.setItem('activeUserDetail', JSON.stringify(activeUserDetail));
      } catch (error) {
        console.error('Error saving activeUserDetail to localStorage:', error);
      }
    },
  },
});

export const { addUser, setActiveUser } = userSlice.actions;

export const selectUserList = (state) => state.user.userList;
export const selectLastUserId = (state) => state.user.lastUserId;

export default userSlice.reducer;
