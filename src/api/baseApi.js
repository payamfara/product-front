import axios from "axios";
import Cookies from 'js-cookie';

export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const baseApiAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get('authToken')}`,
    "Content-Type": "application/json",
  },
});
