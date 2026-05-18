import React from "react";
import { Button } from "./UI/Button";
import { colors, wheels, lights } from "../data/config";

type Props = {
  selectedColor: string;
  setSelectedColor: (v: string) => void;

  selectedWheel: string;
  setSelectedWheel: (v: string) => void;

  selectedLight: string;
  setSelectedLight: (v: string) => void;
};

export const ConfiguratorUI: React.FC<Props> = ({
  selectedColor,
  setSelectedColor,
  selectedWheel,
  setSelectedWheel,
  selectedLight,
  setSelectedLight,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-bold mb-4">Konfigurator</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Farbe</h3>
        <div className="flex gap-2 flex-wrap">
          {colors.map((c) => (
            <Button
              key={c}
              label={c}
              active={selectedColor === c}
              onClick={() => setSelectedColor(c)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Felgen</h3>
        <div className="flex gap-2 flex-wrap">
          {wheels.map((w) => (
            <Button
              key={w}
              label={w}
              active={selectedWheel === w}
              onClick={() => setSelectedWheel(w)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Licht</h3>
        <div className="flex gap-2 flex-wrap">
          {lights.map((l) => (
            <Button
              key={l}
              label={l}
              active={selectedLight === l}
              onClick={() => setSelectedLight(l)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

