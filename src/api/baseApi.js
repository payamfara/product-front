import axios from "axios";
import Cookies from 'js-cookie';

export const baseApi = axios.create({
  baseURL: "http://192.168.1.21:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const baseApiAuth = axios.create({
  baseURL: "http://192.168.1.21:8000",
  headers: {
    Authorization: `Bearer ${Cookies.get('authToken')}`,
    "Content-Type": "application/json",
  },
});
