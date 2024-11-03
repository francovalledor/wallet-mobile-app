import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import { CreateOrderDTO, CreateTransferDTO, Order, Transfer } from "../types";
import { useQuery } from "@tanstack/react-query";

const defaultHandler = <T>(response: AxiosResponse<T>) => response.data;

const baseURL = "https://c6b9-190-30-139-77.ngrok-free.app";

const unauthenticatedApi = axios.create({
  baseURL,
});

const login = async (email: string, password: string) => {
  const response = await unauthenticatedApi
    .post<{
      access_token: string;
    }>("/auth/login", { email, password })
    .then(defaultHandler);

  await AsyncStorage.setItem("authToken", response.access_token);
  return response;
};

const register = (email: string, password: string) =>
  unauthenticatedApi
    .post<{ email: string; id: number }>("/auth/register", { email, password })
    .then(defaultHandler);

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const getOrders = () => api.get<Order[]>("/orders").then(defaultHandler);
const getOrder = (id: number) =>
  api.get<Order>(`/orders/${id}`).then(defaultHandler);

const createOrder = (params: CreateOrderDTO) =>
  api.post<Order>("/orders", params).then(defaultHandler);

const cancelOrder = (id: number) =>
  api.patch<Order>(`/orders/${id}/cancel`).then(defaultHandler);

const completeOrder = (id: number) =>
  api.patch<Order>(`/orders/${id}/complete`).then(defaultHandler);

const createTransfer = (params: CreateTransferDTO) =>
  api.post<Transfer>("/transfers", params).then(defaultHandler);

const getTransfers = () =>
  api.get<Transfer[]>("/transfers").then(defaultHandler);

const getTransfer = (id: number) =>
  api.get<Transfer>(`/transfers/${id}`).then(defaultHandler);

type Profile = {
  email: string;
  balance: number;
};

const getProfile = () => api.get<Profile>("/user/profile").then(defaultHandler);

const MINUTE = 60 * 24 * 1000;

export const useTransfers = () =>
  useQuery({
    queryKey: ["transfers"],
    queryFn: getTransfers,
    staleTime: 5 * MINUTE,
  });

export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    staleTime: 5 * MINUTE,
  });

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * MINUTE,
  });

export const walletApi = {
  login,
  register,
  order: {
    create: createOrder,
    getAll: getOrders,
    getOne: getOrder,
    complete: completeOrder,
    cancel: cancelOrder,
  },
  transfer: {
    create: createTransfer,
    getAll: getTransfers,
    getOne: getTransfer,
  },

  getProfile,
};
