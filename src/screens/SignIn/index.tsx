import { Text, View, Button, StyleSheet, Alert } from "react-native";
import auth from "@react-native-firebase/auth";

export function SignIn() {
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

  return (
    <View style={styles.container}>
      <Text>Signin Screen</Text>
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
