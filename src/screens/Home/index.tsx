import { Alert } from "react-native";
import { Box, Center, Heading, VStack, Text } from "native-base";

export function Home() {
  return (
    <VStack bg="info.200" flex={1} alignItems="center">
      <Center>
        <Heading
          color={"gray.900"}
          my={24}
          mt={20}
          fontSize="lg"
          fontFamily="heading"
        >
          Home
        </Heading>

        <Box>Elemento 1</Box>
        <Box>Elemento 3</Box>
      </Center>
    </VStack>
  );
}
