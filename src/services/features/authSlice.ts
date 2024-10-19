import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Define User type based on your JWT payload.
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setlogin(state, action: PayloadAction<{ token: string }>) {
      const { token } = action.payload;

      try {
        const user: User = jwtDecode(token);
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    },
    setlogout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
    },
    loadUserFromStorage(state) {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const user: User = jwtDecode(token);
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
        } catch (error) {
          console.error("Invalid token from storage:", error);
          localStorage.removeItem("token");
        }
      }
    },
  },
});

export const { setlogin, setlogout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
