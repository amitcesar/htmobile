import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";
/**
 
blue.400
gray.900
info.200
*/

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      color={"gray.200"}
      bg="gray.900"
      fontSize="md"
      h={16}
      mb={4}
      {...rest}
      _focus={{
        borderWidth: 2,
        borderColor: "blue.400",
        bg: "gray.600",
      }}
    />
  );
}
