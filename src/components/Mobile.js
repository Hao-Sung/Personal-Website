import React, { useRef, useEffect } from "react";
import anime from "animejs";

const Mobile = ({ text }) => {
  const animaTop = useRef(null);
  const animaDown = useRef(null);

  const slideIn = {
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i,
  };
  const slideOut = {
    translateX: [0, -30],
    opacity: [1, 0],
    easing: "easeInExpo",
    duration: 1200,
    delay: (el, i) => 2000 + 30 * i,
  };
  useEffect(() => {
    animaTop.current = anime
      .timeline({ loop: true })
      .add({
        targets: ".letter-up",
        ...slideIn,
      })
      .add({
        targets: ".letter-up",
        ...slideOut,
      });
    animaDown.current = anime
      .timeline({ loop: true })
      .add({
        targets: ".letter-down",
        ...slideIn,
        delay: (el, i) => 1000 + 30 * i,
      })
      .add({
        targets: ".letter-down",
        ...slideOut,
      });
  }, []);

  return (
    <section
      className="mobile"
      style={{
        backgroundColor: "rgb(24, 24, 24)",
        height: "100vh",
        width: "100vw",
        color: "#CB4335",
        display: "grid",
        gridTemplateRows: "1fr 1fr",
        fontSize: "4vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingBottom: "2px",
        }}
      >
        {text[0].split("").map((letter, index) => {
          return <span className="letter-up">{letter}</span>;
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "2px",
        }}
      >
        {text[1].split("").map((letter, index) => {
          return <span className="letter-down">{letter}</span>;
        })}
      </div>
    </section>
  );
};

export default Mobile;
