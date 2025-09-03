import axios from "axios";
//https://streamtube-app-api.onrender.com
export const BACKEND_URL = "https://streamtube-app-api.onrender.com";
export const API_VERSION = "v1";

export const axiosInstance = axios.create({
    baseURL:BACKEND_URL,
    withCredentials:true
    })