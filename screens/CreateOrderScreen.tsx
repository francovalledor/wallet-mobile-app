import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useOrders, walletApi } from "../client/wallet-api";
import { useAppNavigation } from "../hooks/useAppNavigation";

const CreateOrderScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const [amount, setAmount] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const { refetch } = useOrders();

  const handleCreateOrder = async () => {
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Invalid amount", "Amount must be greater than 0.");
      return;
    }

    try {
      const order = await walletApi.order.create({
        amount: parsedAmount,
        subject: subject || undefined,
        recipientEmail: recipientEmail || undefined,
      });

      await refetch();
      Alert.alert("Success", "Order created successfully.");
      navigation.navigate("OrderDetail", { orderId: order.id });
    } catch (error) {
      Alert.alert("Error", "Failed to create order.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Order</Text>

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Subject (optional)</Text>
      <TextInput
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
        placeholder="Enter subject"
      />

      <Text style={styles.label}>Recipient Email (optional)</Text>
      <TextInput
        style={styles.input}
        value={recipientEmail}
        onChangeText={setRecipientEmail}
        placeholder="Enter recipient's email"
        keyboardType="email-address"
      />

      <Button title="Create Order" onPress={handleCreateOrder} />
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
    fontWeight: "bold",
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
});

export default CreateOrderScreen;
