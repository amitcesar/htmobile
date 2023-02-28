import { Input as NativeBaseInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      fontFamily="body"
      bg="#f6f6f6"
      fontSize="md"
      h={16}
      mb={4}
      borderColor="blueGray.400"
      color="white"
      placeholderTextColor="gray.300"
      {...rest}
      _focus={{
        borderWidth: 2,
        borderColor: "blue.500",
        bg: "gray.100",
      }}
    />
  );
}
