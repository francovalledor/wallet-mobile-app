import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";

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

enum OrderStatus {
  OPEN = "OPEN",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

type Order = {
  id: number;
  amount: number;
  subject?: string;
  status: OrderStatus;
  transferId: number | null;
  createdAt: string;
  updatedAt: string;
  requesterEmail: string;
  recipientEmail: string | null;
};

const getOrders = () => api.get<Order[]>("/orders").then(defaultHandler);
const getOrder = (id: number) =>
  api.get<Order>(`/orders/${id}`).then(defaultHandler);

type CreateOrderDTO = {
  amount: number;
  recipientEmail: string | undefined;
  subject: string | undefined;
};

const createOrder = (params: CreateOrderDTO) =>
  api.post<Order>("/orders", params).then(defaultHandler);

const cancelOrder = (id: number) =>
  api.patch<Order>(`/orders/${id}/cancel`).then(defaultHandler);

const completeOrder = (id: number) =>
  api.patch<Order>(`/orders/${id}/complete`).then(defaultHandler);

type CreateTransferDTO = {
  amount: number;
  email: string;
  subject: string | undefined;
};

type User = {
  id: number;
  email: string;
};

type Transfer = {
  amount: number;
  subject: string | undefined;
  from: User;
  to: User;
  id: number;
  createdAt: string;
};

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
