import { useRef, useState, useEffect } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { HStack, FormControl } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { ACESFilmicToneMapping, Mesh } from "three";

import { Button } from "../SignIn/Button";
import { Input } from "../SignIn/Input";

import firestore from "@react-native-firebase/firestore";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

function rotationModels(modelRef) {
  return useFrame(() => {
    if (!modelRef.current) {
      return;
    }

    modelRef.current.rotation.y += 0.01;
    modelRef.current.rotation.y += 0.01;
  });
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
          handleSetColorforModels({
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
    console.log(colorCube, colorSphere, colorOcta);
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
        // console.log(colorCube, colorSphere, colorOcta);
        setColorCube(colorCube);
        setColorOcta(colorOcta);
        setColorSphere(colorSphere);
      });

    reset();
  }

  function handleSetColorforModels({
    colorCube,
    colorOcta,
    colorSphere,
  }: formDataProps) {
    setColorCube(colorCube);
    setColorSphere(colorSphere);
    setColorOcta(colorOcta);
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
          <SphereModel position={[2, 0, 0]} InputColor={colorSphere} />
        </group>
      </Canvas>
      <FormControl>
        <HStack justifyContent="center" space={1}>
          <Controller
            control={control}
            name="colorCube"
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
            name="colorSphere"
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
            name="colorOcta"
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
      </FormControl>
    </>
  );
}
