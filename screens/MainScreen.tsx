import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useOrders, useProfile, useTransfers } from "../client/wallet-api";
import OrderItem from "../components/OrderItem";
import TransferItem from "../components/TransferItem";

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
          <TransferItem
            transfer={item}
            isIncoming={(tr) => tr.to.email === profile?.email}
          />
        )}
      />

      <Text style={styles.subHeader}>Recent Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderItem order={item} />}
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
