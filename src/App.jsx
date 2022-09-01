import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./App.css";

const tempObject = new THREE.Object3D();
const Box = () => {
  const ref = useRef();

  useFrame(() => {
    const time = state.clock.getElapsedTime();
    const grow = Math.sin(time / 1);
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    let i = 0;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        for (let z = 0; z < 10; z++) {
          const id = i++;
          tempObject.position.set(5 - x, 5 - y, 5 - z);
          tempObject.updateMatrix();
          ref.current.setMatrixAt(id, tempObject.matrix);
        }
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[null, null, 1000]}>
      <boxBufferGeometry attach="geometry" args={[0.4, 0.4, 0.4]} />
      <meshPhongMaterial attach="material" color="teal" />
    </instancedMesh>
  );
};

const Scene = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <Box />
      <pointLight intensity={0.6} position={[0, 10, 4]} />
    </>
  );
};

const App = () => {
  return (
    <Canvas camera={{ position: [0, 0, 15], near: 0.5, far: 40 }}>
      <Scene />
    </Canvas>
  );
};

export default App;

// useSpringについて
// https://qiita.com/uehaj/items/260f188851045cc091ac
