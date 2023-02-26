import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { Box, Center, Heading, VStack, Text } from "native-base";
import { Input } from "./Input";
import { Button } from "./Button";
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const { navigate } = useNavigation();

  const handleLoginWithEmailAndPassword = () => {
    auth()
      .signInWithEmailAndPassword("amitcesar@email.com", "coxinha123")
      .then((result) => navigate("home"))
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
    <VStack bg="info.200" flex={1} alignItems="center" px={10} pt={20}>
      <Center>
        <Heading color={"gray.900"} my={24}>
          Acesse sua conta
        </Heading>

        <Input placeholder="Email" />
        <Input placeholder="Senha" />
        <Button title="Fazer Login" onPress={handleLoginWithEmailAndPassword} />
      </Center>
    </VStack>
  );
}
