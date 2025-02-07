import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
const authSlice = createSlice({
    name: 'auth',
    initialState: {
      isLoggedIn: false,
      user: null,
    },
    reducers: {
      login: (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      },
      logout: (state) => {
        state.isLoggedIn = false;
        state.user = null;
        localStorage.removeItem('token');
      },
      setUserFromToken(state, action) {
        const token = action.payload;
        if (token) {
          const decoded = jwtDecode(token);
          state.isLoggedIn = true;
          state.user = { username: decoded.username, email: decoded.email };
        } else {
          state.isLoggedIn = false;
          state.user = null;
        }
      }
    },
  });
  
  export const { login, logout, setUserFromToken} = authSlice.actions;
  
  export default authSlice.reducer;