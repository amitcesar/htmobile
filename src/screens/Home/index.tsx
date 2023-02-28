import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { useRoute } from "@react-navigation/native";
import { HStack, FormControl } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { ACESFilmicToneMapping, Mesh } from "three";

import firestore from "@react-native-firebase/firestore";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type DataModelColorProps = {
  InputColor: string;
};

function CubeModel({ InputColor, ...rest }: DataModelColorProps) {
  const cubeRef = useRef<Mesh>(null);

  rotationModels(cubeRef);

  return (
    <mesh {...rest} ref={cubeRef}>
      <meshStandardMaterial color={InputColor ? InputColor : "red"} />
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
    </mesh>
  );
}

function rotationModels(modelRef) {
  return useFrame(() => {
    if (!modelRef.current) {
      return;
    }

    modelRef.current.rotation.y += 0.01;
    modelRef.current.rotation.y += 0.01;
  });
}

function SphereModel({ InputColor, ...rest }: DataModelColorProps) {
  const sphereRef = useRef<Mesh>(null);
  rotationModels(sphereRef);

  return (
    <mesh {...rest} ref={sphereRef}>
      <icosahedronGeometry />
      <meshStandardMaterial color={InputColor ? InputColor : "yellow"} />
    </mesh>
  );
}

function OctahedronModel({ InputColor, ...rest }: DataModelColorProps) {
  const octahedronRef = useRef<Mesh>(null);

  rotationModels(octahedronRef);
  return (
    <mesh {...rest} ref={octahedronRef}>
      <octahedronGeometry />
      <meshStandardMaterial color={InputColor ? InputColor : "green"} />
    </mesh>
  );
}

type formDataProps = {
  id?: string;
  colorCube: string;
  colorSphere: string;
  colorOcta: string;
};

type RouteParams = {
  currentUser: string;
};

const colorScheme = yup.object({
  colorCube: yup.string().min(3, "min 3 "),
  colorSphere: yup.string().min(3, "min 3"),
  colorOcta: yup.string(),
});

export function Home() {
  const [colorCube, setColorCube] = useState("");
  const [colorSphere, setColorSphere] = useState("");
  const [colorOcta, setColorOcta] = useState("");

  const route = useRoute();
  const { currentUser } = route.params as RouteParams;

  const { control, handleSubmit, getValues, reset } = useForm<formDataProps>({
    defaultValues: {
      colorCube: "",
      colorSphere: "",
      colorOcta: "",
    },
    resolver: yupResolver(colorScheme),
  });

  async function handleGetOne() {
    firestore()
      .collection("3dModels")
      .doc(currentUser.uid)
      .onSnapshot({
        error: (e) => console.log(e),
        next: (documentsnapShot) => {
          handleColorSubmit({
            id: documentsnapShot.id,
            ...documentsnapShot.data(),
          });
        },
      });
  }

  async function handleColorSubmit({
    colorCube,
    colorSphere,
    colorOcta,
  }: formDataProps) {
    firestore()
      .collection("3dModels")
      .doc(currentUser.uid)
      .set({
        colorCube,
        colorSphere,
        colorOcta,
      })
      .then((response) => {})
      .catch((error) => console.log("error!", error))
      .finally(() => {
        setColorCube(colorCube);
        setColorOcta(colorOcta);
        setColorSphere(colorSphere);
      });

    reset();
  }

  useEffect(() => {
    // handleGetAllRegisterColors();
    // handleGetOne();
  }, []);

  useEffect(() => {
    const subscribe = firestore()
      .collection("3dModels")
      .doc(currentUser.uid)
      .onSnapshot({
        error: (e) => console.log(e),
        next: (documentsnapShot) => {
          handleColorSubmit({
            id: documentsnapShot.id,
            ...documentsnapShot.data(),
          });
        },
      });
    return () => subscribe();
  }, []);

  return (
    <>
      <Canvas gl={{ toneMapping: ACESFilmicToneMapping }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 0, 5]} />
        <group>
          <CubeModel position={[0, 2.5, 0]} InputColor={colorCube} />
          <OctahedronModel position={[0, -2.5, 0]} InputColor={colorOcta} />
          <SphereModel position={[0, 0, 0]} InputColor={colorSphere} />
        </group>
      </Canvas>
      <FormControl>
        <HStack justifyContent="center" space={1}>
          <Controller
            control={control}
            name="colorCube"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                w={"1/3"}
                placeholder="Digite uma cor"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name="colorSphere"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                w={"1/3"}
                placeholder="Digite uma cor"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name="colorOcta"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                w={"1/3"}
                placeholder="Digite uma cor"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
        </HStack>
        <Button title="Aplicar" onPress={handleSubmit(handleColorSubmit)} />
      </FormControl>
    </>
  );
}
