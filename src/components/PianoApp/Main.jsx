import { useEffect, useState, useRef, useContext } from "react";
import classNames from "classnames";
import PianoProvider from "providers/PianoApp/PianoProvider";
import { PianoContext } from "../../providers/PianoApp/PianoProvider";

const WHITE_KEY_RATIO = 7 / 8; // White key bottom width relative to parent
const BLACK_KEY_RATIO = 0.5; // Black key width relative to white key bottom width
const BLACK_KEY_HEIGHT_RATIO = 0.625; // Black key height relative to white key height
const KEY_GAP_RATIO = 0.02; // Gap relative to white key width

function PianoKey({ octave, pianoKey, whiteKeyWidth, whiteKeyHeight }) {
  const isBlack = pianoKey.includes("#") || pianoKey.includes("b");
  const [isPressed, setIsPressed] = useState(false);
  const {synth} = useContext(PianoContext);

  const note = `${pianoKey}${octave}`;
  const blackKeyWidth = BLACK_KEY_RATIO * whiteKeyWidth;
  const blackKeyHeight = BLACK_KEY_HEIGHT_RATIO * whiteKeyHeight;
  const keyGap = KEY_GAP_RATIO * whiteKeyWidth;

  const handlePressChange = (pressed) => {
    if (pressed) {
      synth.triggerAttack(note);
    } else {
      synth.triggerRelease();
    }
    setIsPressed(pressed);
  };

  return (
    <div
      className="relative"
      onMouseDown={(e) => {
        e.preventDefault();
        handlePressChange(true);
      }}
      onMouseOut={() => handlePressChange(false)}
      onMouseUp={() => handlePressChange(false)}
      onMouseEnter={(e) => {
        if (e.buttons === 1) {
          handlePressChange(true);
        }
      }}
    >
      {isBlack ? (
        <div
          className={classNames(
            "absolute z-10 left-1/2 transform -translate-x-1/2 top-0 rounded-bl rounded-br",
            { "bg-black": !isPressed },
            { "bg-red-700": isPressed }
          )}
          style={{
            width: blackKeyWidth,
            height: blackKeyHeight,
          }}
        />
      ) : (
        <div
          className={classNames(
            "relative border border-black rounded-bl rounded-br",
            { "bg-white": !isPressed },
            { "bg-red-700": isPressed }
          )}
          style={{
            width: whiteKeyWidth,
            height: whiteKeyHeight,
            marginLeft: keyGap / 2,
            marginRight: keyGap / 2,
          }}
        />
      )}
    </div>
  );
}

export default function Main() {
  const pianoRef = useRef(null);
  const [pianoWidth, setPianoWidth] = useState(0);
  const octaves = [1, 2, 3, 4, 5, 6, 7];
  const octave0 = ["A", "A#", "B"];
  const octave8 = ["C"];
  const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const totalWhiteKeys = octave0.length + octaves.length * 7 + octave8.length;

  useEffect(() => {
    const updatePianoWidth = () => {
      if (pianoRef.current) {
        setPianoWidth(pianoRef.current.offsetWidth);
      }
    };

    updatePianoWidth();
    window.addEventListener("resize", updatePianoWidth);

    return () => window.removeEventListener("resize", updatePianoWidth);
  }, []);

  const whiteKeyWidth = pianoWidth / totalWhiteKeys;
  const whiteKeyHeight = 6 * whiteKeyWidth; // Adjust height proportionally

  return (
    <PianoProvider>
      <div ref={pianoRef} style={{ display: "flex", position: "relative", width: "100%" }}>
        {octave0.map((key, keyIndex) => (
          <PianoKey
            key={keyIndex}
            octave={0}
            pianoKey={key}
            whiteKeyWidth={whiteKeyWidth}
            whiteKeyHeight={whiteKeyHeight}
          />
        ))}
        {octaves.map((octave, octaveIndex) =>
          keys.map((key, keyIndex) => (
            <PianoKey
              key={`${octaveIndex}-${keyIndex}`}
              octave={octave}
              pianoKey={key}
              whiteKeyWidth={whiteKeyWidth}
              whiteKeyHeight={whiteKeyHeight}
            />
          ))
        )}
        {octave8.map((key, keyIndex) => (
          <PianoKey
            key={keyIndex}
            octave={8}
            pianoKey={key}
            whiteKeyWidth={whiteKeyWidth}
            whiteKeyHeight={whiteKeyHeight}
          />
        ))}
      </div>
    </PianoProvider>
  );
}
