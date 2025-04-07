
import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/redux/features/auth/authApi'; 

const initialState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  userInfo: null as User[] | null, // Type the userInfo state as User or null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload; // Set user data in Redux
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
