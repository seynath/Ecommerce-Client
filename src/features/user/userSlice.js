import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { authService } from './userService';
import { toast } from 'react-toastify';

export const registerUser = createAsyncThunk(
  'auth/register', async(userData ,thunkAPI) => {
    try{
     return await authService.register(userData);

    }catch(error){
      return thunkAPI.rejectWithValue(error.response.data);

    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login', async(userData ,thunkAPI) => {
    try{
      return await authService.login(userData);
    }catch(error){
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

const initialState = {
  user: "",
  isError  : false,
  isSuccess : false,
  isLoading: false,
  message : ""
};

export const authSlice  = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true})
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess= true;
      state.createUser = action.payload;
      if(state.isSuccess === true){
        toast.info("Registration Successful");
      }
      // state.user = action.payload;
    })
    .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess= false;
        state.message = action.payload;
        if(state.isError === true){
          console.log(state.auth);
          toast.error("Server Error, Please try again later");
        }
      })


      .addCase(loginUser.pending, (state) => {
        state.isLoading = true})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess= true;
        state.user = action.payload;
        if(state.isSuccess === true){
          localStorage.setItem("token", action.payload.token)
          toast.info("Login Successful");
        }
        // state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess= false;
          state.message = action.payload;
          if(state.isError === true){
            toast.error("Server Error, Please try again later");
          }
        })
    

    
}});

export default authSlice.reducer;