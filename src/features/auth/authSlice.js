import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  message: "",
  isLoading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message = error.response.data.errors[0].message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await authService.logout();
  } catch (error) {
    console.error(error);
  }
});

export const updatePhoto = createAsyncThunk("users/updatePhoto", async (photo, thunkAPI) => {
  try{
    return await authService.updatePhoto(photo);
  }catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
  }
})

export const getInfo = createAsyncThunk("users/getInfo", async (thunkAPI) => {
  try {
    return await authService.getInfo();
  } catch (error) {
    const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message="";
      
    },
    resetLoading: (state) => {
      state.isLoading = false;     
      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;        
        state.message = action.payload;        
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.user.user = action.payload;        
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.user.user = action.payload;
      })
      .addCase(getInfo.pending, (state) => {
        state.isLoading = true;
      })
  },
});
export const {reset, resetLoading} = authSlice.actions;
export default authSlice.reducer;
