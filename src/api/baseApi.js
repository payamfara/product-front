import axios from "axios";

export const baseApi = axios.create({
  baseURL: "http://192.168.1.4:8000/api2",
  headers: {
    "Content-Type": "application/json",
  },
});

export const baseApiAuth = axios.create({
  baseURL: "http://192.168.1.4:8000/api2",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});
