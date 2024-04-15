import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';

const getAllProducts = async () => {
  try {
    const response =  await axios.get(`${base_url}product`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}

const getSingleProduct = async (productId) => {
  try {
    const response =  await axios.get(`${base_url}product/${productId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}


const addToWishlist = async (prodId) => {
  try {
    const response =  await axios.put(`${base_url}product/wishlist`, {prodId}, config);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}

const getWishlist = async () => {
  try {
    const response = await axios.get(`${base_url}user/wishlist`, config);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}


// const login = async (userData) => {
//   try {
//     const response = await axios.post(`${base_url}user/login`, userData);
//     return response.data;
//   } catch (error) {
//     return error.response.data.message;
//   }
// }

export const productService = {
  getAllProducts ,
  addToWishlist,
  getWishlist,
  getSingleProduct
};