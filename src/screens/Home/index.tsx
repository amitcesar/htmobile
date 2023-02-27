import { Alert } from "react-native";
import { Box, Center, Heading, VStack, Text, Flex, HStack } from "native-base";

import { Canvas, useFrame } from "@react-three/fiber/native";
import { Input } from "../SignIn/Input";
import { ACESFilmicToneMapping, Mesh } from "three";
import { useRef, useState } from "react";
import { Button } from "../SignIn/Button";

import { useForm, Controller } from "react-hook-form";

function rotationModels(modelRef) {
  return useFrame(() => {
    if (!modelRef.current) {
      return;
    }

    modelRef.current.rotation.y += 0.01;
    modelRef.current.rotation.y += 0.01;
  });
}

function CubeModel({ InputColor, ...rest }) {
  const cubeRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!cubeRef.current) {
      return;
    }

    cubeRef.current.rotation.y += 0.01;
    cubeRef.current.rotation.y += 0.01;
  });

  return (
    <mesh {...rest} ref={cubeRef}>
      <meshStandardMaterial color={InputColor ? InputColor : "red"} />
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
    </mesh>
  );
}

function SphereModel({ InputColor, ...rest }) {
  const sphereRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!sphereRef.current) {
      return;
    }

    // sphereRef.current.rotation.y += 0.01;
    // sphereRef.current.rotation.x += 0.01;

    sphereRef.current.rotation.y += 0.01;
    sphereRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={sphereRef}>
      <icosahedronGeometry />
      <meshStandardMaterial color={InputColor ? InputColor : "yellow"} />
    </mesh>
  );
}

function OctahedronModel({ InputColor, ...rest }) {
  const octahedronRef = useRef<Mesh>(null);

  rotationModels(octahedronRef);
  return (
    <mesh {...rest} ref={octahedronRef}>
      <octahedronGeometry />
      <meshStandardMaterial color={InputColor ? InputColor : "green"} />
    </mesh>
  );
}

// position={[-1.2, 0, 0]}
// position={[1, 2, 0]}

type formDataProps = {
  cubeColorInput: string;
  sphereColorInput: string;
  octaColorInput: string;
};

export function Home() {
  const [colorCube, setColorCube] = useState("");
  const [colorSphere, setColorSphere] = useState("");
  const [colorOcta, setColorOcta] = useState("");

  const { control, handleSubmit, getValues } = useForm<formDataProps>();

  function handleColorSubmit({
    cubeColorInput,
    sphereColorInput,
    octaColorInput,
  }: formDataProps) {
    const values = getValues();
    console.log(values);
    setColorCube(values.cubeColorInput);
    setColorSphere(values.sphereColorInput);
    setColorOcta(values.octaColorInput);
  }

  return (
    <>
      <Canvas gl={{ toneMapping: ACESFilmicToneMapping }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 0, 5]} />
        <group>
          <CubeModel
            position={[0, 2.5, 0]}
            InputColor={colorCube}
            color="red"
          />
          <OctahedronModel position={[0, -2.5, 0]} InputColor={colorOcta} />
          <SphereModel position={[2, 0, 0]} InputColor={colorSphere} />
        </group>
      </Canvas>

      <HStack justifyContent="center" space={1}>
        <Controller
          control={control}
          name="cubeColorInput"
          render={({ field: { onChange, value } }) => (
            <Input
              w={"1/3"}
              placeholder="Digite uma cor"
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="sphereColorInput"
          render={({ field: { onChange, value } }) => (
            <Input
              w={"1/3"}
              placeholder="Digite uma cor"
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="octaColorInput"
          render={({ field: { onChange, value } }) => (
            <Input
              w={"1/3"}
              placeholder="Digite uma cor"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </HStack>
      <Button title="Aplicar" onPress={handleSubmit(handleColorSubmit)} />
    </>
  );
}
