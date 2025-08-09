import axios from "axios";

export const BACKEND_URL = "http://localhost:4700"

export const axiosInstance = axios.create({
    baseURL:BACKEND_URL,
    withCredentials:true
    })