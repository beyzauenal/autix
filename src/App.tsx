// App.tsx
import React, { useState } from "react";

type Brand = "Mercedes-Benz" | "AMG";
type Step = 1 | 2 | 3 | 4 | 5;

const mercedesModels = [
  "A-Klasse",
  "B-Klasse",
  "C-Klasse",
  "E-Klasse",
  "S-Klasse",
  "CLA",
  "CLS",
  "GLA",
  "GLB",
  "GLC",
  "GLE",
  "GLS",
  "G-Klasse",
];

const amgModels = [
  "A 45 AMG",
  "C 63 AMG",
  "E 63 AMG",
  "GT 63 S",
  "GLC 63 AMG",
  "GLE 63 AMG",
];

const colors = ["Polarweiß", "Obsidianschwarz", "Iridiumsilber", "Selenitgrau", "Brillantblau", "Hyazinthrot"];
const rims = ["Klassische Felgen", "Sportfelgen", "AMG-Felgen", "Aero-Felgen"];
const lights = ["LED High Performance", "MULTIBEAM LED", "Digital Light"];

export const App: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [brand, setBrand] = useState<Brand | "">("");
  const [model, setModel] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [color, setColor] = useState<string>("");
  const [rim, setRim] = useState<string>("");
  const [light, setLight] = useState<string>("");

  const resetConfig = () => {
    setStep(1);
    setBrand("");
    setModel("");
    setPrice("");
    setColor("");
    setRim("");
    setLight("");
  };

  const currentModels = brand === "AMG" ? amgModels : mercedesModels;

  const canGoNextFromStep1 = brand && model && price !== "";
  const canGoNextFromStep2 = !!color;
  const canGoNextFromStep3 = !!rim;
  const canGoNextFromStep4 = !!light;

  const StepIndicator: React.FC = () => (
    <div className="flex items-center justify-center gap-4 mb-8 text-sm">
      {[
        { id: 1, label: "Modell & Preis" },
        { id: 2, label: "Farbe" },
        { id: 3, label: "Felgen" },
        { id: 4, label: "Licht" },
        { id: 5, label: "Übersicht" },
      ].map((s) => (
        <div key={s.id} className="flex items-center gap-2">
          <div
            className={`h-8 w-8 flex items-center justify-center rounded-full border text-xs font-semibold
            ${
              step === s.id
                ? "bg-black text-white border-black"
                : step > s.id
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white text-gray-500 border-gray-300"
            }`}
          >
            {s.id}
          </div>
          <span
            className={`hidden sm:inline ${
              step === s.id ? "font-semibold text-gray-900" : "text-gray-500"
            }`}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Wähle Marke, Modell und Preis
      </h2>

      {/* Marke */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Marke
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(["Mercedes-Benz", "AMG"] as Brand[]).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => {
                setBrand(b);
                setModel("");
              }}
              className={`border rounded-lg px-4 py-3 text-sm font-medium transition
                ${
                  brand === b
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-800 hover:border-gray-500"
                }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Modell */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Modell
        </label>
        <select
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          disabled={!brand}
        >
          <option value="">Bitte Modell wählen</option>
          {currentModels.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        {!brand && (
          <p className="text-xs text-gray-500">
            Bitte zuerst eine Marke auswählen.
          </p>
        )}
      </div>

      {/* Preis */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Preis (in €)
        </label>
        <input
          type="number"
          min={0}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="z.B. 65 000"
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <button
          type="button"
          disabled={!canGoNextFromStep1}
          onClick={() => setStep(2)}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition
            ${
              canGoNextFromStep1
                ? "bg-black text-white hover:bg-gray-900"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Weiter zur Farbe
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Wähle die Außenfarbe
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            className={`border rounded-lg px-4 py-3 text-sm text-left transition
              ${
                color === c
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-800 hover:border-gray-500"
              }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:border-gray-500"
        >
          Zurück
        </button>
        <button
          type="button"
          disabled={!canGoNextFromStep2}
          onClick={() => setStep(3)}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition
            ${
              canGoNextFromStep2
                ? "bg-black text-white hover:bg-gray-900"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Weiter zu den Felgen
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Wähle die Felgen
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rims.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRim(r)}
            className={`border rounded-lg px-4 py-3 text-sm text-left transition
              ${
                rim === r
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-800 hover:border-gray-500"
              }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:border-gray-500"
        >
          Zurück
        </button>
        <button
          type="button"
          disabled={!canGoNextFromStep3}
          onClick={() => setStep(4)}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition
            ${
              canGoNextFromStep3
                ? "bg-black text-white hover:bg-gray-900"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Weiter zum Licht
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Wähle das Lichtsystem
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {lights.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLight(l)}
            className={`border rounded-lg px-4 py-3 text-sm text-left transition
              ${
                light === l
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-800 hover:border-gray-500"
              }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(3)}
          className="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:border-gray-500"
        >
          Zurück
        </button>
        <button
          type="button"
          disabled={!canGoNextFromStep4}
          onClick={() => setStep(5)}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition
            ${
              canGoNextFromStep4
                ? "bg-black text-white hover:bg-gray-900"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Konfiguration anzeigen
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Zusammenfassung deiner Konfiguration
      </h2>

      <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Marke</span>
          <span className="font-medium text-gray-900">{brand}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Modell</span>
          <span className="font-medium text-gray-900">{model}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Preis</span>
          <span className="font-medium text-gray-900">
            {price !== "" ? price.toLocaleString("de-AT") + " €" : "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Farbe</span>
          <span className="font-medium text-gray-900">{color}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Felgen</span>
          <span className="font-medium text-gray-900">{rim}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Licht</span>
          <span className="font-medium text-gray-900">{light}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-between">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:border-gray-500"
        >
          Konfiguration bearbeiten
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={resetConfig}
            className="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:border-gray-500"
          >
            Neu beginnen
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-black text-white hover:bg-gray-900"
          >
            Anfrage absenden
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full border border-gray-900 flex items-center justify-center text-xs font-semibold tracking-[0.2em]">
              MB
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-gray-500">
                Mercedes-Konfigurator Autix
              </div>
              <div className="text-sm font-medium text-gray-900">
                Dein Wunschfahrzeug erstellen
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500">
            <span>Modernes UI</span>
            <span>•</span>
            <span>Benutzerfreundlich</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            Jetzt Wunschmodell konfigurieren
          </h1>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl">
            Wähle Marke, Modell, Farbe, Felgen und Licht – Schritt für Schritt
            zu deinem persönlichen Mercedes.
          </p>
        </div>

        <StepIndicator />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)] items-start">
          {/* Linke Seite: Steps */}
          <section className="rounded-2xl bg-white shadow-sm border border-gray-200 p-6">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
          </section>

          {/* Rechte Seite: Live-Vorschau */}
          <aside className="space-y-4">
            <div className="rounded-2xl bg-black text-white p-6 shadow-md">
              <div className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-2">
                Live-Vorschau
              </div>
              <div className="text-lg font-semibold mb-1">
                {brand && model ? `${brand} ${model}` : "Noch kein Modell gewählt"}
              </div>
              <div className="text-sm text-gray-300 mb-4">
                {color || rim || light
                  ? "Deine aktuelle Konfiguration im Überblick."
                  : "Sobald du Optionen auswählst, siehst du hier die Details."}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Preis</span>
                  <span className="font-medium">
                    {price !== ""
                      ? price.toLocaleString("de-AT") + " €"
                      : "–"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Farbe</span>
                  <span className="font-medium">{color || "–"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Felgen</span>
                  <span className="font-medium">{rim || "–"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Licht</span>
                  <span className="font-medium">{light || "–"}</span>
                </div>
              </div>

              <div className="mt-5 h-28 rounded-xl bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center text-[0.65rem] text-gray-300 border border-gray-700">
                3D- oder Fahrzeug-Visualisierung könnte hier eingebunden werden.
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-gray-300 bg-white/60 p-4 text-xs text-gray-600">
              <p className="font-medium mb-1">Hinweis für die Umsetzung:</p>
              <p>
                Du kannst diese Datei als <code className="bg-gray-100 px-1 rounded">App.tsx</code> in einem
                Vite- oder Create-React-App-Projekt mit Tailwind verwenden und nach
                Bedarf erweitern (z.B. echte Daten, API, Bilder, Login, etc.).
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;
