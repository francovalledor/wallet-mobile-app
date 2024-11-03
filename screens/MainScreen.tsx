import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useOrders, useProfile, useTransfers } from "../client/wallet-api";

const MainScreen: React.FC = () => {
  const { data: transfers = [], ...transferQuery } = useTransfers();
  const { data: orders = [], ...ordersQuery } = useOrders();
  const { data: profile, ...profileQuery } = useProfile();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email: {profile?.email}</Text>
      <Text style={styles.label}>Balance: ${profile?.balance.toFixed(2)}</Text>

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
