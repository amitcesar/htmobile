import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { Center, Heading, VStack, FormControl, HStack } from "native-base";

import { Input } from "./Input";
import { Button } from "./Button";

import { AppStackRoutesParamList } from "../../Routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";

export type StackNavigation =
  NativeStackNavigationProp<AppStackRoutesParamList>;

type LoginDataProps = {
  email: string;
  password: string;
};

export function SignIn() {
  const { navigate } = useNavigation<StackNavigation>();
  const { control, handleSubmit, getValues } = useForm<LoginDataProps>();

  const handleLoginWithEmailAndPassword = () => {
    const { email, password } = getValues();
    console.log({ email, password });
    auth()
      .signInWithEmailAndPassword(email, password)
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
        <>
          <Center>
            <Heading color={"gray.900"} my={24}>
              Acesse sua conta
            </Heading>
          </Center>
          <FormControl>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Email"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="password"
                  onChangeText={onChange}
                  value={value}
                  type="password"
                />
              )}
            />

            <Button
              title="Fazer Login"
              onPress={handleSubmit(handleLoginWithEmailAndPassword)}
            />
          </FormControl>
        </>
      </TouchableWithoutFeedback>
    </VStack>
  );
}
