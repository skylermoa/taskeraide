import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "./authApi";

const user = JSON.parse(localStorage.getItem("user")); // Get user data from local storage

const initialState = {
  user: user ? user : null, // If user data exists, set user to user data, otherwise set user to null
  pending: false,
  fulfilled: false,
  rejected: false,
  message: "",
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      return await authApi.signup(user); // Call signup from authApi.js
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Return error message
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (user, thunkAPI) => {
    try {
      return await authApi.signin(user); // Call signin from authApi.js
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Return error message
    }
  }
);

export const signout = createAsyncThunk("auth/signout", async () => {
  authApi.signout(); // Call signout from authApi.js
});

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.pending = false;
      state.fulfilled = false;
      state.rejected = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.pending = false;
      state.fulfilled = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.user = null;
      state.pending = false;
      state.rejected = true;
      state.message = action.payload;
    });
    builder.addCase(signin.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.pending = false;
      state.fulfilled = true;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.user = null;
      state.pending = false;
      state.rejected = true;
      state.message = action.payload;
    });
    builder.addCase(signout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
