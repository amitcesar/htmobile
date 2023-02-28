import { Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  Center,
  Heading,
  VStack,
  Box,
  KeyboardAvoidingView,
} from "native-base";

import { FormSignIn } from "./components/FormSignIn";

export function SignIn() {
  return (
    <VStack bg="white.300" flex={1} alignItems="center">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled minW={"300px"}>
          <Center>
            <Box safeArea my={24} mt={20} mb={6}>
              <Heading
                color={"gray.900"}
                fontSize="2xl"
                fontFamily="heading"
                pt={1}
              >
                Acesse sua conta
              </Heading>
            </Box>

            <FormSignIn />
          </Center>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </VStack>
  );
}
