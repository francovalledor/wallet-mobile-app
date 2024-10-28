import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useExchanges } from "../client/useExchanges";
import { Exchange } from "./Exchange";

export const Exchanges = () => {
  const { data = [], isLoading, isError } = useExchanges();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, padding: 8, textAlign: "center" }}>
        Exchanges
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.exchange_id}
        renderItem={({ item }) => <Exchange exchange={item} />}
      />
    </View>
  );
};
