import { StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "./AppNavigator";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
