import React, { useState } from "react";
import { StoryButtons } from "./components/StoryButtons";
import { ConfiguratorUI } from "./components/ConfiguratorUI";
import { Car3D } from "./components/Car3D";

export default function App() {
  const [color, setColor] = useState("Schwarz");
  const [wheel, setWheel] = useState("Sport");
  const [light, setLight] = useState("LED");

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex gap-8">
      {/* Sidebar */}
      <div className="w-1/4 bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-4">AUTIX</h1>
        <StoryButtons />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-8">
        <ConfiguratorUI
          selectedColor={color}
          setSelectedColor={setColor}
          selectedWheel={wheel}
          setSelectedWheel={setWheel}
          selectedLight={light}
          setSelectedLight={setLight}
        />

        <Car3D />
      </div>
    </div>
  );
}
