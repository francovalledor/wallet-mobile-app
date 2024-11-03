import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Order, RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { formatDate } from "../utils/formatDate";

interface OrderItemProps {
  order: Order;
  isIncoming: (order: Order) => boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, isIncoming }) => {
  const dateFormatted = formatDate(order.updatedAt || order.createdAt);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate("OrderDetail", { orderId: order.id });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.item}>
        <Text>#{order.id}</Text>
        <Text>
          {isIncoming(order) ? "Incoming" : "Outgoing"} ({order.status})
        </Text>
        <Text>
          {isIncoming(order)
            ? order.requesterEmail
            : order.recipientEmail || "anybody"}
        </Text>
        <Text style={styles.amount}>${order.amount.toFixed(2)}</Text>
        <Text> {order.subject}</Text>
        <Text>⏲ {dateFormatted}</Text>
      </View>
    </TouchableOpacity>
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
