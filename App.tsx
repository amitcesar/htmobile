import { Alert, Button, StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";

const handleLoginWithEmailAndPassword = () => {
  auth()
    .signInWithEmailAndPassword("amitcesar@email.com", "coxinha123")
    .then((result) => console.log(result))
    .catch((error) => {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        Alert.alert("Usuario não encontrado");
      }
    });
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Expo Tester</Text>
      <Button
        title="Login com Email e Senha"
        onPress={handleLoginWithEmailAndPassword}
      />
    </View>
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