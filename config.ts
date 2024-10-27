import Constants from "expo-constants";

export const COIN_API_KEY: string =
  Constants.expoConfig?.extra?.coinApiKey ?? "";
