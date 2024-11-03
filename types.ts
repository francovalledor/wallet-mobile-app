export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export enum OrderStatus {
  OPEN = "OPEN",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export type Order = {
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

export type CreateOrderDTO = {
  amount: number;
  recipientEmail: string | undefined;
  subject: string | undefined;
};

export type CreateTransferDTO = {
  amount: number;
  email: string;
  subject: string | undefined;
};

export type User = {
  id: number;
  email: string;
};

export type Transfer = {
  amount: number;
  subject: string | undefined;
  from: User;
  to: User;
  id: number;
  createdAt: string;
};
