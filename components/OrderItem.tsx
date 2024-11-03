import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Order } from "../types";

interface OrderItemProps {
  order: Order;
  isIncoming: (order: Order) => boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, isIncoming }) => {
  const dateFormatted = formatDistanceToNow(
    new Date(order.updatedAt || order.createdAt),
    {
      addSuffix: true,
    }
  );

  return (
    <View style={styles.item}>
      <Text>
        {isIncoming(order) ? "Incoming" : "Outgoing"} ({order.status})
      </Text>
      <Text style={styles.amount}>${order.amount.toFixed(2)}</Text>
      <Text> {order.subject}</Text>
      <Text>⏲ {dateFormatted}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  amount: { fontWeight: "bold" },
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
