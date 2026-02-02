import axios from "axios";

const API_BASE = "http://localhost:5184";

export const client = axios.create({
    baseURL: API_BASE,
});

client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);