import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  jwt: "",
  role: "",
  email: "",
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, data) => {
      state.isLoggedIn = true;
      state.jwt = data.payload.jwt;
      state.role = data.payload.role;
      state.email = data.payload.email;
    },
  },
});

export default authSlice.reducer;
export const { login } = authSlice.actions;
