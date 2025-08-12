import axios from "axios";
//https://streamtube-app-api.onrender.com
export const BACKEND_URL = "http://localhost:4700"

export const axiosInstance = axios.create({
    baseURL:BACKEND_URL,
    withCredentials:true
    })