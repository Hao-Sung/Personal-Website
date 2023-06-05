import React from "react";

const TextRing = ({ text }) => {
  const CHARS = text.split("");
  const INNER_ANGLE = 360 / CHARS.length;
  return (
    <span
      className="text-ring"
      style={{
        "--total": CHARS.length,
        "--radius": 1 / Math.sin(INNER_ANGLE / (180 / Math.PI)),
      }}
    >
      {CHARS.map((char, index) => (
        <span style={{ "--index": index }}>{char}</span>
      ))}
    </span>
  );
};

export default TextRing;
