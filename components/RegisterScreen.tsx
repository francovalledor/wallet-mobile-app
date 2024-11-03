import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { walletApi } from "../client/wallet-api";

type RegisterScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "RegisterScreen">;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    try {
      await walletApi.register(email, password);
      Alert.alert("Registration successful");
      navigation.navigate("LoginScreen");
    } catch (error: any) {
      Alert.alert(
        "Registration failed",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <View>
      <Text>Register</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("LoginScreen")}
      />
    </View>
  );
};

export default RegisterScreen;
