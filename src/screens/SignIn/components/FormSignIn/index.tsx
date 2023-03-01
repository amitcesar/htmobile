import { Alert } from "react-native";
import { FormControl } from "native-base";

import auth from "@react-native-firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackRoutesParamList } from "../../../../Routes/app.routes";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";

export type StackNavigation =
  NativeStackNavigationProp<AppStackRoutesParamList>;

type LoginDataProps = {
  email: string;
  password: string;
};

export function FormSignIn() {
  const { navigate } = useNavigation<StackNavigation>();

  const { control, handleSubmit, getValues } = useForm<LoginDataProps>();

  function handleLoginWithEmailAndPassword() {
    const { email, password } = getValues();
    auth()
      .signInWithEmailAndPassword("userteste@email.com", "coxinha123")
      // .signInWithEmailAndPassword(email, password)
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
          Alert.alert("Usuario não encontrado. Email e/ou senha invalida!");
        }
      });
  }

  return (
    <>
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
    </>
  );
}
