import axios from "axios";

export const api = axios.create({
   baseURL: "/api",
   withCredentials: true,
});

export const Auth = {
    login: (data: { email: string; password: string }) =>
        api.post("/auth/login", data),
    signup: (data: { name: string; email: string; password: string }) =>
        api.post("/auth/signup", data),
};