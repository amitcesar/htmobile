import { Button as ButtonNativeBase, IButtonProps, Heading } from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      h={16}
      bg="customBlue.500"
      fontSize="md"
      fontFamily={"body"}
      rounded="sm"
      _pressed={{ bg: "customBlue.400" }}
      {...rest}
    >
      <Heading fontSize="md" fontFamily={"heading"}>
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}
