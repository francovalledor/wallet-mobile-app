import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useAppNavigation } from "../hooks/useAppNavigation";

const ScanQrScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeRead = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    try {
      const orderData = JSON.parse(data);

      if (typeof orderData.id === "number") {
        navigation.navigate("OrderDetail", { orderId: orderData.id });
      } else {
        Alert.alert(
          "Unknown QR",
          `The QR was red but it does belong to a order`
        );
      }
    } catch (error) {
      Alert.alert("Invalid QR", "The scanned QR code is not valid.");
      setScanned(false);
    }
  };

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeRead}
        style={styles.camera}
      >
        <Text style={styles.instruction}>Align QR code within frame</Text>
      </BarCodeScanner>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  instruction: {
    position: "absolute",
    bottom: 20,
    textAlign: "center",
    width: "100%",
    color: "#fff",
    fontSize: 16,
  },
});

export default ScanQrScreen;
