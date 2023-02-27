import { useRef, useState, useEffect } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { HStack, FormControl } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { ACESFilmicToneMapping, Mesh } from "three";

import { Button } from "../SignIn/Button";
import { Input } from "../SignIn/Input";

import firestore from "@react-native-firebase/firestore";

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

type formDataProps = {
  id?: string;
  colorCube: string;
  colorSphere: string;
  colorOcta: string;
};

type RouteParams = {
  currentUser: string;
};

export function Home() {
  const [colorCube, setColorCube] = useState("");
  const [colorSphere, setColorSphere] = useState("");
  const [colorOcta, setColorOcta] = useState("");
  const [colorStates, setColorStates] = useState([]);

  const route = useRoute();
  const { currentUser } = route.params as RouteParams;

  const { control, handleSubmit, getValues, reset } = useForm<formDataProps>({
    defaultValues: {
      colorCube: "",
      colorSphere: "",
      colorOcta: "",
    },
  });

  const handleGetAllRegisterColors = async () => {
    const subscribe = firestore()
      .collection("3dModels")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs
          .filter((doc) => doc.id === currentUser.uid)
          .map((doc) => {
            console.log(" => ", doc.data());
          });
      });
    return () => subscribe();
  };

  async function handleGetOne() {
    firestore()
      .collection("3dModels")
      .doc(currentUser.uid)
      .get()
      .then((response) =>
        handleSetColorforModels({
          id: response.id,
          ...response.data(),
        })
      );
  }

  async function handleColorSubmit({
    colorCube,
    colorOcta,
    colorSphere,
  }: formDataProps) {
    firestore()
      .collection("3dModels")
      .doc(currentUser.uid)
      .set({
        colorCube,
        colorSphere,
        colorOcta,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log("error!", error))
      .finally(() => {
        setColorCube(colorCube);
        setColorSphere(colorSphere);
        setColorOcta(colorOcta);
      });

    reset();
  }

  function handleSetColorforModels(data) {
    setColorCube(colorCube);
    setColorSphere(colorSphere);
    setColorOcta(colorOcta);
  }

  function handleChangeColor() {
    firestore().collection("3dModels").doc(currentUser.uid).update({
      colorCube,
      colorSphere,
      colorOcta,
    });
  }

  useEffect(() => {
    // handleGetAllRegisterColors();
    // handleGetOne();
  }, []);

  useEffect(() => {
    const subscribe = firestore()
      .collection("3dModels")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs
          .filter((doc) => doc.id === currentUser.uid)
          .map((doc) => {
            return doc.data();
          });

        setColorStates(data);
      });
    return () => subscribe();
  }, []);
  console.log("states", colorStates);
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
