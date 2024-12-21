import { Button } from 'antd';
import { createContext, useState } from 'react';
import * as Tone from 'tone';

const configureSynth = () => {
  const sampler = new Tone.Sampler({
    urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
    onload: () => {
        sampler.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
    }
  }).toDestination();
  return sampler;
}

export const PianoContext = createContext({
  toneStarted: false,
  setToneStarted: () => {},
  synth: null,
});

export default function PianoProvider({ children }) {
  const [toneStarted, setToneStarted] = useState(false);
  const [synth, setSynth] = useState(null);

  const handleStartTone = async () => {
    try {
      await Tone.start();
      setToneStarted(true);

      const synth = configureSynth();
      setSynth(synth);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <PianoContext.Provider
      value={{
        toneStarted,
        setToneStarted,
        synth,
      }}
    >
      {children}
      { !toneStarted && (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.5)",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
          </div>
          <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 bg-white rounded-lg">
            <div className="flex flex-col items-center w-64">
              <h1 className="text-2xl font-bold">Let{`'`}s play</h1>
              <Button type="primary"
                onClick={handleStartTone}>Start</Button>
            </div>
          </div>
        </>
      )}
    </PianoContext.Provider>
  );
}
