import React, { useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Order, OrderStatus, RootStackParamList } from "../types";
import { useOrder, useProfile, walletApi } from "../client/wallet-api";
import { formatDate } from "../utils/formatDate";
import QRCode from "react-native-qrcode-svg";

type OrderDetailScreenRouteProp = RouteProp<RootStackParamList, "OrderDetail">;

const OrderDetailScreen: React.FC = () => {
  const route = useRoute<OrderDetailScreenRouteProp>();
  const { orderId } = route.params;
  const { data: order, isLoading, refetch } = useOrder(orderId);
  const { data: profile } = useProfile();

  if (!order || isLoading) return null;

  const isOwnOrder = order.requesterEmail === profile?.email;
  const isInsufficientFunds =
    (profile?.balance ?? 0) < (order?.amount ?? Number.POSITIVE_INFINITY);

  const handlePay = async () => {
    await walletApi.order.complete(orderId);
    await refetch();
  };

  const handleCancel = async () => {
    await walletApi.order.cancel(orderId);
    await refetch();
  };

  const OwnOrderActions = () => {
    return (
      <>
        {order.status === OrderStatus.OPEN && (
          <View>
            <View style={styles.qrContainer}>
              <QRCode value={JSON.stringify(order)} size={200} />
            </View>
            <Button title="Cancel" onPress={handleCancel} />
          </View>
        )}
      </>
    );
  };

  const IncomingOrderActions = () => {
    return (
      <>
        {order.status === OrderStatus.OPEN && (
          <View>
            <Button
              title="Pay"
              onPress={handlePay}
              disabled={isInsufficientFunds}
            />
            {isInsufficientFunds && (
              <Text style={styles.warning}>
                Insufficient funds to pay for this order.
              </Text>
            )}
          </View>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Details</Text>
      <Text>Balance: ${profile?.balance.toFixed(2)}</Text>
      <Text>Amount: ${order.amount.toFixed(2)}</Text>
      <Text>Subject: {order.subject}</Text>
      <Text>Status: {order.status}</Text>
      <Text>Updated: {formatDate(order.updatedAt || order.createdAt)}</Text>
      {order.status === OrderStatus.COMPLETED && <Text>PAID ✔</Text>}
      {order.status === OrderStatus.CANCELLED && <Text>CANCELLED ❌</Text>}
      {isOwnOrder ? <OwnOrderActions /> : <IncomingOrderActions />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  warning: {
    color: "red",
    marginTop: 10,
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default OrderDetailScreen;
