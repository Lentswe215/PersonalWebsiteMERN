import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import {
  clearUserDetails,
  getUserAuth
} from "../../helpers/Lookup";

import authService from "./AuthService";

//Get user from  localStorage
const userToken = getUserAuth();
const initialState = {
  userToken,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Login User
export const loginUser = createAsyncThunk("auth/loginUser",
  async (user, thunkAPI) => {
    try {
      return await authService.LoginUser(user);
    } catch (e) {
      console.error("Login User Error:", e);
      // const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return thunkAPI.rejectWithValue("Invalid Username/Password");
    }
  });

export const logout = createAsyncThunk("auth/logout", async () => clearUserDetails());

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      return { ...state, isLoading: false, isError: false, isSuccess: false, message: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        return { ...state, isLoading: true }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return { ...state, isLoading: false, isSuccess: true, userToken: action.payload };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return { ...state, isLoading: false, isError: true, message: action.payload, userToken: null };
      })
      .addCase(logout.fulfilled, (state) => {
        return { ...state, userToken: null };
      })
  },
});

export const {
  reset
} = authSlice.actions;

export default authSlice.reducer;