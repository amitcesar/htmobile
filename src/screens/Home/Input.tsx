import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      color={"gray.200"}
      bg="gray.900"
      fontSize="md"
      {...rest}
      _focus={{
        borderWidth: 2,
        borderColor: "blue.400",
        bg: "gray.600",
      }}
    />
  );
}
