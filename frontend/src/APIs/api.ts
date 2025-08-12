import axios from "axios";
export const BACKEND_URL = "https://streamtube-app-api.onrender.com"

export const axiosInstance = axios.create({
    baseURL:BACKEND_URL,
    withCredentials:true
    })