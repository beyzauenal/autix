import React from "react";
import { Button } from "./UI/Button";

const stories = [
  "Startseite sehen",
  "Konfiguration sehen",
  "Website auf Handy/Desktop nutzen",
  "Einfache Bedienung",
  "Preis automatisch berechnen",
  "Konfiguration speichern",
  "Konfiguration zurücksetzen",
];

export const StoryButtons: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      {stories.map((story, i) => (
        <Button key={i} label={story} />
      ))}
    </div>
  );
};
