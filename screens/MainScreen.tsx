import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useOrders, useProfile, useTransfers } from "../client/wallet-api";
import OrderItem from "../components/OrderItem";
import TransferItem from "../components/TransferItem";
import { useAppNavigation } from "../hooks/useAppNavigation";

const Separator = () => {
  return <View style={styles.separator} />;
};

const MainScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const { data: transfers = [], ...transferQuery } = useTransfers();
  const { data: orders = [], ...ordersQuery } = useOrders();
  const { data: profile, ...profileQuery } = useProfile();

  const refetch = () => {
    return Promise.all([
      transferQuery.refetch(),
      ordersQuery.refetch(),
      profileQuery.refetch(),
    ]);
  };

  const goToCreateOrder = () => navigation.navigate("CreateOrder");

  return (
    <View style={styles.container}>
      <Button title="Refresh" onPress={refetch} />
      <Text style={styles.label}>Email: {profile?.email}</Text>
      <Text style={styles.label}>Balance: ${profile?.balance.toFixed(2)}</Text>
      <Button title="Create Order" onPress={goToCreateOrder} />
      <Separator />
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
        renderItem={({ item }) => (
          <OrderItem
            order={item}
            isIncoming={(o) => o.recipientEmail === profile?.email}
          />
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
  separator: {
    marginBottom: 20,
  },
});

export default MainScreen;
