import { Image, StyleSheet, Text, View } from "react-native";
import { Exchange as ExchangeType } from "../types/exchange";

interface Props {
  exchange: ExchangeType;
}

export const Exchange = ({ exchange }: Props) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: exchange.icon }} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{exchange.name}</Text>
        <Text>Volumen 1h: {exchange.volume_1hrs_usd}</Text>
        <Text>Volumen 24h: {exchange.volume_1day_usd}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
