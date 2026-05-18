import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { CarModel } from "./CarModel";

export const Car3D = () => {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-xl bg-white">
      <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <CarModel />

        <OrbitControls enableZoom={true} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
