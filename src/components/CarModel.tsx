import React from "react";
import { useGLTF } from "@react-three/drei";

export const CarModel: React.FC = () => {
  const { scene } = useGLTF("/car.glb");
  return <primitive object={scene} scale={1.5} />;
};
