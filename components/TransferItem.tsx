import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Transfer } from "../types";
import { useProfile } from "../client/wallet-api";

interface TransferItemProps {
  transfer: Transfer;
}

const TransferItem: React.FC<TransferItemProps> = ({ transfer }) => {
  const { data } = useProfile();

  const dateFormatted = formatDistanceToNow(new Date(transfer.createdAt), {
    addSuffix: true,
  });

  return (
    <View style={styles.item}>
      <Text>
        From: {transfer.from.email} | To: {transfer.to.email}
      </Text>
      <Text>
        Amount: ${transfer.amount.toFixed(2)} | Subject: {transfer.subject}
      </Text>
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

export default TransferItem;
