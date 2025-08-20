import { useEffect } from "react";
import "./Cursor.sass";

const Cursor = () => {
  useEffect(() => {
    const cursorDot = document.querySelector("#cursor-center");
    const cursorRing = document.querySelector("#cursor-ring");

    const onMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        {
          duration: 100,
          fill: "forwards",
          easing: "cubic-bezier(0, 0, 0.6, 1)",
        }
      );

      cursorRing.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        {
          duration: 500,
          fill: "forwards",
          easing: "cubic-bezier(0, 0, 0.8, 0.2)",
        }
      );
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div id="cursor-ring" className="back"></div>
      <div id="cursor-center" className="front"></div>
    </>
  );
};

export default Cursor;
