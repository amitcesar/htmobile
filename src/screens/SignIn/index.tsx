import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import {
  Box,
  Center,
  Heading,
  VStack,
  Text,
  KeyboardAvoidingView,
} from "native-base";

import { Input } from "./Input";
import { Button } from "./Button";

import { AppStackRoutesParamList } from "../../Routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackNavigation =
  NativeStackNavigationProp<AppStackRoutesParamList>;

export function SignIn() {
  const { navigate } = useNavigation<StackNavigation>();
  /*
     navigate("home", {
          userId: result.user.uid,
        })
  */
  //  firestore().collection("3dModels").doc(result.user.uid).set(result.user)
  const handleLoginWithEmailAndPassword = () => {
    auth()
      .signInWithEmailAndPassword("amitcesar@email.com", "coxinha123")
      .then((result) =>
        navigate("home", {
          currentUser: result.user,
        })
      )
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <Center>
            <Heading color={"gray.900"} my={24}>
              Acesse sua conta
            </Heading>

            <Input placeholder="Email" />
            <Input placeholder="Senha" />
            <Button
              title="Fazer Login"
              onPress={handleLoginWithEmailAndPassword}
            />
          </Center>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </VStack>
  );
}
