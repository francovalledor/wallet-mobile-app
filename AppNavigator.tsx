import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import CreateOrderScreen from "./screens/CreateOrderScreen";
import ScanQrScreen from "./screens/ScanQrScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerTitle: "Welcome" }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetailScreen}
          options={{ headerTitle: "Order Detail" }}
        />
        <Stack.Screen
          name="CreateOrder"
          component={CreateOrderScreen}
          options={{ headerTitle: "Create Order" }}
        />
        <Stack.Screen
          name="ScanQr"
          component={ScanQrScreen}
          options={{ headerTitle: "Scan Order" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
