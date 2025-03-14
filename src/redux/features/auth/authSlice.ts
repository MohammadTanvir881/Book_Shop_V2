import { createSlice } from '@reduxjs/toolkit';

type TAuthState = {
  user: null | object;
  token: null | string;
      isAuthenticated: boolean,
  
};

const initialState: TAuthState = {
  user: null,
   token: localStorage.getItem("token") || null, 
     isAuthenticated: !!localStorage.getItem("token"),
 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
            localStorage.setItem("token", action.payload.token); 
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
       state.isAuthenticated = false;
      localStorage.removeItem("token"); 
        
     
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
