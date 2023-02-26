import { NativeBaseProvider, StatusBar } from "native-base";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { Routes } from "./src/Routes";
import { SignIn } from "./src/screens/SignIn";
import { Loading } from "./src/components/Loading";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </NativeBaseProvider>
  );
}
