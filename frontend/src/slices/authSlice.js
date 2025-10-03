// src/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: Cookies.get("token") || null, // check cookie on load
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user; // you can store user info
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token"); // clear cookie
    },
    checkAuth: (state) => {
      const token = Cookies.get("token");
      state.token = token || null;
      if (!token) {
        state.user = null;
      }
    },
  },
});

export const { loginSuccess, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
