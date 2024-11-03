import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

export const useAppNavigation = () => {
  return useNavigation<StackNavigationProp<RootStackParamList>>();
};
