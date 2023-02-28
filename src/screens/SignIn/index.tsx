import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import {
  Center,
  Heading,
  VStack,
  FormControl,
  HStack,
  Box,
  KeyboardAvoidingView,
} from "native-base";
import auth from "@react-native-firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackRoutesParamList } from "../../Routes/app.routes";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

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

    auth()
      // .signInWithEmailAndPassword(email, password)
      .signInWithEmailAndPassword("userteste@email.com", "coxinha123")
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
          Alert.alert("Usuario não encontrado/senha incorreta");
        }
      });
  };

  return (
    <VStack bg="#f6f6f6" flex={1} alignItems="center">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Center w="100%">
          <Box safeArea>
            <Heading
              color={"gray.900"}
              fontSize="xl"
              my={24}
              mt={20}
              mb={6}
              fontFamily="heading"
            >
              Acesse sua conta
            </Heading>
          </Box>

          <FormControl maxW="300px" mt={12}>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  placeholder="Email"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                />
              )}
            />
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder="Password"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  type="password"
                  secureTextEntry
                />
              )}
            />

            <Button
              title="Fazer Login"
              onPress={handleSubmit(handleLoginWithEmailAndPassword)}
              h={12}
              mt={4}
            />
          </FormControl>
        </Center>
      </TouchableWithoutFeedback>
    </VStack>
  );
}
