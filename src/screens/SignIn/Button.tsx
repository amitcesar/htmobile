import { Button as ButtonNativeBase, IButtonProps, Heading } from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      h={16}
      bg="info.400"
      fontSize="md"
      rounded="sm"
      _pressed={{ bg: "info.300" }}
      {...rest}
    >
      <Heading color="gray.900" fontSize="md">
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}
