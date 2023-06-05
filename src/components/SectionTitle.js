import React, { useRef, useEffect } from "react";
import anime from "animejs";

import { throttle } from "../utils";

const SectionTitle = ({ number, title }) => {
  const anima = useRef(null);
  const titleRef = useRef(null);

  const scrollHandler = () => {
    throttle(() => {
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const targetTop = titleRef.current.getBoundingClientRect().top;
      // console.log(windowHeight, targetTop);
      if (targetTop < windowHeight * 0.7) {
        anima.current.play();
        window.removeEventListener("scroll", scrollHandler);
      }
    }, 250);
  };
  useEffect(() => {
    anima.current = anime({
      targets: `#section-id-${number} .text-slide`,
      translateY: ["1vh", "-7vh"],
      easing: "easeOutQuint",
      autoplay: false,
      duration: 1500,
    });
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <section id={`section-id-${number}`} className="section-container">
      <div className="title" ref={titleRef}>
        <span>N° {number}</span>
        <span>
          <div className="text-slide">
            <br />
            {title}
          </div>
        </span>
      </div>
    </section>
  );
};

export default SectionTitle;
