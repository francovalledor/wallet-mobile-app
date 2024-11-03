import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Order } from "../types";

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const dateFormatted = formatDistanceToNow(
    new Date(order.updatedAt || order.createdAt),
    {
      addSuffix: true,
    }
  );

  return (
    <View style={styles.item}>
      <Text>
        Amount: ${order.amount.toFixed(2)} | Status: {order.status}
      </Text>
      <Text>Subject: {order.subject}</Text>
      <Text>Date: {dateFormatted}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default OrderItem;
