import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

// Read from localStorage once at initialization
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState: TAuthState = {
  token: token || null,
  user: user ? JSON.parse(user) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: TUser; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      // Clear localStorage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
