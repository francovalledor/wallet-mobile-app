import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Transfer } from "../types";

interface TransferItemProps {
  transfer: Transfer;
  isIncoming: (transfer: TransferItemProps["transfer"]) => boolean;
}

const TransferItem: React.FC<TransferItemProps> = ({
  transfer,
  isIncoming,
}) => {
  const dateFormatted = formatDistanceToNow(new Date(transfer.createdAt), {
    addSuffix: true,
  });

  const isTransferIncoming = isIncoming(transfer);
  const otherParticipantEmail = isTransferIncoming
    ? transfer.from.email
    : transfer.to.email;
  const arrowColor = isTransferIncoming ? "green" : "red";
  const arrowDirection = isTransferIncoming ? "←" : "→";

  return (
    <View style={styles.item}>
      <Text style={styles.subject}>{transfer.subject}</Text>
      <Text style={styles.amount}>${transfer.amount.toFixed(2)}</Text>
      <View style={styles.participantContainer}>
        <Text style={{ color: arrowColor }}>{arrowDirection}</Text>
        <Text>{otherParticipantEmail}</Text>
      </View>
      <Text>⏲ {dateFormatted}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subject: { fontSize: 16, fontWeight: "bold" },
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
  participantContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default TransferItem;
