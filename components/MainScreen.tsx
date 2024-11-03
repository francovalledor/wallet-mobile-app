import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { walletApi } from "../client/wallet-api";
import { Order, Transfer } from "../types";

const MainScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchUserData();
    fetchTransfers();
    fetchOrders();
  }, []);

  const fetchUserData = async () => {
    const { balance, email } = await walletApi.getProfile();
    setEmail(email);
    setBalance(balance);
  };

  const fetchTransfers = async () => {
    const recentTransfers = await walletApi.transfer.getAll();
    setTransfers(recentTransfers.slice(0, 10));
  };

  const fetchOrders = async () => {
    const recentOrders = await walletApi.order.getAll();
    setOrders(recentOrders.slice(0, 10));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Main Dashboard</Text>
      <Text style={styles.label}>Email: {email}</Text>
      <Text style={styles.label}>Balance: ${balance.toFixed(2)}</Text>

      <Text style={styles.subHeader}>Recent Transfers</Text>
      <FlatList
        data={transfers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>
              From: {item.from.email} | To: {item.to.email}
            </Text>
            <Text>
              Amount: ${item.amount.toFixed(2)} | Subject: {item.subject}
            </Text>
            <Text>Date: {item.createdAt}</Text>
          </View>
        )}
      />

      <Text style={styles.subHeader}>Recent Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>
              Amount: ${item.amount.toFixed(2)} | Status: {item.status}
            </Text>
            <Text>Subject: {item.subject}</Text>
            <Text>Date: {item.updatedAt || item.createdAt}</Text>
          </View>
        )}
      />
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
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
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

export default MainScreen;
