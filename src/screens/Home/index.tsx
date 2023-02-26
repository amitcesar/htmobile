import { Alert } from "react-native";
import { Box, Center, Heading, VStack, Text } from "native-base";

import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  BoxGeometry,
} from "three";
import ExpoTHREE, { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";

export function Home() {
  const onContextCreate = async (gl: any) => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );

    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };

    camera.position.z = 2;

    const renderer = new Renderer({ gl });
    // set size of buffer to be equal to drawing buffer width
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
      color: "cyan",
    });

    const cube = new Mesh(geometry, material);
    scene.add(cube);

    const render = () => {
      requestAnimationFrame(render);
      // create rotate functionality
      // rotate around x axis
      cube.rotation.x += 0.01;

      // rotate around y axis
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <VStack bg="info.200" flex={1} alignItems="center">
      <Center>
        <GLView
          onContextCreate={onContextCreate}
          style={{ width: 400, height: 400 }}
        />
      </Center>
    </VStack>
  );
}
