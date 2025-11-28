import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoginOpen: boolean;
  user: null | { name: string; email: string };
}

const initialState: AuthState = {
  isLoginOpen: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openLogin: (state) => {
      state.isLoginOpen = true;
    },
    closeLogin: (state) => {
      state.isLoginOpen = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoginOpen = false;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { openLogin, closeLogin, loginSuccess, logout } =
  authSlice.actions;
export default authSlice.reducer;
