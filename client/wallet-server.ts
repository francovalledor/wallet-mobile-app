import axios from "axios";

export const walletApi = axios.create({
  baseURL: "https://c6b9-190-30-139-77.ngrok-free.app",
});

export const login = (email: string, password: string) =>
  walletApi
    .post<{ access_token: string }>("/auth/login", { email, password })
    .then((r) => r.data);

export const register = (email: string, password: string) =>
  walletApi
    .post<{ email: string; id: number }>("/auth/register", { email, password })
    .then((r) => r.data);
