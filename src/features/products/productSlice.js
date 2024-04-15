import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { productService } from './productService';
import { toast } from 'react-toastify';

export const getAllProducts = createAsyncThunk(
  'product/get', async( thunkAPI) => {
    try{
     return await productService.getAllProducts();

    }catch(error){
      return thunkAPI.rejectWithValue(error.response.data);

    }
  }
);

export const getSingleProduct = createAsyncThunk(
  'product/getSingleProduct', async(productId ,thunkAPI) => {
    try{
      return await productService.getSingleProduct(productId);
      }
    catch(error){
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'product/addToWishlist', async(productId ,thunkAPI) => {
    try{
     return await productService.addToWishlist(productId);
     }
    catch(error){
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getWishlist = createAsyncThunk(
  'product/getWishlist', async(thunkAPI) => {
    try{
     return await productService.getWishlist();
     }
    catch(error){
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



const productState = {
  product: "",
  isError  : false,
  isSuccess : false,
  isLoading: false,
  message : ""
};

export const productSlice  = createSlice({
  name: 'product',
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllProducts.pending, (state) => {
      state.isLoading = true})
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess= true;
      state.product = action.payload;
      // state.user = action.payload;
    })
    .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess= false;
        state.message = action.payload;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true}
      )
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess= true;
        state.addToWishlist = action.payload;
        if(state.isSuccess === true){
          toast.info("Updated wishlist");
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess= false;
        state.message = action.payload;
        if(state.isError === true){
          toast.error("Server Error, Please try again later");
        }
      })
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true}
      )
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess= true;
        state.getWishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess= false;
        state.message = action.payload;
        if(state.isError === true){
          toast.error("Server Error, Please try again later");
        }
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true}
      )
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess= true;
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess= false;
        state.message = action.payload;
        if(state.isError === true){
          toast.error("Server Error, Please try again later");
        }
      })
    
}});

export default productSlice.reducer;