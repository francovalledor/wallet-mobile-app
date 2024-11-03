import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { walletApi } from "../client/wallet-api";

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "LoginScreen">;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await walletApi.login(email, password);
      const token = response.access_token;
    } catch (error: any) {
      Alert.alert(
        "Login failed",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate("RegisterScreen")}
      />
    </View>
  );
};

export default LoginScreen;
