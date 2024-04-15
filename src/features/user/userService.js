import axios from 'axios';
import { base_url } from '../../utils/axiosConfig';

const register = async (userData) => {
  try {
    return await axios.post(`${base_url}user/register`, userData);
    // return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}

const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
  } catch (error) {
    return error.response.data.message;
  }
}

export const authService = {
  register ,
  login
};